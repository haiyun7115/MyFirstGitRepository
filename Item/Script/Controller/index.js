;!function(){
	/*hmd.getPlugin('jqueryUI',function(plugin){
		$('#datepicker').datepicker();
	});
	hmd.getService('AppCommonService',function(service){
		$('#btn').click(function(){
			service.getJson(function(response){
				var odiv = $('#odiv'),
					arr = ['<ul>'];
				this(response).each(function(index,element){
					arr.push('<li>'+index+': '+element+'</li>');
				});
				arr.push('</ul>');
				odiv.html(arr.join(''));
			});
		});
	});
	hmd.getMethods('AppCommonMethods',function(method){
		$('#btnII').click(function(){
			var msg = method.getMethods('中国的特种兵');
			console.log(msg);
		});
	});*/
	var url_arr = [
		'./Script/Libs/jqueryUI.js',
		'./Script/Services/AppCommonService.js',
		'./Script/Methods/AppCommonMethods.js',
		'./Script/Template/AppHTMLTemplate.js'
	];
	hmd.require(url_arr,function(){
		$('#datepicker').datepicker();		
		var data_b = [{name_b:'bbb',age_b:32,'a-1-b':'qqq'},{name_b:'bbb',age_b:34,'a-1-b':'bbbooo'}];
		hmd.operateTemplateByHTML();
		hmd.operateTemplateByScript('script',data_b);
		hmd(data_b).each(function(index,element){
			//console.log(this)
		})
		hmd.each(data_b,function(index,element){
			console.log(this)
		})
		//hmd.extend()
	});
	
	
}();
