let search = document.querySelector("#search");

//because the api example is generic, we need to manipulate the api to be specific to whatever is inputed

//also, need to append the token user inputs to the end of the url for it to work

//generic foward geocoding api:
//https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json



search.addEventListener("click", function(){

    //MAP API:

    let beginning = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    //doing mapbox.places as endpoint vs mapbox.places-permanent
    //as shown in the example foward geocoding
    let ending = ".json?";
    //put in endpoing/search text user inputs from UI to the end of begining
    //and ending to the end of it, and then finally append the token

    //getting address:
    let address = document.querySelector("#address");
    let addressInput = address.value;

    //inputting token:
    let token = document.querySelector("#api-key");
    let tokenInput = "access_token=" + token.value;

    let newAPI = beginning + encodeURI(addressInput) + ending + tokenInput
    //inside addEventListener -> because before it would be blank
    //making sure this happens after the user clicks search

    console.log(newAPI);
    console.log(addressInput);

    fetch(newAPI)

    .then(function(httpResponse){
        return httpResponse.json();
    })

    .then(function(data){
        console.log(data); //our JSON object
        console.log(data.features[0].center[0]);
        console.log(data.features[0].center[1]);

        let longitude = "lon=" + data.features[0].center[0];
        let latitude = "lat=" + data.features[0].center[1];

        //============================================================
    
        //Satellite NORAD:

        //api URL:
        //https://satellites.fly.dev/passes/25544? + longitude + latitude

        let start = "https://satellites.fly.dev/passes/";

        //with adding in satellite number user inputs:
        let norad = document.querySelector("#norad");
        let satellite = norad.value + "?";

        //make sure returns only if the satellite is visible:
        let visible = "&visible_only=true";

        //and visible within the next 15 days:
        let timeLimit = "&limit=1&days=15";

        let finalAPI = start + satellite + latitude + "&" + longitude + timeLimit + visible;

        fetch(finalAPI)

        .then(function(satResonse){
            return satResonse.json();
        })

        .then(function(satData){
            console.log(satData)

            let rise = satData[0].rise.utc_datetime;
            let culminate = satData[0].culmination.utc_datetime
            let set = satData[0].set.utc_datetime

            console.log(rise);
            console.log(culminate);
            console.log(set);

            let riseDate = new Date(rise);
            let culminateDate = new Date(culminate);
            let setDate = new Date(set);

            let outputT = `The next Satellite Pass over ${addressInput} is: \nRise: ${riseDate} \nCulmination: ${culminateDate} \nSet: ${setDate}`

            console.log(outputT);

           //push address into html
           let outputAddress = document.querySelector("#next");
           let textAddress = document.createTextNode(addressInput + " is: ")
           outputAddress.appendChild(textAddress);
        })
    })

})

// //starting code for adding info through javascript instead of HTML

// //display info on the rise, culminate and set times:

// //create new output div
// let output = document.createElement("div");

// //give it the same class as the other divs
// output.classList.add("section");



// //create text in new output div
// let timeInfo = document.createTextNode("");


// //add output div under input div
// let parent = document.querySelector("#parent");
// let satInfo = document.querySelector("#info");
// parent.insertBefore(output, satInfo);

// //insert text in output div
// let outputText = document.createTextNode(`The next Satellite Pass is:\n`);
// output.appendChild(outputText);
