import React, { Component } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";


let refinedObjs=[]
let filteredArr=[]
export default class FlightFixer extends Component{
    
constructor(){
    super();
    this.state = {
        greenFlights: [],
    }
}


    componentDidMount(){
         this.props && console.log(this.props)
          this.props.flights && this.responseDataToNewArr()  // once props loaded in component we can trigger responseDataToNewArr() 
         refinedObjs.length > 0 && this.addToFilteredArr() //to refine trip data into new array of objs
    }


    
     tripObjArrCreator= (arrObj) => { 
        if(refinedObjs.length < this.props.flights){  // INFINITE LOOP without flights.length
            
           let duration = arrObj["itineraries"][0]['duration'];  //Selecting attributes of fetched trips to push into refinedObjs array.
           let flightId = arrObj['id'];
           let airLines = arrObj["itineraries"][0]['segments'].length == 1 ? [arrObj["itineraries"][0]['segments'][0]['carrierCode']] :
               this.grabAllAirLines(arrObj["itineraries"][0]['segments']) // To insert all connecting flights. Will have to include more data from these segments
           let price = arrObj["price"]["total"]
           let currency = arrObj["price"]["currency"]  // Always in EUROs - will have to insert exchange calculator
            let rtrnObj = {id:flightId, duration: duration, airlines: airLines, price: price, currency:currency} // Current data pulled from raw fetch
           return refinedObjs.push(rtrnObj)
         }
        }
        
         grabAllAirLines = (theArr) => { // catching all connecting flights IF it's not a direct flight.
         let airlinesArr = [];
         for(let i=0; i<theArr.length; i++){
             let airLine = theArr[i]['carrierCode']
             airlinesArr.push(airLine);
         }
         return airlinesArr
        }

        
        responseDataToNewArr = () => {  //All the flights will be put through tripObjCreator which pulls attributes from raw trip data
            let toRefined = this.props.flights && this.props.flights.forEach((arrobj) => {
                this.tripObjArrCreator(arrobj)
              })
            
            console.log("ran responsedataToNewArray "+'refinedObjs: '+refinedObjs)
            return toRefined; 
        }
        
        
        
        addToFilteredArr = () => {            // This takes refinedObjs array and now checks to see if any trips are with Green Airlines
            console.log(refinedObjs.length, 'running greenAirlinesCheck')
            refinedObjs.forEach((aFlightObj) => {this.greenAirlinesCheck(aFlightObj)})
            this.refinedObjsToGreenArray()
        }
        
        
        greenAirlinesCheck = (tripObj) => { // WILL revamp the greenAirlines array with true Airline codes from metrics/studies.
            console.log(refinedObjs, "in greenairlinesCheck")
             let greenAirlines = ['UA', 'QF', 'TYhg','TFgh', 'GThg'] // If the trip is with a green airline we're pushing it to filteredArr
             
             for(let i=0; i< tripObj['airlines'].length; i++){
                 console.log(tripObj['airlines'].length, tripObj['airlines'][i])
                 if(greenAirlines.includes(tripObj['airlines'][i])){
                    filteredArr.push(tripObj) 
                 }
             }
        }

          refinedObjsToGreenArray = () => {  //This checks to make sure there wasn't duplicate objs sent to filtered array 
               let holdarr = [];
               let objhold = {};
     
               for(let i in filteredArr){
                   console.log(i)
                   //console.log(filteredArr[i])
                 let id = filteredArr[i]["id"] 
                 objhold[id] = filteredArr[i]  // Now key in objhold points to entire flight data
               }
               for(let i in objhold){
                 if(i !== undefined) // Covering special case
                 holdarr.push(objhold[i]) // All unique Green Flights now in 
                 
               }
               filteredArr =   holdarr;  // filteredArr now composed of all unique flight data values
               
                this.setState({
                   greenFlights: filteredArr
               })
               } 

               renderList = () => {  // Inserts each green flight data into ordered list to DOM.
                   if(filteredArr.length && this.state.greenFlights.length)
                   return this.state.greenFlights.map(flight => {
                       return <li style={{postion:'absolute',left:'60%'}} key={flight.id}>Airlines: {flight.airlines.length > 1 ? flight.airlines[0]+" and "+flight.airlines[1] : flight.airlines[0]} Duration: {flight.duration.slice(2)} Price: {flight.price+' '+flight.currency} </li>
                   })
               }
               render(){
        return(
            
            <div>
        
            {<ol style={{postion:'absolute',left:'40%'}}>{filteredArr.length  && this.renderList()}</ol>}
            
            </div>
        )
    }
}

