import logo from './logo.svg';
import './App.css';
import {amadeus} from './amadeusAPI';
import React, { Component } from 'react';

let finalArr=[]
let filteredArr=[]
let rawArr = []

const julius = (arrObj) => {
   let rtrnArr = [];
   let duration = arrObj["itineraries"][0]['duration'];
   let flightId = arrObj['id'];
   let airLines = arrObj["itineraries"][0]['segments'].length == 1 ? [arrObj["itineraries"][0]['segments'][0]['carrierCode']] :
       grabAllAirLines(arrObj["itineraries"][0]['segments'])
   let price = arrObj["price"]["total"]
   let currency = arrObj["price"]["currency"]
   rtrnArr.push({id:flightId, duration: duration, airlines: airLines, price: price, currency:currency})
   //console.log(rtrnArr[0])
   return finalArr.push(rtrnArr[0])
}

const grabAllAirLines = (theArr) => {
 let airlinesArr = [];
 for(let i=0; i<theArr.length; i++){
     let airLine = theArr[i]['carrierCode']
     airlinesArr.push(airLine);
 }
 return airlinesArr
}

class App extends Component {
  
  componentDidMount(){
    this.flightFetcher()
  }
  



//letsWork.forEach((ringer) => {julius(ringer)})
//console.log(finalArr)

 airlineArrChecker = (quest) => {
    let greenAirlines = ['TR', 'TH', 'TY','TF', 'GT']
    //quest['airlines'].length == 1 ? greenAirlines.includes(quest[])
    let airSet = new Set(quest['airlines'])
    let vals = Array.from(airSet.values())
    //console.log(airSet,airSet.values(), Array.from(airSet.values()))
    let anothaOne = [];
    //anothaOne.push(quest['airlines'][0])
    for(let i=0; i< quest['airlines'].length; i++){//i<vals.length; i++){
        //if(!anothaOne.includes(quest['airlines'][i])){
       // anothaOne.push(quest['airlines'][i])
       // console.log(anothaOne)
        //if(greenAirlines.includes(vals[i]) ){
            if(greenAirlines.includes(quest['airlines'][i]))
            return filteredArr.push(quest)

        }
        return filteredArr
    }
        
    

    
    
    flightFetcher = () => {
      amadeus.shopping.flightOffersSearch.get({
        originLocationCode: 'SYD',
        destinationLocationCode: 'BKK',
        departureDate: '2021-12-20',
        adults: '2'
      }).then(function(response){
        let holdIt = document.getElementById('flight-info-holder');
        // let flightArray;
        //  flightArray = response.data;
         rawArr=response.data;
         //console.log(rawArr.push(response.data))
        //let anArr = document.getElementById('arr');
      //   flightArray.forEach((flightObj) => {
      //    julius(flightObj)
      //     console.log(julius(flightObj))
      //   })
      //   console.log("first gothru then ",flightArray, "     ", flightArray.forEach((flightObj) => {
      //     julius(flightObj)
      // }))
console.log(rawArr)
      // .then((filled) => {
      //   this.julius(filled.data)
      //   console.log(filled, filled.data)
      })
      .catch(function(responseError){
        console.log(responseError.code);
      });}

      delayed = setTimeout(() => {              // Will reFetch all the bands after 8 seconds IF Spotify didn't return all the bands properly
        //rawArr.length = 1;
        rawArr.forEach((arrobj) => {
          julius(arrobj)
        }
        )
        
        }, 2000)

        ddelayed = setTimeout(() => {              // Will reFetch all the bands after 8 seconds IF Spotify didn't return all the bands properly
        
          finalArr.forEach((diesel) => {this.airlineArrChecker(diesel)})
          
          }, 2200)

          dlogger = setTimeout(() => {              // Will reFetch all the bands after 8 seconds IF Spotify didn't return all the bands properly
        
            console.log(filteredArr)
            
            }, 2500)
      render(){
      return (
        <div className="App">
        <div id='psuedo flight holder'>
        <p id="flight-info-holder">{filteredArr && filteredArr}</p>
        <dd id="arr"></dd>
        </div>
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        >
        Learn React
        </a>
        {/* {flightFetcher()} */}
        { 
        this.delayed
        }
        {this.ddelayed}
        </header>
{this.dlogger}       
        
        </div>
        );
      }
    }
      export default App;
