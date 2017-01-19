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
function insertAnimalList(listOfAnimals, name) {
    var sidepanel = document.getElementById('sidepanel');
    sidepanel.style.display = 'block';
    //call the function to get data from the parliament!!!!

    console.log(listOfAnimals);

    var sidebar = document.getElementById('sidebar');
    //empty sidebar
    sidebar.innerHTML = '';
    $('#sidebar').html('<h3 id="head">' + name + 's in the park</h3>')
    //insert the table with the headings for the categories
    $('<table><center><tr id="vulnerable"><th>Vulnerable</th></tr><tr id="endangered"><th>Endangered</th></tr><tr id="critically_endangered"><th>Critically Endangered</th></tr><tr id="alien_species"><th>Alien Species</th></tr>').insertAfter('#head');
    
    //Sort all animals into the specific category
    for(i in listOfAnimals) {
        if(listOfAnimals[i].status.value == "Vulnerable") {
            $('<tr><td onclick="openModal(this.innerHTML)">' + listOfAnimals[i].Name.value + '</td></tr>').insertAfter('#vulnerable');
    }
        else if(listOfAnimals[i].status.value == "Endangered") {
            $('<tr><td onclick="openModal(this.innerHTML)">' + listOfAnimals[i].Name.value + '</td></tr>').insertAfter('#endangered');
        }
        else if(listOfAnimals[i].status.value == "Critically Endangered") {
            $('<tr><td onclick="openModal(this.innerHTML)">' + listOfAnimals[i].Name.value + '</td></tr>').insertAfter('#critically_endangered');
        }
        else if(listOfAnimals[i].status.value == "Alien Specie") {
            $('<tr><td onclick="openModal(this.innerHTML)">' + listOfAnimals[i].Name.value + '</td></tr>').insertAfter('#alien_species');
        }
        
    }
}

/**
 * @desc Open the modal for further information on specific animals
 * @param name Name of the animal, for which the information should be displayed
 */
function openModal(name) {
    console.log(name);
    modal.style.display = "block";
    //insert the further information for the animal
    //make a new function to call the data from the parliament. --> maybe call even that function when onclick the animals
}