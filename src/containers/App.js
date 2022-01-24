import logo from '../logo.svg';
import '../App.css';
import {amadeus} from '../amadeusAPI';
import React, { Component } from 'react';
import TripFetcher from '../components/tripFetcher';
import FlightFixer from '../components/flightFixer';




class App extends Component {

  constructor(){
    super();
    this.state = {
      flights: []
    }
  }
  
    rawFlightsCallBack = (fetchedFlights) => {
      this.setState({
        flights: fetchedFlights
      })
    }
          
      render(){
        return (
          <div className="App">

          <TripFetcher flights = {this.rawFlightsCallBack}/>  
          {this.state.flights.length > 0 ? <FlightFixer flights = {this.state.flights}/> :''}   
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" /> 
          </header>
          {this.state.flights.length && console.log(this.state)}
          </div>
        );
      }
 }
export default App;
