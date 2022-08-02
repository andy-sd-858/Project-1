var apiKey = "IWz2CjT86FG1BNBbvACbPEvsdE2zLJoZlP75I04QREwRmXhDtH";
var secret = "ChLZ55rWGUFzqa4cw1biH3Z1nOsrO0JUiD0a5rQy"
console.log("string")
$(document).ready(function() {

    // global variables
    var petToken = "";
    var submitBtn = $("#critSubmit");
  
    // petfinder API Post access call
      $.ajax({
        type: "POST",
        url: "https://api.petfinder.com/v2/oauth2/token",
        data: "grant_type=client_credentials&client_id=" + apiKey + "&client_secret=" + secret,
        success: function(response) {
          petToken = response.access_token; //Generating token because it expires in an hour, would normally be handled server side 
          //Default dog
          populateBreeds("dog");
        }
      });
      
    //Breeds button activation
    $("#inline_test input[name='exampleRadios']").click(function(){
      var animal = $('input:radio[name=exampleRadios]:checked').val();
      populateBreeds(animal);
    });
  
    //Breeds selection and generation
    function populateBreeds(animal){
      $.ajax({
        type: "GET",
        url: "https://api.petfinder.com/v2/types/" + animal + "/breeds",    
        headers: {"Authorization": "Bearer " + petToken},
        success: function(response) {
              
          var breedSelect = $("#breedSelect");
          breedSelect.empty(); //clear out existing options
          
          //any breed
          var anyBreed = document.createElement("option");
          anyBreed.value = "Any";
          anyBreed.innerHTML = "Any";
          breedSelect.append(anyBreed);
  
          //generate breeds
          response.breeds.forEach(e => {
          
            var opt = document.createElement("option");
            opt.value = e.name;
            opt.innerHTML= e.name;
            breedSelect.append(opt);
    
          });
        }
      });
    }
    
    //When submit button is clicked
    submitBtn.on("click", function(event){
      event.preventDefault();
   
      var zipCode = $("#userZip").val()
      var speciesValue = $("input[name='exampleRadios']:checked").val();
      var breed = $("#breedSelect").val(); 
      var gender = $("#genderSelect option:selected").val();
      let ages = $("input[type='checkbox']:checked").map(function(){return $(this).val()}).get();
           
      if (isNaN(parseInt(zipCode)) || zipCode.length != 5) {
        $("#userZip").val("");
        $("#userZip").addClass("submit-fail");
        $("#userZip").attr("placeholder", "Not valid");
      } else {
        // save inputs into local storage
        localStorage.setItem('zipCode', zipCode);
        localStorage.setItem('species', speciesValue);
        localStorage.setItem('breed', breed);
        localStorage.setItem('ages', ages); 
        localStorage.setItem('gender', gender);
  
        window.location.href = "results.html"; //go to results page
  
      console.log(zipCode);
      console.log(speciesValue);
      console.log(breed);
      console.log(ages);
      console.log(gender);}
      
    }); 
  });
  

// // Get OAuth token
// var getOAuth = function() {
//     return fetch('https://api.petfinder.com/v2/oauth2/token', {
//         method: 'POST',
//         body: 'grant_type=client_credentials&client_id=' + apikey + '&client_secret=' + secret,
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         })
//     }
//     $then(function(resp) {
//         return resp.json();
//     })
//     $then(function(data) {
//         // Store token data
//         token = data.access_token;
//         tokenType = data.token_type;
//         expires = new Date().getTime() + (data.expires_in * 1000);
//     })
//     $then(() => {
//         // use token to fetch animals
//         fetch(
//           `https://api.petfinder.com/v2/animals?type=${animal}&location=${zip}`,
//           {
//             method: "GET",
//             mode: "cors",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + token,
//             },
//           }
//         )
//           $then((res) => res.json())
//           $then((data) => showAnimals(data.animals));
//       })
//       .catch((err) => console.error(err));
// ;
// // Make call if token expired
// var makeCall = () => {
//     // If current token is invalid, get a new one
//     if (!expires || expires - new Date().getTime() < 1) {
//         getOAuth().then(function() {
//             // use access token
//         });
//     }
// };
// // the next line and function set up the button in our html to be clickable and reactive 
// document.addEventListener('DOMContentLoaded', bindButtons);

// function bindButtons(){
// 	document.getElementById("submitZip").addEventListener("click", function(event){
// 		event.preventDefault();
// 		var zip = document.getElementById("zip").value; // this line gets the zip code from the form entry
// 		var url = 'https://api.petfinder.com/v2/animals?'
// 		console.log(zip)
// 		// Within $.ajax{...} is where we fill out our query 
// 		$.ajax({
//             method: "GET",
//             url: url,
// 			data: {
//                 key: apiKey,
//                 type: "cat",
// 				location: zip,
// 				output: "basic",
                
// 			},
// 			// Here is where we handle the response we got back from Petfinder
// 			success: function( response ) {
// 				console.log(response); // debugging
// 				var catName = response.petfinder.pet.name.$t;
// 				var img = response.petfinder.pet.media.photos.photo[0].$t;
// 				var id = response.petfinder.pet.id.$t;

// 				var newName = document.createElement('a');
// 				var newDiv = document.createElement('div');
// 				newName.textContent = catName;
// 				newName.href = 'https://www.petfinder.com/petdetail/' + id;

// 				var newImg = document.createElement('img');
// 				newImg.src = img;
				
// 				var list = document.createElement("div");
// 				list.setAttribute("id", "List");
// 				document.body.appendChild(list);

// 				newDiv.appendChild(newName);
// 				list.appendChild(newDiv);
// 				list.appendChild(newImg);
// 			}
// 		});})}

    
   