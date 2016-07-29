define(['jquery','dom'],function($,Dom){
	var Jfa = (function(){
		var _obj = {};
		return {
			html : function(o,t){
				o.html(t);
				_obj.mvvm(o);
			},
			state : {'0':'1','1':'0'},
			add : function(o,num){
				var num = parseInt(num || 1),
					v = parseInt(o.text()),
					v2 = parseInt(o.val().trim()),
					v3 = parseInt(o.attr('num'));
				if(v){
					v += num;
					o.text(v);
				}else if(v2){
					v2 += num;
					o.val(v2);
				}else if(v3){
					v3 += num;
					o.attr('num',v3);
				}
			},
			msg : {
				alertMsg : -1
			},
			func : function(w){
				Function.prototype.method = function(name, func) { //js函数扩展通用方法
				  this.prototype[name] = func;  
				  return this;  
				}
				Array.method('remove',function(b) { 
					var a = this.indexOf(b);
					if (a >= 0) {
						this.splice(a, 1);
						return true;
					}
					return false;
				})
				if (!Array.prototype.indexOf){
					Array.method('indexOf',function(elt){
						var len = this.length >>> 0;
						var from = Number(arguments[1]) || 0;
						from = (from < 0) ? Math.ceil(from) : Math.floor(from);
						if (from < 0) from += len;
						for (; from < len; from++){
							if (from in this &&
							  this[from] === elt)
							return from;
						}
						return -1;
					})
				}
				String.method('replaceAll',function(a,b){ //全部替换(扩展)
					return this.replace(new RegExp(a,'gm'),b); 
				})
				if(!String.prototype.trim){
					String.method('trim', function() {  
						return this.replace(/^\s+|\s+$/g, '') //去掉文本两头空格(扩展)
					})
					String.method('ltrim', function() {  
						return this.replace(/^\s+/g, '') //去掉文本左边空格(扩展)
					})
					String.method('rtrim', function() {  
						return this.replace(/\s+$/g, '')  //去掉文本右边空格(扩展)
					})
				}
				w.log = function(d){
					if(typeof console=='undefined') {
						alert(str(d));
					}
					else console.log(d);
				}
				w.str=function(k){return JSON && JSON.stringify(k)}
				w.json=function(k){return eval('('+k+')')}
				w.urlencode = encodeURIComponent;
			},
			load : function(){
				var o = arguments[0],
					url = arguments[1];
				$.ajax({
					url : url,
					success : function(back){
						o.html(back);
					}
				})
			},
			tree : {
				filter : function(r,tr){
					$.each(r,function(m,n){
						if(m==0) {
							if(!tr[n]) tr[n] = {};
						}
						else if(m==1) {
							if(!tr[r[0]][n]) tr[r[0]][n] = {};
						}
						else if(m==2) {
							if(!tr[r[0]][r[1]][n]) tr[r[0]][r[1]][n] = {};
						}
						else if(m==3) {
							if(!tr[r[0]][r[1]][r[2]][n]) tr[r[0]][r[1]][r[2]][n] = {};
						}
						else if(m==4) {
							if(!tr[r[0]][r[1]][r[2]][r[3]][n]) tr[r[0]][r[1]][r[2]][r[3]][n] = {};
						}
						else if(m==5) {
							if(!tr[r[0]][r[1]][r[2]][r[3]][r[4]][n]) tr[r[0]][r[1]][r[2]][r[3]][r[4]][n] = {};
						}
						else if(m==6) {
							if(!tr[r[0]][r[1]][r[2]][r[3]][r[4]][r[5]][n]) tr[r[0]][r[1]][r[2]][r[3]][r[4]][r[5]][n] = {};
						}
						else if(m==7) {
							if(!tr[r[0]][r[1]][r[2]][r[3]][r[4]][r[5]][r[6]][n]) tr[r[0]][r[1]][r[2]][r[3]][r[4]][r[5]][r[6]][n] = {};
						}
						else if(m==8) {
							if(!tr[r[0]][r[1]][r[2]][r[3]][r[4]][r[5]][r[6]][r[7]][n]) tr[r[0]][r[1]][r[2]][r[3]][r[4]][r[5]][r[6]][r[7]][n] = {};
						}
					})
				},
			},
			page : (function(){
				var _o = {},
					_i = {},
					_dom = '<a p="1">首页</a><a p="#pre">上一页</a>#pages<a p="#next">下一页</a><a p="#allp">尾页</a>'
				;
				return {
					getList : function(){
						var pages = '',
							plist = [],
							pgl = _i.page-_o.pgl,
							pgr = _i.page+_o.pgr;
						if(_i.page<=(_o.pgl+1)) pgr = _o.pgl+_o.pgr+1;
						if(pgr>_i.allp+1) {
							pgr = _i.allp+1;
							pgl = _i.allp-6;
						}
						if(pgl<1) pgl = 1;
						for(var i = pgl;i<pgr;i++) plist.push(i);
						$.each(plist,function(k,j){
							pages += '<a class="pg-num" p="'+j+'">'+j+'</a>';
						})
						_i.dom.html(function(){
							var pre = _i.page - 1,
								next = _i.page + 1;
							if(pre<1) pre = 1;
							if(next>_i.allp) next = _i.allp;
							return '<div class="jfa-page">'+_dom.replace('#pages',pages).replace('#allp',_i.allp).replace('#pre',pre).replace('#next',next)+'</div>';
						}).find('a.pg-num[p="'+_i.page+'"]').addClass('active');
						_i.dom.find('a').click(function(){
							_i.page = parseInt($(this).attr('p'));
							_o.getList();
							_i.suc(_i.page);
						});
					},
					state : 0,
					hide : function(){
						_i.dom.addClass('hide');
					},
					show : function(){
						_i.dom.removeClass('hide');
					},
					empty : function(){
						if(_i.dom){
							_i.dom.empty();
							_i.dom.removeClass('hide');
						}
						_o.state = 0;
					},
					init : function(arg){
						_o = this;
						_i = arg;
						_o.state = 1;
						_o.pgl = _i.pgl || 3;
						_o.pgr = _i.pgr || 4;
						_i.page = 1;
						_i.allp = parseInt((_i.count-1)/_i.every)+1;
						if(_i.allp==1) _o.empty();
						else _o.getList();
					}
				}
			})(),
			callback : function(k,a,b,e){
				setTimeout(function(){k && _obj.conf.callback[k] && _obj.conf.callback[k](a,b,e)},100); //解决js阻塞浏览器
			},
			mvvm : function(dom){ //为某个DOM节点绑定事件(MVVM模式)
				//普通点击
				dom.find('[jfa-click="click"]').each(function(k,i){
					var o = $(i),
						lk = o.attr('jfa-link'),
						arg = o.attr('jfa-arg') || 'kwd',
						k = o.attr('jfa-callback'),
						get = function(){
							k && _obj.conf.callback[k] && _obj.conf.callback[k](o);
						}
					;
					if(k=='sbtn') {
						var ipt = o.parent().parent().find('input[type="text"]'),
							set = function(){
								o.sval = ipt.val().trim();get();
								if(lk&&o.sval) location.href = lk+'?'+arg+'='+o.sval;
							};
						o.click(function(){
							set()
						})
						ipt.keypress(function(e) {
							if (e.which == 13){
								set()
							}
						})
					}else{
						o.click(function(){
							get();
						})
					}
				})
				//回车+按钮
				dom.find('[jfa-click="enter"]').each(function(k,i){
					var o = $(i),
						ipt = $(o.attr('jfa-tar')),
						k = o.attr('jfa-callback'),
						get = function(){
							o.sval = ipt.val().trim();
							_obj.callback(k,o);
						}
					;
					o.click(function(){
						get();
					})
					ipt.keypress(function(e) {
						if (e.which == 13){
							get(o);
						}
					})
				})
				//增加或删除active
				dom.find('[jfa-click="active"]').each(function(k,i){
					var o = $(i),
						obj,
						tar = o.attr('jfa-tar'), //点击元素
						to = o.attr('jfa-to'), //直接目标元素
						son = o.attr('jfa-son'), //子类目标元素
						pr = parseInt(o.attr('jfa-prt')) || 0, //父类目标元素
						r = o.attr('jfa-repeat'), //是否唯一
						k = o.attr('jfa-callback') //回调函数
					; 
					if(tar) obj = o.find(tar);
					else obj = o;
					obj.click(function(){
						var ob = $(this),
							prs = ob; //目标元素
						if(to){
							prs = $(to);
						}
						else if(son){
							prs = o.find(son);
						}
						else if(pr>0){
							for(var i=0;i<pr;i++) prs = prs.parent();
						}
						if(!r) o.find(tar+'.active').removeClass('active');
						if(prs.hasClass('active')) prs.removeClass('active');
						else prs.addClass('active');
						_obj.callback(k,ob);
					})
				})
				//切换tab切换div
				dom.find('[jfa-click="change-box"]').each(function(k,i){
					var o = $(i),
						s = o.attr('jfa-tar'),
						to = o.attr('jfa-to'),
						obj = o.find(s),
						k = o.attr('jfa-callback')
					;
					obj.click(function(e){
						var ob = $(this),
							ci = ob.attr('ci');
						o.find('.active').removeClass('active');
						ob.addClass('active');
						$('.'+to+'.active').removeClass('active');
						$('.'+to+'[ci="'+ci+'"]').addClass('active');
						_obj.callback(k,ob,ci,e);
					})
				})
				//隐藏/取消隐藏
				dom.find('[jfa-click="hide"]').each(function(k,i){
					var o = $(i),
						tar = o.attr('jfa-tar'),
						tobj = $(tar),
						to = o.attr('jfa-to'),
						obj = $(to),
						k = o.attr('jfa-callback')
					;
					if(tobj.length==0) tobj = o;
					tobj.click(function(){
						obj.toggleClass('hide');
						_obj.callback(k,obj,obj.hasClass('hide'));
					})
				})
				//所有点击事件
				var parHasClass = function(o,is){
					if(o.length>0){
						var _func = arguments.callee,
							className = o.attr('class');
						if(className && className.length>1 && className.split('jfa-nh').length>1) return 1;
						else return _func(o.parent(),is);
					}
				}
				dom.click(function(e){
					var is = parHasClass($(e.target),0);
					if(!is) $('.jfa-hide').addClass('hide');
					/*if(e.target.className && e.target.className.length>1){
						var className = e.target.className;
						if(className.split('jfa-nh').length==1) $('.jfa-hide').addClass('hide');
					}else $('.jfa-hide').addClass('hide');*/
				})
				//自定义下拉框
				dom.find('.jfa-select').each(function(k,i){
					var o = $(i),
						k = o.attr('jfa-callback')
					;
					o.find('a').click(function(){
						$(this).parent().find('dl').toggleClass('hide');
					})
					o.find('>dl>dt').click(function(){
						var o = $(this),
							prt = o.parent(),
							txt = o.text()
						;
						prt.toggleClass('hide');
						prt.parent().find('>a').text(txt);
						_obj.callback(k,o);
					})
				})
				//关闭父元素
				dom.find('.jfa-close').each(function(k,i){
					var o = $(i),
						tar = o.attr('jfa-tar'),
						tobj = $(tar)
					;
					o.click(function(){
						if(tobj.length==0) o.parent().toggleClass('hide');
						else tobj.toggleClass('hide');
					})
				})
				//开关
				dom.find('[jfa-click="jfa-switch"]').each(function(k,i){
					var o = $(i);
					o.click(function(){
						var s = _obj.state[o.attr('s')],
							k = o.attr('jfa-callback');
						o.attr('s',s);
						_obj.callback(k,o,s);
					})
				})
			},
			block : {
				alert : function(){
					$('body').append('<div class="jfa-alert" id="jfa-alert"></div>');
					return $('#jfa-alert');
				}(),
				cover : function(){
					$('body').append('<div class="jfa-cover" id="jfa-cover"></div>');
					return $('#jfa-cover');
				}()
			},
			tools : {
				sortByKey : function(array, key) {
					return array.sort(function(a, b) {
						var x = a[key]; var y = b[key];
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					});
				},
				getRequest : function() {
					   var url = window.location.search,
							theRequest = new Object();
					   if (url.indexOf("?") != -1) {   
						  var str = url.substr(1);   
						  strs = str.split("&");   
						  for(var i = 0; i < strs.length; i ++) {
							 theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
						  }   
					   }   
					   return theRequest;   
				},
				alert : function(tp,msg){
					var msg = msg || _obj.tools.alertDefault[tp].msg;
					_obj.block.alert.show().html(Dom.alert[tp].replace('#msg',msg)).css({top:'-'+_obj.block.alert[0].clientHeight+'px'}).animate({top:_obj.tools.alertDefault[tp].top}).find('a').click(function(){
						if(_obj.tools.alertDefault[tp].callback) _obj.tools.alertDefault[tp].callback();
						else _obj.tools.alertLeave();
					})
					_obj.msg.alertMsg = _obj.tools.alertDefault[tp].leave;
				},
				alertDefault : {
					'msg' : {'msg':'弹出消息',leave:3,top:'10%'},
					'ok' : {'msg':'成功信息！',leave:3,top:'10%'},
					'warn' : {'msg':'警告信息！',leave:3,top:'10%'},
					'confirm' : {'msg':'确定要删除该行信息吗?',leave:-1,top:'0'},
				},
				alertLeave : function(){
					_obj.block.alert.animate({top:'-'+_obj.block.alert[0].clientHeight+'px'},300,function(){
						$(this).empty().hide();
						_obj.block.cover.hide();
					})
				},
				reg : function(suc,arg){
					_obj.block.cover.show();
					_obj.block.alert.show().html(Dom.alert.reg).css({top:'-'+_obj.block.alert[0].clientHeight+'px'}).animate({top:'10%'},function(){
						$(this).find('input[name="username"]').focus();
					});
					_obj.block.alert.find('input[name="password"]').keypress(function(event) {
						if (event.which == 13){
							suc && suc();
						}
					});
					_obj.block.alert.find('a.checks').click(function(){
						suc && suc();
					})
					_obj.block.alert.find('a.closes').click(function(){
						if(!arg) _obj.tools.alertLeave();
					})
				},
				login : function(suc,arg){
					_obj.block.cover.show();
					_obj.block.alert.show().html(Dom.alert.login).css({top:'-'+_obj.block.alert[0].clientHeight+'px'}).animate({top:'10%'},function(){
						$(this).find('input[name="username"]').focus();
					});
					_obj.block.alert.find('input[name="password"]').keypress(function(event) {
						if (event.which == 13){
							suc && suc();
						}
					});
					_obj.block.alert.find('a.checks').click(function(){
						suc && suc();
					})
					_obj.block.alert.find('a.closes').click(function(){
						if(!arg) _obj.tools.alertLeave();
					})
				},
				confirm : function(msg,suc){
					_obj.block.cover.show();
					if(msg=='') msg = '确定要删除该信息吗?';
					_obj.block.alert.show().html(Dom.alert.confirm.replace('#msg',msg)).css({top:'-'+_obj.block.alert[0].clientHeight+'px'}).animate({top:'0'}).find('a').click(function(){
						var txt = $(this).attr('rel');
						_obj.tools.alertLeave();
						if(txt=='callback') suc && suc();
					})
				},
				data : {
					toDouble : function(n){ //单数转双数(1转01)
						n = n + '';
						if(n.length==1) n = '0' + n;
						return n;
					},
					arrayRemove : function(list,s){
						var lb=[],
							x = list.indexOf(s)
						;
						for(var i in list){
							if(i!=x) lb.push(list[i]) 
						}
						return lb;
					},
				},
				randomArrayOne : function(arr){
					return arr[parseInt(Math.random()*arr.length)];
				},
				time : {
					getStrTime : function(d){ //获取时间字符串。返回值，例：2000-01-01 00:00:00。接收参数，例：{con:['-','-',' ',':',':',' '],now: new Date()}
						var toDouble = _obj.tools.data.toDouble,
							d = d || {},
							con = d.con || ['-','-',' ','','',''],
							now = d.now || new Date(),
							year = now.getFullYear(),
							month = toDouble(now.getMonth()+1),
							day = toDouble(now.getDate()),
							hours = toDouble(now.getHours()),
							minutes = toDouble(now.getMinutes()),
							seconds = toDouble(now.getSeconds()),
							clock = ''
						;
						if(con[0]!='') clock += year + con[0];
						if(con[1]!='') clock += month + con[1];
						if(con[2]!='') clock += day + con[2];
						if(con[3]!='') clock += hours + con[3];
						if(con[4]!='') clock += minutes + con[4];
						if(con[5]!='') clock += seconds + con[5];
						return clock;
					},
					str_to_int : function(d){
						return parseInt((new Date(Date.parse(d.replace(/-/g, "/"))).getTime()+'').substr(0, 10));
					},
					str_df : function(a,b){
						var str_to_int = _obj.tools.time.str_to_int;
						return str_to_int(b)-str_to_int(a);
					},
					add : function(date,day){
						var int_to_str = _obj.tools.time.int_to_str,
							str_to_int = _obj.tools.time.str_to_int;
						return int_to_str(str_to_int(date)+day*24*3600);
					},
					before : function(day){
						var getStrTime = _obj.tools.time.getStrTime,
							add = _obj.tools.time.add;
						return add(getStrTime(),parseInt(day)*-1);
					},
					int_to_str : function(d,arg) {
						d = parseInt(d);
						if((d+'').length==10) d = d*1000;
						var toDouble = _obj.tools.data.toDouble,
							dt = new Date(d)
							back = dt.getFullYear()+'-'+toDouble(dt.getMonth()+1)+'-'+toDouble(dt.getDate());
						if(arg==1) back += ' '+toDouble(dt.getHours())+':'+toDouble(dt.getMinutes());
						return back;
					},
				},
			},
			init : function(conf){ //初始化
				_obj = this;
				_obj.conf = conf || {};
				_obj.func(window);
				_obj.mvvm($(document));
				$('.ie-close').click(function(){
					$(this).parent().remove();
				})
				if(_obj.conf.resize){
					_obj.conf.resize();
					$(window).resize(function(){_obj.conf.resize()});
				}
			}
		}
	})();
	return Jfa;
})