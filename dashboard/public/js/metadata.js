$(function(){
    
    /*Get the Api link from the global variable declarations (js/globals.js)*/
    const apiLink = globals.metadataLink;
    
    /*The function for receiving data from candle.json*/
    getJsonData();
    
    /*Declare pagination variables */
    var metadata;
    var metadatalength;
    var currentPage = 1;
    var perPage = 20;
    var totalPages;
    var tempMetadata = [];


    /*--------------------------------------------------*/
    /* Ajax function to get the list from Json API      */
    function getJsonData(){

       $("#loading-holder").removeClass(" loading-not-visible ").addClass(" loading-visible ");

        $.ajax({
            url: apiLink,
            method: 'GET',
            success: function(response) {

                // Handle the API response here
                metadata = response.hits.hits;
                // Assign the lengs of the json object to the propper parameter
                metadatalength = metadata.length;
                totalPages = Math.round(Number(metadatalength)/Number(perPage));

                var too = Number(perPage)-Number(1);
        
                for ( var i = 0, l = Number(perPage)-Number(1); i <= l; i++ ) {

                    tempMetadata.unshift(metadata[i]);
                    //tempMetadata.push(metadata[i]);

                    // End of the loop
                    if(i == Number(perPage)-Number(1)){
                  
                       renderItems(tempMetadata);
                       pageCounter();

                       $("#loading-holder").removeClass(" loading-visible ").addClass(" loading-not-visible ");
                       $("#next").removeClass(" not-clickable ").addClass(" clickable ");

                        //If there is only one page of items disable the next button!
                       if(metadatalength == perPage){
                        $("#next").removeClass(" clickable ").addClass(" not-clickable ");
                       }
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error(status, error);
            }
        });
     }



    /*--------------------------------------------------*/
    /*function to render the Array Candels for each page*/

    function renderItems(metadata){

        $.each(metadata, function(key,value) {
            $( ".candle-grid-holder" ).prepend( `<div class='grid'>
            <div class='cell'>ID</div><div class='cell'>`+value._id+`</div>
            <div class='cell'>Symbol</div><div class='cell'>`+value._source.symbol+`</div>
            <div class='cell'>Kategorie</div><div class='cell'>`+value._source.category+`</div>
            <div class='cell'>Währung</div><div class='cell'>`+value._source.currency+`</div>
            <div class='cell'>Isin</div><div class='cell'>`+value._source.isin+`</div>
            <div class='cell'>Ländername</div><div class='cell'>`+value._source.countryName+`</div>
            <div class='cell'>Aktualisiert am</div><div class='cell'>`+value._source.updatedAt+`</div>
            <div class='cell'>Gültig bis</div><div class='cell'>`+value._source.validUntil+`</div>
        </div>`);
        });
    }


    /*--------------------------------------------------------*/
    /*Function next Page for the pagination                   */

    $( "#next" ).on( "click", function() {
        
        //show loading when clicking next 
        $("#loading-holder").removeClass(" loading-not-visible ").addClass(" loading-visible ");
        //Remove current items and prepare the place holder for the next page 
        $("div.grid").remove();
        
        //Empty the tem Candles Array
        tempMetadata = [];
        
        //Define next page from and to items (have in mind that the json object starts from 0)
        var from = (Number(currentPage) * Number(perPage)) - 1;
        var to = Number(from) + Number(perPage);

        //Define last page items if less than perPage variable
        if(to > metadatalength) {
           
            lastPage = (metadatalength - from)-1;
            to = from + lastPage;
        }
             
        //Iterate throght Json object and construct new page items
        for ( var i = from, l = to; i <=l; i++ ) {
        

            //tempMetadata.push(candles[i]);
            tempMetadata.unshift(metadata[i]);

            //Detect and of for loop
            if(i == l){
                
                //Increment current page
                currentPage++; 
                
                //Prepare pagination buttons and remove loading 
                $("#prev").removeClass(" not-clickable ").addClass(" clickable ");
                $("#next").removeClass(" not-clickable ").addClass(" clickable ");
                $("#loading-holder").removeClass(" loading-visible ").addClass(" loading-not-visible ");

                //Adjust pagecouner on the pagination widget
                pageCounter();

                //Render page items to the interface
                renderItems(tempMetadata);
                var nextPage = currentPage + 1;
                //Disable next button of pagination when last page
                if(nextPage > totalPages)
                {   
                    $("#next").removeClass(" clickable ").addClass(" not-clickable ");
                }


            }

        }

    } );



    /*-------------------------------------*/
    /*Function prev page                   */

    $( "#prev" ).on( "click", function() {
            
        //Decrement current page
        currentPage--;
        
        //Empty the temp Array for page items 
        tempMetadata = [];

        //Show loading and empty the html interface form page items
        $("#loading-holder").removeClass(" loading-not-visible ").addClass(" loading-visible ");
        $("div.grid").remove();
        
        //Set from and to page items 
        var from = (Number(currentPage) * Number(perPage)) - perPage;
        var to = (Number(from) + Number(perPage)) - 1;

        //Loop through json to find next page items
        for ( var i = from, l = to; i <=l; i++ ) {

            tempMetadata.unshift(metadata[i]);
            //tempMetadata.push(metadata[i]);
            
            //Detect end of the loop
            if(i == l){
                
                //Render page items to the interface
                renderItems(tempMetadata);
                //Render page counter 
                pageCounter();

                //Render next and prev buttons and remove loading
                $("#prev").removeClass(" not-clickable ").addClass(" clickable ");
                $("#next").removeClass(" not-clickable ").addClass(" clickable ");
                $("#loading-holder").removeClass(" loading-visible ").addClass(" loading-not-visible ");

                //Disable prev button of the pagination when first page
                if((currentPage-1) == 0){
                    $("#prev").removeClass(" clickable ").addClass(" not-clickable ");
                }
            }
        }
        
    } );
    
    /*-------------------------------------------*/
    /*Function to render the page counter         */

    function pageCounter(){

        $(".page-counter").html("<p>pages: "+totalPages+"        / current page: "+currentPage+"</p>");

    }


 /*JQuery end*/
})