;!function(){
	var _obj = {},
		toString = _obj.toString;
	function _Class(selector){
		return new _Class.fn.init(selector);
	}
	_Class.fn = _Class.prototype = {
		constructor : _Class,
		version : '1.0',
		each : function(callback){
			var selector = this.selector;
			if(selector){
				if(toString.call(selector) === '[object Array]'){
					for(var i=0,len=selector.length;i<len;i++){
						(function(index){
							callback.call(this,index,selector[index]);
						})(i);						
					}
				}
				if(toString.call(selector) === '[object Object]'){
					for(var i in selector){
						(function(index){
							callback.call(this,i,selector[i]);
						})(i);							
					}
				}
			}
		}
	};
	_Class.extend = _Class.fn.extend = function(){
		var obj = arguments[0] || {},
			i = 1,
			len = arguments.length;
		if(arguments.length == i){
			obj = this;
			i--;
		}

		for(;i<len;i++){
			var args = arguments[i];
			for(var index in args){
				obj[index] = args[index];
			}
		}
		return obj;
	}
	/*
	 * @description 为构造函数添加方法
	 */
	_Class.extend({
		send : function(obj,callback){
			var url = obj.url,
				type = obj.type || 'get',
				data = obj.data || {},
				dataType = obj.dataType || 'string',
				self = this;
			$.ajax({
				url : url,
				type : type,
				data : data,
				dataType : dataType,
				success : function(msg){
					callback.call(self,msg);
				},
				error : function(e,t){
					console.log(e,t)
				}
			});
		},
		getJSON : function(url,callback){
			var self = this;
			$.getJSON(url,function(response){
				callback.call(self,response);
			})
		},
		/*
		 * @description 服务放到此处
		 */
		service : {},
		/*
		 * @description 第三方控件存放处
		 */
		plugin : {},
		
		/*
		 * @description 公共方法
		 */
		methods : {},				
		
		/*
		 * @description 加载js文件
		 */
		
		getScript : function(url,callback,nameSpace){
			var doc = document,
				head = doc.getElementsByTagName('head')[0],
				script = doc.createElement('script'),
				self = this;
			script.type = 'text/javascript';
			script.onload = script.onreadystatechange = function(){
				if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete' ){
					if(callback){
						nameSpace = nameSpace || {};
						callback.call(self,nameSpace);
					}
					// Handle memory leak in IE
					script.onload = script.onreadystatechange = null;
				}
			};
			script.src = url;
			head.appendChild(script);
		},
		getService : function(_url,callback){
			var url = './Script/Services/'+_url+'.js';
			this.getScript(url,callback,this.service);
		},
		getPlugin : function(_url,callback){
			var url = './Script/Libs/'+_url+'.js';
			this.getScript(url,callback,this.plugin);
		},
		getMethods : function(_url,callback){
			var url = './Script/Methods/'+_url+'.js';
			this.getScript(url,callback,this.methods);
		},
		require : function(script_arr,callback){
			var self = this;
			if(script_arr.length){
				this.getScript(script_arr.shift(),function(){
					if(script_arr.length == 1){
						self.getScript(script_arr[0],callback);
					}else if(script_arr.length > 1){
						self.require(script_arr,callback);
					}
				});
			}
		}
	});

	var init = _Class.fn.init = function(selector){
		if(arguments.length == 0){
			this.selector = null;			
		}else{
			this.selector = selector;
		}		
		return this;
	};

	init.prototype = _Class.fn;

	this.hmd = _Class;
	
}();