
//global variable to store parklists for a query to be used in filter
var listOfParks;


var filteredParks;

/**
 * @desc send request to server and retrieve parks having requested specie
 */
$('#search').click(function(){
    var text = $('#search_text').val();
    

    
    query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://www.heppnetz.de/ontologies/goodrelations/v1#>\nSelect  ?parkname \nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?a txn:scientificName '+'"'+text+'"'+'.\n?a wd:livesIn ?b.\n?b foaf:name ?parkname\n}\n}';


    // alert(query);


    $.ajax({
    url: 'http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql?output=JSON&query=' + encodeURIComponent(query),
    method: "GET",
        async:false,
    // dataType: "jsonp",
    success: function(result){
        
        var parks_obtained = result.results.bindings;

        listOfParks = parks_obtained;
        //alert(parks_obtained[0].parkname.value);
        insertParks(parks_obtained);
        updateMapLayer(parks_obtained);
    }, 
    error: function(xhr, textStatus, errorThrown){ 
        alert("Unable to fetch Server data");             	 	
    }
    });
});

/**
 * @desc inserts parks found to side frame
 *@param list of parks retrieved from server
    */

function insertParks(listOfParks) {
    var sidepanel = document.getElementById('sidepanel');
    sidepanel.style.display = 'block';
    //call the function to get data from the parliament!!!!

    console.log(listOfParks);

    var sidebar = document.getElementById('sidebar');
    //empty sidebar
    sidebar.innerHTML = '';
    $('#sidebar').html('<h3 id="head">Parks Found</h3>')
    //insert the table with the headings for the categories
    $('<table><center><tr id="parks"><th>Parks</th></tr>').insertAfter('#head');
    
    //Sort all animals into the specific category
    for(i in listOfParks) {
        $('<tr><td onclick="openModal(this.innerHTML)">' + listOfParks[i].parkname.value + '</td></tr>').insertAfter('#parks');
    }
    if(listOfParks.length ==0){
        $('#sidebar').html('<h3 id="head">Parks Not Found</h3>')
    }
}

//prepare datalist to provide hints to user

var query2 = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://www.heppnetz.de/ontologies/goodrelations/v1#>\nSelect DISTINCT  ?specielist  \nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?a txn:scientificName ?specielist \n}\n}';


// alert(query);


$.ajax({
url: 'http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql?output=JSON&query=' + encodeURIComponent(query2),
method: "GET",
    async:false,
// dataType: "jsonp",
success: function(result){
    
    var specielist = result.results.bindings;
    // alert(specielist[0].specielist.value);
    prepareDataList(specielist);
    


}, 
error: function(xhr, textStatus, errorThrown){ 
    alert("Unable to fetch Server data");             	 	
}
});

function prepareDataList(specielist){
    for(i in specielist){
        $('#specieslist').append('<option value="'+specielist[i].specielist.value+'">');
    }
    
}

function updateMapLayer(parkList){
    //Temporarily removeLayer from map
    //but remains in control group
    console.log("removing layer");
    map.removeLayer( natural_reserves);

    //removing existing temporary layer
    removeTemporaryParks();
        
    
    //create a new later with matching parks name from Parliamant
    filteredParks = L.geoJson(
                            natReserves,
                            {style : reservesStyle,
                            onEachFeature: onEachFeature,
                            filter:applyFilter
                            });
    //adding layer to map                       
    map.addLayer(filteredParks);

    //zoom map to parks
    map.fitBounds(filteredParks.getBounds());

    //Allow user to get back to default
}

/**
 * @desc returns true if parks name of feature is found in list retrieved from server
 */
function applyFilter(feature){
    //console.log(listOfParks[1].parkname.value);

    for(i in listOfParks){
        if(feature.properties.Name==listOfParks[i].parkname.value) return true;
    }

    return false;

    
}

/**
 * @desc removes the result overlays of previously retrieved parks
 */
function removeTemporaryParks(){
        //removing existing temporary layer
    if(filteredParks!=null){
        console.log("removing temporary layer");
        map.removeLayer(filteredParks);
    }
}




