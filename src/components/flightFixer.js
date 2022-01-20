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
            //rtrnArr.push({id:flightId, duration: duration, airlines: airLines, price: price, currency:currency})
            let rtrnObj = {id:flightId, duration: duration, airlines: airLines, price: price, currency:currency}
           //console.log(rtrnArr[0])
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
            }
            )
            console.log("ran responsedataToNewArray "+'refinedObjs: '+refinedObjs)
            return toRefined; 
        }//, 2000)
        
        
        
        addToFilteredArr = () => {
            console.log(refinedObjs.length, 'running greenAirlinesCheck')
            refinedObjs.forEach((aFlightObj) => {this.greenAirlinesCheck(aFlightObj)})
            this.refinedObjsToGreenArray()
        }
        
        
        greenAirlinesCheck = (tripObj) => { //old AirlineChecker
            console.log(refinedObjs, "in greenairlinesCheck")
             let greenAirlines = ['NHg', 'QF', 'TYhg','TFgh', 'GThg']
             //quest['airlines'].length == 1 ? greenAirlines.includes(quest[])
            //  let airSet = new Set(trip['airlines'])
            //  let vals = Array.from(airSet.values())
            //console.log(airSet,airSet.values(), Array.from(airSet.values()))
             //let anothaOne = [];
             //anothaOne.push(quest['airlines'][0])
             for(let i=0; i< tripObj['airlines'].length; i++){//i<vals.length; i++){
                 console.log(tripObj['airlines'].length, tripObj['airlines'][i])
                 //if(!anothaOne.includes(quest['airlines'][i])){
                // anothaOne.push(quest['airlines'][i])
                // console.log(anothaOne)
                 //if(greenAirlines.includes(vals[i]) ){
                     if(greenAirlines.includes(tripObj['airlines'][i]))
                      filteredArr.push(tripObj)
                  
                 }
                    console.log(filteredArr)
                 //return filteredArr
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
               filteredArr =   holdarr;  //new Set(filteredArr)
               
               console.log(filteredArr,'filteredArr', 'then holdarr', holdarr)
                this.setState({
                   greenFlights: filteredArr
               })
               console.log(this.state)
               } //, 2200)
            //    sillyFunc = () => {
            //     this.props.flights && refinedObjs.length > 0 && console.log('silly') && this.refinedObjsToGreenArray()
            //    }
               render(){
        return(
            
            <div>
            {/* {this.responseDataToNewArr()} */}
            {/* {this.props.flights && this.checks()} */}
            {filteredArr.length  && console.log(this.state.greenFlights)} 
            
            </div>
        )
    }
}

