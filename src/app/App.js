import React from 'react';
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

  resetSearch = () => {
    this.setState({
      breweries: [],
      currentBrewery: null,
      searchTermName: "",
      searchTermCity: "",
      searchTermState: ""
    })
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


    //FAVORITES COMPONENT LOGIC:

    onFavListBreweryClick = (e) => {
      this.state.favs.filter(brew=>{
        let brewId = e.currentTarget.id;
        return brew.id.toString() === brewId ?
        this.setState({
          currentBrewery: brew,
          modalOpen: true
        })
        : null
      })
    }

    getFavs = () => {
      // right now this is mapping through ALL favs
      // will need to adjust endpoint for specific user_id of currentUser

      // let token = localStorage.getItem('token');
      // fetch(`http://localhost:4000/api/v1/favorites`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type":"application/json",
      //     "Accept":"application/json",
      //     "Authentication" : `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     user_id:user_id
      //   })
      // })
      // .then(res => res.json())
      // .then(favData => {
      //   console.log(favData);
      // })

        // from the backend, favData has id, user_id, and brewery_id
        // could do something conditional to test equality
        // between user_id of favData and user_id of currentUser in state

        // if (favData.user_id === ){
        //   console.log("anything")
        // }

    // map through favData for each brewery_id,
    // then create a list of each brewery_id to update favs state
    // which should automatically update my breweries page list

    }


    addBrewerytoLocalDB = () => {
      // create a POST request to add currentBrewery to local DB
      let brewery = this.state.currentBrewery
      fetch(`http://localhost:4000/api/v1/breweries`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({
          id: brewery.id,
          name: brewery.name,
          brewery_type: brewery.brewery_type,
          street: brewery.street,
          city: brewery.city,
          state: brewery.state,
          postal_code: brewery.postal_code,
          country: brewery.country,
          longitude: brewery.longitude,
          latitude: brewery.latitude,
          phone: brewery.phone,
          website_url: brewery.website_url
        })
      })
      // .then(res => res.json())
      // .then(brewery => {
      //   console.log(brewery)
      // })
      // could set a boolean state to confirm promise acceptance before
      // next step in handleFavs occurs...
    }

    saveFavs = () => {
      // creates a new favorites item on backend

      let token = localStorage.getItem('token');
      fetch(`http://localhost:4000/api/v1/add-favorites/`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Authentication" : `Bearer ${token}`
        },
        body: JSON.stringify({
          brewery_id: this.state.currentBrewery.id
        })
        }
      )
    }

// onClick of "Add to My Favorties" in brewery modal
    handleFavs = (e) => {
      if (!this.state.favs.includes(this.state.currentBrewery)){
        // problem:
        // onclick add to favs shows brewery in my breweries on frontend
        // and creates a new fav item in backend DB,
        // but will only create if the brewery already exists in local DB

        // possible solutions:
          // before saveFavs POST method (below this note),
          // call a helper method that fetches that breweryObj
          // from the 3rd Party API then posts it to local DB
          // could be called addBrewerytoLocalDB()

          this.addBrewerytoLocalDB();
          // right now this does not avoid cerating duplicates
          // of the same brewery to local db, maybe need a conditional?
          this.saveFavs();

      // then add to favs state
        this.setState({
          favs: [...this.state.favs, this.state.currentBrewery]
        });
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


  render(){
    return(
      <>

        <Nav
          logged_in={this.state.currentUser}
          onLogOut={this.handleLogOut}
          resetSearch={this.resetSearch}
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
              onFavListBreweryClick={this.onFavListBreweryClick}
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

      </>
    )
  }
}

export default withRouter(App)


// <Route exact path=`/beers/${beer.id}` render={()=>{
//   return  <BeerProfile />
//   }}/>
