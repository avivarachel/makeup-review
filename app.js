$('#search > form > input[type="search"]').focus();


var API_URL = "http://www.murnow.com/api/search/?q=";

$('#submit').on("click", function(evnt) {
    evnt.preventDefault();
    var input = $('#guess-value').val();

   $.getJSON(API_URL + input).then(
        function showResponse(response) {
            $app.html(''); // Clear the #app div
            // $app.append('<div>');
            //ul needs to be appended to the div
            $app.append('<ul class="no-bullet">');

            response.search.forEach(function(product) {
                var name = product.product_name;
                var brand = brand.brand_name;
                
                $app.find('ul').append('<li class=name>' + name + '</li>');
                $app.find('ul').append('<li class=brand>' + brand + '</li>');

            
                $('ul').on("click", function(evnt) {

                    // Helper function to display JavaScript value on HTML page.
                    function showResponse(response) {
                        var responseString = JSON.stringify(response, '', 2);
                        document.getElementById('response').innerHTML += responseString;
                    }
                    // Called automatically when JavaScript client library is loaded.
                    function onClientLoad() {
                        gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
                    }
                    // Called automatically when YouTube API interface is loaded (see line 9).
                    function onYouTubeApiLoad() {
                        // This API key is intended for use only in this lesson.
                        // See https://goo.gl/PdPA1 to get a key for your own applications.
                        gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
                        search();
                    }
            
                    function search() {
                        // Use the JavaScript client library to create a search.list() API call.
                        var request = gapi.client.youtube.search.list({
                            part: 'snippet',
                            q: "maybelline fit me review",
                            maxResults: 2,
                            order: "viewCount"
                        });
                        // Send the request to the API server,
                        // and invoke onSearchRepsonse() with the response.
                        request.execute(onSearchResponse);
                    }
                    // Called automatically with the response of the YouTube API request.
                    function onSearchResponse(response) {
                        showResponse(response);
                    }
            
            
                
            })

        });

});


