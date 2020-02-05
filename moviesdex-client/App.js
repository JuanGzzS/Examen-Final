import React from 'react';
import './App.css';
import NuevaMovie from './NuevaMovie';
import {BrowserRouter, Route, Link} from 'react-router-dom';

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      peliculas : [],
      apiURL : "http://localhost:3000"
    }
  }

  componentDidMount(){

    let url = `${this.state.apiURL}/api/moviedex`;
    let settings = {

      method : 'GET'
    }

    fetch( url, settings )
      .then ( response => {
        if(response.ok){
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then ( responseJson => {
        this.setState({

          peliculas : responseJson
        })
      })
      .catch( err=> {
        console.log(err);
      })

    let url = `${this.state.apiURL}/api/moviedex`;
    let settings = {

      method : 'POST',
      headers: {
          "Content-Type" : "application/json",
          
      }
    }

    fetch( url, settings )
      .then ( response => {
        if(response.ok){
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then ( responseJson => {
        this.setState({

          peliculas : responseJson
        })
      })
      .catch( err=> {
        console.log(err);
      })

  }

  render(){
    return (
      <BrowserRouter>
      <nav>
        <Link to ='/'>
      <div>

      <script>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
