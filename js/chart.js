// to get biodiversity chart once the page loads
$(document).ready(function() {
    getBiodiversityChart();
}); 
	var inter;
	var user_input;
	var user_option;
        // function to display chart based on user's request on clicking the button Biodiversity index.
	function getBiodiversityChart() {
		 document.getElementsByClassName('low')[0].style.backgroundColor = "#99ff99";
		 document.getElementsByClassName('medium')[0].style.backgroundColor = "#339933";
		 document.getElementsByClassName('high')[0].style.backgroundColor = "#003300";
		// to store the user's input in variables
		 user_input=$("#Index").val();
		 user_input=parseFloat(user_input);
		 user_option=$("#DI").val();
		// query to retrieve the biodiversity index,name, count of species and area of all the parks.
	var query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://purl.org/goodrelations/v1#>\nSelect ?p ?value ?n ?count ?area \nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?p prop:hasProperty ?parks.\n?p foaf:name ?n.\n?parks uco:propertyName "BiodiversityIndex".\n?parks gr:hasValue ?value.\n?p pr:SIO_000955.rdf ?sp.\n?sp pr:SIO_000794.rdf ?count.\n?p mea:Area ?b_area.\n?b_area gr:hasValue ?area.}\n}order By ?n';

    var dataPoints = [];
	var park_area=[];
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
		var area_val = parseFloat(result.results.bindings[i].area.value);
			// to push only the data that satisfies the user's request into dataPoints array.
		if(user_option=='>'){
			 if(bdind > user_input){
		        dataPoints.push({label: prk, y: bdind,toolTipContent: prk+":"+bdind+"<br>Count of Species: " +count +"<br>Area: "+area_val+"sq.Km."});
				park_area.push(parseFloat(result.results.bindings[i].area.value));
			 }
		 }
		 else if(user_option=='<'){
			 if(bdind < user_input){
		        dataPoints.push({label: prk, y: bdind,toolTipContent: prk+":"+bdind+"<br>Count of Species: " +count +"<br>Area: "+area_val+"sq.Km."});
				park_area.push(parseFloat(result.results.bindings[i].area.value));
			 }
		 }
		 else {dataPoints.push({label: prk, y: bdind, toolTipContent: prk+":"+bdind+"<br>Count of Species: " +count +"<br>Area: "+area_val+"sq.Km."});
		 park_area.push(parseFloat(result.results.bindings[i].area.value));
		       }
		}
		console.log(park_area);
		var color_shades=[];
		// to provide color to the bars based on area classification
		for (i in park_area){
			if(park_area[i]<=1000){
				color_shades.push("#99ff99");
			}
			else if(park_area[i]>1000 && park_area[i]<=10000){
				color_shades.push("#339933");
			}
			else{
				color_shades.push("#003300");
			}
		}
		console.log(color_shades);
		inter=dataPoints.length;
		// to adjust the labels based on the size of data requested
		if(inter==49){inter=5;}
		else {inter=1;}
		CanvasJS.addColorSet("area_shade",color_shades); 
		// creating and styling chart
		var chart = new CanvasJS.Chart("chartContainer",{
        title:{
            text:"Biodiversity Index of the Parks",
			fontSize:15
        },
		height: 500,
		colorSet:"area_shade",
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
// function to display chart based on user's request on clicking the button Deforestation index.
function getDeforestationChart() {
	  // to change the color in the area legend of the graph
	     document.getElementsByClassName('low')[0].style.backgroundColor = "#ffb3b3";
		 document.getElementsByClassName('medium')[0].style.backgroundColor = "#e60000";
		 document.getElementsByClassName('high')[0].style.backgroundColor = "#800000";
	  // to store the user's input in variables
	         user_input=$("#Index").val();
		 user_input=parseFloat(user_input);
		 user_option=$("#DI").val();
	//query to retrieve deforestation index,name,area,count of species of all parks
	var query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://purl.org/goodrelations/v1#>\nSelect ?p ?value ?n ?count ?area \nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?p prop:hasProperty ?parks.\n?p foaf:name ?n.\n?parks uco:propertyName "DeforestationIndex".\n?parks gr:hasValue ?value.\n?p pr:SIO_000955.rdf ?sp.\n?sp pr:SIO_000794.rdf ?count.\n?p mea:Area ?b_area.\n?b_area gr:hasValue ?area.}\n}order By ?n';

    var dataPoints = [];
	var park_area=[];
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
		var area_val = parseFloat(result.results.bindings[i].area.value);
			// to push only the data that satisfies the user request into dataPoints array
		if(user_option=='>'){
			 if(defInd >= user_input){
		        dataPoints.push({label: prk, y: defInd,toolTipContent: prk+":"+defInd+"<br>Count of Species: " +count +"<br>Area: "+area_val+" sq.Km."});
				park_area.push(area_val);
			 }
		 }
		 else if(user_option=='<'){
			 if(defInd <= user_input){
		        dataPoints.push({label: prk, y: defInd,toolTipContent: prk+":"+defInd+"<br>Count of Species: " +count +"<br>Area: "+area_val+" sq.Km."});
				park_area.push(area_val);
			 }
		 }
		 else {dataPoints.push({label: prk, y:defInd, toolTipContent: prk+":"+defInd+"<br>Count of Species: " +count +"<br>Area: "+area_val+" sq.Km."});
		 park_area.push(area_val);}
		}
		
		var color_shades=[];
		// to color the bars based on area classification
		for (i in park_area){
			if(park_area[i]<=1000){
				color_shades.push("#ffb3b3");
			}
			else if(park_area[i]>1000 && park_area[i]<=10000){
				color_shades.push("#e60000");
			}
			else{
				color_shades.push("#800000");
			}
		}
		CanvasJS.addColorSet("area_shade",color_shades); 
		inter=dataPoints.length;
		// to adjust the labels in chart based on the size of the data requested.
		if(inter==49){inter=5;}
		else {inter=1;}
		// creating and styling chart
		var chart = new CanvasJS.Chart("chartContainer",{
        title:{
            text:"Deforestation Index of the Parks",
			fontSize:15
        },
        animationEnabled: true,
		height: 500,
		colorSet : "area_shade",
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
// function to display chart based on user's request on clicking the button Social index.
function getSocialChart() {
	    // to change the color in the area legend of the graph
	     document.getElementsByClassName('low')[0].style.backgroundColor = "#99bbff";
		 document.getElementsByClassName('medium')[0].style.backgroundColor = "#0000ff";
		 document.getElementsByClassName('high')[0].style.backgroundColor = "#000066";
	   // to store the user input in variables
	         user_input=$("#Index").val();
		 user_input=parseFloat(user_input);
		 user_option=$("#DI").val();
	//query to retrieve the social index, name, count of species and area of all the parks
	var query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://purl.org/goodrelations/v1#>\nSelect ?value ?n ?count ?area \nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?p foaf:name ?n.\n?p loc:locatedIn ?dep.\n?dep prop:hasProperty ?b.\n?b uco:propertyName "SocialIndex".\n?b gr:hasValue ?value.\n?p pr:SIO_000955.rdf ?sp.\n?sp pr:SIO_000794.rdf ?count.\n?p mea:Area ?b_area.\n?b_area gr:hasValue ?area.\n}\n}order By ?n';

    var dataPoints = [];
	var park_area = [];
	$.ajax({
        url: 'http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql?output=JSON&query=' + encodeURIComponent(query),
        method: "GET",
        dataType: "jsonp",
        async:false,
        success: function(result){
		for (var i in result.results.bindings){
		var prk = result.results.bindings[i].n.value;
        var socInd = parseFloat(result.results.bindings[i].value.value);
		var count = parseFloat(result.results.bindings[i].count.value);
		var area_val = parseFloat(result.results.bindings[i].area.value);
		//to push only the data that satisfies the user request into dataPoints array
		if(user_option=='>'){
			 if(socInd >= user_input){
		        dataPoints.push({label: prk, y: socInd,toolTipContent: prk+":"+socInd+"<br>Count of Species: " +count +"<br>Area: "+area_val+" sq.Km."});
				park_area.push(area_val);
			 }
		 }
		 else if(user_option=='<'){
			 if(socInd <= user_input){
		        dataPoints.push({label: prk, y: socInd,toolTipContent: prk+":"+socInd+"<br>Count of Species: " +count +"<br>Area: "+area_val+" sq.Km."});
				park_area.push(area_val);
			 }
		 }
		 else {dataPoints.push({label: prk, y:socInd, toolTipContent: prk+":"+socInd+"<br>Count of Species: " +count +"<br>Area: "+area_val+" sq.Km."});
		  park_area.push(area_val);}
		}
		// to color the bars based on area classification
		var color_shades=[];
		for (i in park_area){
			if(park_area[i]<=1000){
				color_shades.push("#99bbff");
			}
			else if(park_area[i]>1000 && park_area[i]<=10000){
				color_shades.push("#0000ff");
			}
			else{
				color_shades.push("#000066");
			}
		}
		CanvasJS.addColorSet("area_shade",color_shades); 
		// to adjust the labels based on the size of the data requested
		inter=dataPoints.length;
		if(inter==49){inter=5;}
		else {inter=1;}
		// creating and styling chart
		var chart = new CanvasJS.Chart("chartContainer",{
        title:{
            text:"Social Index of the Parks",
			fontSize:15
        },
        animationEnabled: true,
		colorSet: "area_shade",
		height: 500,
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
