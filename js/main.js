/*var baseUrl = 'https://easy-mock.com/mock/5bfd0066e14e0125f051fe18/dapi'*/
var cityCp ={
      "哈尔滨": [
        26.38,
        45.45
      ],
      "长春": [
        125.18,
        43.55
      ],
      "乌鲁木齐": [
        87.36,
        43.46
      ],
      "沈阳": [
        123.23,
        41.48
      ],
      "呼和浩特": [
        111.38,
        40.48
      ],
      "北京": [
        116.28,
        39.54
      ],
      "天津": [
        117.1,
        39.1
      ],
      "银川": [
        106.13,
        38.28
      ],
      "石家庄": [
        114.26,
        38.03
      ],
      "太原": [
        112.33,
        37.51
      ],
      "济南": [
        117.02,
        36.4
      ],
      "西宁": [
        101.49,
        36.37
      ],
      "兰州": [
        103.5,
        36.03
      ],
      "郑州": [
        113.42,
        34.44
      ],
      "西安": [
        108.55,
        34.15
      ],
      "合肥": [
        117.16,
        31.51
      ],
      "上海": [
        121.26,
        31.12
      ],
      "武汉": [
        114.2,
        30.37
      ],
      "南京": [
        118.46,
        32.03
      ],
      "成都": [
        104.04,
        30.39
      ],
      "杭州": [
        20.1,
        30.15
      ],
      "拉萨": [
        91.02,
        29.39
      ],
      "重庆": [
        106.33,
        29.33
      ],
      "南昌": [
        115.53,
        28.41
      ],
      "长沙": [
        112.55,
        28.12
      ],
      "贵阳": [
        106.43,
        26.34
      ],
      "福州": [
        119.19,
        26.02
      ],
      "昆明": [
        102.42,
        25.03
      ],
      "台北": [
        121.31,
        25.02
      ],
      "广州": [
        113.18,
        23.1
      ],
      "南宁": [
        108.21,
        22.47
      ],
      "澳门": [
        113.5,
        22.2
      ],
      "香港": [
        114.15,
        22.15
      ],
      "海口": [
        110.1,
        20.03
      ]
    }
var baseUrl = 'http://fik7h6.natappfree.cc/v'
var that = new Vue({
	el: '#app',
	data: {
		SIZE: 0,
		barCharStyle: {},
		downloadProvinceTop: '',
		downloadUserTop: '',
		downloadTrafficTop: '',
		topT12: '',
		other12: '',
		appTop18:'',
		gameTop18:'',
		cityData: '',
		showR1: false,
		leftChartFlag: false,
		r1Temp: 0,
		nowDate: '',
		nowTime: '',
		commonOption: {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '5%',
				right: '0%',
				top: '0%',
				bottom: 0,
				containLabel: true
			},
			xAxis: {
				show: false, //隐藏y轴坐标线
				type: 'value',
				boundaryGap: [0, 0.01],
			},
		},
		myChartFen: '',
		myChartUser: '',
		myChartLiu: '',
		myChartFen2: '',
		myChartUser2: '',
		myChartLiu2: '',
	},
	methods: {
		getTop12() {
			axios.post(baseUrl + '/screenData/top10?key=downloadApp')
				.then(function(response) {
					console.log(response)
					that.appTop18 = response.data.data
					//json排序
					that.appTop18.sort(function(x, y) {
						return y.value - x.value;
					})
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		getTopOther12() {
			axios.post(baseUrl + '/screenData/top10?key=downloadGame')
				.then(function(response) {
					that.gameTop18 = response.data.data
					//json排序
					that.gameTop18.sort(function(x, y) {
						return y.value - x.value;
					})
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		showOrHide() {
			setInterval(function() {
				that.r1Temp++;
				var tag = that.r1Temp % 2 == 0 ? true : false
				if(!tag) {
					that.showR1 = true
					that.leftChartFlag = true
				} else {
					that.showR1 = false
					that.leftChartFlag = false
				}
			}, 6000)
		},
		initChart() {
			// 基于准备好的dom，初始化echarts实例
			this.myChartFen = echarts.init(this.$refs.fenshengDown);
			this.myChartUser = echarts.init(this.$refs.downUser);
			this.myChartLiu = echarts.init(this.$refs.downLiuliang);

			this.myChartFen2 = echarts.init(this.$refs.fenshengDown2);
			this.myChartUser2 = echarts.init(this.$refs.downUser2);
			this.myChartLiu2 = echarts.init(this.$refs.downLiuliang2);

			//柱状图实际数据
			var valOption1 = {
				color: '#357DFF',
				yAxis: {
					axisLabel: {
						show: true,
						textStyle: {
							color: '#D9EBFF' //y轴颜色
						}
					},
					type: 'category',
					// y 轴线
					axisTick: {
						show: false
					},
					data: this.yAxisData6F
				},
				series: [{
					type: 'bar',
					data: this.seriesData6F

				}, ]
			}
			var valOption2 = {
				color: '#FFA95C',
				yAxis: {
					axisLabel: {
						show: true,
						textStyle: {
							color: '#D9EBFF' //y轴颜色
						}
					},
					type: 'category',
					// y 轴线
					axisTick: {
						show: false
					},
					data: this.yAxisData6U
				},
				series: [{
					type: 'bar',
					data: this.seriesData6U,

				}, ]
			}
			var valOption3 = {
				color: '#81D7FF',
				yAxis: {
					axisLabel: {
						show: true,
						textStyle: {
							fontSize: 0.16 * this.SIZE + 'px',
							color: '#D9EBFF' //y轴颜色
						}
					},
					type: 'category',
					// y 轴线
					axisTick: {
						show: false
					},
					data: this.yAxisData6L
				},
				series: [{
					type: 'bar',
					data: this.seriesData6L,

				}, ]
			}

			var valOption11 = {
				color: '#357DFF',
				yAxis: {
					axisLabel: {
						show: true,
						textStyle: {
							color: '#D9EBFF' //y轴颜色
						}
					},
					type: 'category',
					// y 轴线
					axisTick: {
						show: false
					},
					data: this.yAxisData12F
				},
				series: [{
					type: 'bar',
					data: this.seriesData12F

				}, ]
			}
			var valOption21 = {
				color: '#FFA95C',
				yAxis: {
					axisLabel: {
						show: true,
						textStyle: {
							color: '#D9EBFF' //y轴颜色
						}
					},
					type: 'category',
					// y 轴线
					axisTick: {
						show: false
					},
					data: this.yAxisData12U
				},
				series: [{
					type: 'bar',
					data: this.seriesData12U,

				}, ]
			}
			var valOption31 = {
				color: '#81D7FF',
				yAxis: {
					axisLabel: {
						show: true,
						textStyle: {
							fontSize: 0.16 * this.SIZE + 'px',
							color: '#D9EBFF' //y轴颜色
						}
					},
					type: 'category',
					// y 轴线
					axisTick: {
						show: false
					},
					data: this.yAxisData12L
				},
				series: [{
					type: 'bar',
					data: this.seriesData12L,

				}, ]
			}
			/*====================================*/
			var initOptions1 = Object.assign({}, this.commonOption, valOption1)
			var initOptions2 = Object.assign({}, this.commonOption, valOption2)
			var initOptions3 = Object.assign({}, this.commonOption, valOption3)

			var initOptions11 = Object.assign({}, this.commonOption, valOption11)
			var initOptions21 = Object.assign({}, this.commonOption, valOption21)
			var initOptions31 = Object.assign({}, this.commonOption, valOption31)

			this.myChartFen.setOption(initOptions1);
			this.myChartUser.setOption(initOptions2);
			this.myChartLiu.setOption(initOptions3);

			this.myChartFen2.setOption(initOptions11);
			this.myChartUser2.setOption(initOptions21);
			this.myChartLiu2.setOption(initOptions31);
		},
		//柱状图数据
		getScreenDataT10() {
			/*        	downloadProvinceTop6:'',
					downloadProvinceTop12:'',
					downloadUserTop6:'',
					downloadUserTop12:'',
					downloadTrafficTop6:'',
					downloadTrafficop12:'',*/
			var that = this
			// --流量
			axios.post(baseUrl + '/screenData/top10?key=downloadTraffic')
				.then(function(res) {
					var resData = res.data.data
					if(resData!=null || resData!=undefined || resData!=''){
					var dataObj = that.exchanDataTobar(res.data.data)
					//绘图数据的顺序和排序刚好相反，前端展示的和实际顺序一样
					//slice实现数组拷贝
					that.downloadTrafficTop = dataObj.topData.slice(0).reverse()
					that.yAxisData6L = dataObj.yAxisData.slice(6, 12)
					that.seriesData6L = dataObj.seriesData.slice(6, 12)
					that.yAxisData12L = dataObj.yAxisData.slice(0, 6)
					that.seriesData12L = dataObj.seriesData.slice(0, 6)
					that.initChart()
					}
				})
				.catch(function(error) {
					console.log(error);
				});
				
			//分省下载量
			axios.post(baseUrl + '/screenData/top10?key=downloadProvince')
				.then(function(res) {
					var resData = res.data.data
					if(resData!=null || resData!=undefined || resData!=''){
						var dataObj = that.exchanDataTobar(res.data.data)
					//绘图数据的顺序和排序刚好相反，前端展示的和实际顺序一样
					//slice实现数组拷贝
					that.downloadProvinceTop = dataObj.topData.slice(0).reverse()
					that.yAxisData6F = dataObj.yAxisData.slice(6, 12)
					that.seriesData6F = dataObj.seriesData.slice(6, 12)
					that.yAxisData12F = dataObj.yAxisData.slice(0, 6)
					that.seriesData12F = dataObj.seriesData.slice(0, 6)
					that.initChart()
					}
					
				})
				.catch(function(error) {
					console.log(error);
				});
		//用户
			axios.post(baseUrl + '/screenData/top10?key=downloadUser')
				.then(function(res) {
					var resData = res.data.data
					if(resData!=null || resData!=undefined || resData!=''){
						var dataObj = that.exchanDataTobar(res.data.data)
					//绘图数据的顺序和排序刚好相反，前端展示的和实际顺序一样
					//slice实现数组拷贝
					that.downloadUserTop = dataObj.topData.slice(0).reverse()
					that.yAxisData6U = dataObj.yAxisData.slice(6, 12)
					that.seriesData6U = dataObj.seriesData.slice(6, 12)
					that.yAxisData12U = dataObj.yAxisData.slice(0, 6)
					that.seriesData12U = dataObj.seriesData.slice(0, 6)
					that.initChart()
					}
					
				})
				.catch(function(error) {
					console.log(error);
				});		
		},
		//柱状图构造返回数据格式
		exchanDataTobar(arrData) {
			//chart数据
			var temp = arrData.sort(function(x, y) {
				return x.value - y.value;
			})

			var topData = [];
			var j = temp.length;
			for(var i = 0; i < temp.length; i++) {
				var rank = j--;
				var obj = {
					name: rank + '  ' + temp[i].name,
					ranking: rank,
					value: temp[i].value
				}
				topData.push(obj)
			}
			var yAxisData = [],
				seriesData = []
			topData.forEach(function(item) {
				yAxisData.push(item.name)
				seriesData.push(item.value)
			})
			return {
				topData: topData,
				yAxisData: yAxisData,
				seriesData: seriesData
			}
		},
		getCityData() {
			var that = this
			return new Promise(function(resolve, reject) {
				axios.post(baseUrl + '/screenData/top10?key=mapData')
					.then(function(res) {
					var resData = res.data.data
					if(resData!=null || resData!=undefined || resData!=''){
						that.cityData = res.data.data
						that.geoCoordMap = cityCp
                        var seriesData =  that.convertData(that.cityData)
                        var showSeriesData  = seriesData.slice(0)
                        var sortData =  that.convertData(that.cityData.sort(function(a, b) {
										return b.value - a.value;
									}).slice(0, 6))
						// 2、map的配置，配置 option，新建一个地理坐标系 geo ，地图类型为中国地图
						that.mapoption = {
							tooltip: {
								trigger: 'item',
								 formatter: function(params) {
								  let html = ''
				                    html = '<div>下载量</div>'+
				                            '<div><span style="display:inline-block;width: 16px;height: 16px;' +
				                             'border-radius: 50%;margin-right:3px;vertical-align:middle;background-color: '+ params.color+' ">' +
				                            '</span>'+ params.name + ':' + params.value[2]+'</div>'
				                 return html;
				            }
							},
							geo: {
								map: 'china',
								label: {
									emphasis: {
										show: false
									}
								},
								roam: true,
								itemStyle: {
									// 普通状态下的样式
									normal: {
										areaColor: 'transparent',
										borderColor: '#3fdaff',
										borderWidth: 2,
										shadowColor: 'rgba(63, 218, 255, 0.5)',
										shadowBlur: 30
									},
									// 高亮状态下的样式
									emphasis: {
										areaColor: '#2B91B7',
									}
								}
							},
							series: [{
									name: '下载量',
									type: 'scatter',
									coordinateSystem: 'geo',
									data: showSeriesData,
									symbolSize: function(val) {
										return val[2] / 50;
									},
									label: {
										normal: {
											formatter: '{b}',
											position: 'right',
											show: false
										},
										emphasis: {
											show: true
										}
									},
									itemStyle: {
										normal: {
											color: '#ddb926'
										}
									}
								},
								{
									name: 'Top 5',
									type: 'effectScatter',
									coordinateSystem: 'geo',
									data: sortData,
									symbolSize: function(val) {
										return val[2] / 50;
									},
									showEffectOn: 'render',
									rippleEffect: {
										brushType: 'stroke'
									},
									hoverAnimation: true,
									label: {
										normal: {
											formatter: '{b}',
											position: 'right',
											show: true
										}
									},
									itemStyle: {
										normal: {
											color: '#f4e925',
											shadowBlur: 10,
											shadowColor: '#333'
										}
									},
									zlevel: 1
								}
							]
						};
						that.setMapChart()
						resolve(res.data);
					}
						
					})
					.catch(function(error) {
						reject(error);
					});
			});

		},
		//（4）将数据和城市坐标对应上
		convertData(data) {
			
			var res = [];
			for(var i = 0; i < data.length; i++) {
				
				var geoCoord = this.geoCoordMap[data[i].name];
				if(geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value)
					});
				}
			}
			return res;
		},
		initMapChart() {
			this.mapChart = echarts.init(this.$refs.chinaMap);
			echarts.registerMap('china', window.chinaJson); // 注册地图
		},
		setMapChart() {
			var that = this
			//3、调用 setOption(option) 为图表设置配置项
			this.mapChart.setOption(that.mapoption);
			// 动态显示tootip
			var faultByHourIndex = 0; //播放所在下标
			var faultByHourTime = setInterval(function() { //使得tootip每隔三秒自动显示
				that.mapChart.dispatchAction({
					type: 'showTip', // 根据 tooltip 的配置项显示提示框。
					seriesIndex: 0,
					dataIndex: faultByHourIndex
				});
				faultByHourIndex++;
				// mapoption.series[0].data.length 是已报名纵坐标数据的长度
				if(faultByHourIndex > that.mapoption.series[0].data.length) {
					faultByHourIndex = 0;
				}
			}, 3000);
		},
		setTotalDownNum() {
			axios.post(baseUrl + '/screenData/total')
				.then(function(res) {
					var resData = res.data.data
					if(resData!=null || resData!=undefined || resData!=''){
						var total = res.data.data.downloadTotal
					$('.down-app-total').rollNum({
						deVal: parseInt(total)
					});
					}
					
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		setDate() {
			var date = new Date();
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			var d = date.getDate();
			this.nowDate = y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
		},
		setTime() {
			var time = new Date(); //获取系统当前时间
			var hour = time.getHours();
			var minutes = time.getMinutes();
			var seconds = time.getSeconds();
			if(hour < 10) {
				hour = "0" + hour;
			}
			if(minutes < 10) {
				minutes = "0" + minutes;
			}
			if(seconds < 10) {
				seconds = "0" + seconds;
			}
			this.nowTime = hour + ":" + minutes + ":" + seconds;
		},
	},
	created: function() {
		//获取地图数据

		(function(win, designW) {
			var doc = win.document;
			var docEle = doc.documentElement;
			designW = designW || 1920; //设计稿宽度px,默认640px设计稿
			var ratio = designW / 100; //640px=> 1rem = 100px, 超出640px font-size：100px;
			var or = "orientationchange" in win ? "orientationchange" : "resize";
			//创建viewport	
			_createViewport();
			_refreshRem()
			/*if(doc.addEventListener){
				win.addEventListener(or, _refreshRem, false);
				doc.addEventListener("DOMContentLoaded", _refreshRem, false);
			}*/
			/**
			 * 创建viewport
			 */
			function _createViewport() {
				var metaEl = doc.createElement('meta');
				metaEl.setAttribute('name', 'viewport');
				metaEl.setAttribute('content', 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
				if(docEle.firstElementChild) {
					docEle.firstElementChild.appendChild(metaEl);
				}
			}
			/**
			 * 动态更新rem
			 */
			function _refreshRem() {
				var clientW = docEle.clientWidth || 320;
				//设置最大和最小宽度取值
				if(clientW > designW) {
					clientW = designW
				} else if(clientW < 320) {
					clientW = 320;
				}
				docEle.style.fontSize = clientW / ratio + "px";
				SIZE = clientW / ratio
				window.FONTSIZE = clientW / ratio
			};
		})(window, 1920); //750为设计稿宽度px值,根据实际设计稿大小对应设置
	},
	mounted: function() {
		$('.fensheng-down').css({
			"width": 4 * window.FONTSIZE + "px",
			"height": 2.5 * window.FONTSIZE + "px"
		})
		$('.chart-item2').css({
			"width": 4 * window.FONTSIZE + "px",
			"height": 2.5 * window.FONTSIZE + "px"
		})
		$('.china-map').css({
			"width": 8.8 * window.FONTSIZE + "px",
			"height": 6.7 * window.FONTSIZE + "px"
		})
		this.getTop12()
		this.getTopOther12()
		this.showOrHide()
		this.setDate()

		setInterval(() => {
			this.setDate()
		}, 1000 * 60 * 60)
		this.setTime()
		setInterval(() => {
			this.setTime()
		}, 1000)

		this.setTotalDownNum()
		setInterval(() => {
			this.setTotalDownNum()
		}, 6000)
		this.getScreenDataT10()
		this.initMapChart()
		this.getCityData()
		
		setInterval(() => {
			this.getTop12()
		    this.getTopOther12()
			this.getCityData()
			this.getScreenDataT10()
		}, 1000 * 60 * 3)
		
		setInterval(() => {
			this.setTotalDownNum()
		}, 6000)
	},

})