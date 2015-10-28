//Reusable elements

var $app = $('#app');

var $header = $('<div id="header"><form><input type="search" class="search-input" id="header-search-bar" placeholder="search for your favourite makeup <i class=fa fa-search"></i> "><button class="submit"></button></div>');

var API_URL = "http://www.murnow.com/api/search/?q=";

function search() {
    $('.submit').on("click", function(evnt) {
        evnt.preventDefault();
        var input = $('.search-input').val();
        appRouter.navigate('search/?q=' + input, {
            trigger: true
        });
    });
}


//Backbone router

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
        'search/?q=:query': 'productList',
        'product/:productId': 'productView'
    },
    home: productSearch,
    productList: productList,
    productView: productView
});

var appRouter = new AppRouter();
Backbone.history.start();

// Home page search view
function productSearch() {
    $app.html('');
    var $homeDiv = $('<div id="home-div">');

    $('#home-div > form > input[type="search"]').focus();
    $app.append($homeDiv);
    $homeDiv.append("<form><input type='search' class='search-input' id='home-search-bar' placeholder='search for your favourite makeup'><button class='submit'>Search</button></form>");
    search();
    $app.append('<div id="signature"><img src="assets/not_the_billionaires.png">');

}

//Product list view
function productList(input, pageNum) {
    $.getJSON(API_URL + input).then(function(response) {

        if (response.search.length === 0) {
            $app.html(''); // Clear the #app div
            $app.append($header);
            search();
            $app.append('<h1>We do not have what you are looking for. Search again</h1>');
        }
        else {
            $app.html(''); // Clear the #app div
            $app.append($header);
            search();
            //ul needs to be appended to the div

            var $ul = $('<ul class="large-block-grid-5">');
            $app.append($ul);

            response.search.forEach(function(product) {
                var $li = $('<li>');
                $ul.append($li);
                var name=product.product_name.substring(0,30);
                if (name.length>29){
                    name =  name +'...';
                }
                var brand = product.brand_name;
                var img = ('https://d3gm19tlfubzts.cloudfront.net/images_products/' + product.hash_url_image + '.jpg');

                var $a = $('<a href="#product/' + product.id + '">');
                $li.append($a);

                $a.append('<image src=' + img + '>');
                $a.append('<p class=name>' + name + '</p>');
                $a.append('<p class=brand>' + brand + '</p>');
            });
            //Button and load more function
            var $loadMoreProducts = $('<button id="more-products">Load more!</button>');
            $app.append($loadMoreProducts);
            $('#more-products').on("click", function(evnt) {
                pageNum++;
                $.getJSON(API_URL + input + '&from=' + (pageNum * 20)).then(function(response) {
                    response.search.forEach(function(product) {
                        var $li = $('<li>');
                        $app.find('ul').append($li);
                        var name = product.product_name;
                        var brand = product.brand_name;
                        var img = ('https://d3gm19tlfubzts.cloudfront.net/images_products/' + product.hash_url_image + '.jpg');

                        var $a = $('<a href="#product/' + product.id + '">');
                        $li.append($a);

                        $a.append('<image src=' + img + '>');
                        $a.append('<p class=name>' + name + '</p>');
                        $a.append('<p class=brand>' + brand + '</p>');
                    });
                });
            });
        }
    });
}


//Product view with videos

function productView(productId) {
    $.getJSON('http://www.murnow.com/api/products/' + productId).then(
        function(product) {
            var name = product.product.product_name;
            var brand = product.product.brand_name;
            var img = ('https://d3gm19tlfubzts.cloudfront.net/images_products/' + product.product.hash_url_image + '.jpg');


            $app.html('');
            $app.append($header);
            search();


            var $productProfile = $('<div id="productProfile" class="row">');
            $app.append($productProfile);
            $app.find('#productProfile').append('<div class="large-5 columns"><image src=' + img + '>');
            $app.find('#productProfile').append('<div class="large-7 columns"><h1>' + name);
            $app.find('#productProfile').append('<div class="large-7 columns"><h2>' + brand);

            var youtubeCall = ('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + name + brand + ' review&key=AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
            $.getJSON(youtubeCall).then(function(response) {
                
                $app.append('<div id=videos class=row>');
                response.items.forEach(function(video) {

                    $app.find('#videos').append('<div class="small-12 medium-6 large-4 columns"><iframe src="https://www.youtube.com/embed/' + video.id.videoId + '">');
                });
            });
        }
    );
}
