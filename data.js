'use strict'
var myApp = myApp || {};

//Write data to/from localStorage
myApp.store = { //only accepts strings. Convert objects to string before calling.
  appNamespace: 'myApp',
  get: function(optName) {
    if (!optName) { return; }
    optName = this.appNamespace + '.' + optName;
    var result = '';
    if (this[optName]) {
      result = this[optName];
    } else if (!!window.localStorage && window.localStorage[optName]) {
      result = window.localStorage[optName];
    }
    try {
      return JSON.parse(result);
    } catch (e) {
      return result;
    }
  },
  set: function(optName, val) {
    if (!optName) { return; }
    optName = this.appNamespace + '.' + optName;
    if (val) {
      this[optName] = val;
      if (!!window.localStorage) {
        window.localStorage[optName] = val;
      }
      return val;
    }
    if (typeof val === 'undefined' || val === null) { //if empty null or not supplied
      delete this[optName];
      if (!!window.localStorage) {
        window.localStorage.removeItem(optName);
      }
    }
  }
};

myApp.properCase = function(str) {
  var wordArray = str.split(' ');
  for (var i = 0; i < wordArray.length; i++) {
    var first = wordArray[i].slice(0,1).toUpperCase();
    var rest = wordArray[i].slice(1);
    wordArray[i] = first + rest;
  }
  return wordArray.join(' ');
};

myApp.round = function(num, dps) {
  var factor = Math.pow(10, dps);
  return Math.round(num * factor) / factor;
};

myApp.contain = function(low, num, high) {
  if (num != num) { return low; } // NaN != NaN
  num = Math.max(low, num);
  num = Math.min(num, high);
  return num;
};

//Converts every possible number to a number in a variable, object or array
myApp.convertNums = function(obj) {
  var result = obj;
  function convertStr(string) {
    if (!isNaN(parseFloat(string)) && isFinite(string)) {
      return parseFloat(string);
    }
    if (string === "true") {
      return true;
    }
    if (string === "false") {
      return false;
    }
    return string;
  }
  function traverseArr(arr) {
    var arrResult = [];
    for (var i = 0; i < arr.length; i++) {
      arrResult.push(route(arr[i]));
    }
    return arrResult;
  }
  function traverseObj(obj1) {
    var obj1Result = {};
    for (var prop in obj1) {
      obj1Result[prop] = route(obj1[prop]);
    }
    return obj1Result;
  }
  function route(strOrObjOrArr) {
    if (!strOrObjOrArr) { //null, undefined otherwise count as objects
      return strOrObjOrArr;
    } else if (Array.isArray(strOrObjOrArr)) {
      return traverseArr(strOrObjOrArr);
    } else if (typeof strOrObjOrArr === 'object') {
      return traverseObj(strOrObjOrArr);
    } else {
      return convertStr(strOrObjOrArr);
    }
  }
  result = route(result);
  return result;
};

myApp.makeGUID = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0;
      var v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
};