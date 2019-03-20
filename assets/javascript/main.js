
// this is for the caruosel "Recipes"
  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('.carousel');
  //   var instances = M.Carousel.init(elems, options);
  // });

  


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
  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('.collapsible');
  //   var instances = M.Collapsible.init(elems, options);
  // });

  // Or with jQuery

  $(document).ready(function(){
    $('.collapsible').collapsible();
  });

 
// code for our app  

var foodDescription = [];
var queryURL;
// var recipeIDURL = "";
// var foodPicture = "";
// var foodTitle = "";


  // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCeKZAu8spCtSaXnYu3yLEXycn24kOXEoY",
//     authDomain: "food-for-thought-fec35.firebaseapp.com",
//     databaseURL: "https://food-for-thought-fec35.firebaseio.com",
//     projectId: "food-for-thought-fec35",
//     storageBucket: "food-for-thought-fec35.appspot.com",
//     messagingSenderId: "160354504546"

//   };
  
//   firebase.initializeApp(config);

//   var database = firebase.database();



    function processImage() {
        $("#recipeCarousel").empty();
        var foodDescription = [];
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

        // Replace <Subscription Key> with your valid subscription key.
        var subscriptionKey = "d23210747bca46cf8719587b2695a178";
        // var subscriptionKey = "e657763c81mshf8350fb181ffd1fp156539jsnbb2e6ef42104";

        // You must use the same Azure region in your REST API method as you used to
        // get your subscription keys. For example, if you got your subscription keys
        // from the West US region, replace "westcentralus" in the URL
        // below with "westus".
        //
        // Free trial subscription keys are generated in the "westus" region.
        // If you use a free trial subscription key, you shouldn't need to change
        // this region.
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
            console.log('resp: %o', data);

            for (i = 0; i < data.description.tags.length; i++) {
                foodDescription.push(data.description.tags[i]);
            }
            console.log(foodDescription);


            var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=";

 
    for (i = 0; i < (foodDescription.length - 1); i++) {
        queryURL = queryURL + foodDescription[i]+ "%2C";
        console.log(foodDescription[i]);
    }   
    queryURL = queryURL + foodDescription[foodDescription.length - 1];
    console.log(queryURL);


    $.ajax({
      url: queryURL,
      type: "GET",
      beforeSend: function(request) {
          //Deep's Key
          //request.setRequestHeader("X-RapidAPI-Key", "b9fa4c6c67msh1fa4cb6709ff60ep17e472jsncddb23332a97");
          
          //Jordan's Key
          request.setRequestHeader("X-RapidAPI-Key", "e657763c81mshf8350fb181ffd1fp156539jsnbb2e6ef42104");
      },
    }).done(function(response) {
        console.log(response);
        for (i = 0; i < 5; i++) {
            // var recipeIDURL;

            // foodPicture = response[i].image;
            // foodTitle = response[i].title;

            queryURL2 = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + response[i].id + "/information";
            console.log(queryURL2);
        
        
            $.ajax({
              url: queryURL2,
              type: "GET",
              beforeSend: function(request2) {
                  //Deep's Key
                  //request.setRequestHeader("X-RapidAPI-Key", "b9fa4c6c67msh1fa4cb6709ff60ep17e472jsncddb23332a97");
                  
                  //Jordan's Key
                  request2.setRequestHeader("X-RapidAPI-Key", "e657763c81mshf8350fb181ffd1fp156539jsnbb2e6ef42104");
              },

            }).done(function(response2) {
                console.log(response2);
                // recipeIDURL = response2.sourceUrl;
                // console.log(recipeIDURL);

            //     <div class="carousel">
            //     <a class="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1"></a>
            //     <a class="carousel-item" href="#two!"><img src="https://lorempixel.com/250/250/nature/2"></a>
            //     <a class="carousel-item" href="#three!"><img src="https://lorempixel.com/250/250/nature/3"></a>
            //     <a class="carousel-item" href="#four!"><img src="https://lorempixel.com/250/250/nature/4"></a>
            //     <a class="carousel-item" href="#five!"><img src="https://lorempixel.com/250/250/nature/5"></a>
            //   </div>

                var pRowWOW = ('<a class="carousel-item" href="'+ response2.sourceUrl +'" target="_blank"><img src="'+ response2.image +'"class="bigger"></a>');
                    
                    
                    
                //     '<div class="row">'
                // + '<div class="col s12 m7">'
                // + '<div id="Card3">'
                // + '<div id="suggested-box" class="card blue-grey darken-1 white-text">'
                // + '<div class="card-image">'
                // + '<img src=' + response2.image + '>'
                // + '<span class="card-title"><a href="' + response2.sourceUrl + '" target="_blank">' + response2.title + '</a></span>'
                // + '</div>'
                // // + '<div class="card-action">'
                // // + '<a class="waves-effect waves-light btn">Save</a>'
                // // + '</div>'
                // + '</div>'
                // + '</div>'
                // + '</div>');

            $("#recipeCarousel").append(pRowWOW);
            $('.carousel').carousel();

                });
    
            // trial 1
            // var pRow = $("<div>");
            // pRow.addClass("row");
            // pRow.append('<div class="col s12 m7">').append('<div id="Card3">').append('<div id="suggested-box" class="card blue-grey darken-1 white-text">');
            // pRow.append('<div class="card-image">').append($("<img>").attr("src", response[i].image));
            // pRow.append('<span class="card-title">Suggested Pictures</span>');
            // pRow.append('</div>');
            // pRow.append('<div class="card-content"><p>' + response[i].title + '</div>');
            // pRow.append('<div class="card-action">');
            // pRow.append('</div>').append('</div>').append('</div>').append('</div>');
            // $(".container").append(pRow);

            // trail 2
            // var cardImage = $("<div>");
            // cardImage.addClass("card-image");
            // cardImage.append($("<img>").attr("src", response[i].image));
            //
            // var pRow = $("<div>");
            // pRow.addClass("row");
            // pRow = pRow.append('<div class="col s12 m7">');
            // pRow = pRow.append('<div id="Card3">');
            // pRow = pRow.append('<div id="suggested-box" class="card blue-grey darken-1 white-text">');
            // pRow = pRow.append(cardImage);
            // pRow = pRow.append('<div class="card-content"><p>' + response[i].title + '</div>');
            // pRow = pRow.append('<div class="card-action">');
            // $(".container").append(pRow);

            // var pRowWOW = ('<div class="row">'
            //     + '<div class="col s12 m7">'
            //     + '<div id="Card3">'
            //     + '<div id="suggested-box" class="card blue-grey darken-1 white-text">'
            //     + '<div class="card-image">'
            //     + '<img src=' + response[i].image + '>'
            //     + '<span class="card-title"><a href="' + recipeIDURL + '">' + response[i].title + '</a></span>'
            //     + '</div>'
            //     + '<div class="card-action">'
            //     + '</div>'
            //     + '</div>'
            //     + '</div>'
            //     + '</div>');

            // $(".container").append(pRowWOW);

            

        // Reference
        // <div class="row">
        // <div class="col s12 m7">
        // <div id="Card3">
        //   <div id="suggested-box" class="card blue-grey darken-1 white-text">
        //     <div class="card-image">
        //       <img src="assets/spaghetti.jpg">
        //       <span class="card-title">Suggested Pictures</span>
        //     </div>
        //     <div class="card-content">
        //         <p>Spaghetti</p>
        //     </div>
        //     <div class="card-action">
        //     </div>
        //   </div>
        // </div>
        // </div>

        // var recipeIDURL = "";
        // var foodPicture = "";
        // var foodTitle = "";

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
      // **********************************************
      // *** Update or verify the following values. ***
      // **********************************************

      // Replace <Subscription Key> with your valid subscription key.
      var subscriptionKey = "d23210747bca46cf8719587b2695a178";
      // var subscriptionKey = "e657763c81mshf8350fb181ffd1fp156539jsnbb2e6ef42104";

      // You must use the same Azure region in your REST API method as you used to
      // get your subscription keys. For example, if you got your subscription keys
      // from the West US region, replace "westcentralus" in the URL
      // below with "westus".
      //
      // Free trial subscription keys are generated in the "westus" region.
      // If you use a free trial subscription key, you shouldn't need to change
      // this region.
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
          console.log('resp: %o', data);

          for (i = 0; i < data.description.tags.length; i++) {
              foodDescription.push(data.description.tags[i]);
          }
          console.log(foodDescription);


          var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=";


  for (i = 0; i < (foodDescription.length - 1); i++) {
      queryURL = queryURL + foodDescription[i]+ "%2C";
      console.log(foodDescription[i]);
  }   
  queryURL = queryURL + foodDescription[foodDescription.length - 1];
  console.log(queryURL);


  $.ajax({
    url: queryURL,
    type: "GET",
    beforeSend: function(request) {
        //Deep's Key
        //request.setRequestHeader("X-RapidAPI-Key", "b9fa4c6c67msh1fa4cb6709ff60ep17e472jsncddb23332a97");
        
        //Jordan's Key
        request.setRequestHeader("X-RapidAPI-Key", "e657763c81mshf8350fb181ffd1fp156539jsnbb2e6ef42104");
    },
  }).done(function(response) {
      console.log(response);
      for (i = 0; i < 5; i++) {
          // var recipeIDURL;

          // foodPicture = response[i].image;
          // foodTitle = response[i].title;

          queryURL2 = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + response[i].id + "/information";
          console.log(queryURL2);
      
      
          $.ajax({
            url: queryURL2,
            type: "GET",
            beforeSend: function(request2) {
                //Deep's Key
                //request.setRequestHeader("X-RapidAPI-Key", "b9fa4c6c67msh1fa4cb6709ff60ep17e472jsncddb23332a97");
                
                //Jordan's Key
                request2.setRequestHeader("X-RapidAPI-Key", "e657763c81mshf8350fb181ffd1fp156539jsnbb2e6ef42104");
            },

          }).done(function(response2) {
              console.log(response2);
              // recipeIDURL = response2.sourceUrl;
              // console.log(recipeIDURL);

          //     <div class="carousel">
          //     <a class="carousel-item" href="#one!"><img src="https://lorempixel.com/250/250/nature/1"></a>
          //     <a class="carousel-item" href="#two!"><img src="https://lorempixel.com/250/250/nature/2"></a>
          //     <a class="carousel-item" href="#three!"><img src="https://lorempixel.com/250/250/nature/3"></a>
          //     <a class="carousel-item" href="#four!"><img src="https://lorempixel.com/250/250/nature/4"></a>
          //     <a class="carousel-item" href="#five!"><img src="https://lorempixel.com/250/250/nature/5"></a>
          //   </div>

              var pRowWOW = ('<a class="carousel-item" href="'+ response2.sourceUrl +'" target="_blank"><img src="'+ response2.image +'" class="bigger"></a>');
                  
                  
                  
              //     '<div class="row">'
              // + '<div class="col s12 m7">'
              // + '<div id="Card3">'
              // + '<div id="suggested-box" class="card blue-grey darken-1 white-text">'
              // + '<div class="card-image">'
              // + '<img src=' + response2.image + '>'
              // + '<span class="card-title"><a href="' + response2.sourceUrl + '" target="_blank">' + response2.title + '</a></span>'
              // + '</div>'
              // // + '<div class="card-action">'
              // // + '<a class="waves-effect waves-light btn">Save</a>'
              // // + '</div>'
              // + '</div>'
              // + '</div>'
              // + '</div>');

          $("#recipeCarousel").append(pRowWOW);
          $('.carousel').carousel();

              });
  
          // trial 1
          // var pRow = $("<div>");
          // pRow.addClass("row");
          // pRow.append('<div class="col s12 m7">').append('<div id="Card3">').append('<div id="suggested-box" class="card blue-grey darken-1 white-text">');
          // pRow.append('<div class="card-image">').append($("<img>").attr("src", response[i].image));
          // pRow.append('<span class="card-title">Suggested Pictures</span>');
          // pRow.append('</div>');
          // pRow.append('<div class="card-content"><p>' + response[i].title + '</div>');
          // pRow.append('<div class="card-action">');
          // pRow.append('</div>').append('</div>').append('</div>').append('</div>');
          // $(".container").append(pRow);

          // trail 2
          // var cardImage = $("<div>");
          // cardImage.addClass("card-image");
          // cardImage.append($("<img>").attr("src", response[i].image));
          //
          // var pRow = $("<div>");
          // pRow.addClass("row");
          // pRow = pRow.append('<div class="col s12 m7">');
          // pRow = pRow.append('<div id="Card3">');
          // pRow = pRow.append('<div id="suggested-box" class="card blue-grey darken-1 white-text">');
          // pRow = pRow.append(cardImage);
          // pRow = pRow.append('<div class="card-content"><p>' + response[i].title + '</div>');
          // pRow = pRow.append('<div class="card-action">');
          // $(".container").append(pRow);

          // var pRowWOW = ('<div class="row">'
          //     + '<div class="col s12 m7">'
          //     + '<div id="Card3">'
          //     + '<div id="suggested-box" class="card blue-grey darken-1 white-text">'
          //     + '<div class="card-image">'
          //     + '<img src=' + response[i].image + '>'
          //     + '<span class="card-title"><a href="' + recipeIDURL + '">' + response[i].title + '</a></span>'
          //     + '</div>'
          //     + '<div class="card-action">'
          //     + '</div>'
          //     + '</div>'
          //     + '</div>'
          //     + '</div>');

          // $(".container").append(pRowWOW);

          

      // Reference
      // <div class="row">
      // <div class="col s12 m7">
      // <div id="Card3">
      //   <div id="suggested-box" class="card blue-grey darken-1 white-text">
      //     <div class="card-image">
      //       <img src="assets/spaghetti.jpg">
      //       <span class="card-title">Suggested Pictures</span>
      //     </div>
      //     <div class="card-content">
      //         <p>Spaghetti</p>
      //     </div>
      //     <div class="card-action">
      //     </div>
      //   </div>
      // </div>
      // </div>

      // var recipeIDURL = "";
      // var foodPicture = "";
      // var foodTitle = "";

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
    
    
