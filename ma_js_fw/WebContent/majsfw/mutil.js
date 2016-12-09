Mafw.ns('util', {
	// ****************************************************************
	// * 名 称：dataLength
	// * 功 能：计算数据的长度
	// * 入口参数：fData：需要计算的数据
	// * 出口参数：返回fData的长度(Unicode长度为2，非Unicode长度为1)
	// *****************************************************************
	dataLength : function(fData) {
		var intLength = 0
		for (var i = 0; i < fData.length; i++) {
			if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
				intLength = intLength + 2
			else
				intLength = intLength + 1
		}
		return intLength
	},

	// ****************************************************************
	// * 名 称：isURL
	// * 功 能：判断是否为合法url
	// * 入口参数：fData：要检查的数据
	// * 出口参数：True：合法
	// * False:不合法
	// *****************************************************************
	isURL : function(fData) {
		regExp = /(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i;
		if (fData.match(regExp))
			return true;
		else
			return false;
	},

	// ****************************************************************
	// * 名 称：isEmpty
	// * 功 能：判断是否为空
	// * 入口参数：fData：要检查的数据
	// * 出口参数：True：空
	// * False：非空
	// *****************************************************************
	isEmpty : function(fData) {
		return ((fData == null) || (fData.length == 0))
	},

	// ****************************************************************
	// * 名 称：isDigit
	// * 功 能：判断是否为数字
	// * 入口参数：fData：要检查的数据
	// * 出口参数：True：是0到9的数字
	// * False：不是0到9的数字
	// *****************************************************************
	isDigit : function(fData) {
		return ((fData >= "0") && (fData <= "9"))
	},

	// ****************************************************************
	// * 名 称：isInteger
	// * 功 能：判断是否为正整数
	// * 入口参数：fData：要检查的数据
	// * 出口参数：True：是整数
	// * False：不是整数 ，或者数据是空的
	// *****************************************************************
	isInteger : function(fData) {
		// 如果为空，返回true
		if (IsEmpty(fData))
			return false
		if ((isNaN(fData)) || (fData.indexOf(".") != -1)
				|| (fData.indexOf("-") != -1))
			return false

		return true
	},

	// ****************************************************************
	// * 名 称：isEmail
	// * 功 能：判断是否为正确的Email地址
	// * 入口参数：fData：要检查的数据
	// * 出口参数：True：正确的Email地址
	// * False：错误的Email地址 ，或者空
	// *****************************************************************
	isEmail : function(fData) {
		if (IsEmpty(fData))
			return false
		if (fData.indexOf("@") == -1)
			return false
		var NameList = fData.split("@");
		if (NameList.length != 2)
			return false
		if (NameList[0].length < 1)
			return false
		if (NameList[1].indexOf(".") <= 0)
			return false
		if (fData.indexOf("@") > fData.indexOf("."))
			return false
		if (fData.indexOf(".") == fData.length - 1)
			return false

		return true
	},

	// ****************************************************************
	// * 名 称：isPhone
	// * 功 能：判断是否为正确的电话号码（可以含"()"、"（）"、"+"、"-"和空格）
	// * 入口参数：fData：要检查的数据
	// * 出口参数：True：正确的电话号码
	// * False：错误的电话号码 ，或者空
	// * 错误信息：
	// *****************************************************************
	isPhone : function(fData) {
		var str;
		var fDatastr = "";
		if (IsEmpty(fData))
			return false
		for (var i = 0; i < fData.length; i++) {
			str = fData.substring(i, i + 1);
			if (str != "(" && str != ")" && str != "（" && str != "）"
					&& str != "+" && str != "-" && str != " ")
				fDatastr = fDatastr + str;
		}
		// alert(fDatastr);
		if (isNaN(fDatastr))
			return false
		return true
	},

	// ****************************************************************
	// * 名 称：isPlusNumeric
	// * 功 能：判断是否为正确的正数（可以含小数部分）
	// * 入口参数：fData：要检查的数据
	// * 出口参数：True：正确的正数
	// * False：错误的正数 ，或者空
	// * 错误信息：
	// *****************************************************************
	isPlusNumeric : function(fData) {
		if (IsEmpty(fData))
			return false
		if ((isNaN(fData)) || (fData.indexOf("-") != -1))
			return false
		return true
	},

	// ****************************************************************
	// * 名 称：isNumeric
	// * 功 能：判断是否为正确的数字（可以为负数，小数）
	// * 入口参数：fData：要检查的数据
	// * 出口参数：True：正确的数字
	// * False：错误的数字 ，或者空
	// * 错误信息：
	// *****************************************************************
	isNumeric : function(fData) {
		if (IsEmpty(fData))
			return false
		if (isNaN(fData))
			return false

		return true
	},

	// ****************************************************************
	// * 名 称：isIntegerInRange
	// * 功 能：判断一个数字是否在指定的范围内
	// * 入口参数：fInput：要检查的数据
	// * fLower：检查的范围下限，如果没有下限，请用null
	// * fHigh：检查的上限，如果没有上限，请用null
	// * 出口参数：True：在指定的范围内
	// * False：超出指定范围
	// *****************************************************************
	isIntegerInRange : function(fInput, fLower, fHigh) {
		if (fLower == null)
			return (fInput <= fHigh)
		else if (fHigh == null)
			return (fInput >= fLower)
		else
			return ((fInput >= fLower) && (fInput <= fHigh))
	},

	// ****************************************************************
	// * 名 称：isInChinese
	// * 功 能：判断是否包含汉字
	// * 入口参数：fInput：要检查的数据
	// * 出口参数：True：有汉字
	// * False：无汉字，或者空
	// *****************************************************************
	isInChinese : function(fInput) {
		if (IsEmpty(fInput))
			return false
		return (fInput.length != fInput.replace(/[^\x00-\xff]/g, "**").length);
	},
	//打开百度地图，并显示指定位置
	openLocation: function(lat, lng, title, desc){
		title = title || "目标位置";
		window.location.href = "http://api.map.baidu.com/marker?location=" + lat + "," + lng + 
			"&title=" + title + "&output=html&src=ezhongyi&content=" + encodeURI(desc||title);
	},
	//获取通过url方式传送过来的参数，如http://xx.com?p1=aa&p2=bb，调用该方法提取得到的参数对象为{p1:'aa',p2:'bb'}
	getParams: function(){
		var paramMaps = [];
		var href = document.location.href;
		var paramSplitTmp = href.split(/[?#]/);
		if(paramSplitTmp.length < 2){
			return paramMaps;
		}
		var paramStrs = paramSplitTmp[1].split('&');
		for(var i = 0; i < paramStrs.length; i++){
			paramExp = paramStrs[i].split('=');
			if(paramExp.length > 1){
				paramMaps[paramExp[0]] = paramExp[1];
			}else{
				paramMaps[paramExp[0]] = true;
			}
		}
		return paramMaps;
	},
	
	ANDROID : 'Android',
	IOS : 'iPhone OS',
	WINPHONE : 'Windows Phone',
	WINDOWS : 'Windows',
	MAC : 'Mac OS',
	IPAD : 'iPad OS',
	UNKNOWN: "unknown",
	//从userAgent中提取操作系统信息
	getOs: function(userAgent){
		userAgent = userAgent || window.navigator.userAgent;
		var osInfo = {os: TcmUtil.UNKNOWN, version: TcmUtil.UNKNOWN};
		if(userAgent){
			if(/Android (\d+\.\d+)/.test(userAgent)){
				//android
				osInfo = {
						os: TcmUtil.ANDROID,
						version: RegExp.$1
				}
			}else if(/iPhone OS (\d+)/.test(userAgent)){
				//ios
				osInfo = {
						os: TcmUtil.IOS,
						version: RegExp.$1
				}
			}else if(/Windows Phone (\d+\.\d+)/.test(userAgent)){
				//win phone
				osInfo = {
						os: TcmUtil.WINPHONE,
						version: RegExp.$1
				}
			}else if(/Windows NT (\d+\.\d+)/.test(userAgent)){
				//windows
				osInfo = {
						os: TcmUtil.WINDOWS,
						version: RegExp.$1
				}
			}else if(/Macintosh; .* Mac OS \w* (\d+)/.test(userAgent)){
				//mac os
				osInfo = {
						os: TcmUtil.MAC,
						version: RegExp.$1
				}
			}else if(/iPad; CPU OS (\d+)/.test(userAgent)){
				//ipad
				osInfo = {
						os: TcmUtil.IPAD,
						version: RegExp.$1
				}
			}
			return osInfo;
		}
	},
	//根据userAgent判断是否在微信中
	isWeixin: function(userAgent){
		userAgent = userAgent || window.navigator.userAgent;
		return userAgent.indexOf('MicroMessenger') >= 0;
	},
	//提取css表达式中的数字，如css2Number('10px')返回10
	css2Number: function(cssStr){
		var reg = /\d+/;
		var num = cssStr.match(reg)[0];
		return new Number(num);
	}
});

/*
 * 函数：格式化日期 参数：formatStr-格式化字符串 d：将日显示为不带前导零的数字，如1 dd：将日显示为带前导零的数字，如01
 * ddd：将日显示为缩写形式，如Sun dddd：将日显示为全名，如Sunday M：将月份显示为不带前导零的数字，如一月显示为1
 * MM：将月份显示为带前导零的数字，如01 MMM：将月份显示为缩写形式，如Jan MMMM：将月份显示为完整月份名，如January
 * yy：以两位数字格式显示年份 yyyy：以四位数字格式显示年份 h：使用12小时制将小时显示为不带前导零的数字，注意||的用法
 * hh：使用12小时制将小时显示为带前导零的数字 H：使用24小时制将小时显示为不带前导零的数字 HH：使用24小时制将小时显示为带前导零的数字
 * m：将分钟显示为不带前导零的数字 mm：将分钟显示为带前导零的数字 s：将秒显示为不带前导零的数字 ss：将秒显示为带前导零的数字
 * l：将毫秒显示为不带前导零的数字 ll：将毫秒显示为带前导零的数字 tt：显示am/pm TT：显示AM/PM 返回：格式化后的日期
 */
Date.prototype.format = function(formatStr) {
	var date = this;
	/*
	 * 函数：填充0字符 参数：value-需要填充的字符串, length-总长度 返回：填充后的字符串
	 */
	var zeroize = function(value, length) {
		if (!length) {
			length = 2;
		}
		value = new String(value);
		for (var i = 0, zeros = ''; i < (length - value.length); i++) {
			zeros += '0';
		}
		return zeros + value;
	};
	return formatStr
			.replace(
					/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g,
					function($0) {
						switch ($0) {
						case 'd':
							return date.getDate();
						case 'dd':
							return zeroize(date.getDate());
						case 'ddd':
							return [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri',
									'Sat' ][date.getDay()];
						case 'dddd':
							return [ 'Sunday', 'Monday', 'Tuesday',
									'Wednesday', 'Thursday', 'Friday',
									'Saturday' ][date.getDay()];
						case 'M':
							return date.getMonth() + 1;
						case 'MM':
							return zeroize(date.getMonth() + 1);
						case 'MMM':
							return [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
									'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][date
									.getMonth()];
						case 'MMMM':
							return [ 'January', 'February', 'March', 'April',
									'May', 'June', 'July', 'August',
									'September', 'October', 'November',
									'December' ][date.getMonth()];
						case 'yy':
							return new String(date.getFullYear()).substr(2);
						case 'yyyy':
							return date.getFullYear();
						case 'h':
							return date.getHours() % 12 || 12;
						case 'hh':
							return zeroize(date.getHours() % 12 || 12);
						case 'H':
							return date.getHours();
						case 'HH':
							return zeroize(date.getHours());
						case 'm':
							return date.getMinutes();
						case 'mm':
							return zeroize(date.getMinutes());
						case 's':
							return date.getSeconds();
						case 'ss':
							return zeroize(date.getSeconds());
						case 'l':
							return date.getMilliseconds();
						case 'll':
							return zeroize(date.getMilliseconds());
						case 'tt':
							return date.getHours() < 12 ? 'am' : 'pm';
						case 'TT':
							return date.getHours() < 12 ? 'AM' : 'PM';
						}
					});
}