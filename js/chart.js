 $(document).ready(function() {
    getBiodiversityChart();
});
	var inter;
	var user_input;
	var user_option;
	function getBiodiversityChart() {
		 user_input=$("#Index").val();
		 user_input=parseFloat(user_input);
		 user_option=$("#DI").val();
	var query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://purl.org/goodrelations/v1#>\nSelect ?p ?value ?n ?count\nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?p prop:hasProperty ?parks.\n?p foaf:name ?n.\n?parks uco:propertyName "BiodiversityIndex".\n?parks gr:hasValue ?value.\n?p pr:SIO_000955.rdf ?sp.\n?sp pr:SIO_000794.rdf ?count.}\n}order By ?n';

    var dataPoints = [];
	$.ajax({
        url: 'http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql?output=JSON&query=' + encodeURIComponent(query),
        method: "GET",
        dataType: "jsonp",
        async:false,
        success: function(result){
		//console.log(result);
		for (var i in result.results.bindings){
		var prk = result.results.bindings[i].n.value;
        var bdind = parseFloat(result.results.bindings[i].value.value);
		var count = result.results.bindings[i].count.value;
		if(user_option=='>'){
			 if(bdind > user_input){
		        dataPoints.push({label: prk, y: bdind,toolTipContent: "<br>Count of Species: " +count +"<br>"+prk+":"+bdind});
			 }
		 }
		 else if(user_option=='<'){
			 if(bdind < user_input){
		        dataPoints.push({label: prk, y: bdind,toolTipContent: "<br>Count of Species: " +count +"<br>"+prk+":"+bdind});
			 }
		 }
		 else {dataPoints.push({label: prk, y: bdind, toolTipContent: "<br>Count of Species: " +count +"<br>"+prk+":"+bdind});
		       }
		}
		
		inter=dataPoints.length;
		if(inter==49){inter=5;}
		else {inter=1;}
		var chart = new CanvasJS.Chart("chartContainer",{
        title:{
            text:"Biodiversity Index of the Parks",
			fontSize:15
        },
		height: 450,
        animationEnabled: true,
		axisX: {
		title: "Parks",
		labelAngle: -60,
		labelFontSize: 13,
		labelFontColor: "black",
		titleFontSize: 18,
		tickThickness: 1,
		titleFontColor: "black",
		interval: inter
		},
		axisY: {
        title: "Biodiversity Index",
		gridThickness: 1,
		fontSize:20,
		labelFontSize: 13,
		labelFontColor: "black",
		titleFontSize: 18,
		tickThickness: 1,
		titleFontColor: "black"
		},
		theme: "theme1",
		data: [{
        type: "column",
		color: "#40bf80",
		fillOpacity: 0.90,
        dataPoints : dataPoints
        }]
		});
		chart.render();
			
			//var info = result.results.bindings;
        }, 
        error: function(xhr, textStatus, errorThrown){ 
            alert("Unable to fetch Server data");             	 	
        }
    }); 
}

function getDeforestationChart() {
	     user_input=$("#Index").val();
		 user_input=parseFloat(user_input);
		 user_option=$("#DI").val();
	var query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://purl.org/goodrelations/v1#>\nSelect ?p ?value ?n ?count\nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?p prop:hasProperty ?parks.\n?p foaf:name ?n.\n?parks uco:propertyName "DeforestationIndex".\n?parks gr:hasValue ?value.\n?p pr:SIO_000955.rdf ?sp.\n?sp pr:SIO_000794.rdf ?count.}\n}order By ?n';

    var dataPoints = [];
	$.ajax({
        url: 'http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql?output=JSON&query=' + encodeURIComponent(query),
        method: "GET",
        dataType: "jsonp",
        async:false,
        success: function(result){
		//console.log(result);
		for (var i in result.results.bindings){
		var prk = result.results.bindings[i].n.value;
        var defInd = parseFloat(result.results.bindings[i].value.value);
		var count = parseFloat(result.results.bindings[i].count.value);
		if(user_option=='>'){
			 if(defInd >= user_input){
		        dataPoints.push({label: prk, y: defInd,toolTipContent: "<br>Count of Species: " +count +"<br>"+prk+":"+defInd});
			 }
		 }
		 else if(user_option=='<'){
			 if(defInd <= user_input){
		        dataPoints.push({label: prk, y: defInd,toolTipContent: "<br>Count of Species: " +count +"<br>"+prk+":"+defInd});
			 }
		 }
		 else dataPoints.push({label: prk, y:defInd, toolTipContent: "<br>Count of Species: " +count +"<br>"+prk+":"+defInd});
		}
		inter=dataPoints.length;
		if(inter==49){inter=5;}
		else {inter=1;}
		var chart = new CanvasJS.Chart("chartContainer",{
        title:{
            text:"Deforestation Index of the Parks",
			fontSize:15
        },
        animationEnabled: true,
		height: 450,
        animationEnabled: true,
		axisX: {
		title: "Parks",
		labelAngle: -60,
		labelFontSize: 13,
		labelFontColor: "black",
		titleFontSize: 18,
		titleFontColor: "black",
		tickThickness: 1,
		interval: inter
		},
		axisY: {
        title: "Deforestation Index",
		gridThickness: 1,
		labelFontSize: 13,
		labelFontColor: "black",
		titleFontSize: 18,
		tickThickness: 1,
		titleFontColor: "black"
		},
		theme: "theme1",
		data: [{
        type: "column",
		color: "#cc0000",
		fillOpacity: 0.90,
		dataPoints : dataPoints
        }]
		});
		chart.render();
        }, 
        error: function(xhr, textStatus, errorThrown){ 
            alert("Unable to fetch Server data");             	 	
        }
    }); 
}

function getSocialChart() {
	     user_input=$("#Index").val();
		 user_input=parseFloat(user_input);
		 user_option=$("#DI").val();
	var query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://purl.org/goodrelations/v1#>\nSelect ?value ?n ?count \nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?p foaf:name ?n.\n?p loc:locatedIn ?dep.\n?dep prop:hasProperty ?b.\n?b uco:propertyName "SocialIndex".\n?b gr:hasValue ?value.\n?p pr:SIO_000955.rdf ?sp.\n?sp pr:SIO_000794.rdf ?count.\n}\n}order By ?name';

    var dataPoints = [];
	$.ajax({
        url: 'http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql?output=JSON&query=' + encodeURIComponent(query),
        method: "GET",
        dataType: "jsonp",
        async:false,
        success: function(result){
		//console.log(result);
		for (var i in result.results.bindings){
		var prk = result.results.bindings[i].n.value;
        var socInd = parseFloat(result.results.bindings[i].value.value);
		var count = parseFloat(result.results.bindings[i].count.value);
		if(user_option=='>'){
			 if(socInd >= user_input){
		        dataPoints.push({label: prk, y: socInd,toolTipContent: "<br>Count of Species: " +count +"<br>"+prk+":"+socInd});
			 }
		 }
		 else if(user_option=='<'){
			 if(socInd <= user_input){
		        dataPoints.push({label: prk, y: socInd,toolTipContent: "<br>Count of Species: " +count +"<br>"+prk+":"+socInd});
			 }
		 }
		 else dataPoints.push({label: prk, y:socInd, toolTipContent: "<br>Count of Species: " +count +"<br>"+prk+":"+socInd});
		}
		inter=dataPoints.length;
		if(inter==49){inter=5;}
		else {inter=1;}
		var chart = new CanvasJS.Chart("chartContainer",{
        title:{
            text:"Social Index of the Parks",
			fontSize:15
        },
        animationEnabled: true,
		height: 450,
        animationEnabled: true,
		axisX: {
		title: "Parks",
		labelAngle: -60,
		labelFontSize: 13,
		labelFontColor: "black",
		titleFontSize: 18,
		titleFontColor: "black",
		tickThickness: 1,
		interval: inter
		},
		axisY: {
        title: "Social Index",
		gridThickness: 1,
		labelFontSize: 13,
		labelFontColor: "black",
		titleFontSize: 18,
		tickThickness: 1,
		titleFontColor: "black"
		},
		theme: "theme1",
		data: [{
        type: "column",
		color: "#224ce2",
		fillOpacity: 0.90,
		dataPoints : dataPoints
        }]
		});
		chart.render();
        }, 
        error: function(xhr, textStatus, errorThrown){ 
            alert("Unable to fetch Server data");             	 	
        }
    }); 
}
