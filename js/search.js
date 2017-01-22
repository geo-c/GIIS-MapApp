$(function(){
    $('#search').click(function(){
        var text = $('#search_text').val();
        

       
        query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://www.heppnetz.de/ontologies/goodrelations/v1#>\nSelect  ?parkname \nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?a txn:scientificName "Vultur gryphus".\n?a wd:livesIn ?b.\n?b foaf:name ?parkname\n}\n}';

    
       // alert(query);
 

        $.ajax({
        url: 'http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql?output=JSON&query=' + encodeURIComponent(query),
        method: "GET",
         async:false,
       // dataType: "jsonp",
        success: function(result){
            
            var parks_obtained = result.results.bindings;
            //alert(parks_obtained[0].parkname.value);
            zoomToMatchedArea(parks_obtained);

        }, 
        error: function(xhr, textStatus, errorThrown){ 
            alert("Unable to fetch Server data");             	 	
        }
        });
    });

    

});

