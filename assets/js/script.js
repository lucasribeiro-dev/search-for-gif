
    // url Async requesting function
    function httpGetAsync(theUrl, callback)
    {
        // create the request object
        var xmlHttp = new XMLHttpRequest();
    
        // set the state change callback to capture when the response comes in
        xmlHttp.onreadystatechange = function()
        {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                callback(xmlHttp.responseText);
            }
        }
    
        // open as a GET call, pass in the url and set async = True
        xmlHttp.open("GET", theUrl, true);
    
        // call send with no params as they were passed in on the url string
        xmlHttp.send(null);
    
        return;
    }
    
    // callback for the top 8 GIFs of search
    function tenorCallback_search(responsetext)
    {
        // parse the json response
        var response_objects = JSON.parse(responsetext);
    
        top_10_gifs = response_objects["results"];
    
        // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)

        if($('.col-4').length > 0){
            $('.col-4').remove();
        }
    
        for (let index = 0; index < top_10_gifs.length; index++) {
            $('.row').append(`<div class="col-4"> <img  class="estilo"id="preview_gif" src="${top_10_gifs[index]["media"][0]["nanogif"]["url"]}" alt="" style="width:100%;height:100%;"></div>`);            
        } // Add gif in html

        
        return;
    
    }

// Write and search same time
$('#search').bind('keyup', function(){
    var apikey = "LIVDSRZULELA";
    var lmt = 9;
    var search_term = $('#search').val();
    // test search term

    // using default locale of en_US
    var search_url = "https://api.tenor.com/v1/search?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

    httpGetAsync(search_url,tenorCallback_search);

    // data will be loaded by each call's callback
    
});