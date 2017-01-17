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

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('td1');

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function insertAnimal(listOfAnimals, name) {
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
    for(i in listOfAnimals) {
        //if for each animal what status it has
        if(listOfAnimals[i].status.value == "Vulnerable") {
            $('<tr><td>' + listOfAnimals[i].Name.value + '</td></tr>').insertAfter('#vulnerable');
    }
        else if(listOfAnimals[i].status.value == "Endangered") {
            $('<tr><td>' + listOfAnimals[i].Name.value + '</td></tr>').insertAfter('#endangered');
        }
        else if(listOfAnimals[i].status.value == "Critically Endangered") {
            $('<tr><td>' + listOfAnimals[i].Name.value + '</td></tr>').insertAfter('#critically_endangered');
        }
        else if(listOfAnimals[i].status.value == "Alien Specie") {
            $('<tr><td>' + listOfAnimals[i].Name.value + '</td></tr>').insertAfter('#alien_species');
        }
        
    }
}

//id = sidebar
//leer machen
//für i elemente neu füllen
//namen für jede Reihe
//query dahinter