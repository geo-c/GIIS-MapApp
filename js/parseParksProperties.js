
//Returns area of park based on its name
//Required name must be present atleast once
function getArea(parkName){

	//console.log("park name sent"+parkName);

	var area="";

	for(i=0; i<d_parks.length;i++){
		if( d_parks[i].name==parkName ){
			//console.log("park names"+parkName);
			area=d_parks[i].area;
		}

   }

	return area;
}