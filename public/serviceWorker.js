// If serviceWorker.js is installed then this fn will handled  and it will run 0nly once ie before intallling once installed nothing happens 
// ehenver this file is changed from server etc this runs again 

self.addEventListener('install',(event)=>{
    console.log('Service worker has been installed')
}) 

// listening to active event to activate unregister and then register by reloading page     
self.addEventListener('activate',(event)=>{
    console.log('Service worker has been activated')
}) 

 // whenver service worker changes it will not updated automatically to do so close tab and open but creates bad user experience so skipwaiting is needed