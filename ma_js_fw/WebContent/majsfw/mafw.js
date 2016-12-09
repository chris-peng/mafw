/**
 * 
 */
Mafw = {
	tplBase: '',
	controllerBase: '',
	_modules: [],
	module : function(name, md) {
		var spaces = name.split('.');
		var preSpace = Mafw._modules;
		for(var i = 0; i < spaces.length - 1; i++){
			if(!preSpace[spaces[i]]){
				preSpace[spaces[i]] = {};
			}else{
				throw '已存在名为' + name + '的module';
			}
			preSpace = preSpace[spaces[i]];
		}
		if(!preSpace[spaces[spaces.length - 1]]){
			preSpace[spaces[spaces.length - 1]] = md;
		}else{
			throw '已存在名为' + name + '的module';
		}
	},
	ns: function(namespace, object){
		var spaces = namespace.split('.');
		var preSpace = Mafw;
		for(var i = 0; i < spaces.length - 1; i++){
			if(!preSpace[spaces[i]]){
				preSpace[spaces[i]] = {};
			}else{
				throw '已存在名为' + namespace + '的命名空间';
			}
			preSpace = preSpace[spaces[i]];
		}
		if(!preSpace[spaces[spaces.length - 1]]){
			if(object){
				preSpace[spaces[spaces.length - 1]] = object;
			}
		}else{
			throw '已存在名为' + namespace + '的命名空间';
		}
	},
	C: function(tplStr){
		var compiled_tpl = juicer(tplStr);
		var o = $(tplStr);
		return {
			loadData: function(data){
				var tmp = $(compiled_tpl.render(data));
				o.replaceWith(tmp);
				o = tmp;
				return tmp;
			},
			jqo: function(){
				return o;
			}
		};
	},
	_cache: {
		tpls: [],
		controls: []
	},
	setTplBase: function(path){
		Mafw.tplBase = path;
	},
	setControllerBase: function(path){
		Mafw.controllerBase = path;
	},
	loadComponent: function(tplPath, controller, callback, initData){
		if(Mafw._cache.tpls[tplPath]){
			Mafw._loadCachedTplComp(Mafw._cache.tpls[tplPath], controller, callback, initData);
		}else{
			$.ajax({
				url: Mafw.tplBase + tplPath,
				method: 'get',
				type: 'get',
				success: function(r){
					Mafw._cache.tpls[tplPath] = r;
					Mafw._loadCachedTplComp(r, controller, callback, initData);
				}
			});
		}
	},
	_loadCachedTplComp: function(r, controller, callback, initData){
		var c = new Mafw.C(r);
		if(typeof(controller) == 'string'){
			var controllerMnameStart = controller.lastIndexOf('/');
			var controllerMnameEnd = controller.lastIndexOf('.');
			controllerMname = controller.substr(controllerMnameStart + 1, controllerMnameEnd - controllerMnameStart - 1);
			if(Mafw._cache.controls[controller]){
				Mafw._loadCachedController(c, controllerMname, callback, initData);
			}else{
				Mafw.loadJsFile(Mafw.controllerBase + controller, function(){
					Mafw._cache.controls[controller] = true;
					Mafw._loadCachedController(c, controllerMname, callback, initData);
				});
			}
		}else if(typeof(controller) == 'object'){
			$.extend(c, controller);
			Mafw._registerConverters(controller.converters);
			if(typeof(initData) == 'object'){
				c.loadData(initData);
			}
			if(typeof(controller.init) == 'function'){
				controller.init(c);
			}
			if(typeof(callback) == 'function'){
				callback(c);
			}
		}
	},
	_loadCachedController: function(c, controllerMname, callback, initData){
		var tplf = Mafw._modules[controllerMname];
		if(typeof(tplf) == 'object'){
			$.extend(c, tplf);
			Mafw._registerConverters(tplf.converters);
		}
		if(typeof(initData) == 'object'){
			c.loadData(initData);
		}
		if(typeof(tplf) == 'object' && typeof(tplf.init) == 'function'){
			tplf.init(c);
		}
		if(typeof(callback) == 'function'){
			callback(c);
		}
	},
	_registerConverters: function(converters){
		if(typeof(converters) != 'object'){
			return;
		}
		for(var name in converters){
			if(!juicer.register(name, converters[name])){
				throw 'converter "' + name + '"已被使用，请使用其他名字';
			}
		}
	},
	loadJsFile : function(url, done) {
		var script, head = document.head || $("head")[0]
				|| document.documentElement;
		script = document.createElement("script");

		script.async = true;

		script.src = url;

		// Attach handlers for all browsers
		script.onload = script.onreadystatechange = function(_, isAbort) {

			if (isAbort || !script.readyState
					|| /loaded|complete/.test(script.readyState)) {

				// Handle memory leak in IE
				script.onload = script.onreadystatechange = null;

				// Remove the script
				if (script.parentNode) {
					script.parentNode.removeChild(script);
				}

				// Dereference the script
				script = null;

				// Callback if not abort
				if (!isAbort) {
					done();
				}
			}
		};

		// Circumvent IE6 bugs with base elements (#2709 and #4378) by
		// prepending
		// Use native DOM manipulation to avoid our domManip AJAX trickery
		head.insertBefore(script, head.firstChild);
	}
};

//数据绑定插件
(function($) {$.extend($.fn,
	{
		"bindData" : function(data) {
			if(typeof(data) == "undefined"){
				//获取绑定数据
				if(this.length > 1){
					var retDatas = [];
					this.each(function(i, n){
						retDatas.push($._mafw_binded_datas_getone(n));
					});
					return retDatas;
				}else{
					return $._mafw_binded_datas_getone(this);
				}
			}else{
				//绑定数据至指定标签
				if(this.length > 0){
					this.each(function(i, n){
						var key = $._mafw_binded_datas_key + "_" + ($._mafw_binded_datas_index++);
						$(n).attr($._mafw_binded_datas_key, key);
						$._mafw_binded_datas[key] = data;
					});
				}
			}
		},
		unbindData: function(){
			this.each(function(i, n){
				var key = $(n).attr($._mafw_binded_datas_key);
				if(!key){
					return true;
				}
				delete $._mafw_binded_datas[key];
			});
		}
	});
})(typeof (jQuery) != "undefined" ? jQuery : Zepto);
(function($) {$.extend($,
	{
		"_mafw_binded_datas" : [],
		"_mafw_binded_datas_key" : "_mafw_binded_datas_key",
		"_mafw_binded_datas_index" : 0,
		"_mafw_binded_datas_getone": function(el){
			var key = $(el).attr($._mafw_binded_datas_key);
			if(!key){
				return null;
			}
			return $._mafw_binded_datas[key];
		}
	});
})(typeof (jQuery) != "undefined" ? jQuery : Zepto);
//form数据转化为对象
(function($) {$.extend($.fn,
	{
		"toObject" : function() {
			return this._oneFormToObject();
		},
		"toArray" : function() {
			if(this.length > 0){
				var arr = [];
				this.each(function(i, n){
					var obj = $(n)._oneFormToObject();
					if(obj){
						arr.push(obj);
					}
				});
				return arr;
			}
		},
		"_oneFormToObject": function(){
			if(this[0].nodeName != 'FORM'){
				return null;
			}
			var obj = {};
			$.each(this.serializeArray(), function(i, n){
				if(typeof(obj[n.name]) == "undefined"){
					obj[n.name] = n.value;
				}else if(obj[n.name] instanceof Array){
					obj[n.name].push(n.value);
				}else{
					var tmp = obj[n.name];
					obj[n.name] = [tmp, n.value];
				}
			});
			return obj;
		}
	});
})(typeof (jQuery) != "undefined" ? jQuery : Zepto);