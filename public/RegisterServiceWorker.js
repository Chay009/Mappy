



// This file has to added every html file
if('serviceWorker' in navigator){

    // registering our service worker file name and making both the service worker file openly available to that folder
    navigator.serviceWorker.register('./serviceWorker.js')
    .then((reg)=>{console.log('service Worker register',reg)})
    .catch((err)=>{console.log('service Worker not register',err)})
}






