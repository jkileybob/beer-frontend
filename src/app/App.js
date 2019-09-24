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


  componentDidMount(){

    // USER COMPONENT LOGIC:
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
            loading: false,
            favs: [...user.favorites]
          });
          this.fetchFavs();
      });
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
        alert('Incorrect username or password')
      }else{
        this.setState({currentUser: data.user });
        localStorage.setItem("token", data.token);
      }
    })
  };

  handleLogOut = () => {
    this.setState({
      breweries: [],
      currentUser: null,
      favs: []
    })
    localStorage.clear();
    this.props.history.push("/login");
  }

  createNewUser = (newUser) => {
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
      localStorage.setItem("token", data.token);
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
          this.setState({
            breweries: breweries
          })
        })
      } else if (!this.state.searchTermName && this.state.searchTermState) {
        let inputState = this.state.searchTermState
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${inputState}`)
        .then(res => res.json())
        .then(breweries => {
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
          this.setState({
            breweries: breweries
          })
        })
      } else if (!this.state.searchTermName && !this.state.searchTermState && this.state.searchTermCity){
        let inputCity = this.state.searchTermCity
        fetch(`https://api.openbrewerydb.org/breweries?by_city=${inputCity}`)
        .then(res => res.json())
        .then(breweries => {
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
      this.state.breweries.filter(brewery=>{
        let breweryId = e.currentTarget.id;
        return brewery.id.toString() === breweryId ?
          this.setState({
            currentBrewery: brewery,
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

// opens the modal in favorites page
// sets clicked brewery to currentBrewery state
    // setState is delayed in updating at this point,
    // so maybe don't rely on it for using curentBrewery immediately
onFavListBreweryClick = (e) => {
  let breweryId = parseInt(e.currentTarget.id);
  this.state.favs.filter(breweryObj =>
    breweryObj.id === breweryId ?
      this.setState({
        currentBrewery: breweryObj,
        modalOpen: true
      })
    : null
  )
  // console.log(this.state.currentBrewery)
}

// called on component Did mount, at this point needs a refresh to function
fetchFavs = () => {
  // creates copy of favs state containing duplicates
  let duplicateUserFavs = [];
  this.state.favs.map(fav => {
    return duplicateUserFavs.push(fav.brewery_id);
  })
  // creates new array of fav brewery_ids sans duplicates
  let userFavs = Array.from(new Set(duplicateUserFavs));
  // fetches breweryObj for each brewery_id and inserts into favs array
  // sets that fav array to equal favs state
  // needs render to show changes in state... :(
  let favs = []
  userFavs.forEach(brewery_id => {
    return fetch(`https://api.openbrewerydb.org/breweries/${brewery_id}`)
    .then(res => res.json())
    .then(breweryObj => {
      favs.push(breweryObj);
      this.setState({
        favs: favs
      })
    });
  })
}

    // getFavs = () => {
    //   let token = localStorage.getItem('token');
    //   if (token){
    //     fetch(`http://localhost:4000/api/v1/favorites`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type" : "application/json",
    //         "Accept" : "application/json",
    //         "Authentication" : `Bearer ${token}`
    //         }
    //       }
    //     )
    //     .then(res => res.json())
    //     .then(favData => {
    //       console.log(favData);
    //       this.setState({
    //         favs: [...favData]
    //       })
    //     })
    //   }
    // }
    // from the backend, favData has id, user_id, and brewery_id
    // could do something conditional to test equality
    // between user_id of favData and user_id of currentUser in state


    //map through favData for each brewery_id,
    // then create a list of each brewery_id to update favs state
    // which should automatically update my breweries page list



    saveFavs = () => {
      // fetch(`http://localhost:4000/api/v1/favorites`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type":"application/json",
      //     "Accept":"application/json"
      //   },
      //   body: JSON.stringify({
      //     user_id:user_id,
      //     brewery_id:brewery_id
      //   })
      //   }
      // )
    }

    logBrewery = () => {
      if (!this.state.currentUser === null){
      let brewery = this.state.currentBrewery;
        fetch(`http://localhost:4000/api/v1/breweries`,{
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
        .then(response => console.log(response))
      // .then(response =>{ console.log(response) })

        // response returns an error with a 204 status of no Content
        // unable to parse response to json()
        // content is being saved in local API, however
      }

    }

    logFavorites = () =>{
      let token = localStorage.getItem('token');

      if(token){
        let brewery_id = this.state.currentBrewery.id.toString();
        fetch(`http://localhost:4000/api/v1/add-favorites`, {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authentication" : `Bearer ${token}`
          },
          body: JSON.stringify({
            brewery_id: brewery_id
          })
          }
        )
        .then(response => response.json())
        .then(data =>{ console.log(data) })

        } else {
          alert("You must be logged-in to add to your favorites.")
        }
    }

    handleFavs = (e) => {
      // console.log(this.state.currentBrewery.id.toString())

      // else get fetch to `/profile` with `Bearer ${token}` in Headers
      // (or just create a new fav route that mimics `/profile` method)
      // which calls the user_controller profile method in backend
      // which decodes token, returns user data in payload

  // 1. create + save breweryObj to local api for use in favs list
        // set route and create method in brewery controller
        // call these methods from either backend favs_controller or frontend post
      // add brewery to local api

      let token = localStorage.getItem('token');

      if (token){
        if (!this.state.favs.includes(this.state.currentBrewery)){


          // this.logBrewery();
// state shouldn't be mutated durectly
// make a copy then change state into that copy
          // this.setState({
          //       favs: [...this.state.favs, this.state.currentBrewery]
          //     });
          // this.logFavorites();
        } else {
          alert("This brewery already exists in your favorites.")
        }
      } else { alert("You must be logged in to add to your favorites.") }


  // 2. use brewery ids to fetch list of favs
    // add favorite, using the recently added brewery




        // fetch(`http://localhost:4000/api/v1/breweries`,{
        //   method: "POST",
        //   headers: {
        //     "Content-Type":"application/json",
        //     "Accept":"application/json"
        //   },
        //   body: JSON.stringify({
        //     id: 1780,
        //     name: "Right Proper Brewing Company",
        //     brewery_type: "micro",
        //     street: "920 Girard St NE",
        //     city: "Washington",
        //     state: "District of Columbia",
        //     postal_code: "20017-3424",
        //     country: "United States",
        //     longitude: "-76.9930707764239",
        //     latitude: "38.9267988",
        //     phone: "2026072337",
        //     website_url: "http://www.rightproperbrewing.com"
        //   })
        // })





      // console.log(e.currentTarget)
      // if currentBrewery is not already in favs,
      // make a fetch POST to add to db

        // if (!this.state.favs.includes(this.state.currentBrewery)){
        // let userId =
        // console.log(this.state.currentUser)
        // let breweryId =
        // console.log(this.state.currentBrewery.id)

        // fetch(`http://localhost:4000/api/v1/favorites`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type":"application/json",
        //     "Accept":"application/json"
        //   },
        //   body: JSON.stringify({
        //     user_id: 4,
        //     brewery_id: 1781
        //   })
        //   }
      //   )
      //   .then(res => res.json())
      //   .then(data => console.log(data);
      //   // then add to favs state
      //     this.setState({
      //       favs: [...this.state.favs, this.state.currentBrewery]
      //     })
      //   )
      // } else {
      //   alert(`${this.state.currentBrewery.name} is already saved to your favorites.`)
      // }

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
          getFavs={this.getFavs}
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
