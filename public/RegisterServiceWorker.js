



// This file has to added every html file
if('serviceWorker' in navigator){

    // registering our service worker file name and making both the service worker file openly available to that folder
    navigator.serviceWorker.register('./serviceWorker.js')
    .then((reg)=>{console.log('service Worker register',reg)})
    .catch((err)=>{console.log('service Worker not register',err)})
}



// ####### For IOS



var iosDiv=`

    
<div class ="prompt-div" >
    <div>
     
            <h3>Add to Home Screen </h3>
            <a href="#" class="prompt-cancel">Cancel</a>
              
          
    </div>
        <div>This website has functionality. Add as App to Home Screen</div>
        <h5>Press the 'Share' button on the menu bar  below</h5>
        <h5>Press  'Add' to Home Screen</h5>
</div>`

//checking ig=f thedevice is ios
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

//c hecking in pwa manifest
const isPWAinstalled=window.matchMedia('(display-mode : standalone)').matches ;

// showing the prompt

if(isIOS && !isPWAinstalled)
{
  document.querySelector('.prompt-div').style.display = 'block';

  document.querySelector('.prompt-cancel').addEventListener('click',()=>{
    document.querySelector('.prompt-div').style.display = 'none';
  });


}



   
        // // check if the PWA is not installed
        // if (!navigator.standalone && !window.matchMedia('(display-mode: standalone)').matches) {
        //     let visitCount = 0;
            
        //     document.querySelector('.prompt-div').style.display = 'block';
        //     // listen for the 'fetch' event
        //     self.addEventListener('fetch', event => {
        //       // increment the visit count for every page visit
        //       self.addEventListener('fetch', event => {
        //         // check if the requested resource is not the current page
        //         if (event.request.url !== self.location.href) {
        //           visitCount++;
        //         }
                
        //       });
              
              
        //       // show the div when the user has visited the site about 4 times
        //       if ( visitCount==0) {
        //         event.respondWith(new Response(iosDiv, {
        //           headers: {'Content-Type': 'text/html'}
        //         }));
        //       } else {
        //         event.respondWith(fetch(event.request));
        //       }
        //     });
        //   }