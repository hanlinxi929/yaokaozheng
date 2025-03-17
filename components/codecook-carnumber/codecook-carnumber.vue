<template>
	<view class="car-number">
		<view class="wrap" @tap="focusHandler">
			<view :class="['cell', { active: (index == current) && focus }]"
				v-for="(val, index) in fill" :key="index" @tap.stop="focusHandler(index)">
				<view class="val">{{val}}</view>
				<view class="border"></view>
			</view>
		</view>

		<key-board v-if="focus" :type="kType" @on-delete="keyDeleteHandler" @on-input="keyInputHandler"
			@on-hide="keyHideHandler"></key-board>
	</view>
</template>

<script>
	import KeyBoard from '../codecook-keyboard/codecook-keyboard.vue';

	export default {
		name: 'CarNumber',
		components: {
			KeyBoard
		},
		props: {
			value: {
				type: String,
				default: '',
			},
			length: {
				type: Number,
				default: 8
			}
		},
		data() {
			return {
				focus: false,
				current: 0,
				fill: new Array(this.length).fill(''),
			}
		},
		computed: {
			kType() {
				return this.current === 0 ? 'provinces' : 'areas';
			},
		},
		watch: {
			fill(val) {
				this.$emit('input', val.join(''));
				this.$emit('change', val);
			},
		},
		methods: {
			focusHandler(index = 0) {
				
				this.focus = true;
				this.current = index;
			},
			keyDeleteHandler() {
				this.$set(this.fill, this.current, '');

				if (this.current <= 0) {
					return;
				}

				this.current -= 1;
			},
			keyInputHandler(key) {
				this.$set(this.fill, this.current, key);

				if (this.current >= this.length - 1) {
					return;
				}

				this.current += 1;
			},
			keyHideHandler() {
				this.focus = false;
			},
		},
		beforeMount() {
			if (this.value) {
				this.value.split('').forEach((key, index) => {
					if (index >= this.length) {
						return;
					}
					this.$set(this.fill, index, key);
				});

				this.current = Math.min(this.value.length, this.length - 1);
			}
		},
		mounted() {
			// this.focus = true;
		},
	}
</script>

<style scoped lang="less">
	.car-number {
		position: relative;
		width: 100%;

		.wrap {
			display: flex;
			width: 100%;
			height: 100%;
			justify-content: space-between;
		}

		.cell {
			width: 72rpx;
			height: 80rpx;
			box-sizing: border-box;
			border: 1rpx solid #c9c9c9;
			border-radius: 8rpx;
			text-align: center;
			line-height: 78rpx;
			font-size: 30rpx;
			color: #000;
			font-weight: 400;
			.val {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			&.active {
				border-color: #358BD8;
			}
			&:last-child {
				border-color: #358BD8;
				background: #358BD8;
				color: #fff;
			}
		}
	}
</style>
