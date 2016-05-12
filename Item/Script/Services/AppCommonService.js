hmd.extend(hmd.service,{
	getJson : function(callback){
		hmd.getJSON('./Script/JSON/default.json',callback);
	},
	getLineData : function(callback){
		hmd.ws('ws://139.162.32.175:8000/world',callback);
	},
	getMapData : function(callback){
		hmd.ws('ws://139.162.32.175:8000/world',callback);
	},
	getCircleData : function(callback){
		hmd.ws('ws://139.162.32.175:8000/ratio',callback);
	}
});






