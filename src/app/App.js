import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Nav from '../navbar/Nav'
import Footer from '../footer/Footer'
import UserProfile from '../user/UserProfile'
import LoginForm from '../login/LoginForm'
import SignUp from '../signup/SignUp'
import BeerIndex from '../beer/BeerIndex'
import BreweryIndex from '../brewery/BreweryIndex'
import Favorites from '../favorites/Favorites'
import AddBeer from '../beer/AddBeer'
import './App.css';

class App extends React.Component{

  state = {
    // USER STATES:
    currentUser: null,
    loadingUser: true,

    // BREWERY STATES:
    breweries: [],
    currentBrewery: null,
    modalOpen: false,

    searchTermName: "",
    searchTermCity: "",
    searchTermState: "",

    // favs/myBeer STATES:
    favsById: [],
    favs: [],
    loadingFavs: true,

    // beer STATES:
    beers: [],
    addingBeer: false,

    addName: "",
    addStyle: "",
    addABV: "" + "%",
    addRating: "3",
    addTastingNote: "",
    addComment: ""
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
        let favsById = user.breweries.map(brewery => { return brewery.id})
        this.setState({
          currentUser: user,
          loadingUser: false,
          favsById: [...favsById]
          }, ()=>{ this.fetchFavs() });
      });
      this.fetchUserBeers(token);
    } else {
      this.setState({ loadingUser: false, loadingFavs: true })
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
      favs: [],
      loadingFavs: true,
      addingBeer: false
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
          if(breweries.length >= 1){
            this.setState({
            breweries: breweries
            })
          } else {
            alert(`Unfortunately, no such brewery by the name of "${inputName}" matches your search.`)
          }
        })
      } else if (!this.state.searchTermName && this.state.searchTermState) {
        let inputState = this.state.searchTermState
        fetch(`https://api.openbrewerydb.org/breweries?by_state=${inputState}`)
        .then(res => res.json())
        .then(breweries => {
          if(breweries.length >= 1){
            this.setState({
            breweries: breweries
            })
          } else {
            alert(`Wow! No such breweries exist for the American state of "${inputState}". It must be a pretty desolate place to live, especially without beer, or else, perhaps your spelling is just off. Not trying to point fingers, but maybe double check...`)
          }
        })
      } else if (this.state.searchTermName && this.state.searchTermState) {
        let inputName = this.state.searchTermName
        let inputState = this.state.searchTermState
        fetch(`https://api.openbrewerydb.org/breweries?by_name=${inputName}&by_state=${inputState}`)
        .then(res => res.json())
        .then(breweries => {
          if(breweries.length >= 1){
            this.setState({
            breweries: breweries
            })
          } else {
            alert(`Unfortunately, no such breweries by the name of "${inputName}" within the American state of "${inputState}" seem to exist in the database.`)
          }
        })
      } else if (!this.state.searchTermName && !this.state.searchTermState && this.state.searchTermCity){
        let inputCity = this.state.searchTermCity
        fetch(`https://api.openbrewerydb.org/breweries?by_city=${inputCity}`)
        .then(res => res.json())
        .then(breweries => {
          if(breweries.length >= 1){
            this.setState({
            breweries: breweries
            })
          } else {
            alert(`Wow! No such breweries exist for the American city of "${inputCity}". It must be a pretty desolate place to live, especially without beer, or else, perhaps your spelling and/or geography is just a little off. Not trying to point fingers, but maybe double check...`)
          }
        })
      } else {
        alert("Please enter a search query for an American brewery.")
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

// PROBLEM:
// setState is asynch so currentBrewery is a click behind
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

// method for closing modal for breweryIndex and favorites list
    onClickClose = (e) => {
      this.setState({
        modalOpen: false,
        currentBrewery: null
      })
    }


//FAVORITES COMPONENT LOGIC:

// sets breweries state === favs, for iterating
    myBreweriesClick = () => {
      let favs = this.state.favs;
      this.setState({
        breweries: favs
      })
    }


// opens the modal in favorites page
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
    }

// called on componentDidMount, still needs a refresh to show changes
    fetchFavs = () => {
      // favsById is an array of brewery ids (ex: [1781, 6780])
      // that was fetched from the localhost DB on load of page and saved to state

      // creates new array of favsById without duplicates
      let userFavsById = Array.from(new Set(this.state.favsById));

      // empty array below will hold response data from fetch to openBreweryDB (also below)
      // that will eventually be set to favs state
      let updatedFavs = [];

      // fetches breweryObj for each brewery_id and inserts into updated favs array (above)
      userFavsById.forEach(brewery_id => {
        return fetch(`https://api.openbrewerydb.org/breweries/${brewery_id}`)
        .then(res => res.json())
        // setState of favs to equal updatedFavs array
        .then(breweryObj => {
          updatedFavs.push(breweryObj);
        });
      }, this.setState({
          favs: updatedFavs,
          loadingFavs: false
        })
      )
      // PROBLEM:
      // even as a callback function when all forEach processes
      // seem to be completed and pushed
      // setState is async and requires refresh and click of MyBreweries
      // to render changes within the DOM...   :(

      // set state of favs loading to boolean:
      // if loading is false, reload the page (may cause infinite loop)
      // else is true that favs are still loading execute null:

      // console.log(this.state.loadingFavs);
      // if (this.state.loadingFavs === false){
      //   return console.log("hit false")
      //   // return window.location.reload()
      // } else {
      //   return this.setState({
      //     loadingFavs: true
      //   }, console.log("true"))
      // }

    }

// POST request to save BREWERY/FAV to local backend database
    logBrewery = (brewery_id) => {
      let favsById = Array.from(this.state.favsById)
      let token = localStorage.getItem('token');
      // first post creates brewery
        fetch(`http://localhost:4000/api/v1/breweries`, {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
          },
          body: JSON.stringify({
            id: brewery_id,
          })
        })
        // second post creates fav
        .then(  fetch(`http://localhost:4000/api/v1/add-favorites`, {
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
        .then(data => {
          // console.log(data);
          // keep getting strange errors here every so often!!!
          // needs investigating ASAP!!
          favsById.push(data.brewery.id);
          // console.log(favsById)
          this.setState({
            favsById: favsById
          }, this.fetchFavs());
        }) )
    }

    handleFavs = (e) => {
      // make sure user is logged in
      if (this.state.currentUser){
        // check if brewery already exists in user's favs
        let breweryId = parseInt(e.currentTarget.id);
        let duplicate = this.state.favs.filter(breweryObj => breweryObj.id === breweryId)
        if (duplicate.length > 0){
          //   // if yes, alert user they can't add twice
            alert("This brewery already exists in your favorites.")
        } else {
          //   // make a post request of brewery id to make a new brewery, unless
            // console.log("attempting to add new fav with id:", breweryId)
            this.logBrewery(breweryId);
        }
      } else { alert("You must be logged in to add to your favorites.") }
        // you can manipulate the backend to create that brewery
        // which doesn't already exist in the db somehow, then...
        // make a post request of brewery id to create a new favs instance
        // get a response of that new favs instance
        // create a copy of favs state array and push new instance
        // setState of favs array to match new
    }




  // BEER LOGIC:
    // fetchUserBeers called in componentDidMount on load of page
    fetchUserBeers(token){
      fetch(`http://localhost:4000/api/v1/beers`, {
        method: "GET",
        headers: {"Authentication" : `Bearer ${token}`}
      }).then(res=> res.json())
      .then(beers =>{
        // console.log(beers)
        this.setState({
          beers: beers
        })
      })
    }

    setBrewery = (brewery) => {
      this.setState({
        currentBrewery: brewery
      })
    }

    showBrewery = () => {
      console.log(this.state.currentBrewery)
    }

    cancelAddBeer = () => {
      this.setState({
        addingBeer: false
      })
    }

    handleBeerLog = (e) => {
      let breweryId = parseInt(e.currentTarget.id);
      let duplicate = this.state.favs.filter(breweryObj => breweryObj.id === breweryId)
      if (duplicate.length > 0){
        this.setState({
          addingBeer: true
        })
      } else {
        alert("You must log this brewery before adding one of their beers to your diary!")
      }
    }

    handleName = (e) => {
      let input = e.target.value;
      this.setState({
        addName: input
      })
    }
    handleStyle = (e) => {
      let input = e.target.value;
      this.setState({
        addStyle: input
      })
    }
    handleABV = (e) => {
      let input = e.target.value;
      this.setState({
        addABV: input
      })
    }
    handleRating = (e, {rating, maxRating}) => {
      // console.log(input, typeof input)
      let input = rating.toString()
      this.setState({
        addRating: input
      })
    }
    handleTastingNote = (e) => {
      let input = e.target.value;
      this.setState({
        addTastingNote: input
      })
    }
    handleComment = (e) => {
      let input = e.target.value;
      this.setState({
        addComment: input
      })
    }

    handleSubmitBeer = () => {
      let token = localStorage.getItem('token');
      fetch(`http://localhost:4000/api/v1/add-beer`, {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authentication" : `Bearer ${token}`
          },
          body: JSON.stringify({
            brewery_id: this.state.currentBrewery.id,
            name: this.state.addName,
            style: this.state.addStyle,
            abv: this.state.addABV,
            tasting_note: this.state.addTastingNote,
            rating: this.state.addRating,
            comment: this.state.addComment
          })
        }
      ).then(this.setState({
        addingBeer: false
      }))
    }

  render(){
    return(
      <>

        <Nav
          logged_in={this.state.currentUser}
          onLogOut={this.handleLogOut}
          resetSearch={this.resetSearch}
          myBreweriesClick={this.myBreweriesClick}
        />

        { !this.state.loadingUser ?
          <Switch>
            {!this.state.addingBeer ?
              <>
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

                <Route exact path='/search-breweries' render={()=>{
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
                    handleBeerLog={this.handleBeerLog}
                    />
                }} />

                <Route exact path='/breweries' render={()=>{
                  return <Favorites
                    breweries={this.state.breweries}
                    currentBrewery={this.state.currentBrewery}
                    favs={this.state.favs}
                    onFavListBreweryClick={this.onFavListBreweryClick}
                    handleFavs={this.handleFavs}
                    modalOpen={this.state.modalOpen}
                    onClickClose={this.onClickClose}
                    handleBeerLog={this.handleBeerLog}
                    />
                }} />

                <Route exact path='/beers' render={()=>{
                  return <BeerIndex
                      beers={this.state.beers}
                      favs={this.state.favs}
                      brewery={this.state.currentBrewery}
                      setBrewery={this.setBrewery}
                      showBrewery={this.showBrewery}
                    />
                }} />
              </>
            :   <AddBeer
                  currentBrewery={this.state.currentBrewery}
                  beers={this.state.beers}
                  favs={this.state.favs}
                  addingBeer={this.state.addingBeer}
                  cancelAddBeer={this.cancelAddBeer}

                  handleSubmitBeer={this.handleSubmitBeer}
                  addName={this.state.addName}
                  addStyle={this.state.addStyle}
                  addABV={this.state.addABV}
                  addRating={this.state.addRating}
                  addTastingNote={this.state.addTastingNote}
                  addComment={this.state.addComment}
                  handleName={this.handleName}
                  handleStyle={this.handleStyle}
                  handleABV={this.handleABV}
                  handleRating={this.handleRating}
                  handleTastingNote={this.handleTastingNote}
                  handleComment={this.handleComment}
                />
            }

          </Switch>

        : null }
      <Footer />
      </>
    )
  }
}

export default withRouter(App)
