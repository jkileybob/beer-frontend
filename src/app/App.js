import React, { Fragment } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Nav from '../navbar/Nav'
import UserProfile from '../user/UserProfile'
import LoginForm from '../login/LoginForm'
import SignUp from '../signup/SignUp'
import BeerIndex from '../beer/BeerIndex'
import BreweryIndex from '../brewery/BreweryIndex'
import Favorites from '../favorites/Favorites'
import './App.css';

class App extends React.Component{

// STATE
  state = {
    // USER STATES:
    currentUser: null,
    loading: true,

    // BREWERY STATES:
    breweries: [],

    currentBrewery: null,
    modalOpen: false,

    searchTermName: "",
    searchTermCity: "",
    searchTermState: "",

    // user/brewery states:
    favs: []
  }

// USER COMPONENT LOGIC:
  componentDidMount(){
    let token = localStorage.getItem('token');

    if(token){
      fetch(`http://localhost:4000/api/v1/profile`, {
        method: "GET",
        headers: {"Authentication" : `Bearer ${token}`}
      })
      .then(response => response.json())
      .then(user =>{
          this.setState({
            currentUser: user,
            loading: false
          })
      })
    } else {
      this.setState({ loading: false })
    }
  }

  handleLoginSubmit = (username, password) => {
    fetch(`http://localhost:4000/api/v1/login`, {
      method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({
          username:username,
          password:password
        })
    })
    .then(res =>res.json())
    .then(data => {
      if(data.error){
        // console.log(data)
        alert('Incorrect username or password')
      }else{
        // console.log(data)
        this.setState({currentUser: data.user });
        localStorage.setItem("token", data.token);
      }
    })
  };

  handleLogOut = () => {
    this.setState({
      currentUser: null
    })
    localStorage.clear();
    this.props.history.push("/login");
  }

  createNewUser = (newUser) => {
    // console.log(newUser)
    // make a fetch post request to create new user on backend
    fetch(`http://localhost:4000/api/v1/users`, {
      method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({
          username:newUser.username,
          password:newUser.password,
          avatar:newUser.avatar,
          bio:newUser.bio,
          location:newUser.location
        })
    })
    .then(res=>res.json())
    .then(data=>{
      // console.log(data)
      localStorage.setItem("token", data.token);

      // set state to new user
      this.setState({
        currentUser: data.user
      })
    })

  }


  // BREWERY COMPONENT LOGIC:
    // search form logic:

    handleNameSearch = (e) => {
      let inputName = e.target.value
      this.setState({
        searchTermName: inputName
      })
    }

    handleCitySearch = (e) => {
      let inputCity = e.target.value
      this.setState({
        searchTermCity: inputCity
      })
    }

    handleStateSearch = (e) => {
      let inputState = e.target.value
      this.setState({
        searchTermState: inputState
      })
    }

    handleClickSubmit = () => {
     if (this.state.searchTermName && !this.state.searchTermState){
        let inputName = this.state.searchTermName
        fetch(`https://api.openbrewerydb.org/breweries?by_name=${inputName}`)
        .then(res => res.json())
        .then(breweries => {
          // console.log(breweries);
          this.setState({
            breweries: breweries
          })
        })
      } else if (!this.state.searchTermName && this.state.searchTermState) {
        let inputState = this.state.searchTermState
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${inputState}`)
        .then(res => res.json())
        .then(breweries => {
          // console.log(breweries);
          this.setState({
            breweries: breweries
          })
        })
      } else if (this.state.searchTermName && this.state.searchTermState) {
        let inputName = this.state.searchTermName
        let inputState = this.state.searchTermState
        fetch(`https://api.openbrewerydb.org/breweries?by_name=${inputName}&by_state=${inputState}`)
        .then(res => res.json())
        .then(breweries => {
          // console.log(breweries);
          this.setState({
            breweries: breweries
          })
        })
      } else if (!this.state.searchTermName && !this.state.searchTermState && this.state.searchTermCity){
        let inputCity = this.state.searchTermCity
        fetch(`https://api.openbrewerydb.org/breweries?by_city=${inputCity}`)
        .then(res => res.json())
        .then(breweries => {
          // console.log(breweries);
          this.setState({
            breweries: breweries
          })
        })
      } else {
        alert("Please Enter Something. Anything. Preferrably not nonsense.")
      }
    }

    //brewery profile modal logic:
    onBreweryClick = (e) => {
      this.state.breweries.filter(brew=>{
        let brewId = e.currentTarget.id;
        return brew.id.toString() === brewId ?
          this.setState({
            currentBrewery: brew,
            modalOpen: true
          })
        : null
      })
    }

    onClickClose = (e) => {
      this.setState({
        modalOpen: false
      })
    }


    //Combined user and brewery logic for favorites:
    handleFavs = (e) => {
      if (!this.state.favs.includes(this.state.currentBrewery)){
        this.setState({
          favs: [...this.state.favs, this.state.currentBrewery]
        })
      } else {
        alert(`${this.state.currentBrewery.name} is already saved to your favorites.`)
      }
      // console.log(this.state.breweries.find(brewery =>{
      //     let brewObj = brewery.id === parseInt(e.currentTarget.id)
      //     return brewObj
      // }))

      // this.state.breweries.find(brewery =>{
      //     let brewObj = brewery.id === parseInt(e.currentTarget.id)
      //     return this.setState({
      //       favs: [...this.state.favs, brewObj]
      //     })
      // })
    }

  onFavBreweryClick = (e) => {
    this.state.breweries.filter(brew=>{
      let brewId = e.currentTarget.id;
      return brew.id.toString() === brewId ?
        this.setState({
          currentBrewery: brew,
          modalOpen: true
        })
      : null
    })
  }

  render(){
    return(
      <Fragment>

        <Nav
          logged_in={this.state.currentUser}
          onLogOut={this.handleLogOut}
        />

      { !this.state.loading ?

        <Switch>

          <Route exact path='/' render={()=> <Redirect to='/profile' />  }/>

          <Route exact path='/profile' render={()=>{
            return this.state.currentUser ?
              <UserProfile user={this.state.currentUser} />
            : <Redirect to='/login' />
          }} />

          <Route exact path='/login' render={()=>{
            return this.state.currentUser ?
              <Redirect to='/profile' />
            : <LoginForm onLogIn={this.handleLoginSubmit} />
          }} />

        <Route exact path='/signup' render={()=>{
            return this.state.currentUser ?
            <Redirect to='/profile' />
            : <SignUp createNewUser={this.createNewUser} />
          } } />

        <Route exact path='/breweries' render={()=>{
            return <BreweryIndex
              breweries={this.state.breweries}
              currentBrewery={this.state.currentBrewery}
              favs={this.setUserFavs}
              handleNameSearch={this.handleNameSearch}
              handleStateSearch={this.handleStateSearch}
              handleCitySearch={this.handleCitySearch}
              handleClickSubmit={this.handleClickSubmit}
              onBreweryClick={this.onBreweryClick}
              handleFavs={this.handleFavs}
              modalOpen={this.state.modalOpen}
              onClickClose={this.onClickClose}
              />
          }} />

        <Route exact path='/favorites' render={()=>{
            return <Favorites
              breweries={this.state.breweries}
              currentBrewery={this.state.currentBrewery}
              favs={this.state.favs}
              onFavBreweryClick={this.onFavBreweryClick}
              handleFavs={this.handleFavs}
              modalOpen={this.state.modalOpen}
              onClickClose={this.onClickClose}
              />
          }} />

        <Route exact path='/beers' render={()=>{
            return <BeerIndex />
          }} />

        </Switch>

      : null }

      </Fragment>
    )
  }
}

export default withRouter(App)


// <Route exact path=`/beers/${beer.id}` render={()=>{
//   return  <BeerProfile />
//   }}/>
