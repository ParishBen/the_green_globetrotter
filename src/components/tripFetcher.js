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






    
/////////////////////////////////////////////////
         flightFetcher = () => {
            let bigtimeArr = [];
            amadeus.shopping.flightOffersSearch.get({
              originLocationCode: 'SYD',
              destinationLocationCode: 'AVV',
              departureDate: '2022-01-25',
              adults: '2'
            }).then((response) => {
             
                bigtimeArr = response.data;
                //console.log(bigtimeArr)
               this.props.flights && this.props.flights(response.data);
            
            })
            .then(() => {
                //console.log("bigtimearr",bigtimeArr)
                
                //this.state.flighters = bigtimeArr
            })
            
            .catch(function(responseError){
              console.log(responseError);
            });}
//////////////////////////////////////////////////////

             
         render(){
             
             return (
                // <div style={{display:'none'}}>
                <div>
                    {/* { this.state.flighters.length && this.props.flights && this.props.flights(this.state.flighters)} */}
                {/* {this.responseDataToNewArr()}
                {   this.refinedObjsToGreenArray()} */}
                {/* {this.state.flighters && this.state.flighters.length > 0 && this.dlogs()} */}
                <form>
                    Leaving From (airport code): <input type='text'/>
                    Destination (airport code): <input type='text'/>
                    <input type='submit'/>
                    </form>
                {this.state.flighters.length > 0 && console.log(this.state)}
                </div>
                
             )
             }
         }


