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
  
  componentDidMount(){
    //this.flightFetcher()
  }
  

rawFlightsCallBack = (fetchedFlights) => {
  this.setState({
    flights: fetchedFlights})
}



 
        
    

    
    
   

      // delayed = setTimeout(() => {              // Will reFetch all the bands after 8 seconds IF Spotify didn't return all the bands properly
      //   //rawArr.length = 1;
      //   rawArr.forEach((arrobj) => {
      //     julius(arrobj)
      //   }
      //   )
        
      //   }, 2000)
        
        
        
        
        // dlogger = setTimeout(() => {              // Will reFetch all the bands after 8 seconds IF Spotify didn't return all the bands properly
        
        //   console.log(filteredArr, "cmon man")
        
        //   }, 2500)
        /* <div id='psuedo flight holder'>
        <p id="flight-info-holder">{filteredArr && filteredArr}</p>
        <dd id="arr"></dd> */
        
      render(){
      return (
        <div className="App">
        
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
        {/* <div id="delayed fetch" style={{display:'none'}}>{this.delayed}</div>
        <div id="delayed fetcher" style={{display:'none'}}>{this.ddelayed}</div> */}
        
        </header>
<TripFetcher flights = {this.rawFlightsCallBack}/>  
{this.state.flights.length > 0 ? <FlightFixer flights = {this.state.flights}/> :''}   
{this.state.flights.length && console.log(this.state)}
</div>
);
}
}
export default App;
