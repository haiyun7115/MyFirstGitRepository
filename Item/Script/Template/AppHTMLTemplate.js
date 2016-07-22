hmd.extend(hmd.template,{
	/*
	 * @description 循环数据 根据页面元素进行渲染，只能是页面初始化时使用
	 * @param attr 属性
	*/
	'data-repeat' : function(attr){
		attr = attr || 'data-repeat';
		var arr = [].slice.call(hmd.getElementByAttr(attr),0),
			reg = /\{\{([a-z0-9_-]+)\}\}/g,
			_arr = [],str='',datasource=[];
		var data_a = [{name_a:'aaa',age_a:23,'a-1-a':'qqq'},{name_a:'aaab',age_a:11,'a-1-a':'qwe'}];
		var data_b = [{name_b:'bbb',age_b:32,'a-1-b':'qqq'},{name_b:'bbb',age_b:34,'a-1-b':'bbbooo'}];
		var data_c = [{name_c:'aaa',age_c:23,'a-1-c':'qqq'},{name_c:'bbb',age_c:34,'a-1-c':'ccooo'}];
		var source = {
			data_a : data_a,
			data_b : data_b,
			data_c : data_c
		};
		hmd.each(arr,function(index,element){
			str = $(this).html();
			_arr = [];
			datasource = source[$(this).attr(attr)];
			hmd.each(datasource,function(p,obj){
				_arr.push(str.replace(reg,function($1,$2){					
					return obj[$2];	
				}));
			});
			$(this).html(_arr.join(''));
		})
	}
});