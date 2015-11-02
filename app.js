//Reusable elements

var $app = $('#app');


var $header = $('<div id="header"><a href="#"><img src="assets/home.png" ></a><form><input type="search" class="search-input" id="header-search-bar" placeholder="&#xf002;"><button class="submit"></button></form></div>');



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
        'error404': 'error404',
        'search/?q=:query': 'productList',
        'product/:productId': 'productView'
    },
    home: productSearch,
    error404:error404,
    productList: productList,
    productView: productView
});

var appRouter = new AppRouter();
appRouter.on('route', function() {
    $('html,body').scrollTop(0);
});
Backbone.history.start();

// Home page search view
function productSearch() {
    $app.html('');
    var $homeDiv = $('<div id="home-div">');

    $('#home-div > form > input[type="search"]').focus();
    $app.append($homeDiv);
    $homeDiv.append('<h1>the makeup master</h1>');
    $homeDiv.append('<h2>find the best makeup products</h2>');
    $homeDiv.append("<div class='wrapper'><form><input type='search' class='search-input' id='home-search-bar' placeholder='&#xf002;'><button class='submit'>Search</button></form><div id='signature'><img src='assets/not_the_billionaires.png'></div></div>");

    search();
    $app.append("");
}

//home page error404

function error404(){
    $app.html('');
    var $homeDiv = $('<div id="home-div">');
    $('#home-div > form > input[type="search"]').focus();
    $app.append($homeDiv);
    $homeDiv.append('<h1>the makeup master</h1>');
    $homeDiv.append("<div class='wrapper'><form><input type='search' class='search-input' id='home-search-bar' placeholder='&#xf002;'><button class='submit'>Search</button></form><div id='error404'><img src='assets/error404.png'></div></div>");
    search();
}

//Product list view
function productList(input, pageNum) {
    $.getJSON(API_URL + input).then(function(response) {

        if (response.search.length === 0) {
            window.location.href = "#error404";
        }
        else {
            $app.html(''); // Clear the #app div
            $app.append($header);
            search();
            //ul needs to be appended to the div

            var $ul = $('<ul class="small-block-grid-1 medium-block-grid-3 large-block-grid-5">');
            $app.append($ul);

            response.search.forEach(function(product) {
                var $li = $('<li>');
                $ul.append($li);
                var name=product.product_name.substring(0,21);
                if (name.length>20){
                    name =  name +'...';
                }
                var brand = product.brand_name;
                var img = ('https://d3gm19tlfubzts.cloudfront.net/images_products/' + product.hash_url_image + '.jpg');
                var $a = $('<a href="#product/' + product.id + '">');
                $li.append($a);

                $a.append('<image src=' + img + '>');
                $a.append('<p class=name>' + name + '</p>');
                $a.append('<p class=brand>' + brand + '</p>');
                
                
                //stars reviews
                var stars = product.product_stars;
                var emptyStar = "<i class='fa fa-star-o'></i>";
                var fullStar = "<i class='fa fa-star'></i>";
                if(stars<=0.5){
                    $a.append(emptyStar + emptyStar + emptyStar + emptyStar + emptyStar);
                }
                else if(stars<=1.4){
                    $a.append(fullStar + emptyStar + emptyStar + emptyStar + emptyStar);
                }
                else if (stars<=2.4){
                    $a.append(fullStar + fullStar + emptyStar + emptyStar + emptyStar);
                }
                else if(stars<=3.4){
                    $a.append(fullStar + fullStar + fullStar + emptyStar + emptyStar);
                }
                else if (stars<=4.4){
                    $a.append(fullStar + fullStar + fullStar + fullStar + emptyStar);
                }
                else if (stars<=5){
                    $a.append(fullStar + fullStar + fullStar + fullStar + fullStar);
                }
                
                
            });
            //Button and load more function
            var $loadMoreProducts = $('<button id="more-products">Load more</button>');
            $app.append($loadMoreProducts);
            $('#more-products').on("click", function(evnt) {
                pageNum++;
                $.getJSON(API_URL + input + '&from=' + (pageNum * 20)).then(function(response) {
                    response.search.forEach(function(product) {
            
                        var $li = $('<li>');
                        $app.find('ul').append($li);
                        var name=product.product_name.substring(0,21);
                        if (name.length>20){
                            name =  name +'...';
                        }
                        var brand = product.brand_name;
                        var img = ('https://d3gm19tlfubzts.cloudfront.net/images_products/' + product.hash_url_image + '.jpg');

                        var $a = $('<a href="#product/' + product.id + '">');
                        $li.append($a);

                        $a.append('<image src=' + img + '>');
                        $a.append('<p class=name>' + name + '</p>');
                        $a.append('<p class=brand>' + brand + '</p>');
                        
                                
                        //stars reviews
                        var stars = product.product_stars;
                        var emptyStar = "<i class='fa fa-star-o'></i>";
                        var fullStar = "<i class='fa fa-star'></i>";
                        if(stars<=0.5){
                            $a.append(emptyStar + emptyStar + emptyStar + emptyStar + emptyStar);
                        }
                        else if(stars<=1.4){
                            $a.append(fullStar + emptyStar + emptyStar + emptyStar + emptyStar);
                        }
                        else if (stars<=2.4){
                            $a.append(fullStar + fullStar + emptyStar + emptyStar + emptyStar);
                        }
                        else if(stars<=3.4){
                            $a.append(fullStar + fullStar + fullStar + emptyStar + emptyStar);
                        }
                        else if (stars<=4.4){
                            $a.append(fullStar + fullStar + fullStar + fullStar + emptyStar);
                        }
                        else if (stars<=5){
                            $a.append(fullStar + fullStar + fullStar + fullStar + fullStar);
                        }
                        
                        
                        
                        
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
            var shop = product.product.original_url;

            $app.html('');
            $app.append($header);
            search();


            var $productProfile = $('<div id="productProfile" class="row">');
            $app.append($productProfile);
            $app.find('#productProfile').append('<div class="small-4 columns"><image src=' + img + '>');
            $app.find('#productProfile').append('<div class="small-8 columns"><h1>' + name);
            $app.find('#productProfile').append('<div class="small-8 columns"><h2>' + brand);
            $app.find('#productProfile').append('<a href='+ shop + 'class="small-3 columns">Shop Now</a>');


            var youtubeCall = ('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + name + brand + ' review&maxResults=12&key=AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
            $.getJSON(youtubeCall).then(function(response) {
                if(response.items.length===0){
                    $app.append("<img id='novideos' src='assets/novideos.png'>");
                }
                else{

                    $app.append('<ul id=videos class="small-block-grid-1 medium-block-grid-2 large-block-grid-3">');

                    response.items.forEach(function(video) {
    
                        $app.find('#videos').append('<li><iframe src="https://www.youtube.com/embed/' + video.id.videoId + '">');
                    });
                }
            });
        }
    );
}

