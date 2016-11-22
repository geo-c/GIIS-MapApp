var map;

function initmap() {
	// set up the map
	map = new L.Map('map');

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 18, attribution: osmAttrib});

	// start the map in Columbia
	map.setView(new L.LatLng(4.672209, -74.575981),14);
	map.addLayer(osm);
}

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

function onMapClick(e) {
	var popup = L.popup()
				.setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
