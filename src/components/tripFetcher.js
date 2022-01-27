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
    
/////////////////////////////////////////////////
    flightFetcher = (event) => {
        event.preventDefault()
        console.log(
            'fetching flights!'
        )
    let bigtimeArr = [];
    amadeus.shopping.flightOffersSearch.get({          // Fetching flights from Amadeus API with user's form inputs
        originLocationCode: `${this.state.origin}`,
        destinationLocationCode: `${this.state.destination}`,
        departureDate: `${this.state.departureDate}`,
        adults: parseInt(`${this.state.persons}`)
    }).then((response) => {   
        bigtimeArr = response.data;
            this.props.flights && this.props.flights(response.data); // Sending flight data back to App as callback fn.
        this.setState({
        origin: null,
        destination: null,
        departureDate: '',
        persons: null, 
                })
    })
    .catch(function(responseError){
        console.log(responseError);
            });}
//////////////////////////////////////////////////////
    handleFormInfoChange(event) {   // Handling value changes of form & setting State to corresponding values
        this.setState({
         [event.target.name]: event.target.value,
        });
    }

         render(){
             // Can put text in <label> later
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


