import React, { Fragment } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Nav from '../navbar/Nav'
import Profile from '../user/Profile'
import LoginForm from '../login/LoginForm'
import './App.css';

class App extends React.Component{

  state = {
    currentUser: null
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
        this.setState({currentUser: data.user })
      }
    })
  };

  handleLogOut = () => {
    // console.log("attempting logout")
    this.setState({
      currentUser: null
    })
  }


  render(){
    return(
      <Fragment>

        <Nav
          logged_in={this.state.currentUser}
          onLogOut={this.handleLogOut}
        />

        <Switch>

          <Route exact path='/' render={()=> <Redirect to='/profile' />  }/>

          <Route exact path='/profile' render={()=>{
            return this.state.currentUser ?
              <Profile user={this.state.currentUser} />
            : <Redirect to='/login' />
          }} />

          <Route exact path='/login' render={()=>{
            return this.state.currentUser ?
              <Redirect to='/profile' />
            : <LoginForm onLogIn={this.handleLoginSubmit} />
          }} />

        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App)
