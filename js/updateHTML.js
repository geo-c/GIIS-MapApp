'use strict';

/**
 * @desc Update the iframe when list item when clicked
 */
function updateIframe(element) {
    
    var name = element.innerHTML;
    console.log(name);
    var iframe = document.getElementById('iframe');
    iframe.setAttribute('src', 'https://en.wikipedia.org/wiki/' + name);
}

var modal = document.getElementById('myModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/**
 * @desc Insert the list of animals into the table. Enable onclick events for each animal.
 */
function insertAnimalList(listOfAnimals, name, park) {
    var sidepanel = document.getElementById('sidepanel');
    sidepanel.style.display = 'block';
    console.log(listOfAnimals);

    var sidebar = document.getElementById('sidebar');
    //empty sidebar
    sidebar.innerHTML = '';
    $('#sidebar').html('<h3>' + name + 's in the park</h3><h6 id="head">(Click the list-items)</h6><hr id="line">');
    //insert the table with the headings for the categories
    $('<table><center><tr id="vulnerable"><th>Vulnerable</th></tr><tr id="endangered"><th>Endangered</th></tr><tr id="critically_endangered"><th>Critically Endangered</th></tr></center></table>').insertAfter('#head');
    //Sort all animals into the specific category
    for(i in listOfAnimals) {
        if(listOfAnimals[i].status.value == "Vulnerable") {
            $('<tr><td onclick="getAnimalInformation(this.innerHTML)">' + listOfAnimals[i].ScientificName.value + '</td></tr>').insertAfter('#vulnerable');
    }
        else if(listOfAnimals[i].status.value == "Endangered") {
            $('<tr><td onclick="getAnimalInformation(this.innerHTML)">' + listOfAnimals[i].ScientificName.value + '</td></tr>').insertAfter('#endangered');
        }
        else if(listOfAnimals[i].status.value == "Critically Endangered") {
            $('<tr><td onclick="getAnimalInformation(this.innerHTML)">' + listOfAnimals[i].ScientificName.value + '</td></tr>').insertAfter('#critically_endangered');
        }
    }
    getAlienSpecies(park);
}

/**
 * @desc Insert a list of all alien species into the HTML
 * @param alienS List of all alien species in the park.
 */
function insertAlienSpecies(alienS) {
    //insert all alien species for the park into the list
    $('<h3 id="alien_species">Alien Species</h3>').insertAfter('#line');
    console.log(alienS);
    for(i in alienS) {
        $('<table><center><tr><td>' + alienS[i].scientificN.value + '</td></tr></center></table>').insertAfter('#alien_species')
    }
}

/**
 * @desc Open the modal for further information on specific animals
 * @param name Name of the animal, for which the information should be displayed
 */
function openModal(info) {
    console.log(name);
    console.log(info);
    var modal_information = document.getElementById('modal_information');
    //empty sidebar
    modal_information.innerHTML = '';
    modal.style.display = "block";
	$('<img src="'+info[0].imgurl.value + '" style="height:150px; "/>').appendTo('#modal_information');
    $('<h3 id="ScName">' + info[0].commonN.value + '</h3>').appendTo('#modal_information');
    $('<table><center><tr id="ScientificName"><th>Scientific Name</th></tr><tr id="animal_class"><th>Class</th></tr><tr id="status"><th>Status</th></tr></center></table>').insertAfter('#ScName');
    //insert the further information for the animal
    $('<tr><td>' + info[0].scientificN.value + '</td></tr>').insertAfter('#ScientificName');
    $('<tr><td>' + info[0].aClass.value + '</td></tr>').insertAfter('#animal_class');
    $('<tr><td>' + info[0].conservationS.value + '</td></tr>').insertAfter('#status');

    //update the iframe for the specific animal
    $('#iframe').attr("src", "https://en.wikipedia.org/wiki/" + info[0].scientificN.value);
	$('#iframe').attr("scrolling","yes");
    $('#iframe').removeClass("iframe-class-resize").css({ width : '100%', height : '500px' });	
}

function getCharts(){
	var modal_information = document.getElementById('modal_information');
    modal_information.innerHTML = '';
    modal.style.display = "block";
	
	$('#iframe').attr("src","Charts.html");
	$('#iframe').attr("scrolling","no");
	$('#iframe').removeClass("iframe-class-resize").css({ width : '84vw', height : '35vw' });
}
