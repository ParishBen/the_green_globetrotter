import React, { Component } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";


let refinedObjs=[]
let filteredArr=[]
export default class FlightFixer extends Component{
    
constructor(){
    super();
    this.state = {
        greenFlights: [],
        unfilteredFlights: []
    }
}


    componentDidMount(){
         this.props && console.log(this.props)
         this.props && this.props.flights && this.responseDataToNewArr()
         refinedObjs.length > 0 && this.addToFilteredArr()
    }

// checks = () => {
//     if(refinedObjs.length === 0){
//         this.responseDataToNewArr()
//     }
// }
    
     tripObjArrCreator= (arrObj) => { //Old Julius
        //let rtrnArr = [] 
        console.log("ran tripObjArrCreator")
        if(refinedObjs.length < this.props.flights.length){ //***** */ 
            
           let duration = arrObj["itineraries"][0]['duration'];
           let flightId = arrObj['id'];
           let airLines = arrObj["itineraries"][0]['segments'].length == 1 ? [arrObj["itineraries"][0]['segments'][0]['carrierCode']] :
               this.grabAllAirLines(arrObj["itineraries"][0]['segments'])
           let price = arrObj["price"]["total"]
           let currency = arrObj["price"]["currency"]
            let rtrnObj = {id:flightId, duration: duration, airlines: airLines, price: price, currency:currency}
           return refinedObjs.push(rtrnObj)
         }
        }
        
         grabAllAirLines = (theArr) => {
         let airlinesArr = [];
         for(let i=0; i<theArr.length; i++){
             let airLine = theArr[i]['carrierCode']
             airlinesArr.push(airLine);
         }
         return airlinesArr
        }

        
        responseDataToNewArr = () => {
            let toRefined = this.props.flights && this.props.flights.forEach((arrobj) => {
                this.tripObjArrCreator(arrobj)
              })
            
            console.log("ran responsedataToNewArray "+'refinedObjs: '+refinedObjs)
            return toRefined; 
        }
        
        
        
        addToFilteredArr = () => {
            console.log(refinedObjs.length, 'running greenAirlinesCheck')
            refinedObjs.forEach((aFlightObj) => {this.greenAirlinesCheck(aFlightObj)})
            this.refinedObjsToGreenArray()
        }
        
        
        greenAirlinesCheck = (tripObj) => { //old AirlineChecker
            console.log(refinedObjs, "in greenairlinesCheck")
             let greenAirlines = ['NHg', 'QF', 'TYhg','TFgh', 'GThg']
             
             for(let i=0; i< tripObj['airlines'].length; i++){
                 console.log(tripObj['airlines'].length, tripObj['airlines'][i])
                 if(greenAirlines.includes(tripObj['airlines'][i])){
                    filteredArr.push(tripObj) 
                 }
             }
        }

          refinedObjsToGreenArray = () => {  //old ddelayed which took arr of flight array objs to check it against green
                //addToFilteredArr()
               let holdarr = [];
               let objhold = {};
               console.log(filteredArr, "ran refined checker")
     
               for(let i in filteredArr){
                   console.log(i)
                   //console.log(filteredArr[i])
                 let id = filteredArr[i]["id"]
                 objhold[id] = filteredArr[i]
               }
               for(let i in objhold){
                 console.log(objhold[i])
                 if(i !== undefined) 
                 holdarr.push(objhold[i]) 
                 
               }
               filteredArr =   holdarr;  // filteredArr now can't have any duplicated flight data
               
               console.log(filteredArr,'filteredArr', 'then holdarr', holdarr)
                this.setState({
                   greenFlights: filteredArr
               })
               console.log(this.state)
               } 

               renderList = () => {
                   if(filteredArr.length && this.state.greenFlights.length)
                   return this.state.greenFlights.map(flight => {
                       return <li>Airlines: {flight.airlines.length > 1 ? flight.airlines[0]+" and "+flight.airlines[1] : flight.airlines[0]} Duration: {flight.duration} Price: {flight.price+' '+flight.currency} </li>
                   })
               }
               render(){
        return(
            
            <div>
        
            {<ul>{filteredArr.length  && this.renderList()}</ul>}
            
            </div>
        )
    }
}

