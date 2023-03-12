 //for local running in terminal type ipconfig and use that ip idress in mobile  make sure both server and mobile are connectedto same hostnameg
  




var map_init = L.map('map', {
    center: [23.814296468133172, 86.44118417874446],
   
 
    zoom: 17,
    markerZoomAnimation :true,
});
map_init.zoomControl.remove();
L.control.zoom({
    position: 'bottomright'
}).addTo(map_init);







//  open street map
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    attribution: 'Chaitanya' 
}).addTo(map_init);


// var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
// // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',

// });
// CartoDB_DarkMatter.addTo(map_init);




// Google Map Layer

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: 'Chaitanya' 
 });
 googleStreets.addTo(map_init);


 // Satelite Layer
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
  
   subdomains:['mt0','mt1','mt2','mt3'],
   attribution: 'Chaitanya' 
 });
googleSat.addTo(map_init);

// var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
//  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// subdomains: 'abcd',

// ext: 'jpg'
// });
// Stamen_Watercolor.addTo(map_init);






var baseLayers = {
 
  // these layers should be opposite ie bottom layer is shown first
  // "Water Color":Stamen_Watercolor,
   "OpenStreetMap": osm,
  "Satellite":googleSat,
  "Google Map":googleStreets,
 
};

L.control.layers(baseLayers).addTo(map_init);


if(!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!")
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 2500);
}










const directions=(waypoints)=>{

  const routingLayer = L.layerGroup();
  L.Routing.control({
   waypoints: waypoints,
   routeWhileDragging: true,
   draggableWaypoints: false
 
 }).addTo(map_init);

 
 // Get the markers from the routing control
 const routingControl = L.Routing.control();
 const markers = routingControl.getWaypoints();
 
 // Set the draggable option to false for each marker
 markers.forEach(marker => {
   marker.options.draggable = false;
 });




 
 }
 







var marker, circle, lat, long, accuracy;
// var svg = '<svg id="mePin" xmlns="http://www.w3.org/2000/svg" width="43.3" height="42.4" viewBox="0 0 43.3 42.4"><path class="ring_outer" fill="#878787" d="M28.6 23c6.1 1.4 10.4 4.4 10.4 8 0 4.7-7.7 8.6-17.3 8.6-9.6 0-17.4-3.9-17.4-8.6 0-3.5 4.2-6.5 10.3-7.9.7-.1-.4-1.5-1.3-1.3C5.5 23.4 0 27.2 0 31.7c0 6 9.7 10.7 21.7 10.7s21.6-4.8 21.6-10.7c0-4.6-5.7-8.4-13.7-10-.8-.2-1.8 1.2-1 1.4z"/><path class="ring_inner" fill="#5F5F5F" d="M27 25.8c2 .7 3.3 1.8 3.3 3 0 2.2-3.7 3.9-8.3 3.9-4.6 0-8.3-1.7-8.3-3.8 0-1 .8-1.9 2.2-2.6.6-.3-.3-2-1-1.6-2.8 1-4.6 2.7-4.6 4.6 0 3.2 5.1 5.7 11.4 5.7 6.2 0 11.3-2.5 11.3-5.7 0-2-2.1-3.9-5.4-5-.7-.1-1.2 1.3-.7 1.5z"/><path class="mePin" d="M21.6 8.1a4 4 0 0 0 4-4 4 4 0 0 0-4-4.1 4.1 4.1 0 0 0-4.1 4 4 4 0 0 0 4 4.1zm4.9 8v-3.7c0-1.2-.6-2.2-1.7-2.6-1-.4-1.9-.6-2.8-.6h-.9c-1 0-2 .2-2.8.6-1.2.4-1.8 1.4-1.8 2.6V16c0 .9 0 2 .2 2.8.2.8.8 1.5 1 2.3l.2.3.4 1 .1.8.2.7.6 3.6c-.6.3-.9.7-.9 1.2 0 .9 1.4 1.7 3.2 1.7 1.8 0 3.2-.8 3.2-1.7 0-.5-.3-.9-.8-1.2l.6-3.6.1-.7.2-.8.3-1 .1-.3c.3-.8 1-1.5 1.1-2.3.2-.8.2-2 .2-2.8z" fill="#282828"/></svg>';
var svg = `<svg width="60" height="60" viewBox="0 0 60 60">
<circle cx="30" cy="30" r="7" fill="#FFA631" />
<circle cx="30" cy="30" r="7" fill="#22A7F0" opacity="0.8">
  <animate attributeName="r" from="7.5" to="20" dur="1.5s" repeatCount="indefinite" />
  <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
</circle>
</svg>



`


	var meIcon = L.divIcon({
		className: "leaflet-data-marker",
			html: svg.replace('#','%25'),

      
			iconAnchor  : [9, 12],
			iconSize    : [36, 42],
			popupAnchor : [0, -30],
		});

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

    marker = L.marker([lat, long],{
      icon: meIcon,
			title: '@me'
    })
   
   circle = L.circle([lat, long], { radius: accuracy})

   var featureGroup = L.featureGroup([ marker]).addTo(map_init)
// map_init.flyTo([lat,long],16,{
//     animate : true,
//     duration : 1,
// })
   

    // map_init.fitBounds(featureGroup.getBounds())
    
if(lat && long)

{
  // document.querySelector('.wrapper').style.display='block'
}
    console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)
   




 
}








// we uses from for sending data since we dont need to add headers etc if form everything is handled by js and html themselves
document.querySelector('.adminBtn').addEventListener('click',()=>{
 
  if (document.querySelector('#password').value ==="456789"){
    
    document.querySelector('.admin').style.display = 'block';
    document.querySelector('#password').value ="";
  


 

  }
  else{
    alert('Wrong Code Try Again')
    document.querySelector('#password').value ="";
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
   


      document.querySelector('.icon').className='random'
  document.querySelector('#search').style.display='none'
  document.querySelector('.cross').style.visibility='visible'
  document.querySelector('#result').style.display='none'
//   const iconElement = document.querySelector('#search'); // replace '.icon' with the selector for your specific icon element
// iconElement.addEventListener('click', (event) => {
//   iconElement.classList.add('disabled');



// });
   let point=document.querySelector('.search-suggest').value;
   document.querySelector('.search-suggest').disabled=true;


 // During Development  BASE_URL=http://127.0.0.1:6969
  fetch(`https://mapify-7kzf.onrender.com/maproute/location?q=${point}`).then((response)=>{return response.json()}).then((data)=>{
    placeInfo=data;
    // console.log(placeInfo[0]);
    // alert(placeInfo[0].place)




    
 // Create a new routing control instance






 var waypoints = [
  L.latLng(lat,long),
  L.latLng(placeInfo[0].latitude,placeInfo[0].longitude)

 
];

directions(waypoints)


// updateRoute([

//   // L.latLng(51.5, -0.1),
//   // L.latLng(51.51, -0.1)
  
//  ]);
   
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



  

// const LayerList=document.querySelector('.leaflet-control-layers-selector')
// LayerList.addEventListener("click", ()=> {
  
// })

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










 var waypoints = [
  L.latLng(lat,long),
  L.latLng(placeInfo[0].latitude,placeInfo[0].longitude)

 
];


directions(waypoints)

// updateRoute([

//   // L.latLng(51.5, -0.1),
//   // L.latLng(51.51, -0.1)
  
//  ]);
   
    })


//     //Call the function with updated waypoints

 


  });

  document.querySelector(".cross").addEventListener("click", function() {
    location.reload(false);
 
  
   
   
    
  });