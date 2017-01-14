
var parkArray = [];
//Calculate the center point of each park
for(var i in natReserves.features){

    console.log(natReserves.features[i].properties.Name);

    var natural_reserves = L.geoJson( natReserves.features[i]);
    
    
   // console.log(natural_reserves.getBounds().getCenter());

    var center = natural_reserves.getBounds().getCenter();

    var parkName = natReserves.features[i].properties.Name;

    //TODO
    var coord= [center.lat, center.lng , 90]; //hardcoding intensity values for now

    console.log(coord);

     var park = {name : parkName, heat:coord };

    parkArray.push(park);
}

//populate matrix for heat map 
var heatArray=[];

for(var i in parkArray){
    heatArray.push( parkArray[i].heat );
}


console.log(heatArray);

var heat_layer = L.heatLayer(heatArray, {radius: 25});

