hmd.extend(hmd.methods,{
	/*
	 * @description 返回数组最大值
	*/
	max : function(arr){
		return Math.max.apply({},arr);
	},
	/*
	 * @description 返回数组最小值
	*/
	min : function(arr){
		return Math.min.apply({},arr);
	},
	/*
	 * @description 判断对象是否为空对象
	*/
	isEmptyObject : function(obj){
		for (var p in obj) {
			return false;
		}
		return true;
	},
	/*
	 * @description 判断类型
	*/
	type : function(obj){
		var str = toString.call(obj).replace(/[\[\]]/g,''),
			arr = str.split(' ');
		return arr[1].toLowerCase();
	},
	single : function(arr,index){
		var hash = {},
			ret = [];		
		if(arguments.length == 1){
			for(var i=0,len=arr.length;i<len;i++){
				var item = arr[i],
					temp = (typeof item) +item
				if(hash[temp] !== 1){
					hash[temp] = 1;
					ret.push(item);
				}
			}
		}else{
			for(var i=0,len=arr.length;i<len;i++){
				var item = arr[i],
					oindex = item[index],
					temp = (typeof oindex) + oindex;
				if(hash[temp] !== 1){
					hash[temp] = 1;
					ret.push(item);
				}
			}
		}
		
		return ret;
	}
});