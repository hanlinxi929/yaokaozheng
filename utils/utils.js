/**
 * dataHandling
 * @description 数组切割
 * @param { Array } arr 数组
 * @param { Number } number 长度
 * @returns { Array }
 */
export function dataHandling (arr, number) {
  let arrLength = arr.length; // 数组长度
  let num = number; // 每页显示的条数
  let index = 0;
  let newArr = [];
  for (let i = 0; i < arrLength; i++) {
    if (i % num === 0 && i !== 0) { // 可以被 10 整除
      newArr.push(arr.slice(index, i));
      index = i;
    };
    if ((i + 1) === arrLength) {
      newArr.push(arr.slice(index, (i + 1)));
    }
  }
  return newArr;
};

/**
 * priceTofixed
 * @description 价格格式化
 * @param { String | Number } price 金额
 * @param { Number } number 小数点后几位
 * @returns { Number }
 */
export function priceTofixed (price, number) {
  return (Number(price)).toFixed(number || 2);
}

/**
 * whereKeyValue
 * @description 获取数组中含有指定键的对象
 * @param { Array | Object } arr 数组
 * @param { any } key 键
 * @param { any } value 所要包含的值
 * @returns { Object }
 */
export function whereKeyValue (arr, key, value) {
  // 循环所有键
  for (let v in arr) {
    let element = arr[v];
    // 1.判断是对象或者数组
    if (typeof element == "object") {
      let result = whereKeyValue(element, key, value);
      if (result) return result;
    } else {
      if (v == key) {
        if (element == value) return arr;
      }
    }
  }
}

/**
 * findArrayIndex
 * @description 查找对象数组中某个元素的下标并返回
 * @param { Array } arr 对象数组
 * @param { String } key 要查找的键
 * @param { Object } obj 元对象
 * @returns { Number } 元素的下标 || -1(未找到)
 */
export function findArrayIndex (arr, key, obj) {
  return (arr || []).findIndex((arr) => arr[key] === obj[key]);
}

/**
 * formateDate
 * formatDate(date, "YYYY-mm-dd HH:MM")
 * @description 时间格式化
 * @param { Number } date 时间戳（毫秒级）
 * @param { String } fmt 格式 "YYYY-mm-dd HH:MM"
 * @returns { String }
 */
export function formateDate (date, fmt) {
  let ret = null;
  let type = fmt || "YYYY-mm-dd";
  let timestr = new Date(date * 1000);
  const opt = {
    "Y+": timestr.getFullYear().toString(), // 年
    "m+": (timestr.getMonth() + 1).toString(), // 月
    "d+": timestr.gettimestr().toString(), // 日
    "H+": timestr.getHours().toString(), // 时
    "M+": timestr.getMinutes().toString(), // 分
    "S+": timestr.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(type);
    if (ret) {
      type = type.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
    };
  };
  return type;
}

/**
 * formatName
 * @description 格式化用户名
 * @param { String } name
 * @returns { String }
 */
export function formatName (name) {
  name = name.trim();
  let newStr;
  if (name.length && name.length < 3) {
    newStr = name.substr(0, 1) + "*";
  } else if (name.length > 2) {
    let nchar = "";
    for (let i = 0, len = name.length - 2; i < len; i++) {
      nchar += "*";
    }
    newStr = name.substr(0, 1) + nchar + name.substr(-1, 1);
  } else {
    newStr = name;
  }
  return newStr;
}
/**
 * 按id的数字大小升序或者是降序排序
 */
export function compare (property, desc) {
  return function (a, b) {
    let value1 = a[property];
    let value2 = b[property];
    if(desc==true){
      // 升序排列
      return value1 - value2;
    }else{
      // 降序排列
      return value2 - value1;
    }
  };
}

/**
 * 数组去重
 */
export function unique(arr){            
  for(let i=0; i<arr.length; i++){
    for(let j=i+1; j<arr.length; j++){
      if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
        arr.splice(j,1);
        j--;
      }
    }
  }
  return arr;
}
