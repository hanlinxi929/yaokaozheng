(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/gaokaoguihua"],{"1a10":function(e,t,i){"use strict";(function(e){var a=i("47a9");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i("7eb4")),s=a(i("ee10")),r=i("dcbd"),o=i("c52b"),c={data:function(){return{fwindex:0,tuijianmas:!1,tuijianma:"",resultString:"",cityName:"",cityid:"",index:-1,gkindex:-1,picker:["喵喵喵","汪汪汪","哼唧哼唧"],region:["广东省"],radio:"C",imgList:"",modalName:null,imgUrl:"",baseUrl:"",name:"",gkzf:"",wc:"",dkcj:"",shengao:"",lastid:"",lasttext:"",rules:{gkzf:[{rule:/^.{2,18}$/,message:"请输入高考总分"}],wc:[{rule:/^.{1,18}$/,message:"请输入位次"}],name:[{rule:/^.{2,18}$/,message:"请输入姓名"}],shengao:[{rule:/^.{2,18}$/,message:"请输入身高"}],dkcj:[{rule:/^.{2,18}$/,message:"请输入单科成绩"}]},noClick:!0,indexid:"",indexs:"",zfitem:"",focusclass:{username:!1},cityList:[],CustomBar:this.CustomBar,onexl:[],sid:"",jg:0,checkbox:[{value:0,name:"物理",checked:!1,hot:!1},{value:1,name:"化学",checked:!1,hot:!1},{value:2,name:"生物",checked:!1,hot:!0},{value:3,name:"历史",checked:!1,hot:!0},{value:4,name:"政治",checked:!1,hot:!1},{value:5,name:"地理",checked:!1,hot:!1}]}},onLoad:function(e){this.imgUrl=r.imgUrl,this.baseUrl=r.baseUrl,this.sid=e.sid,console.log(e.jg),this.getCityLists(),this.getSxlistXuezhi(e.sid)},onShareAppMessage:function(t){var i=e.getStorageSync("userid"),a="/pages/index/index?userid="+i;return{title:"耀考证",path:a,imageUrl:this.imgUrl+"loginlogo.png"}},onShareTimeline:function(t){var i=e.getStorageSync("userid"),a="/pages/index/index?userid="+i;return{title:"耀考证",path:a,imageUrl:this.imgUrl+"loginlogo.png"}},methods:{qxGetUpReferralCode:function(){this.tuijianma="",this.tuijianmas=!1,this.goGetUpReferralCode()},goGetUpReferralCode:function(){var e=this;return(0,s.default)(n.default.mark((function t(){var i,a,s,r;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e,t.prev=1,a={id:i.sid,referralCode:i.tuijianma?i.tuijianma:"0"},t.next=5,(0,o.getzgUpReferralCode)(a);case 5:s=t.sent,r=s.data,200==r.code?r.data&&(e.yhje=r.data.referralPrice,e.heji=r.data.actualPayment,e.tuijianma=r.data.referralCode,e.tuijianma?e.tuijianmas=!0:e.tuijianmas=!1,e.hideModal()):(e.tuijianmas=!1,e.$api.msg(r.msg)),t.next=12;break;case 10:t.prev=10,t.t0=t["catch"](1);case 12:case"end":return t.stop()}}),t,null,[[1,10]])})))()},getSxlistXuezhi:function(e){var t=this;return(0,s.default)(n.default.mark((function i(){var a,s,r;return n.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,a={id:e,type:0},i.next=4,(0,o.getXlType)(a);case 4:s=i.sent,r=s.data,200==r.code&&(r.data.length?(t.onexl.push({value:"",list:r.data}),t.lastid="",t.lasttext=""):t.jg=r.data),i.next=11;break;case 9:i.prev=9,i.t0=i["catch"](0);case 11:case"end":return i.stop()}}),i,null,[[0,9]])})))()},RadioChange:function(e){this.radio=e.detail.value},showModal:function(e){this.modalName="Modal"},hideModal:function(e){this.modalName=null},ChooseCheckbox:function(e){var t=this.checkbox,i=e.currentTarget.dataset.value,a=this.checkbox.filter((function(e){return e.checked}));if(a.length<3){for(var n=0,s=t.length;n<s;++n)if(t[n].value==i){t[n].checked=!t[n].checked;break}}else this.$api.msg("最多只可选择3个科目")},gkPickerChange:function(e){this.gkindex=e.detail.value,this.cityName=this.cityList[e.detail.value].nodeName,this.cityid=this.cityList[e.detail.value].nodeCode,console.log(this.cityName)},wcPickerChange:function(e){this.wcindex=e.detail.value},gopay:function(){var e=this.checkbox.filter((function(e){return e.checked})),t=e.map((function(e){return e.name})),i=t.join(",");e.length<3?this.$api.msg("请至少选择3个科目"):(this.resultString=i,console.log(i),this.submit())},gosubmit:function(){var e=this;return(0,s.default)(n.default.mark((function t(){var i,a,s;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,i={cityId:e.cityid,cityName:e.cityName,subject:e.resultString,fraction:e.gkzf,place:e.wc,name:e.name,sex:"C"==e.radio?"男":"女",height:e.shengao,careerPath:"",singleSubjectScore:e.dkcj,transcript:e.imgList,referralCode:e.tuijianma?e.tuijianma:""},t.next=4,(0,o.getVoluntaryTestadd)(i);case 4:a=t.sent,s=a.data,200==s.code?(e.zfitem=s.data,e.wxPay()):(console.log(s),e.$api.msg(s.msg)),t.next=11;break;case 9:t.prev=9,t.t0=t["catch"](0);case 11:case"end":return t.stop()}}),t,null,[[0,9]])})))()},wxPay:function(){var t=JSON.parse(decodeURIComponent(this.zfitem));console.log(t),e.requestPayment({appId:t.appId,provider:"wxpay",timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,signType:t.signType,paySign:t.paySign,success:function(t){setTimeout((function(){e.$emit("isshow",!0),e.navigateBack({delta:1})}),500)},fail:function(t){console.log(t),e.showToast({title:"支付失败",icon:"none"})}})},getCityLists:function(){var e=this;return(0,s.default)(n.default.mark((function t(){var i,a,s;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,i={},t.next=4,(0,o.getCityList)(i);case 4:a=t.sent,s=a.data,200==s.code?s.data&&(e.cityList=s.data):(console.log(s),e.$api.msg(s.msg)),t.next=11;break;case 9:t.prev=9,t.t0=t["catch"](0);case 11:case"end":return t.stop()}}),t,null,[[0,9]])})))()},ViewImage:function(t){e.previewImage({urls:this.imgList,current:t.currentTarget.dataset.url})},ChooseImage:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(i){var a=i.tempFilePaths[0];e.uploadFile({url:r.baseUrl+"/hs/api/upload",filePath:a,name:"file",formData:{token:e.getStorageSync("token")},success:function(i){var a=JSON.parse(i.data);200==a.code?t.imgList=a.fileName:e.showToast({title:a.msg,icon:"none"})},fail:function(e){console.log(e)}})}})},DelImg:function(t){var i=this;e.showModal({title:"召唤师",content:"确定要删除这段回忆吗？",cancelText:"再看看",confirmText:"再见",success:function(e){e.confirm&&(i.imgList="")}})},PickerChange:function(e){this.index=e.detail.value},PickerChangefw:function(e,t,i){i+1!==this.onexl.length&&this.onexl.splice(i+1),this.onexl[i].value=e.detail.value,this.indexs=t.list[t.value].deptName,this.indexid=t.list[t.value].id,this.lastid=t.list[t.value].id,this.lasttext=t.list[t.value].deptName,this.getSxlistXuezhi(this.indexid)},submit:function(){var t=this;if(t.noClick){if(t.noClick=!1,setTimeout((function(){t.noClick=!0}),2e3),!t.validate("gkzf"))return;if(!t.validate("wc"))return;if(!t.validate("name"))return;if(!t.validate("shengao"))return;if(!t.validate("dkcj"))return;if(!t.cityName)return void e.showToast({title:"请选择高考省份",icon:"none"});if(!t.lasttext)return void e.showToast({title:"请选择服务办类型",icon:"none"});if(!t.imgList)return void e.showToast({title:"请上传成绩单",icon:"none"});this.showModal(),console.log("已经提交")}else this.$api.msg("已提交请勿重复点击")},validate:function(t){var i=this,a=!0;return this.rules[t].forEach((function(n){if(!n.rule.test(i[t]))return e.showToast({title:n.message,icon:"none"}),a=!1,!1})),a},blur:function(e){this.focusclass[e]=!1}}};t.default=c}).call(this,i("df3c")["default"])},"26fc":function(e,t,i){},"361f":function(e,t,i){"use strict";var a=i("26fc"),n=i.n(a);n.a},"50a0":function(e,t,i){"use strict";i.r(t);var a=i("ab11"),n=i("cb11");for(var s in n)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(s);i("361f");var r=i("828b"),o=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=o.exports},6988:function(e,t,i){"use strict";(function(e,t){var a=i("47a9");i("1212");a(i("3240"));var n=a(i("50a0"));e.__webpack_require_UNI_MP_PLUGIN__=i,t(n.default)}).call(this,i("3223")["default"],i("df3c")["createPage"])},ab11:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){return e.$api.toPage("index/zxddqr")})},n=[]},cb11:function(e,t,i){"use strict";i.r(t);var a=i("1a10"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(s);t["default"]=n.a}},[["6988","common/runtime","common/vendor"]]]);