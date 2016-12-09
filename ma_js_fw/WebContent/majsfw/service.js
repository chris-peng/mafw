/**
 * 
 */
Mafw.ns('service', {
	defaultConfig: {
		method: 'get',
		type: 'get',
		dataType: 'json'
	},
	_services: {
		getUsers: {
			url: 'http://www.baidu2.com',
			name: 'u'
		},
		getProds: {
			url: 'http://www.baidu.com',
			name: 'p'
		}
	},
	s: function(servName, aJaxConfig){
		if(!Mafw.service._services[servName]){
			throw '没有定义名为' + servName + '的service！';
		}
		$.ajax($.extend({}, Mafw.service.defaultConfig, Mafw.service._services[servName], aJaxConfig));
	},
	options: function(servName){
		if(!Mafw.service._services[servName]){
			throw '没有定义名为' + servName + '的service！';
		}
		return Mafw.service._services[servName];
	},
	init: function(){
		function getServiceFunc(servName){
			return function(aJaxConfig){
				var options = Mafw.service.options(servName);
				$.ajax($.extend({}, Mafw.service.defaultConfig, options, aJaxConfig));
			};
		}
		for(var servName in Mafw.service._services){
			Mafw.service[servName] = getServiceFunc(servName);
		}
	}
});
Mafw.service.init();

$("head").append('<link id="css-theme" rel="stylesheet" type="text/css" href="css/test.css">');
$("head #css-theme").remove();
