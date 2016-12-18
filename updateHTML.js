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