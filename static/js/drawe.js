define(['echarts','ec3/echarts.min'],function(ec,ec3){
	var ECharts = (function(){
		var _obj = {},
			echarts = ec3,
			_config = {
				allColor : [
					'#F05F74','#6D90D3','#9761BE','#FFBE5D','#6AC78B','#839098',
					'#E0655A','#F9C074','#69B0A2','#A9BBC1','#A99782',
					'#E6857C','#CB9E63','#6DA297','#BAC9CD','#8D7F6F',
					'#B7574F','#D9AE75','#88C0B5','#8C9A9F','#9D8F7F',
					'#C66A61','#FACD90','#5A9287','#9DAAAF','#BAAC9B',
					'#ED7C30','#A5A5A5','#FFC100','#70AD46','#5A9BD5',
					'#F19C63','#8F8F8F','#DEAF1E','#93C173','#5387B5',
					'#C86E31','#9A9A9A','#FFD03F','#649543','#6192BE',
					'#D07B42','#BBBBBB','#D7A50B','#72A052','#82B3DF'
				],
				color : ['#F05F74','#6D90D3','#9761BE','#FFBE5D','#6AC78B','#839098'],
				nameMap : {'Afghanistan':'阿富汗','Angola':'安哥拉','Albania':'阿尔巴尼亚','United Arab Emirates':'阿联酋','Argentina':'阿根廷','Armenia':'亚美尼亚','French Southern and Antarctic Lands':'法属南半球和南极领地','Australia':'澳大利亚','Austria':'奥地利','Azerbaijan':'阿塞拜疆','Burundi':'布隆迪','Belgium':'比利时','Benin':'贝宁','Burkina Faso':'布基纳法索','Bangladesh':'孟加拉国','Bulgaria':'保加利亚','The Bahamas':'巴哈马','Bosnia and Herzegovina':'波斯尼亚和黑塞哥维那','Belarus':'白俄罗斯','Belize':'伯利兹','Bermuda':'百慕大','Bolivia':'玻利维亚','Brazil':'巴西','Brunei':'文莱','Bhutan':'不丹','Botswana':'博茨瓦纳','Central African Republic':'中非共和国','Canada':'加拿大','Switzerland':'瑞士','Chile':'智利','China':'中国','Ivory Coast':'象牙海岸','Cameroon':'喀麦隆','Democratic Republic of the Congo':'刚果民主共和国','Republic of the Congo':'刚果共和国','Colombia':'哥伦比亚','Costa Rica':'哥斯达黎加','Cuba':'古巴','Northern Cyprus':'北塞浦路斯','Cyprus':'塞浦路斯','Czech Republic':'捷克共和国','Germany':'德国','Djibouti':'吉布提','Denmark':'丹麦','Dominican Republic':'多明尼加共和国','Algeria':'阿尔及利亚','Ecuador':'厄瓜多尔','Egypt':'埃及','Eritrea':'厄立特里亚','Spain':'西班牙','Estonia':'爱沙尼亚','Ethiopia':'埃塞俄比亚','Finland':'芬兰','Fiji':'斐','Falkland Islands':'福克兰群岛','France':'法国','Gabon':'加蓬','United Kingdom':'英国','Georgia':'格鲁吉亚','Ghana':'加纳','Guinea':'几内亚','Gambia':'冈比亚','Guinea Bissau':'几内亚比绍','Equatorial Guinea':'赤道几内亚','Greece':'希腊','Greenland':'格陵兰','Guatemala':'危地马拉','French Guiana':'法属圭亚那','Guyana':'圭亚那','Honduras':'洪都拉斯','Croatia':'克罗地亚','Haiti':'海地','Hungary':'匈牙利','Indonesia':'印尼','India':'印度','Ireland':'爱尔兰','Iran':'伊朗','Iraq':'伊拉克','Iceland':'冰岛','Israel':'以色列','Italy':'意大利','Jamaica':'牙买加','Jordan':'约旦','Japan':'日本','Kazakhstan':'哈萨克斯坦','Kenya':'肯尼亚','Kyrgyzstan':'吉尔吉斯斯坦','Cambodia':'柬埔寨','South Korea':'韩国','Kosovo':'科索沃','Kuwait':'科威特','Laos':'老挝','Lebanon':'黎巴嫩','Liberia':'利比里亚','Libya':'利比亚','Sri Lanka':'斯里兰卡','Lesotho':'莱索托','Lithuania':'立陶宛','Luxembourg':'卢森堡','Latvia':'拉脱维亚','Morocco':'摩洛哥','Moldova':'摩尔多瓦','Madagascar':'马达加斯加','Mexico':'墨西哥','Macedonia':'马其顿','Mali':'马里','Myanmar':'缅甸','Montenegro':'黑山','Mongolia':'蒙古','Mozambique':'莫桑比克','Mauritania':'毛里塔尼亚','Malawi':'马拉维','Malaysia':'马来西亚','Namibia':'纳米比亚','New Caledonia':'新喀里多尼亚','Niger':'尼日尔','Nigeria':'尼日利亚','Nicaragua':'尼加拉瓜','Netherlands':'荷兰','Norway':'挪威','Nepal':'尼泊尔','New Zealand':'新西兰','Oman':'阿曼','Pakistan':'巴基斯坦','Panama':'巴拿马','Peru':'秘鲁','Philippines':'菲律宾','Papua New Guinea':'巴布亚新几内亚','Poland':'波兰','Puerto Rico':'波多黎各','North Korea':'北朝鲜','Portugal':'葡萄牙','Paraguay':'巴拉圭','Qatar':'卡塔尔','Romania':'罗马尼亚','Russia':'俄罗斯','Rwanda':'卢旺达','Western Sahara':'西撒哈拉','Saudi Arabia':'沙特阿拉伯','Sudan':'苏丹','South Sudan':'南苏丹','Senegal':'塞内加尔','Solomon Islands':'所罗门群岛','Sierra Leone':'塞拉利昂','El Salvador':'萨尔瓦多','Somaliland':'索马里兰','Somalia':'索马里','Republic of Serbia':'塞尔维亚共和国','Suriname':'苏里南','Slovakia':'斯洛伐克','Slovenia':'斯洛文尼亚','Sweden':'瑞典','Swaziland':'斯威士兰','Syria':'叙利亚','Chad':'乍得','Togo':'多哥','Thailand':'泰国','Tajikistan':'塔吉克斯坦','Turkmenistan':'土库曼斯坦','East Timor':'东帝汶','Trinidad and Tobago':'特里尼达和多巴哥','Tunisia':'突尼斯','Turkey':'土耳其','United Republic of Tanzania':'坦桑尼亚联合共和国','Uganda':'乌干达','Ukraine':'乌克兰','Uruguay':'乌拉圭','United States of America':'美国','Uzbekistan':'乌兹别克斯坦','Venezuela':'委内瑞拉','Vietnam':'越南','Vanuatu':'瓦努阿图','West Bank':'西岸','Yemen':'也门','South Africa':'南非','Zambia':'赞比亚','Zimbabwe':'津巴布韦'},
				mapPie : {
					'澳大利亚' : {
						radius : '6%',
						center: ['80%', '80%']
					},
					'新西兰' : {
						radius : '3%',
						center: ['88.5%', '90%']
					},
					'中国' : {
						radius : '7%',
						center: ['74%', '42%']
					},
					'阿富汗' : {
						radius : '3%',
						center: ['64%', '42%']
					},
					'韩国' : {
						radius : '3%',
						center: ['79%', '41%']
					},
					'日本' : {
						radius : '3%',
						center: ['81%', '41%']
					},
					'马来西亚' : {
						radius : '4%',
						center: ['78%', '65%']
					},
					'菲律宾' : {
						radius : '3%',
						center: ['78%', '56%']
					},
					'泰国' : {
						radius : '2%',
						center: ['72.5%', '54%']
					},
					'越南' : {
						radius : '2%',
						center: ['74%', '53%']
					},
					'老挝' : {
						radius : '2%',
						center: ['73%', '51%']
					},
					'柬埔寨' : {
						radius : '2%',
						center: ['72.5%', '54%']
					},
					'印度' : {
						radius : '6%',
						center: ['68%', '49%']
					},
					'沙特阿拉伯' : {
						radius : '4%',
						center: ['60%', '46%']
					},
					'埃及' : {
						radius : '3%',
						center: ['57%', '46%']
					},
					'几内亚比绍' : {
						radius : '2%',
						center: ['49.7%', '59%']
					},
					'肯尼亚' : {
						radius : '2%',
						center: ['59%', '63%']
					},
					'尼日利亚' : {
						radius : '3%',
						center: ['52%', '58%']
					},
					'加蓬' : {
						radius : '2%',
						center: ['52.5%', '64%']
					},
					'乌干达' : {
						radius : '2%',
						center: ['57.3%', '63%']
					},
					'安哥拉' : {
						radius : '3%',
						center: ['54%', '71%']
					},
					'南非' : {
						radius : '3%',
						center: ['55%', '84%']
					},
					'瑞典' : {
						radius : '2%',
						center: ['53%', '25%']
					},
					'英国' : {
						radius : '2%',
						center: ['50%', '30%']
					},
					'俄罗斯' : {
						radius : '5%',
						center: ['70%', '30%']
					},
					'乌克兰' : {
						radius : '2%',
						center: ['57%', '32%']
					},
					'德国' : {
						radius : '2%',
						center: ['52.5%', '31%']
					},
					'法国' : {
						radius : '2%',
						center: ['50.5%', '34%']
					},
					'西班牙' : {
						radius : '2%',
						center: ['49%', '38%']
					},
					'葡萄牙' : {
						radius : '2%',
						center: ['48%', '38%']
					},
					'加拿大' : {
						radius : '8%',
						center: ['30%', '22%']
					},
					'丹麦' : {
						radius : '5%',
						center: ['41%', '14%']
					},
					'美国' : {
						radius : '7%',
						center: ['28%', '38%']
					},
					'墨西哥' : {
						radius : '4%',
						center: ['27%', '48%']
					},
					'哥伦比亚' : {
						radius : '3%',
						center: ['33%', '61%']
					},
					'委内瑞拉' : {
						radius : '3%',
						center: ['35%', '58%']
					},
					'巴西' : {
						radius : '6%',
						center: ['39%', '70%']
					},
					'阿根廷' : {
						radius : '4%',
						center: ['35.8%', '84%']
					},
					'智利' : {
						radius : '3%',
						center: ['33.5%', '84%']
					},
				}
			}
		;
		return {
			worldName : function(){
				var r = [];
				for(var i in _config.nameMap){
					r.push(_config.nameMap[i])
				}
				return r;
			}(),
			getOtherData : function(d,label){
				var r = [],
					ov = 0;
				$.each(d,function(k,j){
					var nm = j.name;
					if(k>=5) ov += j.value;
					else {
						r.push({name:nm,label:label,value:j.value});
					}
				})
				if(ov>0) r.push({name:'其他',label:label,value:ov});
				return r;
			},
			change : function(arr){
				var r = [],j = {};
				$.each(arr,function(m,n){
					if(_obj.worldName.indexOf(n.name)==-1) {
						n.name = '中国';
					}
					r.push(n);
				})
				return r;
			},
			getPie : function(id,d,click){
				var obj = document.getElementById(id);
				if(d.length==0){
					obj.innerHTML = '';
					return;
				}
				var o = ec.init(obj),
					option = {
						color : _config.allColor,
						series : [
							{
								itemStyle: {
									normal: {
										label:{
											textStyle:{
												fontSize:14,
												//color:'#ccc'
											}
										},
										labelLine:{
											length:16
										},
										borderColor:'#fff',
										borderWidth:'1.5'
									}
								},
								name:'访问来源',
								type:'pie',
								radius : '46%',
								center: ['50%', '50%'],
								data:function(){
									var lst = [],nm,ov = 0;
									$.each(d,function(k,j){
										if(k<18) {
											if(k>9) ov += j.value;
											else {
												if(click==1){
													if(lg==1) nm = j.name.replace(/(.{5})/g,'$1\n');
													else nm = j.name.replace(' ','$1\n');
												}
												else{
													nm = j.name.replace(/(.{5})/g,'$1\n');
												}
												lst.push({name:nm,did:j.did,value:j.value});
											}
										}
									})
									if(ov>0) lst.push({name:'其他',did:'',value:ov});
									return lst;
								}()
							}
						]
					}
				;
				o.setOption(option);
				o.on('click',function(e){
					click && click(e);
				})
				return _obj;
			},
			getWord : function(id,d,click){
				var obj = document.getElementById(id);
				if(d.length==0){
					obj.innerHTML = '';
					return;
				}
				var o = ec.init(obj),
					option = {
						color : _config.color,
						tooltip: {
							show: false
						},
						series: [
							{
								name: 'Google Trends',
								type: 'wordCloud',
								center:['50%', '50%'],
								size: ['100%', '100%'],
								textRotation : [0,90,45,-45],
								textPadding: 3,
								data : function(){
									var r = [];
									$.each(d,function(k,j){
										if(j.value>30) j.value = 30;
										if(k<20) r.push(j);
									})
									return r;
								}()
							}
						]
					}
				; 
				o.setOption(option);
				o.on('click',function(e){
					click && click(e);
				})
				return _obj;
			},
			getImgList : function(id,d,suc){
				var o = $(document.getElementById(id));
				var htm = '';
				$.each(d,function(k,j){
					htm += '<img src="'+j.src+'" topic_name="'+j.topic_name+'" topic_id="'+j.topic_id+'" style="height:100%" />';
				})
				o.html(htm).find('img').click(function(){
					suc && suc($(this));
				});
			},
			getTreeMap : function(id,d){
				var obj = document.getElementById(id),
					o = $(obj),
					option = {
						data : d
					}
				;
				option.lines = function(){
					var len = option.data.length,
						back = {len:0},
						r = 1
					;
					if(len>=3 && len<6) r = 2;
					else if(len>=6 && len<9) r = 3;
					else if(len>=9 && len<12) r = 4;
					else if(len>=12 && len<15) r = 5;
					else if(len>=15 && len<18) r = 6;
					else if(len>=18 && len<21) r = 7;
					else if(len>=21 && len<24) r = 8;
					else if(len>=24 && len<27) r = 9;
					back.len = r;
					for(var i=0;i<r;i++) back[i+1] = [];
					return back;
				}();
				option.lv = 0;
				option.list = [];
				option.allvalue = 0;
				option.dom = '';
				for(var c=0;c<option.data.length;c++) option.allvalue += option.data[c].value;
				for(var i=0;i<option.data.length;i++){
					var v = option.data[i].value/option.allvalue,
						l = 1/option.lines.len,
						j = {v:v,src:option.data[i].src,url:option.data[i].url,h:l*100+'%'};
					option.lv += v;
					if(option.lv<=l) option.lines[1].push(j);
					else if(option.lv<=l*2) option.lines[2].push(j);
					else if(option.lv<=l*3) option.lines[3].push(j);
					else if(option.lv<=l*4) option.lines[4].push(j);
					else if(option.lv<=l*5) option.lines[4].push(j);
					else if(option.lv<=l*6) option.lines[4].push(j);
					else if(option.lv<=l*7) option.lines[4].push(j);
					else if(option.lv<=l*8) option.lines[4].push(j);
					else if(option.lv<=l*9) option.lines[4].push(j);
				};
				for(var k in option.lines){
					if(k!='len'){
						var a = function(){
							var _r = 0;
							$.each(option.lines[k],function(m,j){
								_r += j.v;
							})
							return _r;
						}();
						$.each(option.lines[k],function(m,j){
							option.lines[k][m].w = j.v*100/a + '%';
						})
					}
				}
				for(var k in option.lines){
					if(k!='len'){
						$.each(option.lines[k],function(m,j){
							option.dom += '<img src="'+j.src+'" onerror="this.src=\''+j.url.trim()+'\'" style="float:left;width:'+j.w+';height:'+j.h+'" />';
						})
					}
				}
				option.sons += '<br style="clear:both"/>'
				o.html(option.dom);
				return _obj;
				/*
					demo : [
						{
							src : 'img/test.jpg',
							value : 1
						},
						{
							src : 'img/test.jpg',
							value : 2
						},
						{
							src : 'img/test.jpg',
							value : 3
						},
						{
							src : 'img/test.jpg',
							value : 3
						},
						{
							src : 'img/test.jpg',
							value : 2
						},
						{
							src : 'img/test.jpg',
							value : 1
						},
						{
							src : 'img/test.jpg',
							value : 2
						},
					]
				*/
			},
			getBar : function(id,d){
				var o = ec.init(document.getElementById(id)),
					option = {
						tooltip : {
							trigger: 'axis'
						},
						legend: {
							data:['相似歌曲']
						},
						calculable : true,
						xAxis : [
							{
								type : 'value',
								boundaryGap : [0, 0.01]
							}
						],
						yAxis : [
							{
								type : 'category',
								data : d.y
							}
						],
						series : [
							{
								name:'相似歌曲',
								type:'bar',
								data:d.s
							}
						]
					}
				; 
				o.setOption(option);
				return _obj;
				/*
					demo : {
						y : ['巴西','印尼','美国','印度','中国','世界人口(万)'],
						s : //[94, 95, 96, 97, 98, 99]
					}
				*/
			},
			getNet : function(id,d,args){
				var o = ec.init(document.getElementById(id)),
					args = args || {},
					categories = function(){
						var r = [],rc = [];
						$.each(d.nodes,function(m,n){
							var name = (d.categories[n.category]);
							if(rc.indexOf(name)==-1) {
								rc.push(name);
								r.push({name:name});
							}
						})
						return r;
					}(),
					option = {
						color : _config.color,
						title : {
							text: '',
							subtext: '',
							x:'right',
							y:'bottom'
						},
						tooltip : {
							trigger: 'item',
							formatter: '{a} : {b}'
						},
						legend: {
							x: 'left',
							data: categories,
						},
						series : [
							{
								type:'force',
								name : "知识图谱",
								ribbonType: false,
								categories : categories,
								itemStyle: {
									normal: {
										label: {
											show: true,
											textStyle: {
												color: '#000',
												fontSize: 9
											}
										},
										nodeStyle : {
											brushType : 'both',
											borderColor : 'rgba(255,215,0,0.4)',
											borderWidth : 0
										},
										linkStyle: {
											type: 'curve'
										}
									},
									emphasis: {
										label: {
											show: false,
										},
										nodeStyle : {
											borderColor : '#d7d7d7',
											borderWidth : 1
										},
										linkStyle : {}
									}
								},
								useWorker: false,
								minRadius : d.min || 15,
								maxRadius : d.max || 30,
								gravity: 1.2,
								scaling: 1.2,
								roam: 'move',
								nodes:d.nodes,
								links : d.links
							}
						]
					}
				;
				o.setOption(option);
				return _obj;
				/*
					demo : {
						categories: ['地区','症状','疾病'],
						nodes:[
							{category:0, name: '中国', value : 3},
							{category:1, name: '头痛',value : 3},
							{category:2, name: '感冒',value : 10},
						],
						links : [
							{source : '中国', target : '感冒', weight : 2, name: ''},
							{source : '头痛', target : '感冒', weight : 2},
						]
					}
				*/
			},
			getMap : function(id,d,args){
				var o = ec.init(document.getElementById(id)),
					d = d || [],
					max = d[0] && d[0].value || 0,
					args = args || {},
					tp = args.tp || 'world',
					cr = args.cr || ['#6AC78B','#ddd'],
					option = {
						animationDuration:1,
						title : {
							text: '',
							x:'center',
							y:'top',
							//textStyle:{color:'#eee'}
						},
						tooltip : {
							trigger: 'item',
							formatter : function (params) {
								var value = params.value,
									name = params.name;
								if (value) return name + ': ' + value;
								else return name;
							}
						},
						toolbox: {
							show : false,
							orient : 'vertical',
							x: 'right',
							y: 'center',
							feature : {
								mark : {show: true},
								dataView : {show: true, readOnly: false},
								restore : {show: true},
								saveAsImage : {show: true}
							}
						},
						dataRange: {
							min: 0,
							max: max,
							text:['高','低'],
							realtime: false,
							calculable : true,
							//textStyle: {color:'#eee'},
							color: cr,
							x:'15%',
							y:'60%',
							itemHeight:10,
						},
						series : [
							{
								name: '世界地图',
								type: 'map',
								mapType: tp,
								nameMap : _config.nameMap,
								roam: false,
								mapLocation: {y:'2%',x:'center'},
								itemStyle:{
									normal: {
										borderColor:'#fff',
										borderWidth:'1',
										//color:'rgba(0,0,0,0)'
									},
									emphasis:{
										label:{show:true},
										areaStyle:{color:'#96C1EC'},
									},
								},
								data:d,
							}
						]
					}
				;
				o.setOption(option);
				return _obj;
			},
			getLine : function(id,data,args){
				var args = args || {},
					obj = document.getElementById(id),
					o = ec.init(obj),
					data = data || {},
					series = data.series || [{name:'趋势', type:'line', data:data.count}],
					lend = [],
					cor = this.pubcolor,
					grid = grid || {x:'5%',y:'11%',x2:'2%',y2:'10%'}
				;
				if(series[0].data.length==0) {
					obj.innerHTML = '';
					return;
				};
				for(var s in series) lend.push(series[s].name);
				var option = {
						color : _config.color,
						tooltip : {
							trigger: 'axis'
						},
						legend: {
							x: '2%',
							//y: '2%',
							//textStyle: {color:'#eee',fontSize:14},
							data:lend
						},
						xAxis : [
							{
								type : 'category',
								//boundaryGap : false,
								splitLine: {show:false},
								axisLine: {show:true,lineStyle:{color:'#ddd',width:1}},
								axisLabel:{
									//textStyle: {color:'#ccc'},
								},
								data : data.date
							}
						],
						yAxis : [
							{
								type : 'value',
								axisLine: {show:true,lineStyle:{color:'#ddd',width:1}},
								splitLine: {show:true,lineStyle:{color:'#ddd'}},
								axisLabel:{
									//textStyle: {color:'#ccc'},
								},
							}
						],
						grid: grid,
						series : (function(){
							var lst = [];
							$.each(series,function(m,n){
								var d = n.data,
									isTrue = 0,
									newd = [];
								d.reverse();
								$.each(d,function(k,j){
									if(j!=0) isTrue = 1;
									if(isTrue==1) newd.push(j);
								})
								newd.reverse();
								var jr = {'name':n.name,data:newd,type:'line',symbolSize:n.symbolSize || 0,smooth:true};
								/*if(args.mk){
									jr.markPoint = {
										data : [
											{type : 'max', name: '最大值'},
											//{type : 'min', name: '最小值'}
										]
									}
								}*/
								lst.push(jr);
							})
							return lst;
						})()
					}
				;
				if(args.isZoom) option.dataZoom = {
					show : true,
					realtime : true,
					start : 0,
					end : 100
				};
				o.setOption(option);
				o.on('hover',function(e){
					args.hover && args.hover(e);
				})
				return _obj;
			},
			getForward : function(id,data){
				var o = $(document.getElementById(id)),
					htm = '<div class="forward">';
				$.each(data,function(k,j){
					htm += '<div>';
					$.each(j,function(m,n){
						htm += '<a title="'+n.name+'"></a>';
					})
					htm += '</div>';
				})
				htm += '</div>';
				o.html(htm);
			},
			getNanding : function(id){
				$('#'+id).empty();
				 var data = [
				  {year: '2000',internally:21.0},
				  {year: '2001',internally:25.0},
				  {year: '2002',internally:25.0},
				  {year: '2003',internally:25.0},
				  {year: '2004',internally:25.0},
				  {year: '2005',internally:24.0},
				  {year: '2006',internally:24.0},
				  {year: '2007',internally:26.0},
				  {year: '2008',internally:26.0},
				  {year: '2009',internally:27.1},
				  {year: '2010',internally:27.5},
				  {year: '2011',internally:26.4},
				  {year: '2012',internally:28.8},
				  {year: '2013',internally:33.3},
				  {year: '2014',internally:38.2}
				];

				var Stat = G2.Stat;
				var Frame = G2.Frame;
				var frame = new Frame(data); // 加工数据

				frame = Frame.combinColumns(frame,['internally'],'count','难民类型','year');
				var chart = new G2.Chart({
				  id: id,
				  width: 800,
				  height: 400,
				  plotCfg: {margin: [30,150,15,0]}
				});

				chart.source(frame);
				chart.coord('polar',{inner: 0.1});
				chart.intervalStack().position('year*count')
					  .shape('stroke')
					  .color('难民类型',['rgb(136,186,174)','rgb(184,189,61)','rgb(107,136,138)']);//.label('count',{offset: -1});
				chart.render();
			},
			getMap2 : function(id,d,args){
				var obj = document.getElementById(id),
					args = args || {},
					range = args.range || ['#FE8C10','#fff']
					d = d || [],
					legend = ['最热','次热','中热','少量','零值'],
					countryArr = this.countryArr,
					countryHas = function(){
						var r = [];
						$.each(d,function(k,j){
							r.push(j.name);
						})
						return r;
					}(),
					cdir = '',
					max = d[0] && d[0].value || 0,
					sr = {
						type: 'map',
						mapType: args.tp || 'world',
						nameMap : _config.nameMap,
						//mapLocation: loc,
						itemStyle:{
							normal: {
								borderColor:'#96C1EC',
								borderWidth:'1',
								color:'rgba(0,0,0,0)'
							},
							emphasis:{
								label:{show:true},
								areaStyle:{color:'#96C1EC'},
							},
						},
						showLegendSymbol:false,
						data : []
					},
					ds = function(){
						var array = [],
							srr = str(sr),
							sr5 = json(srr),
							sr6 = json(srr)
						;
						sr5.name = '零值';//if(countryArr.indexOf(j.name)==-1) 
						$.each(countryArr,function(m,n){
							if(countryHas.indexOf(n)==-1) sr5.data.push({
								name:n,
								value:0,
							});
						})
						if(max>0){
							var a = Math.sqrt(Math.sqrt(Math.sqrt(max/9))),
								lv = 5,
								sr1 = json(srr),
								sr2 = json(srr),
								sr3 = json(srr),
								sr4 = json(srr)
							;
							sr1.name = '最热';
							sr2.name = '次热';
							sr3.name = '中热';
							sr4.name = '少量';
							if(max>9) {
								$.each(d,function(k,j){
									j.real = j.value;
									if(j.real>(max/a) && j.real<=max){
										j.value = 4;
										sr1.data.push(j);
									}
									else if(j.real>(max/Math.pow(a,3)) && j.real<=(max/a)){
										j.value = 3;
										sr2.data.push(j);
									}
									else if(j.real>(max/Math.pow(a,6)) && j.real<=(max/Math.pow(a,3))){
										j.value = 2;
										sr3.data.push(j);
									}
									else if(j.real>0 && j.real<=(max/Math.pow(a,6))){
										j.value = 1;
										sr4.data.push(j);
									}
								})
							}
							else{
								$.each(d,function(k,j){
									j.real = j.value;
									if(j.real>7 && j.real<=9){
										j.value = 4;
										sr1.data.push(j);
									}
									else if(j.real>5 && j.real<=7){
										j.value = 3;
										sr2.data.push(j);
									}
									else if(j.real>3 && j.real<=5){
										j.value = 2;
										sr3.data.push(j);
									}
									else if(j.real>0 && j.real<=3){
										j.value = 1;
										sr4.data.push(j);
									}
								})
							}
							if(sr1.data.length>0) array.push(sr1);
							if(sr2.data.length>0) array.push(sr2);
							if(sr3.data.length>0) array.push(sr3);
							if(sr4.data.length>0) array.push(sr4);
						}
						array.push(sr5);
						array.push(sr6);
						return array;
					}()
				;
				if(range[0]=='#FE8C10') cdir = 'orange/';
				else if(range[0]=='#FEFC14') cdir = 'yellow/';
				else if(range[0]=='#00FFFB') cdir = 'blue/';
				else if(range[0]=='#02FF11') cdir = 'green/';
				
				var o = ec.init(obj);
				var option = {
					animationDuration:1,
					title : {
						text: '',
						x:'center',
						y:'top',
						textStyle:{
							color:'#eee'
						}
					},
					legend: {
						orient: 'vertical',
						x:'12%',
						y:'60%',
						textStyle: {color:'#ccc'},
						data : [
							{
								name:'最热',
								icon : 'image://../static/img/legend/'+cdir+'5.png',
								//textStyle:{color:'auto'}
							},
							{
								name:'次热',
								icon : 'image://../static/img/legend/'+cdir+'4.png',
								//textStyle:{color:'auto'}
							},
							{
								name:'中热',
								icon : 'image://../static/img/legend/'+cdir+'3.png',
								//textStyle:{color:'auto'}
							},
							{
								name:'少量',
								icon : 'image://../static/img/legend/'+cdir+'2.png',
								//textStyle:{color:'auto'}
							},
							{
								name:'零值',
								icon : 'image://../static/img/legend/'+cdir+'1.png',
								//textStyle:{color:'auto'}
							}
						]
						//data:['最热','次热','中热','少量','零值']
					},
					tooltip : {
						trigger: 'item',
						formatter : function (params) {
							var value = params[5].real,
								name = params.name;
							if (value) return name+': '+value;
							else return name;
						}
					},
					dataRange: {
						show : false,
						min: 0,
						max: 4,
						text:['高','低'],
						realtime: false,
						calculable : true,
						textStyle: {color:'#eee'},
						color: range,
						itemHeight:10,
					},
					series : ds
				};
				o.setOption(option);
			},
			ec3 : {
				getLine : function(id,data,args){
					var o = echarts.init(document.getElementById(id)),
						args = args || {};
					var option = {
						tooltip: {},
						grid : {
							top:'10px',
						},
						dataZoom: {
							show: true,
							start : 0,
							end : 100
						},
						xAxis: {
							data: data.date
						},
						yAxis: {},
						series: [{
							name: '热度',
							type: 'line',
							smooth : true,
							data: data.count
						}]
					};
					o.setOption(option);
					if (args.dataZoom){
						o.on('dataZoom',function(e){
							args.dataZoom(e);
						})
					}
				},
				getScatter2 : function(id,data,args){
					var o = echarts.init(document.getElementById(id)),
						args = args || {};
					var option = {
						title: {
							text: ''
						},
						tooltip: {},
						legend: {
							left: 10,
							data: ['动作', '产品']
						},
						xAxis: {
							data: data.date
						},
						yAxis: {},
						series: [
							{
								name: '热度',
								type: 'line',
								smooth : true,
								data: [8,6,4,8,6,4]
							},
							{
								name: '热度',
								type: 'line',
								smooth : true,
								data: [26,17,15,20,17,15]
							},
							{
								name: '动作',
								data: [
									{name:'a',symbolSize:25,value:8},{name:'a1',symbolSize:25,value:9},
									{name:'b',symbolSize:20,value:6},
									{name:'c',symbolSize:25,value:4},
									{name:'a',symbolSize:25,value:8},
									{name:'b',symbolSize:20,value:6},
									{name:'c',symbolSize:25,value:4},
								],
								type: 'scatter',
							},
							{
								name: '产品',
								data: [
									{name:'a',symbolSize:20,value:26},
									{name:'b',symbolSize:15,value:17},
									{name:'c',symbolSize:10,value:15},
									{name:'a',symbolSize:20,value:20},
									{name:'b',symbolSize:15,value:17},
									{name:'c',symbolSize:10,value:15},
								],
								type: 'scatter',
							},
						]
					};
					o.setOption(option);
				},
				getForce : function(id,webkitDep){
					var myChart = echarts.init(document.getElementById(id)),
						option = {
							legend: {
								data: webkitDep.categories
							},
							series: [{
								type: 'graph',
								layout: 'force',
								animation: false,
								label: {
									normal: {
										position: 'right',
										formatter: '{b}'
									}
								},
								draggable: true,
								data: webkitDep.nodes.map(function (node, idx) {
									node.id = idx;
									return node;
								}),
								categories: webkitDep.categories,
								force: {
									// initLayout: 'circular'
									// gravity: 0
									edgeLength: 50,
									repulsion: 100
								},
								edges: webkitDep.links
							}]
						};
						myChart.setOption(option);
				},
				getScatter : function(id,d,args){
					var o = echarts.init(document.getElementById(id)),
						args = args || {},
						xdata = d.xdata,
						ydata = d.ydata,
						data = d.data,
						option = {
							tooltip: {
								//position: 'top',
								trigger: 'item',
								showDelay : 400,
								enterable : true,
								formatter : function (e) {
									var mongoId = e.data[2],htm = '';
									$.ajax({
										url : '/public/getMongoData',
										async : false,
										data : {ids:mongoId.join(',')},
										success : function(back){
											if(back.state='ok'){
												htm += '<dl class="scatterTip">';
												$.each(back.data,function(m,n){
													log(n);
													htm += '<dt><span>'+n.time.substring(0,10)+'</span><a>'+n.title+'</a></dt>';
												})
												htm += '</dl>';
												
											};
										}
									})
									return htm;
								}
							},
							title: [{
								text: args.text || '时序分布',
								subtext: args.subtext || '',
								sublink: '',
								left: 'center',
								top: 'top'
							}],
							singleAxis: [],
							series: []
						}
					;
					echarts.util.each(ydata, function (day, idx) {
						option.title.push({
							textBaseline: 'middle',
							top: (idx + 0.5) * 90 / ydata.length +7 + '%',
							text: day
						});
						option.singleAxis.push({
							left: 150,
							type: 'category',
							boundaryGap: false,
							data: function(){
								var r = [];
								$.each(xdata,function(m,n){
									r.push(n);//.substring(5,10)
								})
								return r;
							}(),
							top: (idx * 90 / ydata.length + 12) + '%',
							height: (100 / ydata.length - 10) + '%',
							axisLabel: {
								interval: 2
							}
						});
						option.series.push({
							singleAxisIndex: idx,
							coordinateSystem: 'singleAxis',
							type: 'scatter',
							data: [],
							symbolSize: function (dataItem) {
								return dataItem[1] * 4;
							}
						});
					});
					echarts.util.each(data, function (dataItem) {
						option.series[dataItem[0]].data.push([dataItem[1], dataItem[2], dataItem[3]]);
					});
					o.setOption(option);
					if (args.hover){
						o.on('mouseover',function(e){
							args.hover(e);
						})
					}	
					/*
						demo: {
							xdata : [
								'2016-07-01',
								'2016-07-02',
								'2016-07-03',
								'2016-07-04',
								'2016-07-05',
								'2016-07-06',
								'2016-07-07',
								'2016-07-08',
								'2016-07-09',
								'2016-07-10',
								'2016-07-11',
								'2016-07-12',
								'2016-07-13',
								'2016-07-14',
								'2016-07-15',
								'2016-07-16',
								'2016-07-17',
								'2016-07-18',
								'2016-07-19',
								'2016-07-20',
								'2016-07-21',
								'2016-07-22',
								'2016-07-23',
								'2016-07-24'
							],
							ydata : ['中国', '欧盟', '美国','加拿大'],
							data : [
								[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],
								[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],
								[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],
								[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1]
							]
						}
					*/
				},
				getPie : function(id,d,args){
					var o = echarts.init(document.getElementById(id)),
						args = args || {},
						series = [],
						legend = [],
						vall = 0,
						sr = {
							type: 'pie',
							label: {
								normal: {
									show: false
								}
							},
							itemStyle : {
								normal : {
									borderColor : '#eee',
								}
							},
							data:[]
						}
					;
					$.each(d,function(m,n){
						vall += n.value;
					})
					$.each(d,function(m,n){
						if(m<=5){
							var jr = _config.mapPie[n.name],
								srr = json(str(sr))
							;
							if(jr){
								srr.data = _obj.getOtherData(n.entities,n.name);
								var radius = (parseInt(n.value*40/vall)+6);
								if(radius>16) radius = 16;
								srr.radius = radius + '%';//jr.radius;
								srr.center = jr.center;
								series.push(srr);
								$.each(srr.data,function(k,j){
									if(legend.indexOf(name)==-1) legend.push(j.name);
								})
							}
						}
					})
					var option = {
						color : _config.allColor,
						legend: {
							orient : 'vertical',
							x : 'left',
							data:legend
						},
						backgroundColor : 'rgba(0,0,0,0)',
						tooltip : {
							trigger: 'item',
							showDelay : 400,
							formatter: function(e){
								var htm = '<div class="mapTip">';
								htm += '<h3>地区：'+e.data.label+'<h3>';
								htm += '<p>名称：'+e.data.name+'<p>';
								htm += '<p>热度：'+e.data.value+'<p>';
								htm += '</div>';
								return htm;
							}//'{b} : {c} ({d}%)'
						},
						series : series
					};
					o.setOption(option);
					/*if (args.hover){
						o.on('mouseover',function(e){
							args.hover(e);
						})
					}*/
				},
				getMap : function(id,d,args){
					var myChart = echarts.init(document.getElementById(id)),
						d = d || [],
						max = d[0] && d[0].value || 0,
						args = args || {},
						showLabel = args.showLabel || 5,
						tp = args.tp || 'world',
						range = args.range || ['#fff','#FE8C10'],
						option = {
							title: {
								text: args.text,
								subtext: args.subtext,
								sublink: '',
								left: 'center',
								top: 'top'
							},
							tooltip : {
								trigger: 'item',
								formatter : function (params) {
									var value = params.value,
										name = params.name;
									if (value) return name + ': ' + value;
									else return name;
								}
							},
							toolbox: {
								show: false,
								orient: 'vertical',
								left: 'right',
								top: 'center',
								feature: {
									dataView: {readOnly: false},
									restore: {},
									saveAsImage: {}
								}
							},
							visualMap: {
								min: 0,
								max: max,
								text:['高','低'],
								realtime: false,
								calculable: true,
								inRange: {
									color: range,
									//symbolSize: [0, max]
								},
								x:'15%',
								y:'60%',
								itemHeight:80,
							},
							series: [
								{
									type: 'map',
									mapType: 'world',
									top: '10%',
									bottom: 0,
									nameMap : _config.nameMap,
									itemStyle:{
										normal: {
											borderColor:'#999',
											borderWidth:'1',
											areaColor:'#f9f9f9'
										}
									},
									data:function(){
										var r = [];
										$.each(d,function(m,n){
											if(m<showLabel) n.label = {normal:{show:true}};
											r.push(n);
										})
										return r;
									}()
								}
							]
						}
					;
					myChart.setOption(option);
				}
			},
			init : function(init){
				_obj = this;
			}
		}
	})();
	ECharts.init();
	return ECharts;
})