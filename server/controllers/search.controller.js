const express = require('express');
const mongoose = require('mongoose');



 const location = require('../models/places.model');
// let searchVal= getAllPlaces();

const searchSuggester=(req, res)=> {
    //console.log(req.query.q);
  
    const searchResults=req.query.q.replace(/\s/g,'').trim().toLowerCase();
   console.log(searchResults);
   
  
  
  
  
  
  
  
  // let searchVal=getAllPlaces();
   location.find({},(err,locArr)=>{
    if(err) console.log(err)
   
    // console.log(locArr)
  
  
  
  
  
  let searchVal=locArr;
  // let searchVal=getAllPlaces();
  // let searchVal=getAllPlacesFromDataBase();
  // console.log(searchVal);
  let Data=[];
  
    for (let i=0; i<searchVal.length; i++)
  {
  Data[i]=searchVal[i].place.toLowerCase();
  
  
  
  }
  
    res.send(JSON.stringify(Data.filter((value) => value.includes(searchResults))));
    
   
    
  });
  
  }

  module.exports ={searchSuggester}