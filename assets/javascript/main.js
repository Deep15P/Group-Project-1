var foodDescription = [];
var queryURL;

    function processImage() {

        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

        // Replace <Subscription Key> with your valid subscription key.
        var subscriptionKey = "bb67316b6c4346a8afc00f7cae5c7dbc";
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
            console.log(data);
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
          request.setRequestHeader("X-RapidAPI-Key", "b9fa4c6c67msh1fa4cb6709ff60ep17e472jsncddb23332a97");
      },
    }).then(function(response) {
        console.log(response);
        var pRecipe = $("<p>");
    for (i = 0; i < 5; i++) {
        pRecipe.append()

    }
      console.log(response);
      foodDescription = [];

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