import React, { Component } from "react";
import {amadeus} from '../amadeusAPI';






export default class TripFetcher extends Component{

constructor(){
    super();
    this.state = {
        flighters: []
    }
}

    componentDidMount(){
         this.flightFetcher()
        console.log(this.props.flights)
        if(this.state.flighters.length > 1){
            this.props.flights(this.state.flighters)
        }
    }
componentDidUpdate(){
    if(this.state.flighters.length > 0)
    this.props.flights(this.state.flighters)
}





    
/////////////////////////////////////////////////
         flightFetcher = () => {
            let bigtimeArr = [];
            amadeus.shopping.flightOffersSearch.get({
              originLocationCode: 'SYD',
              destinationLocationCode: 'AVV',
              departureDate: '2022-01-20',
              adults: '2'
            }).then((response) => {
             
                bigtimeArr = response.data;
                console.log(bigtimeArr)
               this.props.flights && this.props.flights(response.data);
            
            })
            .then(() => {
                console.log("bigtimearr",bigtimeArr)
                
                this.state.flighters = bigtimeArr
            })
            
            .catch(function(responseError){
              console.log(responseError);
            });}
//////////////////////////////////////////////////////

             

                dlogger = setTimeout(() => {              // Will reFetch all the bands after 8 seconds IF Spotify didn't return all the bands properly
        
                    console.log(this.state.flighters, "cmon man", this.props)
                    //this.filteredArrFnct()
                    //this.state.flighters !== [] && this.props.flights && this.props.flights(this.state.flighters)
                    //this.wickedState();
                    //this.crazyState(filteredArr)
                    }, 2500)


           

         render(){
             
             return (
                <div>
                    { this.state.flighters.length && this.props.flights && this.props.flights(this.state.flighters)}
                {/* {this.responseDataToNewArr()}
                {   this.refinedObjsToGreenArray()} */}
                {this.dlogger}
                {/* {this.state.flighters && this.state.flighters.length > 0 && this.dlogs()} */}
                {this.state.flighters.length > 0 && console.log(this.state)}
                </div>
                
             )
             }
         }


