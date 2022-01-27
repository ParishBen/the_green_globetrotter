import React, { Component } from "react";
import {amadeus} from '../amadeusAPI';






export default class TripFetcher extends Component{

constructor(){
    super();
    this.state = {
        origin: null,
        destination: null,
        departureDate: '',
        persons: null, 
    }
}

    componentDidMount(){
       
    }






    
/////////////////////////////////////////////////
         flightFetcher = (event) => {
             event.preventDefault()
             console.log(
                 'fetching flights!'
             )
            // this.reset()
            let bigtimeArr = [];
            amadeus.shopping.flightOffersSearch.get({
              originLocationCode: `${this.state.origin}`,
              destinationLocationCode: `${this.state.destination}`,
              departureDate: `${this.state.departureDate}`,
              adults: parseInt(`${this.state.persons}`)
            }).then((response) => {
             
                bigtimeArr = response.data;
                //console.log(bigtimeArr)
               this.props.flights && this.props.flights(response.data);
               this.setState({
                origin: null,
                destination: null,
                departureDate: '',
                persons: null, 
                        })
            })
            .then(() => {
                //console.log("bigtimearr",bigtimeArr)
                
                //this.state.flights = bigtimeArr
            })
            
            .catch(function(responseError){
              console.log(responseError);
            });}
//////////////////////////////////////////////////////
handleFormInfoChange(event) {                 // Signing in to Landing Page handling value changes
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
// reset = () =>{
//     document.getElementById('origin').value = ''
//     document.getElementById('destination').value = ''
//     document.getElementById('departureDate').value = ''
//     document.getElementById('persons').value = ''
//     //document.getElementById('form').firstChild.textContent = ''
// }

         render(){
             
             return (
                <div>
                    
                <form id='form' onSubmit={(event) => this.flightFetcher(event)}>
                    Leaving From (airport code): <input id='origin' value={this.state.origin} type='text' name='origin' onChange={(event) => this.handleFormInfoChange(event)}/>
                    Destination (airport code): <input id='destination' value={this.state.destination} type='text' name='destination' onChange={(event) => this.handleFormInfoChange(event)}/>
                    Date of Departure: <input id='departureDate' type='date' value={this.state.departureDate} name='departureDate' onChange={(event) => this.handleFormInfoChange(event)}/>
                    How many Persons? <input id='persons' type='text' name='persons' value={this.state.persons} onChange={(event) => this.handleFormInfoChange(event)}/>
                    <input type='submit'/>
                    </form>
                </div>
                
             )
             }
         }


