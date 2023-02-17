 
  

 
var map_init = L.map('map', {
    center: [23.814296468133172, 86.44118417874446],
   
 
    zoom: 17.5,
    markerZoomAnimation :true,
});




var OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map_init);








// admin dont need to acess his location
/*L.Control.geocoder().addTo(map_init);
if (!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!")
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 5000);
};
*/







//var marker, circle, lat, long, accuracy;

/*function getPosition(position) {
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
   
   // circle = L.circle([lat, long], { radius: accuracy })

    /*var featureGroup = L.featureGroup([ marker]).addTo(map_init)
    map_init.flyTo([lat,long],18,{
        animate : true,
        duration : 1,
    })

    //map_init.fitBounds(featureGroup.getBounds())
    

    console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)
}*/




   






const markerArr=[];
//var markergroup=L.layerGroup().addTo(map_init);

const createmarker=(a,b)=>{
    const popupContent=`
    
    <h2>You are an admin!  <br>Enter the place name to store in DB</h2>
    <span> Lat :${a}</span> 
    <span> Lng :${b}</span>
    <div id="box">

    <input type="text" class="input" placeholder="Enter name">
<button class ="button"type="submit"> save </button>
    </div> `
  

  

  if(markerArr.length<1){
  mymarker=L.marker([a,b])
  .addTo(map_init)
  .bindPopup(   popupContent,{
      keepInView: false,
      closeButton: true
      })
      .openPopup();


      markerArr.push(mymarker);
      
    }

    else{
        map_init.removeLayer(mymarker);
        markerArr.pop()
    }

        


      


}
const addAllMarkers=(a,b)=>{
    const Content=`
    
    <h3> Added </h3> `
  

  

 
  const marker=L.marker([a,b])
  .addTo(map_init)
  .bindPopup(   Content,{
      keepInView: false,
      closeButton: true
      })
      .openPopup();


      
    

   

        


      


}



let inpdata;


    map_init.on('click',(e)=>{
       
      
    
        createmarker(e.latlng.lat,e.latlng.lng) 
     
     
    // if(markersArr.length>1){
        
    // }
        
        
 
       
     document.querySelector('.button').addEventListener('click',()=>{
      
      
      
       inpdata =document.querySelector('.input').value;
        //console.log(inpdata);
        
        
// window.location.reload();


const confirmtion=confirm(` Are you sure save this place :${inpdata}`);
        if(confirmtion && inpdata!="")
        {
         
            
            // console.log(` from front end ${inpdata} `);
            // console.log(` from front end ${e.latlng.lat} `);
            // console.log(` from front end ${e.latlng.lng} `);



            
            (async () => {
                try{   // During Development  BASE_URL=http://127.0.0.1:6969
                const dataFromServer = await fetch(`http://127.0.0.1:6969/places`, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(
                    {
                    place :inpdata,
                    latitude :e.latlng.lat,
                    longitude : e.latlng.lng,
                
                    } )
                })
                
                const content = await dataFromServer.json();
                
              if(content ) 
              {
                console.log(content);
                alert(`Your data has been saved  `)
                window.location.reload(false);
              }

                
                // console.log(content.DB[0].latitude);
                // console.log(content.DB[0].longitude);
                
                
                 
              //  
                 // after this update the place with marker and refresh the page 
                 
                //const marker=L.marker(content.DB[0].latitude,content.DB[0].longitude).addTo(map_init)
    
            }
            catch(err){
                console.log(err);
                console.log(err.message);
                alert('Error occured While Adding !  Try Again')
                window.location.reload();
            }
              })();
            
             
             
             

            
        } else if(confirmtion && inpdata!="") {
            alert("you cannot save without a name")
        }
        

        

       






         
          




        



        //   markergroup.eachLayer(function(layer) 
        //   {
        //               layer.setOpacity(0); 
        //   })
     });
           
    })        
    // During Development  BASE_URL=http://127.0.0.1:6969
    fetch(`https://mapify-7kzf.onrender.com/all`).then((response)=>{return response.json()}).then((data)=>{

data.map((object)=>{
    // console.log(object);

addAllMarkers(object.latitude, object.longitude)

})

    })                      
            
          
        

         
        
     
        
    //     let data=document.querySelector('.myinp').value;
        
        
    //     alert('are you sure you want to save');
    //     if(alert)
    //     {
    //  
    //     console.log(placesarr);
        
    //     }
    //    markersArr.removeLayer(mymarker)
       
       
        
    
            



            

    //     

                 

          
           
           
            


    
    
          

        



         


         


        
    
          
      
    
        

 /*fetch('http://192.168.93.221:6969/coordinates', {
    Method: 'POST',
    Headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "latitude": e.latlng.lat,
        "longitude": e.latlng.lng,

    })*/

    
                      
                        
            
   
        
        
        

           
