<template>
<uni-shadow-root class="vant-weapp-circle-index"><view class="van-circle">
  <canvas class="van-circle__canvas" :type="type" :style="'width: '+(utils.addUnit(size))+';height:'+(utils.addUnit(size))" id="van-circle" canvas-id="van-circle"></canvas>
  <view v-if="(!text)" class="van-circle__text">
    <slot></slot>
  </view>
  <cover-view v-else class="van-circle__text">{{ text }}</cover-view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>

global['__wxRoute'] = 'vant-weapp/circle/index'
import { BLUE, WHITE } from '../common/color';
import { VantComponent } from '../common/component';
import { getSystemInfoSync } from '../common/utils';
import { isObj } from '../common/validator';
import { canIUseCanvas2d } from '../common/version';
import { adaptor } from './canvas';
function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}
const PERIMETER = 2 * Math.PI;
const BEGIN_ANGLE = -Math.PI / 2;
const STEP = 1;
VantComponent({
  props: {
    text: String,
    lineCap: {
      type: String,
      value: 'round',
    },
    value: {
      type: Number,
      value: 0,
      observer: 'reRender',
    },
    speed: {
      type: Number,
      value: 50,
    },
    size: {
      type: Number,
      value: 100,
      observer() {
        this.drawCircle(this.currentValue);
      },
    },
    fill: String,
    layerColor: {
      type: String,
      value: WHITE,
    },
    color: {
      type: null,
      value: BLUE,
      observer() {
        this.setHoverColor().then(() => {
          this.drawCircle(this.currentValue);
        });
      },
    },
    type: {
      type: String,
      value: '',
    },
    strokeWidth: {
      type: Number,
      value: 4,
    },
    clockwise: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    hoverColor: BLUE,
  },
  methods: {
    getContext() {
      const { type, size } = this.data;
      if (type === '' || !canIUseCanvas2d()) {
        const ctx = wx.createCanvasContext('van-circle', this);
        return Promise.resolve(ctx);
      }
      const dpr = getSystemInfoSync().pixelRatio;
      return new Promise((resolve) => {
        wx.createSelectorQuery()
          .in(this)
          .select('#van-circle')
          .node()
          .exec((res) => {
            const canvas = res[0].node;
            const ctx = canvas.getContext(type);
            if (!this.inited) {
              this.inited = true;
              canvas.width = size * dpr;
              canvas.height = size * dpr;
              ctx.scale(dpr, dpr);
            }
            resolve(adaptor(ctx));
          });
      });
    },
    setHoverColor() {
      const { color, size } = this.data;
      if (isObj(color)) {
        return this.getContext().then((context) => {
          const LinearColor = context.createLinearGradient(size, 0, 0, 0);
          Object.keys(color)
            .sort((a, b) => parseFloat(a) - parseFloat(b))
            .map((key) =>
              LinearColor.addColorStop(parseFloat(key) / 100, color[key])
            );
          this.hoverColor = LinearColor;
        });
      }
      this.hoverColor = color;
      return Promise.resolve();
    },
    presetCanvas(context, strokeStyle, beginAngle, endAngle, fill) {
      const { strokeWidth, lineCap, clockwise, size } = this.data;
      const position = size / 2;
      const radius = position - strokeWidth / 2;
      context.setStrokeStyle(strokeStyle);
      context.setLineWidth(strokeWidth);
      context.setLineCap(lineCap);
      context.beginPath();
      context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
      context.stroke();
      if (fill) {
        context.setFillStyle(fill);
        context.fill();
      }
    },
    renderLayerCircle(context) {
      const { layerColor, fill } = this.data;
      this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
    },
    renderHoverCircle(context, formatValue) {
      const { clockwise } = this.data;
      // 结束角度
      const progress = PERIMETER * (formatValue / 100);
      const endAngle = clockwise
        ? BEGIN_ANGLE + progress
        : 3 * Math.PI - (BEGIN_ANGLE + progress);
      this.presetCanvas(context, this.hoverColor, BEGIN_ANGLE, endAngle);
    },
    drawCircle(currentValue) {
      const { size } = this.data;
      this.getContext().then((context) => {
        context.clearRect(0, 0, size, size);
        this.renderLayerCircle(context);
        const formatValue = format(currentValue);
        if (formatValue !== 0) {
          this.renderHoverCircle(context, formatValue);
        }
        context.draw();
      });
    },
    reRender() {
      // tofector 动画暂时没有想到好的解决方案
      const { value, speed } = this.data;
      if (speed <= 0 || speed > 1000) {
        this.drawCircle(value);
        return;
      }
      this.clearInterval();
      this.currentValue = this.currentValue || 0;
      this.interval = setInterval(() => {
        if (this.currentValue !== value) {
          if (Math.abs(this.currentValue - value) < STEP) {
            this.currentValue = value;
          } else {
            if (this.currentValue < value) {
              this.currentValue += STEP;
            } else {
              this.currentValue -= STEP;
            }
          }
          this.drawCircle(this.currentValue);
        } else {
          this.clearInterval();
        }
      }, 1000 / speed);
    },
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
  },
  mounted() {
    this.currentValue = this.data.value;
    this.setHoverColor().then(() => {
      this.drawCircle(this.currentValue);
    });
  },
  destroyed() {
    this.clearInterval();
  },
});
export default global['__wxComponents']['vant-weapp/circle/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-circle{position:relative;display:inline-block;text-align:center}.van-circle__text{position:absolute;top:50%;left:0;width:100%;-webkit-transform:translateY(-50%);transform:translateY(-50%);color:#323233;color:var(--circle-text-color,#323233)}
</style>