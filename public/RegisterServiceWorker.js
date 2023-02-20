



// This file has to added every html file
if('serviceWorker' in navigator){

    // registering our service worker file name and making both the service worker file openly available to that folder
    navigator.serviceWorker.register('./serviceWorker.js')
    .then((reg)=>{console.log('service Worker register',reg)})
    .catch((err)=>{console.log('service Worker not register',err)})
}



// ####### For IOS



var iodDiv=`

    
<div class ="prompt-div" >
    <div>
     
            <h3>Add to Home Screen </h3>
            <a href="#" class="prompt-cancel">Cancel</a>
              
          
    </div>
        <div>This website has functionality. Add as App to Home Screen</div>
        <h5>Press the 'Share' button on the menu bar  below</h5>
        <h5>Press  'Add' to Home Screen</h5>
</div>`
document.querySelector('.prompt-div').style.display = 'block';
//checking ig=f thedevice is ios
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

//c hecking in pwa manifest
const isPWAinstalled=window.matchMedia('(display-mode : standalone)').matches ;

// showing the prompt
if(isIOS && !isPWAinstalled)
{document.querySelector('.prompt-div').style.display = 'block';

}
