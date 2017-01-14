


// for(i=0; i<d_parks.length;i++){
//         console.log( d_parks[i].name +" "+ d_parks[i].area); 
//    }

//init map
var map;
map = new L.Map('map');

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 12, attribution: osmAttrib});

// start the map in Columbia
map.setView(new L.LatLng(4.672209, -74.575981),12);
map.addLayer(osm);

//overlay natural reserves layer
var natural_reserves = L.geoJson(
	natReserves,
	{style : reservesStyle}
	).addTo(map);


map.fitBounds(natural_reserves.getBounds());

//restrict map to area of interest only
map.setMaxBounds(natural_reserves.getBounds());


addLegend();

//map.on('click', onMapClick);



function addMarker(x,y){
	var marker = L.marker([y, x]).addTo(map);
}

function addPolygon(){
	var polygon = L.polygon([
    [4.672209, -74.575981],
    [4.672209, -74.578981],
    [4.682209, -74.579981]
]).addTo(map);
}

// function onMapClick(e) {
// 	var popup = L.popup()
// 				.setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

function reservesStyle(feature) {
    return {
        fillColor: getColor(feature.properties.hectareas_),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function getColor(area) {
    return area > 570000 ? '#800026' :
           area > 200000  ? '#BD0026' :
           area > 83000  ? '#E31A1C' :
           area > 54000  ? '#FC4E2A' :
           area > 32000   ? '#FD8D3C' :
           area > 10000   ? '#FEB24C' :
           area > 1000   ? '#FED976' :
                      '#FFEDA0';
}

function addLegend(){
	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 1000, 10000, 32000, 54000, 83000, 200000, 570000],
			labels = [];

		// loop through our density intervals and generate a label with a colored square for each interval
		for (var i = 0; i < grades.length; i++) {
			div.innerHTML +=
				'<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
				grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
		}

		return div;
	};

	legend.addTo(map);
}

//interaction event
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

	//match parkname and send the value based on downloaded values

	console.log("area is "+ getArea(layer.feature.properties.Name));

	//area retrieved
	
	var area = getArea(layer.feature.properties.Name);

	 info.update(layer.feature.properties,area);
}

//reset style when moved away
function resetHighlight(e) {
    natural_reserves.resetStyle(e.target);
	info.update();
	
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//adding listeners to parks
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

natural_reserves = L.geoJson(natReserves, {
    style: reservesStyle,
    onEachFeature: onEachFeature
}).addTo(map);


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



// markers = [
//    {
//      "name": "Canada",
//      "url": "https://en.wikipedia.org/wiki/Canada",
//      "lat": 56.130366,
//      "lng": -106.346771
//    },
//    {
//      "name": "Anguilla",
//      "url": "https://en.wikipedia.org/wiki/Anguilla",
//      "lat": 18.220554,
//      "lng": -63.068615
//    },
//    {
//      "name": "Japan",
//      "url": "https://en.wikipedia.org/wiki/Japan",
//      "lat": 36.204824,
//      "lng": 138.252924
//    }
// ];

// function addMarkers(){
// 	for ( var i=0; i < markers.length; ++i ) 
// 	{
// 	L.marker( [markers[i].lat, markers[i].lng] )
// 		.bindPopup( '<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>' )
// 		.addTo( map );
// 	}
// }