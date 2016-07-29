onload = function(){
	require.config({
		paths: {
			jquery: '/static/js/jquery.min',
			base: '/static/js/base.min',
			dom: '/static/js/dom.min',
			jfa: '/static/js/jfa.min',
		}
	})

	require(['jquery','base','jfa'], function($,Base,Jfa) {
		var Start = (function(){
			var _obj = {};
			return {
				getData : function(){
					
				},
				init : function(){
					_obj = this;
					_obj.conf = {
						
					};
					Jfa.init({
						callback : {
							
						}
					});
					Base.init({
						login : function(){
							_obj.getLogin();
						}
					});
				}
			}
		})();
		Start.init();
	})
}