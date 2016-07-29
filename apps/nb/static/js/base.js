define(['jquery','jfa'], function($,Jfa){
	var Base = (function(){
		var _obj = {};
		return {
			user : {
				get : function(suc){
					if(_obj.conf.user){
						suc && suc(_obj.conf.user);
					}else{
						$.ajax({
							url : '/user/get',
							success : function(back){
								 _obj.conf.user = back;
								suc && suc(back);
							}
						})
					}
				},
				login : function(data,suc){
					$.ajax({
						url : '/user/login',
						data : data,
						success : function(back){
							suc && suc(back);
						}
					})
				},
				logout : function(suc){
					$.ajax({
						url : '/user/logout',
						success : function(back){
							suc && suc(back);
						}
					})
				},
			},
			init : function(conf){
				_obj = this;
				_obj.conf = conf || {};
				_obj.req = Jfa.tools.getRequest();
			}
		}
	})();
	return Base;
})