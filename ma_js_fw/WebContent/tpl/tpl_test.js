Mafw.module(
	/*module名必须与js文件名保持一致*/
	'tpl_test', {
		init: function(c){
			setTimeout(function(){
				c.loadData({name: 'phf', contact: '185'});
				c.jqo().find('[ma-id=contact]').click(function(){alert(1);});
			}, 2000);
		},
		converters: {
			hello: function(name){
				return 'hello,' + name;
			}
		},
		hello: function(name){
			return 'hello,' + name;
		}
	}
);