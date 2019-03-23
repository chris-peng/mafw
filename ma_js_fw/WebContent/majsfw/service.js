/**
 * 
 */
Mafw.ns('service', {
	defaultConfig: {
		type: 'get',
		dataType: 'json'
	},
	_services: {
		
	},
	_options: function(serviceScope, servName){
		if(!serviceScope[servName]){
			throw '没有定义名为' + serviceScope + '.' + servName + '的service！';
		}
		return $.extend({}, Mafw.service.defaultConfig, serviceScope._services[servName]);
	},
	init: function(scope){
		var serviceScope = scope || Mafw.service;
		function getServiceFunc(serviceScope, servName){
			return function(aJaxConfig){
				var options = Mafw.service._options(serviceScope, servName);
				var mergedOptions = $.extend({}, options, aJaxConfig);
				if(mergedOptions.url && mergedOptions.pathParams){
					for(var pName in mergedOptions.pathParams){
						mergedOptions.url = mergedOptions.url.replace('{' + pName + '}', mergedOptions.pathParams[pName]);
					}
				}
				if(mergedOptions.url && mergedOptions.appendParams){
					if(mergedOptions.url.indexOf('?') > 0){
						mergedOptions.url += "&";
					}else{
						mergedOptions.url += "?";
					}
					mergedOptions.url += Mafw.service.object2Params(mergedOptions.appendParams);
				}
				if(mergedOptions.loadingMask){
					Mafw.util.loading.show();
				}
				$.ajax(mergedOptions);
			};
		}
		for(var servName in serviceScope._services){
			serviceScope[servName] = getServiceFunc(serviceScope, servName);
			serviceScope[servName].options = Mafw.service._options(serviceScope, servName);
		}
	},
	object2Params: function(obj){
		var params = '';
		for(var key in obj){
			params += key + '=' + obj[key] + '&';
		}
		return encodeURI(params.substring(0, params.length - 1));
	},
	register: function(scope, serviceObj){
		serviceObj = $.extend({}, {_services: serviceObj});
		Mafw.ns('service.' + scope, serviceObj);
		Mafw.service.init(serviceObj);
	}
});
Mafw.service.init();
