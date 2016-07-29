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
					if(Base.req.back_url) location.href = Base.req.back_url;
					else location.href = '/';
				},
				init : function(){
					_obj = this;
					_obj.conf = {
						
					};
					Jfa.init({
						callback : {
							login : function(o){
								var uname = $('input.log-uname').val().trim(),
									passwd = $('input.log-passwd').val().trim();
								Base.user.login({uname:uname,passwd:passwd},function(back){
									if(back.state=='ok'){
										$('.error').text('登录成功');
										_obj.getData();
									}else{
										$('.error').text('账号或密码错误');
									}
								})
							},
						}
					});
					Base.init();
				}
			}
		})();
		Start.init();
	})
}