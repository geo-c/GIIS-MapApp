 
$(function(){
    $('#Graphs').click(function(){
	var chart = document.getElementById('iframe1');
    chart.innerHTML = 'Please Fill the form to get the graph';
	var modal_information = document.getElementById('modal_information1');
	modal_information.innerHTML = ''; 
    modal.style.display = "block";
	$("<form><center><b>Choose an option:</b><br><select id ='DI' style = 'height:25px; width:100px'><option value='>'>greater than</option><option value='<'>less than</option></select><br><br><b>Value:</b><br><input id='Index' type='text'  style='width:100px;'></center><br><br><button id='b1' value='DeforestationIndex' style='font-size:12px'>Deforestation Index</button><button id='b1' value='BiodiversityIndex' style='font-size:12px'>Biodiversity Index</button><button id='b1' value='SocialIndex' style='font-size:12px'>Social Index</button></form>").appendTo('#modal_information1'); 
	});
	
	var index;
	var user_input;
	var user_option;
	$(document).on("click", "#b1", function(){
		var chart = document.getElementById('iframe1');
         chart.innerHTML = '';
		 index = $(this).attr("value");
		 user_input=$("#Index").val();
		 user_input=parseFloat(user_input);
		 user_option=$("#DI").val();
		console.log(user_option);
		console.log(user_input);
		console.log(index);
		var query;
		if(index!='SocialIndex'){
		 query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://purl.org/goodrelations/v1#>\nSelect ?index ?name ?count \nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?park_id prop:hasProperty ?parks.\n?park_id foaf:name ?name.\n?park_id pr:SIO_000955.rdf ?sp.\n?sp pr:SIO_000794.rdf ?count.\n?parks uco:propertyName "'+ index +'".\n?parks gr:hasValue ?index.\n}\n}order By ?name';}
		else{
		 query = 'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX wo: <http://purl.org/ontology/wo/>\nPREFIX bio: <http://purl.org/NET/biol/ns#>\nPREFIX txn: <http://lod.taxonconcept.org/ontology/txn.owl#>\nPREFIX foaf: <http://xmlns.com/foaf/0.1/>\nPREFIX dp:<http://dbpedia.org/page/>\nPREFIX wd: <http://purl.org/ontology/wo/>\nPREFIX loc: <http://www.ontotext.com/proton/protontop#>\nPREFIX mea:<http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#>\nPREFIX prop:<https://purl.oclc.org/NET/ssnx/ssn#>\nPREFIX park:<http://course.geoinfo2016.org/G2/>\nPREFIX pr:<http://semanticscience.org/resource/>\nPREFIX uco:<http://ontologies.makolab.com/uco/ns.html#>\nPREFIX gr:<http://purl.org/goodrelations/v1#>\nSelect ?index ?name ?count \nWhere\n{\ngraph <http://course.geoinfo2016.org/G2>{\n?p foaf:name ?name.\n?p loc:locatedIn ?dep.\n?dep prop:hasProperty ?b.\n?b uco:propertyName "'+ index +'".\n?b gr:hasValue ?index.\n?p pr:SIO_000955.rdf ?sp.\n?sp pr:SIO_000794.rdf ?count.\n}\n}order By ?name';	
		}
    var graph_info;
    $.ajax({
        url: 'http://giv-lodumdata.uni-muenster.de:8282/parliament/sparql?output=JSON&query=' + encodeURIComponent(query),
        method: "GET",
        dataType: "jsonp",
        async:false,
        success: function(result){
            graph_info = result.results.bindings;
			graphModal(graph_info);
            
        }, 
        error: function(xhr, textStatus, errorThrown){ 
            alert("Unable to fetch Server data");             	 	
        }
    });
	});
	
	function graphModal(graph_info){
	$('<canvas id="myChart" width="50px" height="30px"> Graphs </canvas>').appendTo('#iframe1');
	var ctx = document.getElementById("myChart");
	var parks = new Array(49);
	var di = new Array(49);
	var count_sp = new Array(49);
	 for (i in graph_info){
		 parks[i]= graph_info[i].name.value;
		 di[i]=graph_info[i].index.value;
		 count_sp[i]=graph_info[i].count.value;
	 }
	 var arr = [];
	 var index_arr = [];
	 var count_arr = [];
	 var arr1 = [];
	 var index_arr1 = [];
	 var count_arr1 = [];
	 var temp;
     for (var i=0;i< parks.length;i++) {
		 di[i] = parseFloat(di[i]);
		 if(user_option=='>'){
			 if(di[i] > user_input){
		        arr.push(parks[i]);
				index_arr.push(di[i]);
				count_arr.push(count_sp[i]);
				console.log(arr + "" + i);
				
			 }temp =1;
		 }
		 else{
			 if(di[i] < user_input){
		        arr1.push(parks[i]);
				index_arr1.push(di[i]);
				count_arr1.push(count_sp[i]);
				console.log(arr1 + "" + i);
			 }temp =2;
		 }
	}
	var title_graph = index + ' of Natural Reserves in Colombia';
	if(temp==1){
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: arr,
        datasets: [{
            label: index,
            data: index_arr,
            borderWidth: 1,
			backgroundColor: "rgba(75,192,192,0.4)",
        }]
    },
    options: {
		title: {
            display: true,
            text: title_graph
        },
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
			tooltips: {      
                    callbacks: {
                    footer: function(tooltipItems,data){
						var name=0;
						var count =0;
						var i=0;
						tooltipItems.forEach(function(tooltipItem) {
                                name= data.labels[tooltipItem.index];
								for(var i = 0;i<parks.length;i++){
									if(arr[i]==name){
										count=count_arr[i];
									}
								}
                            });
                    return 'countofspecies: '+count;
                    },
                  }
                }
    }
	});}
	else {
	var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: arr1,
        datasets: [{
            label: index,
            data: index_arr1,
            borderWidth: 1,
			backgroundColor: "rgba(75,192,192,0.4)",
        }]
    },
    options: {
		title: {
            display: true,
            text: title_graph
        },
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
    }
	});
		
	}
	
 
 }
	
});
