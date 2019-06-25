$(document).ready(function () {

    // Initial array of animals
    var animals = ["Dogs", "Cats", "Fish"];

    // Function for displaying animals
    function renderButtons() {
        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

            // Deleting the animal buttons prior to adding new animal buttons
            // (this is necessary otherwise we will have repeat buttons)
            //$("#addButton").empty();

            // Then dynamicaly generating buttons for each animal in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            a.attr("data-search", animals[i]);
            // Adding a class
            a.addClass("animal btn btn-primary");
            a.css({
                margin: "5px",

            });
            // Providing the button's text with a value of the animal at index i
            a.text(animals[i]);
            // Adding the button to the HTML
            $("#addButton").append(a);
        }
    }

    // This function handles events where one button is clicked
    $("#add-animal").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        $("#addButton").empty();
        // This line will grab the text from the input box
        var animalInput = $("#search-input").val().trim();
        // The animal from the textbox is then added to our array
        animals.push(animalInput);
        //Clear the search box
        $("#search-input").val("");
        // calling renderButtons which handles the processing of our animals array
        renderButtons();
    });

    // Calling the renderButtons function at least once to display the initial list of animals
    renderButtons();
    



    //Giphy API
    $(document).on('click', 'button', function () {
        var x = $(this).data("search");
        console.log(x);
        $("#gifDisplay").empty();
        
        


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=x221pYhxCvwkHdmZNNHqYe7nlKhl2C6r&limit=8";
        console.log(queryURL);

        $.ajax({ url: queryURL, method: 'GET' })
            .done(function (response) {
                console.log(response);
                //Loop to display images
                for (let i = 0; i < response.data.length; i++) {
                    var displayDiv = $('<div>');
                    displayDiv.addClass("col-md-3");
                    var animalImage = $('<img>');
                    displayDiv.append(animalImage);
                    animalImage.css({
                        margin: "10px",
                        height: 200,
                        width: 200
                    });
                    //Add image state atrributes
                    animalImage.attr('src', response.data[i].images.original_still.url);
                    animalImage.attr('animate', response.data[i].images.downsized.url);
                    animalImage.attr('temp', response.data[i].images.original_still.url);
                    animalImage.attr('state', "still");
                    animalImage.addClass('gif');

                    displayDiv.append('<p> Rating: ' + response.data[i].rating + '</p>');
                    $('#gifDisplay').append(displayDiv);



                }

            })

    })
    //Toggle between still and animate
    $(document).on('click', '.gif', function () {
        if (state === "still") {
            $(this).attr("src", $(this).attr("animate"));
            $(this).attr("state", "animate");
        } else {
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("state", "still");
        }
    });
})


//Giphy API Key: x221pYhxCvwkHdmZNNHqYe7nlKhl2C6r

//