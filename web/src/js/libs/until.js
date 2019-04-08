define(function(){
	 return{
		 getUid(){
			  let common=localStorage.getItem('common')
	 			if(!common){
	 				localStorage.setItem('common','5c9330ea15a18060cc4d3dc9')
	 			}
	 			return common
		 },
		 format(data,key){
			 var obj={};
			 data.forEach(item=>{
				    if(!obj[item[key]]){
						obj[item[key]]=[];
					}
					obj[item[key]].push(item)
			 })
			 return obj
		 }
	 }
	
 })