"use strict";

var currentLayer = null;
// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 12, attribution: osmAttrib});
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ';
//grey basemap from mapbox
var greyscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
	dark = L.tileLayer(mbUrl, {id: 'mapbox.dark', attribution: mbAttr});

var legend = L.control({position: 'bottomright'});

//add json layer by styling and registering event for each park
var natural_reserves = L.geoJson(
    natReserves,
	{
        style : reservesStyle,
        onEachFeature: onEachFeature
    }
);

var biodiversity_layer = L.geoJson(natReserves, {style: reservesStyleBio, onEachFeature: onEachFeature});
var deforestation_layer = L.geoJson(natReserves, {style: reservesStyleDeforest, onEachFeature: onEachFeature});
// group the layer to display them with radio controls
var groupedOverlays = {
      "Indices": {
        "None": natural_reserves,
        "Biodiversity": biodiversity_layer ,
        "Deforestation": deforestation_layer
      }
};

// specify the radio controls for indices
var options = {exclusiveGroups: ["Indices"]};


//init map
var map = new L.Map('map', {
    layers: [osm]
});

//adding parks layer
map.addLayer(natural_reserves);

//zooming in to parks bounds
map.fitBounds(natural_reserves.getBounds());

//restrict map to area of interest only
map.setMaxBounds(natural_reserves.getBounds());

var baseMaps = {
    "OpenStreetMap": osm,
    "Dark Basemap":dark,
    "Light Basemap":greyscale,
      
};


//Creating a layer control and adding it to map
L.control.groupedLayers(baseMaps, groupedOverlays, options).addTo(map);

map.on('overlayadd', function(layer){
    if(layer.name == 'Biodiversity') {
        natural_reserves.setStyle(reservesStyleBio);
        addLegendBio();
    }
    else if(layer.name == 'Deforestation') {
        natural_reserves.setStyle(reservesStyleDeforest);
        addLegendDeforest();
    }
    currentLayer = layer;
    if(layer.name == 'None'){
        currentLayer = null;
        natural_reserves.setStyle(reservesStyle);
        //remove existing temporary parks if exist 
        //created by search criteria result
        console.log('in function');
        removeTemporaryParks();
        this.removeControl(legend);

        //zooming in to parks bounds
        map.fitBounds(natural_reserves.getBounds());
    }  
});


function reservesStyle(feature) {
    if(currentLayer != null) {
        if(currentLayer.name == "Biodiversity") return reservesStyleBio(feature);
        else if(currentLayer.name == "Deforestation") return reservesStyleDeforest(feature);
    }
    else
    return {
        fillColor: '#008000',
        weight: 0.5,
        opacity: 1,
        color: '#FFFFFF',
        dashArray: '3',
        fillOpacity: 0.6
    }
}

function reservesStyleDeforest(feature) {
    return {
        fillColor: getColorDeforest(feature.properties.Deforestat),
        weight: 0.5,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function getColorDeforest(deforestation) {
        return deforestation >=10.1  ?'#E31A1C' :
           deforestation >=5.9   ?'#FC4E2A' :
           deforestation >=3.5   ?'#FFFF00'    :
           deforestation >=1.4   ? '#38A800' :
           deforestation >= 0.21    ? '#8BD100' :
                      '#A3FF73';
}

function addLegendDeforest(){

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0.21, 1.4, 3.5, 5.9, 10.1],
			labels = [];

		// loop through our density intervals and generate a label with a colored square for each interval
        div.innerHTML +='<strong>Deforestation Index</strong><br>';
		for (var i = 0; i < grades.length; i++) {
			div.innerHTML +='<p><i style="background:' + getColorDeforest(grades[i] )+ '; float: left; "></i>   '+" "+'&lt'+grades[i ] +'</p>';
		}

		return div;
	};

	legend.addTo(map);
}



function reservesStyleBio(feature) {
    return {
        fillColor: getColorBio(feature.properties.bio),
        weight: 0.5,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function getColorBio(Biodiversity) {
        return Biodiversity >=0.98  ?'#071DAD' :
           Biodiversity >=0.59  ?'#9400D3' :
           Biodiversity >=0.32  ?'#FF0000'    :
           Biodiversity >=0.14  ? '#FFFF00' :
           Biodiversity >= 0.01    ? '#8BD100' :
                      '#A3FF73';
}

function addLegendBio(){
    
	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0.01, 0.14 , 0.32, 0.59 ,0.98 ],
			labels = [];

		// loop through our density intervals and generate a label with a colored square for each interval
        div.innerHTML +='<strong>Biodiversity Index</strong><br>';
		for (var i = 0; i < grades.length; i++) {
			div.innerHTML +='<p><i style="background:' + getColorBio(grades[i] )+ '; float: left; "></i>   '+" "+'&lt'+grades[i ] +'</p>';
		}
		return div;
	};
    
	legend.addTo(map);
}

//interaction event
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,        
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

	//area retrieved	
	var area = getArea(layer.feature.properties.Name);

	 info.update(layer.feature.properties,area);
}
//reset style when moved away
function resetHighlight(e) {
    natural_reserves.resetStyle(e.target);
	info.update();
	
}

var customPopup = "<table><tr><td><center><b>Birds</b></center></td><td><center><b>Mammals</b></center></td></tr><tr><td><a href='#11'><img src='https://i.ytimg.com/vi/Dbo3eoNN5tc/maxresdefault.jpg' height='70px' width='80px' onclick = 'getAnimals(" + '"Bird"' + ", currentPark);'/></a></td><td><a href='#2'><img src='http://www.animalspot.net/wp-content/uploads/2013/01/Mammals-Hair.jpg' height='70px' width='80px' onclick='getAnimals(" + '"Mammal"' + ", currentPark);' /></a></td></tr><tr><td><center><b>Reptiles</b></center></td><td><center><b>Amphibians</b></center></td></tr><tr><td><a href ='#3'><img src='http://www.naturephoto-cz.com/img/reptiles.jpg' height='70px' width='80px' onclick='getAnimals(" + '"Reptile"' + ", currentPark);' /></td><td></a><a href='#4'><img src='http://www.kidzone.ws/animals/images/amphibian1a.jpg' height='70px' width='80px' onclick='getAnimals(" + '"Amphibian"' + ", currentPark);'/></a></td></tr></table>";

var currentPark;

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    var sidepanel = document.getElementById('sidepanel');
    sidepanel.style.display = 'none';
    //get the park name
    currentPark = e.target.feature.properties.ID;
    console.log(currentPark);
    var marker = e.target;
	marker.bindPopup(customPopup);
}


//adding listeners to parks
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

//Adding custom info control
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props,area) {
    this._div.innerHTML = '<h4>Natural Reserves</h4>' +  (props ?
        '<b>' + props.Name + '</b><br />' + area + ' Area m<sup>2</sup>'
        : 'Hover over a park');
};

info.addTo(map);
