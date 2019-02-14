import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import TrackingContainer from './TrackingContainer/TrackingContainer';
import Navigation from './Navigation/Navigation';
import TrendingContainer from './TrendingContainer/TrendingContainer';
import BillContainer from './BillContainer/BillContainer.js';
import LegislatorContainer from './LegislatorContainer/LegislatorContainer.js';
// import Login from './Login/Login.js';
import SearchBar from './SearchBar/SearchBar';
const tempData2 = require('./TempData/TempData');
const stringData = JSON.stringify(tempData2);
const parsedData = JSON.parse(stringData);
const tempDataMaster = require('./TempData/TempDataMaster');
const stringDataMaster = JSON.stringify(tempDataMaster);
const parsedDataMaster = JSON.parse(stringDataMaster);
const masterDatabase = parsedDataMaster.tempData;
// const statesApiKey = process.env.OPEN_STATES_API_KEY;
// const federalApiKey = process.env.PRO_PUBLICA_API_KEY;

// ERROR 404
const My404 = () => {
  return (
    <div>
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
      bills: parsedData.tempData,
      trackedBills: [],
      trackedReps: [],
      trendingBills: parsedData.tempData,
      reps: parsedData.tempDataReps
      }
  }
  getTrendingBills = async () => {
    try {
        const topBills = await fetch('http://localhost:9000/trending', {
            method: 'GET',
            // body: JSON.stringify(this.state),
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if(!topBills.ok){
            throw Error(topBills.statusText)
        }
        const parsedTopBills = await topBills.json();
        // Update the main state
        this.updateTrending(parsedTopBills.data);
        console.log(`Trending bills response from Express API:${parsedTopBills.data}`)
    } catch(err){
        console.log(err)
    }
  }
  componentDidMount() {
    // HERE LETS PULL SOME INITIAL DATA: TRENDING
    this.getTrendingBills();
    this.getBillsFromQuery("tax", "Iowa");
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
    console.log(`Radio Button should now be: ${this.state.queryBtn}`);
  }
  updateNav = (page) => {
    // If path is trending, then get trending bills
    this.setState({ 
      activePage: page
    }, function() {
      if (page === "trending"){
        this.getTrendingBills();
      }
    });
  }
// ==================================================================
// UPDATE STATE WITH SUCCESSFUL LOGIN
// ==================================================================
  loginSuccess = (userId) => {
    this.setState({
      logged: true,
      _id: userId.user
    }, function() {
      console.log(`Log in success! State shows logged = ${this.state.logged} and userID = ${this.state._id}`);
    });
  }
  addBillToTracking = async (billToTrack) => {
// ==================================================================
// UPDATE/CREATE IN MONGO DATABASE (CHECK USERS TRACKING INFO FIRST)
// ==================================================================
    try {
      if (billToTrack._id) {
// ==================================================================
// MONGO: ADD TO USER'S TRACKED BILLS (IF POSSIBLE)
// ==================================================================
        const isUserTracking = await fetch(`http://localhost:9000/auth/${this.state._id}/track/${billToTrack._id}`, {
          method: 'PUT',
          // body: JSON.stringify({
          //   increment: 1,
          // }),
          credentials: 'include',
          headers: {
          'Content-Type': 'application/json'
        }});
        if(!isUserTracking.ok){
            throw Error(isUserTracking.statusText)
        }
        const parsedIsUserTracking = await isUserTracking.json();
        console.log(`BILL EXISTED, :${JSON.stringify(parsedIsUserTracking)}`)
// ==================================================================
// UPDATE COUNT IN MONGO IF USER JUST TRACKED
// ==================================================================
        if (parsedIsUserTracking.status == 200) {
          const updateBill = await fetch(`http://localhost:9000/trending/track/${billToTrack._id}`, {
          method: 'PUT',
          body: JSON.stringify({
            increment: 1,
          }),
          credentials: 'include',
          headers: {
          'Content-Type': 'application/json'
          }
          });
          if(!updateBill.ok){
              throw Error(updateBill.statusText)
          }
          const parsedUpdateBill = await updateBill.json();
          console.log(`Updated bill response from Express API:${JSON.stringify(parsedUpdateBill)}`)
// ==================================================================
// ADD TO TRACKEDBILLS IN REACT (BASED ON DB REPLY)
// ==================================================================
          let updatedArray = [...this.state.bills];
          for(let i = 0; i < updatedArray.length; i++) {
            if(updatedArray[i]._id == billToTrack._id) {
              updatedArray[i].trackingCount ++
            }
          }

          this.setState({ 
            trackedBills: [...this.state.trackedBills, parsedUpdateBill.data],
            bills: updatedArray
          }, function() {
            console.log(`We are now tracking this bill: ${this.state.trackedBills[this.state.trackedBills.length-1].title}`)
          });
        }
      } 
// ==================================================================
// IF NO ID, CREATE ONE IN MONGO (WE KNOW USER HASN'T TRACKED THEN)
// ==================================================================
      else {
        const createBill = await fetch(`http://localhost:9000/trending/`, {
        method: 'POST',
        body: JSON.stringify({
          title: billToTrack.title,   
          state: billToTrack.state,   
          summary: billToTrack.summary,
          proposed: billToTrack.created_at,
          lastAction: billToTrack.updated_at,
        }),
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        }
        });
        if(!createBill.ok){
            throw Error(createBill.statusText)
        }
        const parsedCreateBill = await createBill.json();
        console.log(`DB CREATED BILL:${JSON.stringify(parsedCreateBill)}`)
// ==================================================================
// MONGO: ADD TO USER'S TRACKED BILLS
// ==================================================================
        const trackBill = await fetch(`http://localhost:9000/auth/${this.state._id}/track/${parsedCreateBill.data._id}`, {
          method: 'PUT',
          // body: JSON.stringify({
          //   increment: 1,
          // }),
          credentials: 'include',
          headers: {
          'Content-Type': 'application/json'
        }});
        if(!trackBill.ok){
            throw Error(trackBill.statusText)
        }
        const parsedTrackBill = await trackBill.json();
        console.log(`Updated bill response from Express API:${JSON.stringify(parsedTrackBill)}`)
// ==================================================================
// TRACK BILL IN STATE & UPDATE BILLS ARRAY
// ==================================================================
        let updatedArray = [...this.state.bills];
        for(let i = 0; i < updatedArray.length; i++) {
          if(updatedArray[i].title == parsedCreateBill.data.title) {
            updatedArray[i]._id = parsedCreateBill.data._id
            updatedArray[i].trackingCount = parsedCreateBill.data.trackingCount
          }
        }
        this.setState({ 
          trackedBills: [...this.state.trackedBills, parsedCreateBill.data],
          bills: updatedArray
        }, function() {
          console.log(`Trying to find index of: ${parsedCreateBill.data.title}, this bill tracked: ${JSON.stringify(this.state.trackedBills[this.state.trackedBills.length-1])}`)
        });
      }
    } catch(err){
      console.log(err)
    }
  }
// ==================================================================
// UNTRACK BILL
// ==================================================================
  untrackBill = async (billId) => {
    try {
// ==================================================================
// DECREMENT IN MONGO DATABASE
// ==================================================================
      const updateBill = await fetch(`http://localhost:9000/trending/untrack/${billId}`, {
        method: 'PUT',
        body: JSON.stringify({
            increment: -1,
        }),
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        }
      });
      if(!updateBill.ok){
        throw Error(updateBill.statusText)
      }
      const parsedUpdateBill = await updateBill.json();
      console.log(`Updated bill response from Express API:${parsedUpdateBill}`)
// ==================================================================
// REMOVE FROM USER'S TRACKED BILLS
// ==================================================================
      const userUntrackBill = await fetch(`http://localhost:9000/auth/${this.state._id}/untrack/${billId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        }
      });
      if(!userUntrackBill.ok){
        throw Error(userUntrackBill.statusText)
      }
      const parsedUntrackBill = await userUntrackBill.json();
      console.log(`Untracked bill and user shows:${parsedUntrackBill}`)
// ==================================================================
// REMOVE FROM TRACKEDBILLS IN REACT, IF SUCCESSFUL MONGO DELETE
// ==================================================================
      if (parsedUntrackBill.status == 200) {
        console.log(`User-tracked bills: ${this.state.trackedBills}.`)

        let arr = [];
        this.state.trackedBills.forEach((bill) => {
          if (bill._id !== billId){
            arr.push(bill);
          }
        })

        let updatedArray = [...this.state.bills];
        for(let i = 0; i < updatedArray.length; i++) {
          if(updatedArray[i]._id == billId && updatedArray[i].trackingCount) {
            updatedArray[i].trackingCount --
          }
        }

        this.setState({
          trackedBills: arr,
          bills: updatedArray
        }, function() {
          console.log(`React: removed bill ID ${billId}. User-tracked bills: ${this.state.trackedBills}.`)
      });
      }
    } catch (err) {
      console.log(err);
    }
  }
  updateTrending = (data) => {
    console.log(`We are about to update Trending Bills with: ${data}`);
    this.setState({
      trendingBills: data
    }, function() {
      console.log(`Our new state is: ${this.state.trendingBills}`)
    });
  }
  handleRegister = async (e) => {
    e.preventDefault();
    try {
        const loginResponse = await fetch('http://localhost:9000/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                trackedBills: [],
                trackedReps: []
            }),
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if(!loginResponse.ok){
            throw Error(loginResponse.statusText)
        }
        const parsedResponse = await loginResponse.json();
        console.log(parsedResponse, ' this is login response from express api')
        if (parsedResponse.status === 200){
          this.loginSuccess(JSON.parse(parsedResponse.data));
        }
    } catch(err){
        console.log(err)
    }
  }
  handleLogin = async (e) => {
    e.preventDefault();
    try {
        const loginResponse = await fetch('http://localhost:9000/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                trackedBills: [],
                trackedReps: []
            }),
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if(!loginResponse.ok){
            throw Error(loginResponse.statusText)
        }
        const parsedResponse = await loginResponse.json();
        console.log(parsedResponse, ' this is login response from express api')
        if (parsedResponse.status === 200) {
          this.loginSuccess(JSON.parse(parsedResponse.data));
        }
    } catch(err){
        console.log(err)
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // getBillsFromApi = async () => {
  //   try {

  //     const cors_api_host = 'cors-anywhere.herokuapp.com';
  //     const cors_api_url = 'https://' + cors_api_host + '/';
  //     //const query = "{bills%28jurisdiction:%22Colorado%22,first:10%29{edges{node{title,subject,legislativeSession{jurisdiction{name}},createdAt,updatedAt,abstracts{abstract}}}}}";
  //     //const queryTest = "%7Bbills(jurisdiction%3A%20%22Colorado%22%2C%20first%3A%2010)%7Bedges%7Bnode%7Btitle%2Csubject%2ClegislativeSession%7Bjurisdiction%7Bname%7D%7D%2CcreatedAt%2CupdatedAt%2Cabstracts%7Babstract%7D%7D%7D%7D%7D&operationName=null";
  //     //const queryTest2 = {bills(jurisdiction:"Colorado",first:10){edges{node{title,subject,legislativeSession{jurisdiction{name}},createdAt,updatedAt,abstracts{abstract}}}}};
  //     const response = await fetch(`${cors_api_url}https://openstates.org/api/v1/bills/apikey=70a944df-df9d-48e6-b38a-29b09cd7c3db?state=co&per_page=10`, {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //     });

  //     if(!response.ok){
  //       throw Error(response.statusText);
  //     }

  //     const billsParsed = await response.json();

  //     this.setState({
  //       bills: billsParsed
  //     });

  //   } catch(err){
  //     console.log(err);
  //     return err
  //   }
  // }
  getBillsFromQuery = (query, filter) => {
    function checkQueryAndState(item) {
      return item.node.legislativeSession.jurisdiction.name == filter && ( item.node.abstracts.includes(query) || item.node.title.includes(query) );
    }
    const returnedBills = masterDatabase.filter(checkQueryAndState)
    console.log(returnedBills);
  }
  render() {
    return (
      <div id="container">

        {/* NAVIGATION */}
        <Navigation updateNav={this.updateNav}/> <br/>

        <Container>
        {/* SEARCH BAR - DEFAULT 1ST BUTTON */}
        <Row className="justify-content-center">
          <Col xs={{size: 'auto'}}>
            <SearchBar onRadioBtnClick={this.onRadioBtnClick} selected={this.state.queryBtn} handleInput={this.handleInput}/>
          </Col>
        </Row> <br/>

        {/* MAIN CONTENT */}
        <main>
          <Switch>
            <Route exact path="/" render={(routeProps) => (<TrackingContainer {...routeProps} info={this.state.logged} trackedBills={this.state.trackedBills} trackedReps={this.state.trackedReps} untrackBill={this.untrackBill} loginSuccess={this.loginSuccess} handleLogin={this.handleLogin} handleRegister={this.handleRegister} handleChange={this.handleChange}/>)}/>
            <Route exact path="/tracking" render={(routeProps) => (<TrackingContainer {...routeProps} info={this.state.logged} trackedBills={this.state.trackedBills} trackedReps={this.state.trackedReps} untrackBill={this.untrackBill} loginSuccess={this.loginSuccess} handleLogin={this.handleLogin} handleRegister={this.handleRegister} handleChange={this.handleChange}/>)}/>
            <Route exact path="/trending" render={(routeProps) => (<TrendingContainer {...routeProps} addBillToTracking={this.addBillToTracking} bills={this.state.trendingBills} updateTrending={this.updateTrending} trackedBills={this.state.trackedBills} />)}/>
            <Route exact path="/bills" render={(routeProps) => (<BillContainer {...routeProps} trackedBills={this.state.trackedBills} bills={this.state.bills} addBillToTracking={this.addBillToTracking}/>)}/>
            <Route exact path="/legislators" render={(routeProps) => (<LegislatorContainer {...routeProps} info={this.state.reps} />)}/>
            <Route component={ My404 }/>
          </Switch>
        </main>
        </Container>
      </div>
    );
  }
}

export default App;
