import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import TrackingContainer from './TrackingContainer/TrackingContainer';
import Navigation from './Navigation/Navigation';
import TrendingContainer from './TrendingContainer/TrendingContainer';
import BillContainer from './BillContainer/BillContainer.js';
import LegislatorContainer from './LegislatorContainer/LegislatorContainer.js';
import Login from './Login/Login.js';
import SearchBar from './SearchBar/SearchBar'
const statesApiKey = process.env.OPEN_STATES_API_KEY;
// const federalApiKey = process.env.PRO_PUBLICA_API_KEY;
// may need apollo packages for handling graphQL

// ERROR 404
const My404 = () => {
  return (
    <div>s
      You are lost!!!
    </div>
    )
}

class App extends Component {
  constructor(){
    super();

    this.state = {
      logged: false,
      _id: null,
      activePage: 'tracking',
      query: '',
      queryBtn: 1,
      bills: []
      }
  }
  componentDidMount() {
    this.getBills();
  }
  handleInput = (e) => {
    this.setState({
      query: e.target.value
    });
  }
  onRadioBtnClick = (btn) => {
    this.setState({ 
      queryBtn: btn
    });
  }
  updateNav = (page) => {
    this.setState({ 
      activePage: page,
    });
  }
  getBills = async () => {
    try {

      const cors_api_host = 'cors-anywhere.herokuapp.com';
      const cors_api_url = 'https://' + cors_api_host + '/';

      const response = await fetch(`${cors_api_url}https://openstates.org/graphql`, {
        method: 'POST',
        headers: {
          "X-API-KEY": statesApiKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          "query": "{people(first: 3){edges{node{name}}}}"
        }
      });

      if(!response.ok){
        throw Error(response.statusText);
      }

      const billsParsed = await response.json();

      this.setState({
        bills: billsParsed.data.bills.edges
      });

    } catch(err){
      console.log(err);
      return err
    }
  }
  render() {
    return (
      <div id="container">

        {/* NAVIGATION */}
        <Navigation updateNav={this.updateNav}/>

        {/* SEARCH BAR - DEFAULT 1ST BUTTON */}
        <SearchBar onRadioBtnClick={this.onRadioBtnClick} selected={this.state.queryBtn} handleInput={this.handleInput}/>

        {/* MAIN CONTENT */}
        <main>
          <Switch>
            <Route exact path="/" component={ Login }/>
            <Route exact path="/tracking" component={(routeProps) => (<TrackingContainer {...routeProps} info={this.state} />)}/>
            <Route exact path="/trending" render={(routeProps) => (<TrendingContainer {...routeProps} info={this.state} />)}/>
            <Route exact path="/bills" component={(routeProps) => (<BillContainer {...routeProps} info={this.state} bills={this.state.bills} />)}/>
            <Route exact path="/legislators" component={(routeProps) => (<LegislatorContainer {...routeProps} info={this.state} />)}/>
            <Route component={ My404 }/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
