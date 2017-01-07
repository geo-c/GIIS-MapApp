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

