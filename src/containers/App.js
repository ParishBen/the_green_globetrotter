import logo from '../logo.svg';
import '../App.css';
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

          <TripFetcher flights = {this.rawFlightsCallBack}/>  {/*Component to fetch trips with props to setState in App of Flights */}
          {this.state.flights.length > 0 ? <FlightFixer flights = {this.state.flights}/> :''}  {/*Cleans trip data to display list to user */} 
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" /> 
          </header>
          </div>
        );
      }
 }
export default App;
