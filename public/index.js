 //for local running in terminal type ipconfig and use that ip idress in mobile  make sure both server and mobile are connectedto same hostnameg
  




var map_init = L.map('map', {
    center: [23.814296468133172, 86.44118417874446],
   
 
    zoom: 16,
    markerZoomAnimation :true,
});
map_init.zoomControl.remove();
L.control.zoom({
    position: 'bottomright'
}).addTo(map_init);


var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    attribution: 'Chaitanya' 
}).addTo(map_init);




if(!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!")
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 5000);
}








var marker, circle, lat, long, accuracy;

function getPosition(position) {
    // console.log(position)
    lat = position.coords.latitude
    long = position.coords.longitude
    accuracy = position.coords.accuracy

    if (marker) {
        map_init.removeLayer(marker)
    }

    if (circle) {
        map_init.removeLayer(circle)
    }

    marker = L.marker([lat, long])
   
   circle = L.circle([lat, long], { radius: accuracy })

    // var featureGroup = L.featureGroup([ marker]).addTo(map_init)
    // map_init.flyTo([lat,long],18,{
    //     animate : true,
    //     duration : 1,
    // })

    // map_init.fitBounds(featureGroup.getBounds())
    

    console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)




 
}








// we uses from for sending data since we dont need to add headers etc if form everything is handled by js and html themselves
document.querySelector('.adminBtn').addEventListener('click',()=>{
 
  if (document.querySelector('#password').value ==="IamAdmin"){
    
    document.querySelector('.admin').style.display = 'block';
    document.querySelector('#password').value ="";
  }
  else{
    alert('Wrong Code Try Again')
  }
 
 
})







function showResults(val) {
  res = document.getElementById("result");
  res.innerHTML = '';
  if (val == '') {
    return;
  }
  let placeList = '';
              // During Development  BASE_URL=http://127.0.0.1:6969
  fetch(`https://mapify-7kzf.onrender.com/suggest?q=${val}`).then(
   function (response) {
     return response.json();
   }).then(function (data) {
     for (i=0; i<data.length; i++) {
       placeList += ' <ul class="innerulist">' + data[i] + '</ul>';
       
     }
     res.innerHTML = ' <ul class="ulist" >' + placeList + '</ul> ';




  document.querySelector('.ulist').addEventListener("click", (e)=>{
   // console.log(e.target.innerHTML);
  

   
   
   searchBtn=document.querySelector('.search-suggest');
     searchBtn.value = e.target.innerText;
     document.querySelector('.search-suggest').addEventListener("onkeyup", (e)=>{
      showResults()
     })
   
        
});



  
  

  



     return true;
   }).catch(function (err) {
     console.warn('Something went wrong.', err);
     return false;
   });
}

/*document.querySelector('.search-btn').addEventListener('click',(e)=>{
    const inp=document.querySelector('#input').value;
    console.log(inp)
    
    })*/
  

// // Function to update the route
// function updateRoute(waypoints) {
 

//     // Remove the previous route
//     if (control) {
//       control.remove();
//     }
   
//   // Add a new routing control instance with updated waypoints
//   let control = L.Routing.control({
//     waypoints: waypoints
//   }).addTo(map_init);

 

// }


  
document.querySelector(".cross").addEventListener("click", function() {
  location.reload(false);
});
  


let placeInfo;

document.querySelector('.icon').addEventListener('click',()=>{


  document.querySelector('.icon').className='random'
  document.querySelector('#search').style.display='none'
  document.querySelector('.cross').style.visibility='visible'
  document.querySelector('#result').style.display='none'
//   const iconElement = document.querySelector('#search'); // replace '.icon' with the selector for your specific icon element
// iconElement.addEventListener('click', (event) => {
//   iconElement.classList.add('disabled');
// });
   let point=document.querySelector('.search-suggest').value;

 // During Development  BASE_URL=http://127.0.0.1:6969
  fetch(`https://mapify-7kzf.onrender.com/maproute/location?q=${point}`).then((response)=>{return response.json()}).then((data)=>{
    placeInfo=data;
    // console.log(placeInfo[0]);
    // alert(placeInfo[0].place)




    
 // Create a new routing control instance
let control = L.Routing.control({
  waypoints: [
    L.latLng(lat,long),
  L.latLng(placeInfo[0].latitude,placeInfo[0].longitude)
   
  ]
}).addTo(map_init);



// updateRoute([

//   // L.latLng(51.5, -0.1),
//   // L.latLng(51.51, -0.1)
  
//  ]);
   
    })


//     //Call the function with updated waypoints

 


  });
