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
            var $ul = $('<ul class="large-block-grid-5">');
            $app.append($ul);
            
            response.search.forEach(function(product) {
                    var $li = $('<li>');
                    $ul.append($li);
                    var name = product.product_name;
                    var brand = product.brand_name;
                    var img = ('https://d3gm19tlfubzts.cloudfront.net/images_products/' + product.hash_url_image +'.jpg');
                    $li.append('<image src=' + img + '>');
                    $li.append('<p class=name>' + name + '</p>');
                    $li.append('<p class=brand>' + brand + '</p>');

                    $($li).on("click", function(evnt) {
                            $app.html('');
                            $app.append(this);
                            
                            var name = $(this).find('p.name').html();
                            var brand = $(this).find('p.brand').html();
                            console.log(name);
                            console.log(brand);
                            
                            var youtubeCall = ('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + name + brand + ' review&key=AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
                            $.getJSON(youtubeCall).then(function(response){
                               
                                response.items.forEach(function(video){
                                   
                                    
                                    var iframe = ('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + video.id.videoId + '">');
                                    $app.find('li').after(iframe);
                                    
                                });
                            });
                            
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