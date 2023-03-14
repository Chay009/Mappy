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









var control;

var newLat;
var newlong;

const addRoute=(waypoints,latitude,longitude)=>{
  if(control)
  {
    // console.log(control); // this is very useful to get directins routes info
    control.remove();

  }

  
  control=L.Routing.control({
   waypoints: waypoints,
   createMarker: function (i, wayp,n,) {
    // use the custom icon for the start marker only
    


    var greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    var redIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });


    if (i === 1) {
      return L.marker([latitude,longitude], {
        icon: redIcon,
        
      });
    }
 var trackMarker;
    
    if (i === 0) {
       // Update the marker with the user's location
       setInterval(() => {
        navigator.geolocation.watchPosition(function(position) {
          console.log([position.coords.latitude, position.coords.longitude])
          newLat=position.coords.latitude;
          newlong=position.coords.longitude;
          var wPoints = [
            L.latLng(position.coords.latitude, position.coords.longitude),
            L.latLng(placeInfo[0].latitude,placeInfo[0].longitude)];
            
       
// console.log(wPoints)
           

            
            // not working
          return L.marker([position.coords.latitude, position.coords.longitude], {
            icon: redIcon
          });
     
     


        });
     

        addRoute(waypoints,latitude,longitude);
      
    }, 20000);

      

   
    }
  
  },
   routeWhileDragging: false,
   draggableWaypoints: false
 
 }).addTo(map_init);

 
 // Get the markers from the routing control
// if(control){
//  const markers =  L.Routing.control().getWaypoints();
 
//  // Set the draggable option to false for each marker
//  markers.forEach(marker => {
//    marker.options.draggable = false;
//  });

 
//  }

 document.querySelector(".cross").addEventListener("click", function() {
  
  
        document.querySelector('.icon').style.display='inline-block';
        document.querySelector('#search').style.display='inline-block';
  if(control)
  {
    // console.log(control); // this is very useful to get directins routes info
    control.remove();

  }
  document.querySelector('.cross').style.display='none';
 
 
 
  document.querySelector('.search-suggest').disabled=false;
 
  
  document.querySelector('.search-suggest').value='';


  
 
 


 
 
  
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


	// var meIcon = L.divIcon({
	// 	className: "leaflet-data-marker",
	// 		html: svg.replace('#','%25'),

      
	// 		iconAnchor  : [9, 12],
	// 		iconSize    : [36, 42],
	// 		popupAnchor : [0, -30],
	// 	});


    var greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
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

    // create a button onclick show current location with flyto 
    marker = L.marker([lat, long],{
      icon: greenIcon,
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
  res.style.display ='block';
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
     document.querySelector('.search-suggest').addEventListener("oninput", (e)=>{
      // console.log(document.querySelector('.search-suggest').value)
      console.log("document.querySelector('.search-suggest').value")
            showResults()
     })
   


      // document.querySelector('.icon').className='random'
  // document.querySelector('#search').style.display='none'
  document.querySelector('.cross').style.display='block'
  
  document.querySelector('#result').style.display='none'




   let point=document.querySelector('.search-suggest').value;
   document.querySelector('.search-suggest').disabled=true;


 // During Development  BASE_URL=http://127.0.0.1:6969
  fetch(`https://mapify-7kzf.onrender.com/maproute/location?q=${point}`).then((response)=>{return response.json()}).then((data)=>{
   
  
    
  
  placeInfo=data;
//   setInterval(() => {
//     navigator.geolocation.getCurrentPosition(getPosition)
// }, 2500);

var waypoints = [
  L.latLng(lat,long),
  L.latLng(placeInfo[0].latitude,placeInfo[0].longitude)

 
];

addRoute(waypoints,placeInfo[0].latitude,placeInfo[0].longitude);
       
    })
       
});

    

     return true;
   }).catch(function (err) {
     console.warn('Something went wrong.', err);
     return false;
   });
}



let placeInfo;

         document.querySelector('.icon').addEventListener('click',()=>{


  document.querySelector('.icon').display='none'
  document.querySelector('#search').style.display='none'


  document.querySelector('.cross').style.display='block'
  document.querySelector('#result').style.display='none'

   let point=document.querySelector('.search-suggest').value;

 // During Development  BASE_URL=http://127.0.0.1:6969
  fetch(`https://mapify-7kzf.onrender.com/maproute/location?q=${point}`).then((response)=>{return response.json()}).then((data)=>{
   
  
  
  placeInfo=data;
    // console.log(placeInfo[0]);
  
                   


 var waypoints = [
  L.latLng(lat,long),
  L.latLng(placeInfo[0].latitude,placeInfo[0].longitude)];


addRoute(waypoints,placeInfo[0].latitude,placeInfo[0].longitude)


   
    })




 


  });

