//Reusable vars

var $app = $('#app');

var $header = $('<div id="header">This is our header</div><form><input type="search" placeholder="search for your favourite makeup">');

var API_URL = "http://www.murnow.com/api/search/?q=";


//Backbone router

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
        'search/?q=:query': 'search',
        'product/:productId': 'product'
    },
    home: productSearch,
    search: productList,
    product: productView
});

var appRouter = new AppRouter();
Backbone.history.start();

// Home page search view
function productSearch() {
    $app.html('');
    var $search = $('<div id="search">');
    $('#search > form > input[type="search"]').focus();
    $app.append($search);
    $search.append("<form><input type='search' id='search-input' placeholder='search for your favourite makeup'><button id='submit'>Search</button></form>");
    
    $('#submit').on("click", function(evnt) {
        // console.log('#submit was clicked');
        evnt.preventDefault();
        var input = $('#search-input').val();
        appRouter.navigate('search/?q=' + input, {trigger: true});
    });
}

//Product list view
function productList(search,pageNum){
    $.getJSON(API_URL + search).then(function(response) {
        $app.html(''); // Clear the #app div
        $app.append($header);
        //ul needs to be appended to the div
    
        var $ul = $('<ul class="large-block-grid-5">');
        $app.append($ul);
        
        response.search.forEach(function(product) {
            var $li = $('<li>');
            $ul.append($li);
            var name = product.product_name;
            var brand = product.brand_name;
            var img = ('https://d3gm19tlfubzts.cloudfront.net/images_products/' + product.hash_url_image +'.jpg');
    
            var $a = $('<a href="#product/' + product.id + '">');
            $li.append($a);
                
            $a.append('<image src=' + img + '>');
            $a.append('<p class=name>' + name + '</p>');
            $a.append('<p class=brand>' + brand + '</p>');
        });
        
        //Button and load more function
        var $button = $('<button id="more-products">Load more!</button>');
        $app.append($button);
        $('#more-products').on("click", function(evnt) {
            pageNum++;
            $.getJSON(API_URL + search + '&from=' + (pageNum*20)).then(function(response) {
                response.search.forEach(function(product) {
                    var $li = $('<li>');
                    $app.find('ul').append($li);
                    var name = product.product_name;
                    var brand = product.brand_name;
                    var img = ('https://d3gm19tlfubzts.cloudfront.net/images_products/' + product.hash_url_image +'.jpg');
            
                    var $a = $('<a href="#product/' + product.id + '">');
                    $li.append($a);
                
                    $a.append('<image src=' + img + '>');
                    $a.append('<p class=name>' + name + '</p>');
                    $a.append('<p class=brand>' + brand + '</p>');
                });
                
            });
        });
            
    });
}


//Product view with videos

function productView(productId){
    $.getJSON('http://www.murnow.com/api/products/' + productId).then(
        function(product) {
            
            var name = product.product.product_name;
            var brand = product.product.brand_name;
            var img = ('https://d3gm19tlfubzts.cloudfront.net/images_products/' + product.product.hash_url_image +'.jpg');
            $app.html('');
            var $productProfile = $('<div id="productProfile" class="row">');
            $app.append($productProfile);
            $app.find('#productProfile').append('<div class="large-5 columns"><image src=' + img + '>');
            $app.find('#productProfile').append('<div class="large-7 columns"><h1>' + name);
            $app.find('#productProfile').append('<div class="large-7 columns"><h2>' + brand);
            
            var youtubeCall = ('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + name + brand + ' review&key=AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
            $.getJSON(youtubeCall).then(function(response){
               
                response.items.forEach(function(video){
                   
                    $app.append('<div id="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + video.id.videoId + '">');
                });
            });
        }
    )
}
           
                            
                                
                            
                        