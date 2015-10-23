var $app = $('#app');

$('#search > form > input[type="search"]').focus();


var API_URL = "http://www.murnow.com/api/search/?q=";



$('#submit').on("click", function(evnt) {
    // console.log('#submit was clicked');
    evnt.preventDefault();
    var input = $('#search-input').val();

    $.getJSON(API_URL + input).then(
        function showResponse(response) {
            $app.html(''); // Clear the #app div
            //ul needs to be appended to the div

            response.search.forEach(function(product) {
                    var $div = $('<div class="one-unit">');
                    $app.append($div);
                    var name = product.product_name;
                    var brand = product.brand_name;
                    $div.append('<p class=name>' + name + '</p>');
                    $div.append('<p class=brand>' + brand + '</p>');

                    $($div).on("click", function(evnt) {
                            $app.html('');
                            $app.append(this);
                            
                            var name = $(this).find('p.name').html();
                            var brand = $(this).find('p.brand').html();
                            var youtubeCall = ('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + name + brand + ' review&key=AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
                            $.getJSON(youtubeCall).items.forEach(function(video){
                                console.log(video[0]);
        
                            }
                            
                            );
                            //     var $body = $('#body');
                            //     $body.html('');
                            //     var $head = $('#head');
                            //     $head.append('<script src="search.js" type="text/javascript"></script>');
                            //     $head.append('<script src="https://apis.google.com/js/client.js?onload=onClientLoad" type="text/javascript"></script>');


                            // function youtubeCall(name, brand) {
                    });
                    

                
            });
        }
    );







});
