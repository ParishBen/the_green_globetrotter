import logo from './logo.svg';
import './App.css';
import {amadeus} from './amadeusAPI';

function App() {

  let flightFetcher = () => {
    amadeus.shopping.flightOffersSearch.get({
      originLocationCode: 'SYD',
      destinationLocationCode: 'BKK',
      departureDate: '2021-12-20',
      adults: '2'
  }).then(function(response){
    let holdIt = document.getElementById('flight-info-holder');
    let flightArray = response.data;
    let anArr = document.getElementById('arr');
    console.log(response.data);
  }).catch(function(responseError){
    console.log(responseError.code);
  });}

  return (
    <div className="App">
        <div id='psuedo flight holder'>
           <p id="flight-info-holder"></p>
           <dd id="arr"></dd>
        </div>
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
        {flightFetcher()}
      </header>
    </div>
  );
}

export default App;
