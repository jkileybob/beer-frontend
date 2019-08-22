import React, { Fragment } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Nav from '../navbar/Nav'
import UserProfile from '../user/UserProfile'
import LoginForm from '../login/LoginForm'
import SignUp from '../signup/SignUp'
import BeerIndex from '../beer/BeerIndex'
import BreweryIndex from '../brewery/BreweryIndex'
import './App.css';

class App extends React.Component{

  state = {
    currentUser: null,
    loading: true
  }

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
  }

  createNewUser = (newUser) => {
    console.log(newUser)
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

          <Route exact path='/beers' render={()=>{
            return <BeerIndex />
          }} />

        <Route exact path='/breweries' render={()=>{
            return <BreweryIndex />
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
