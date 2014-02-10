/*
    miley.js
    An implementation of the MileyFeed project.
*/

// This code will be executed when the page finishes loading
window.addEventListener('load', function(){
    // Fill me in!
    // create a request object
var request = new XMLHttpRequest();

// specify the HTTP method, URL, and asynchronous flag
request.open('GET', 'http://miley.djroomba.com', true);

// add an event handler
request.addEventListener('load', function(e){
    if (request.status == 200) {
        // do something with the loaded content
        var content = request.responseText;
        console.log(content);
    } else {
        // something went wrong, check the request status
        // hint: 403 means Forbidden, maybe you forgot your username?
    }
}, false);

// start the request, optionally with a request body for POST requests
request.send(null); 
}, false);

// Add more supporting code here!
