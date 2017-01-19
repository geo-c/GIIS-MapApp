//downloaded parks object
var d_parks;

var URL = "http://giv-oct.uni-muenster.de:8080/api/dataset/getAllParkswithArea?";
var key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfbmFtZSI6Ik5hdFJlc2VydmVzQ29sdW1iIiwiaWF0IjoxNDgxODcyNjE5fQ.nucCuC-58aT0Opo8GtmL3gonHRYN2Q69R8H8rezQJwQ";
$.ajax({
        url: URL,
        method: "GET",
        dataType: "json",
        async:false,
        data: { 
            "authorization": key  }, 
        success: function(result){
            
           // alert("loading now...");
            d_parks = parseJSONParks(result);

        }, 
        error: function(xhr, textStatus, errorThrown){ 
            alert("Unable to fetch Server data")               	 	
        }
        });





function parseJSONParks(obj){

    
    park = [];

    for(i in obj){
       // console.log( obj[i].parkname.value ); 
        park.push({name:obj[i].parkname.value, area: obj[i].areavalue.value});
    }

    // for(i=0; i<parks.length;i++){
    //     console.log( parks[i].name +" "+ parks[i].area); 
    // }

    return park;

}

/**
 * @desc Get the animals for one park.
 * @param name Name of the category of the animal (e.g. Mammal)
 * @param park ID for the park in the parliament
 */
function getAnimals(name, park) {
    
    var animals;
    var query;
    //ship around the parliament typo
    if(name == "Amphibian") {
        var name2 = 'Anfibian';
        query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://www.heppnetz.de/ontologies/goodrelations/v1#>\nSelect  ?ScientificName ?Name ?status ?Class\nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?s wd:livesIn park:1p.\n?s bio:class "' + name2 + '".\n?s txn:scientificName ?ScientificName.\n?s bio:commonName ?Name.\n?s wd:ConservationStatus ?status.\n?s bio:class ?Class\n}\n}';
    }
    // query for all other animals, then amphibians
    else {
        query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://www.heppnetz.de/ontologies/goodrelations/v1#>\nSelect  ?ScientificName ?Name ?status ?Class\nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?s wd:livesIn park:1p.\n?s bio:class "' + name + '".\n?s txn:scientificName ?ScientificName.\n?s bio:commonName ?Name.\n?s wd:ConservationStatus ?status.\n?s bio:class ?Class\n}\n}';
    }
    
    $.ajax({
        url: 'http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql?output=JSON&query=' + encodeURIComponent(query),
        method: "GET",
        dataType: "jsonp",
        async:false,
        success: function(result){
            
           // alert("loading now...");
           //do something with the animals
            animals = result.results.bindings;
            insertAnimalList(animals, name);

        }, 
        error: function(xhr, textStatus, errorThrown){ 
            alert("Unable to fetch Server data");             	 	
        }
    });
}