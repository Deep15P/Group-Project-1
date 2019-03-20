//  This is for the carousel "suggested recipes"
  $(document).ready(function(){
    $('.carousel').carousel();
  });

  var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
  });

  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });

// This is the Initialization for the Collapsible element. (The information card in HTML)
  $(document).ready(function(){
    $('.collapsible').collapsible();
  });

 
// code for our app  

var foodDescription = [];
var queryURL;

function processImage() {
    $("#recipeCarousel").empty();
    var foodDescription = [];

    // var subscriptionKey = "d23210747bca46cf8719587b2695a178";
    var uriBase =
        "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";


    // Request parameters.
    var params = {
        "visualFeatures": "Categories,Description,Color",
        "details": "",
        "language": "en",
    };

    // Display the image.
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // Make the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader(
                "Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

    .done(function(data) {
        // Show formatted JSON on webpage.
        $("#responseTextArea").val(JSON.stringify(data, null, 2));

        for (i = 0; i < data.description.tags.length; i++) {
            foodDescription.push(data.description.tags[i]);
        }
        console.log(foodDescription);

        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=";

        for (i = 0; i < (foodDescription.length - 1); i++) {
            queryURL = queryURL + foodDescription[i]+ "%2C";
        }   

        queryURL = queryURL + foodDescription[foodDescription.length - 1];

        $.ajax({
        url: queryURL,
        type: "GET",
        beforeSend: function(request) {
            //Deep's Key
            //request.setRequestHeader("X-RapidAPI-Key", "b9fa4c6c67msh1fa4cb6709ff60ep17e472jsncddb23332a97");
            
            //Jordan's Key
            // request.setRequestHeader("X-RapidAPI-Key", "e657763c81mshf8350fb181ffd1fp156539jsnbb2e6ef42104");
        },

        }).done(function(response) {
            for (i = 0; i < 5; i++) {

                queryURL2 = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + response[i].id + "/information";
            
                $.ajax({
                url: queryURL2,
                type: "GET",
                beforeSend: function(request2) {
                    //Deep's Key
                    //request.setRequestHeader("X-RapidAPI-Key", "b9fa4c6c67msh1fa4cb6709ff60ep17e472jsncddb23332a97");
                    
                    //Jordan's Key
                    // request2.setRequestHeader("X-RapidAPI-Key", "e657763c81mshf8350fb181ffd1fp156539jsnbb2e6ef42104");
                },

                }).done(function(response2) {

                    var pRowWOW = ('<a class="carousel-item" href="'+ response2.sourceUrl +'" target="_blank"><img src="'+ response2.image +'"class="bigger"></a>');

                    $("#recipeCarousel").append(pRowWOW);
                    $('.carousel').carousel();

                });

            }

        });
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " :
            errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" :
            jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
};


$(document).on("click", ".suggestedSubmit", function() {
    $("#recipeCarousel").empty();
    var foodDescription = [];

    // var subscriptionKey = "d23210747bca46cf8719587b2695a178";
    var uriBase =
        "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";

    // Request parameters.
    var params = {
        "visualFeatures": "Categories,Description,Color",
        "details": "",
        "language": "en",
    };

    // Display the image.
    var sourceImageUrl = $(this).attr("data-image");
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // Make the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader(
                "Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

    .done(function(data) {
        // Show formatted JSON on webpage.
        $("#responseTextArea").val(JSON.stringify(data, null, 2));

        for (i = 0; i < data.description.tags.length; i++) {
            foodDescription.push(data.description.tags[i]);
        }
        console.log(foodDescription);


        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=";


        for (i = 0; i < (foodDescription.length - 1); i++) {
            queryURL = queryURL + foodDescription[i]+ "%2C";
        }   

        queryURL = queryURL + foodDescription[foodDescription.length - 1];

        $.ajax({
        url: queryURL,
        type: "GET",
        beforeSend: function(request) {
            //Deep's Key
            //request.setRequestHeader("X-RapidAPI-Key", "b9fa4c6c67msh1fa4cb6709ff60ep17e472jsncddb23332a97");
            
            //Jordan's Key
            // request.setRequestHeader("X-RapidAPI-Key", "e657763c81mshf8350fb181ffd1fp156539jsnbb2e6ef42104");
        },

        }).done(function(response) {
            for (i = 0; i < 5; i++) {

                queryURL2 = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + response[i].id + "/information";
            
                $.ajax({
                url: queryURL2,
                type: "GET",
                beforeSend: function(request2) {
                    //Deep's Key
                    //request.setRequestHeader("X-RapidAPI-Key", "b9fa4c6c67msh1fa4cb6709ff60ep17e472jsncddb23332a97");
                    
                    //Jordan's Key
                    // request2.setRequestHeader("X-RapidAPI-Key", "e657763c81mshf8350fb181ffd1fp156539jsnbb2e6ef42104");
                },

                }).done(function(response2) {

                    var pRowWOW = ('<a class="carousel-item" href="'+ response2.sourceUrl +'" target="_blank"><img src="'+ response2.image +'" class="bigger"></a>');

                    $("#recipeCarousel").append(pRowWOW);
                    $('.carousel').carousel();

                });
            }
        });
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " :
            errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" :
            jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
})
    
    
