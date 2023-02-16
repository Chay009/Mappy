// to add to git 
//git config --global user.email "your-email-address@example.com" use this and replace with github mail 
// then git init 
//tthen git add . // to add all existing files
//then git commit -m "write msg here"
// git remote add origin https://github.com/Chay009/Mappy.git  //  this is repo link
// git branch -M main
// git push -u origin main

// above is one step
// to update the code use git push origin master




const fs = require('fs');



 

const getAllPlaces= ()=>{

    const allPlaces=fs.readFileSync('./server/TempDB/placesDB.json',"utf-8");
    return JSON.parse(allPlaces);
    
} 



// const newo={
//     name: 'Hefgfth center',
//     latitude: 23.33333,
//     longitude : 45.66,
// }



const addNewData= (newobj)=>{
    fs.readFile('./server/TempDB/placesDB.json',"utf-8",(err, data)=>{
    if (err) console.log('error from addNewData func',err.message)
const info= JSON.parse(data)
// console.log(info)
info.push(newobj)
fs.writeFileSync('./server/TempDB/placesDB.json',JSON.stringify(info,null ,1).toLowerCase(),(err)=>{
    if(err){ console.log(err.message)};
    



})
console.log('added sucessfully')

})
}
    
// addNewData(newo)
//console.log(getAllPlaces())module
module.exports={addNewData,getAllPlaces}