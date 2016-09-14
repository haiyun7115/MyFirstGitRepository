hmd.extend(hmd.methods,{
	/*
	 * @description 对遮罩层的操作
	 */
	maskLayerObj : {
		maskLayer : function(_label){
			var _doc = document,
				getHTMLSize = this.getHTMLSize(),
				_width = getHTMLSize.width,
				_height = getHTMLSize.height,
				_mask = _doc.createElement(_label);
			_mask.id = 'masklayer201608241556';
			_mask.style.cssText = 'position: absolute;top:0;left: 0;width:'+_width+'px;height:'+
			_height+'px;background-color:#000;opacity:0.7;filter:alpha(opacity=70);z-index:9999';
			$(_doc.body).append(_mask);
		},
		//获取遮罩层的宽度和高度
		getHTMLSize : function(win){
			win = win || document.body;
			var _doc =document;
			var _width = $(win).width(),
				_height = $(win).height();
			return {width:_width,height:_height}
		},
		layer_id : 'masklayer201608241556',
		//关闭遮罩层
		_close : function(){
			$('#'+this.layer_id).remove();
		},
		//打开遮罩层
		_open : function(_label){
			this.maskLayer(_label);
		},
		//记录弹出层
		$currentDiv : null,
		//关闭弹出层
		close : function(){
			if(this.$currentDiv){
				this._close();
				this.$currentDiv.hide();
				this.$currentDiv = null;
			}
		}
	},
	/*
	 * @description 弹出层的操作
	 * @this作用域改变成页面元素
	 * @params obj 一个对象里面包括 label(标签):你要创建什么页面元素，比如label:'div'
	 * $obj 表示页面元素，是jquery对象
	 * hmd.methods.maskLayerObj.close();关闭
	 * hmd.methods.operateLayer({$obj:$('#orderForm2')},function(){
					methods.clearText(html_arr);
				});
	 */
	operateLayer : function(obj,callback){
		var label = obj && obj.label ? obj.label : 'div',
			$obj = obj.$obj,//弹出层的jquery对象
			self = this,
			__maskLayerObj = this.maskLayerObj;
		__maskLayerObj.$currentDiv = $obj;
		__maskLayerObj._open(label);
		var getHTMLSize = __maskLayerObj.getHTMLSize(window),
			_scroll_top = $(window).scrollTop(),
			_top = getHTMLSize.height/2 - $obj.height()/2+_scroll_top,
			_left = getHTMLSize.width/2 - $obj.width()/2;
		$obj[0].style.cssText = 'position:absolute;top:'+_top+'px;left:'+_left+'px;z-index:10000';
		$obj.show();
		if(callback){
			callback();
		}
	},
	/*
	 * @description 将后台信息弹出
	 * @params 如果参数是汉字，那么status(1:成功，2：失败)
	 * @ current_class包括(ico-ok,ico-error)
	 */
	popupInfo : function(code,status){
		var _doc = document,
            _div = _doc.createElement('div'),
            _scroll_top = $(window).scrollTop(),
            _width = $(window).width()/2,
            _height = $(window).height()/2,
            current_class,_code,_status,str = ''
        _div.id = 'error_info_201608261009';
        _div.className = 'zjtg_up';//改变此class可以改变样式
        
        if(arguments.length == 1){//
        	
        }
        if(arguments.length > 1){
        	if(status === 'ok'){
        		current_class = 'ico-ok';
        		str = '<p>'+code+'</p>';
        	}else if(status === 'error'){
        		current_class = 'ico-error';
        		str = '<p style="color:red;">'+code+'</p>';
        	}
        }
        _div.innerHTML = str;
        _doc.body.appendChild(_div);
        _div.style.cssText = 'top:'+(_height-$(_div).height()/2+_scroll_top)+'px; left: '+(_width-$(_div).width()/2)+'px; z-index:10001;padding:25px;height:auto; ';
        setTimeout(function(){
            $(_div).remove();
        },1000);
	},
	/*
	 * @description 委托代理
	 * @params obj 里面的参数包括：type(代表事件类型，默认为click)
	 * $obj 代表页面元素，jquery对象
	 * callback 代表函数
	 */
	delegate : function(obj){
		var type = obj && obj.type ? obj.type : 'click',
			$obj = obj.$obj,
			callback = obj.callback;
		$obj.bind(type,function(e){
			callback.call(this,e);
		})
		
	},
	/*
	 * @description 倒计时，默认60秒
	 * @params obj {$el:$el,$span:$span}  $el为按钮, $span为显示时间的标签,次标签需要被包裹一层
	 * @call hmd.methods.countDown({
			$el : $(this),
			$span : $('#ospan')
		}).init();
	 */
	countDown : function(obj){
		var self = this,
			$el = obj.$el,
			$span = obj.$span,
			_time = this.pub_data.time;
		return {
				count : function(){
					var pub_data = self.pub_data;
					if(_time == 0){
						this.clearTime();						
					}else{
						_time--;
						this.operateFn($el,$span,1);
					}
				},
				setTime : function(){
					this.operateFn($el,$span,1);
					var _self = this;
					self.pub_data._count_down_time = setInterval(function(){
						_self.count(obj);
					},1000);
				},
				clearTime : function(){
					clearInterval(self.pub_data._count_down_time);
					_time = self.pub_data.time;
					this.operateFn($el,$span,0);
				},
				/*
				 * @description 获取验证码按钮和显示框的操作
				 * @params $a 代表按钮  $b代表显示框，status 代表状态 1代表按钮操作，0代表显示框
				*/
				operateFn : function($a,$b,status){
					$b.html(_time);
					if(status == 1){
						$a.hide();
						$b.parent().show();
					}else{
						$a.show();
						$b.parent().hide();
					}
				},
				init : function(){
					this.setTime();	
				}
		}
	},
	/*
	 * @description 根据模板和参数生成html串
	 * @params obj {id:id,params : {'%s':'id','%t':'name'},data:[{id:'aaa',name:'bbb'},{id:'ccc',name:'ddd'}]}id表示模板的id,
	 * params表示模板里面的参数 eg:%s可以取到数组每一项里面的key
	 * data表示数据
	 */
	generateStringByTemplate : function(obj){
		var id = obj.id,
			params = obj.params,
			data = obj.data,
			$script = $('#'+id),
			txt = $script.text(),
			param_arr = [],
			param_str = '',
			reg = null,
			_arr = [];
		for(var index in params){
			param_arr.push(index);
		}
		
		param_str = param_arr.join('|');
		reg = new RegExp(param_str,'g');
		$(data).each(function(index,element){
			_arr.push(txt.replace(reg,function(a,b){
				return element[params[a]];
			}));
		});
		return _arr.join('');
			
	},
	/*
	 * @description 把location的search转换成对象
	 * @param s 表示search
	 */
	changeLocationSearchToObject : function(s){
		var arr = s.split('&'),
			obj = {};
		$(arr).each(function(index,element){
			var el = element.split('='),
				_key = el[0],
				_value = el[1];
			obj[_key] = _value;
		});
		return obj;
	},
	/*
	 * @description 根据文本框的属性reg来进行keyup事件注册
	 */
	operateEventsByAttributes : function($el){
		var self = this;
    	$el.keyup(function(e){
    		var target = e.target;
    		if(target.nodeName === 'INPUT'){
				if(target.type === 'text'){
					if($(target).attr('reg')){
						if($(target).attr('reg') === 'integer'){
							target.value = target.value.replace(/[^\d]/g,'');
						}
						if($(target).attr('reg') === 'decimal' || $(target).attr('reg') === 'decimalII' || $(target).attr('reg') === 'decimalIII'){
							target.value = target.value.replace(/[^\d\.]/g,'');
						}
						if($(target).attr('reg') === 'intAndEnglish'){
							target.value = target.value.replace(/[^\da-zA-Z]/g,'');
						}
					}
				}
			}
    	});
    	$el.focusout(function(e){
    		var target = e.target;
			if(target.nodeName === 'INPUT'){
				if(target.type === 'text'){
					if($(target).attr('reg')){
						if($(target).attr('reg') === 'decimal'){
							//self.checkFormat($(target));
						}
                        if($(target).attr('reg') === 'decimalII'){//保留两位小数
                           // self.formatToDecimalTwo($(target),2);
                        }
                        if($(target).attr('reg') === 'decimalIII'){//保留一位小数
                            //self.formatToDecimalTwo($(target),1);
                        }
					}
				}
			}
    	});
	}
});