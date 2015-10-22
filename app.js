
$('#search > form > input[type="search"]').focus();

 
$('#submit').on("click", function (evnt) {
    evnt.preventDefault();
    var guess = $('#guess-value').val();
    console.log(guess);
    return guess;
   
});