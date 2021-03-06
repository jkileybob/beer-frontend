import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Grid } from 'semantic-ui-react';
import Nav from '../navbar/Nav'
import Footer from '../footer/Footer'
import UserProfile from '../user/UserProfile'
import LoginForm from '../login/LoginForm'
import SignUp from '../signup/SignUp'
import BeerIndex from '../beer/BeerIndex'
import BreweryIndex from '../brewery/BreweryIndex'
import Favorites from '../favorites/Favorites'
import AddBeer from '../beer/AddBeer'
import Home from '../home/Home'
import './App.css';

class App extends React.Component{
  state = {
    // USER STATES:
    currentUser: null,
    loadingUser: true,

    // BREWERY STATES:
    breweries: [],
    currentBrewery: null,
    currentBreweryBeers: [],
    modalOpen: false,

    searchTermName: "",
    searchTermCity: "",
    searchTermState: "",

    // favs/myBeer STATES:
    favs: [],
    loadingFavs: true,
    favorites: [],

    // beer STATES:
    beers: [],
    currentBeer: null,
    addingBeer: false,
    renderEdit: false,

    name: "",
    style: "",
    abv: "",
    rating: "3",
    tastingNote: "",
    comment: ""
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
        // console.log(user.favorites)
        let favorites = user.favorites.map(fav => { return fav })
        this.setState({
          currentUser: user,
          loadingUser: false,
          favorites: favorites
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
    this.props.history.push("/");
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

    handleSearch = (e) => {
      const{ target: { id, value } } = e
      this.setState({
        [id]: value
      })
    }

    handleSearchSubmit = () => {
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
      // clears states to render search from Navbar onClick 'search breweries'
      // changes url path to `/search-breweries`
      this.setState({
        breweries: [],
        currentBrewery: null,
        searchTermName: "",
        searchTermCity: "",
        searchTermState: ""
      })
    }

    resetSearchInput = () => {
      this.setState({
        breweries: [],
        currentBrewery: null,
        searchTermName: "",
        searchTermCity: "",
        searchTermState: ""
      })

    //clears the actual input value, which also clears value's state
      let name = document.getElementById("searchTermName")
      name.value = ""

      let state = document.getElementById("searchTermState")
      state.value = ""

      let city = document.getElementById("searchTermCity")
      city.value = ""
    }


    //brewery MODAL logic:
    onBreweryClick = (e) => {
      this.state.breweries.filter(brewery=>{
        let breweryId = e.currentTarget.id;
        return brewery.id.toString() === breweryId ?
          this.setState({
            currentBrewery: brewery,
            modalOpen: true
          }, this.findBreweryBeers(brewery))
        : null
      })
    }

    // method for closing modal for breweryIndex and favorites list
    onClickClose = (e) => {
      this.setState({
        modalOpen: false,
        currentBrewery: null,
        currentBreweryBeers: []
      })
    }

//FAVORITES COMPONENT LOGIC:

    // method for deleting a favorite brewery, and its beers
    deleteBrewery = (e) => {
      let token = localStorage.getItem('token');
      let breweryID = parseInt(e.currentTarget.id)
      let fav = this.state.favorites.filter(fav => fav.brewery_id === breweryID)
      let favID = fav.map(fav => fav.id)
      fetch(`http://localhost:4000/api/v1/favorites/${favID}`, {
        method: "DELETE",
        headers: {"Authentication" : `Bearer ${token}`}
      }).then(() => {
    //copy+update FAVS state
        let updatedFavs = this.state.favs.slice();
        let indexOfDeletedBrewery = updatedFavs.findIndex((brewery) => { return brewery.id === breweryID })
        updatedFavs.splice(indexOfDeletedBrewery, 1)
    //copy+update Favorites state
        let updatedFavorites = this.state.favorites.slice();
        let indexOfDeletedBreweryID = updatedFavorites.findIndex((id) => { return id === breweryID })
        updatedFavorites.splice(indexOfDeletedBreweryID, 1)
    //copy beers state, loop through each item and check if
        let updatedBeers = this.state.beers.slice();
        for (var i = 0; i < updatedBeers.length; i++){
          if (parseInt(updatedBeers[i].brewery_id) === breweryID){
            updatedBeers.splice(i, 1);
          }
        }
        this.setState({
          currentBrewery: null,
          favs: updatedFavs,
          favorites: updatedFavorites,
          beers: updatedBeers,
          currentBreweryBeers: []
        })
      })
    }

// sets breweries state === favs from navbar onclick 'My Breweries'
// changes url pth and render to <Favs />
    myBreweriesClick = () => {
      let favs = this.state.favs;
      this.setState({
        breweries: favs,
        currentBeer: null,
        currentBrewery: null,
        currentBreweryBeers: []
      })
    }

// given a brewery onClick finds beers that belong to currentBrewery
    findBreweryBeers = (brewery) => {
      let breweryBeers = this.state.beers.filter(beer =>
        beer.brewery_id === brewery.id
      )
      if (breweryBeers.length >= 1){
      this.setState({
        currentBreweryBeers: breweryBeers
      })
    } else { return null }
    }

// sets clicked brewery profile beer to currentBeer State
// redirects to beer profile from brewery profile
    showBreweryBeer = (e) => {
      let clickedBeerID = parseInt(e.target.id);
      this.state.currentBreweryBeers.filter(beerObj =>
        beerObj.id === clickedBeerID ?
          this.setState({
            currentBeer: beerObj
          })
        : null
      )
    }

// opens brewery Profile from favorites page
    onFavListBreweryClick = (e) => {
      let breweryId = parseInt(e.currentTarget.id);

      this.state.favs.filter(breweryObj =>
        breweryObj.id === breweryId ?
          this.setState({
            currentBrewery: breweryObj
          }, this.findBreweryBeers(breweryObj))
        : null
      )

    }

// called on componentDidMount, still needs a refresh to show changes
    fetchFavs = () => {
      // favorites: [{brewery_id: 1781, id: 3}, {brewery_id: 6949, id: 8}]
      // that was fetched from the localhost DB on load of page and saved to state

      // creates new array of favorites without duplicates
      let userFavsById = Array.from(new Set(this.state.favorites.map(fav=> fav.brewery_id)));

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
      let token = localStorage.getItem('token');

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
      }).then(response => response.json())
        .then(breweryData => {
          this.getNewFavBrewery(breweryData.brewery.id)
        })
    }

    getNewFavBrewery = (brewery_id) => {
      fetch(`https://api.openbrewerydb.org/breweries/${brewery_id}`)
      .then(res => res.json())
      .then(breweryObj => {
        // console.log(breweryObj);
        let updatedFavs = this.state.favs.slice();
        updatedFavs.push(breweryObj);
        this.setState({
          currentBrewery: breweryObj,
          favs: updatedFavs,
          loadingFavs: false
        })
      })
      // <Link></Link> onSubmit button in modal redirects to `/breweries` path onClick
      // currentBrewery state set here renders new Brewery profile page
    }

    handleFavs = (e) => {
      // check if user is logged in or not
      if (this.state.currentUser){
        let breweryId = parseInt(e.currentTarget.id);
        let duplicate = this.state.favs.filter(breweryObj => breweryObj.id === breweryId)
        // check if user already saved this brewery by finding duplicate id in favs
        if (duplicate.length > 0){
          // if yes, alert user they can't add twice
            alert("This brewery already exists in your favorites.")
        } else {
            this.logBrewery(breweryId);
        }
      } else { alert("You must be logged in to add to your favorites.") }
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

    onClickReset = (e) => {
      this.setState({
        currentBeer: null,
        currentBrewery: null,
        currentBreweryBeers: []
      });
    }

    // handles click from brewery's add beer button
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
    // handles click form beer's edit button
    editBeerOnClick = (e, props) => {
      let beer = props.beer
      this.setState({
        renderEdit: true,
        name: beer.name,
        style: beer.style,
        abv: beer.abv,
        rating: beer.rating,
        tastingNote: beer.tasting_note,
        comment: beer.comment
      })
    }
    // cancels/resets state for both button functions above
    cancelBeer = () => {
      this.setState({
        addingBeer: false,
        renderEdit: false,
        name: "",
        style: "",
        abv: "",
        rating: "3",
        tastingNote: "",
        comment: ""
      })
    }

    // destructures event to isolate parts of the target
    // id is hard coded as whatever the input's state should be
    // and e.target.value is each keystroke typed into the input
    inputValue = (e) => {
      const { target: { id, value } } = e
      this.setState({
        [id]: value
      })
    }

    handleABV = (e) => {
      this.setState({
        abv: e.target.innerText
      })
    }

    handleRating = (e, {rating, maxRating}) => {
      // console.log(input, typeof input)
      let input = rating.toString()
      this.setState({
        rating: input
      })
    }

    // finds curent beer + brewery from name click in beer index and brewery profile
    // can be adjusted in the future to filter other brewery lists
    // so user can add beers outside of their saved breweries...
    onBeerClick = (e, props) => {
      let beer = props.beer
      let breweryId = props.beer.brewery_id
      this.state.favs.filter(brewery =>
        brewery.id === breweryId ?
        this.setState({
          currentBeer: beer,
          currentBrewery: brewery
        }, this.findBreweryBeers(brewery))
        : null
      )
    }

    // post fetch submits NEW beer to local db
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
            name: this.state.name,
            style: this.state.style,
            abv: this.state.abv,
            tasting_note: this.state.tastingNote,
            rating: this.state.rating,
            comment: this.state.comment
          })
        }
      ).then(res => res.json())
      .then(beer => {

      // if (!this.state.beers === null) {
        let copyBrewBeer = this.state.currentBreweryBeers.slice();
        copyBrewBeer.push(beer.beer);
      //   this.setState({ currentBreweryBeers: copyBrewBeer })
      // } else { return null }

      let copyBeer = this.state.beers.slice();
      copyBeer.push(beer.beer);
        this.setState({
          beers: copyBeer,
          currentBeer: beer.beer,
          currentBreweryBeers: copyBrewBeer,
          addingBeer: false,
          name: "",
          style: "",
          abv: "",
          rating: "3",
          tastingNote: "",
          comment: ""
        })
      })
    }
    //patch submits edit to existing beer in db
    submitBeerEdit = (e) => {

      let token = localStorage.getItem('token');
      fetch(`http://localhost:4000/api/v1/edit-beer`, {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Authentication" : `Bearer ${token}`
        },
        body: JSON.stringify({
          id: this.state.currentBeer.id,
          brewery_id: this.state.currentBrewery.id,
          name: this.state.name,
          style: this.state.style,
          abv: this.state.abv,
          tasting_note: this.state.tastingNote,
          rating: this.state.rating,
          comment: this.state.comment
        })
      }).then(response => response.json())
        .then(updatedBeer => {
          let copyBeers = this.state.beers.slice();
          let copyBrewBeers = this.state.currentBreweryBeers.slice();
          let indexBeer = copyBeers.findIndex((beer)=>{ return beer.id === updatedBeer.beer.id })
          let indexBB = copyBrewBeers.findIndex((beer)=>{ return beer.id === updatedBeer.beer.id })

          copyBeers.splice(indexBeer, 1, updatedBeer.beer)
          copyBrewBeers.splice(indexBB, 1, updatedBeer.beer)

          this.setState({
            renderEdit: false,
            beers: copyBeers,
            currentBeer: updatedBeer.beer,
            currentBreweryBeers: copyBrewBeers,
            name: "",
            style: "",
            abv: "",
            rating: "3",
            tastingNote: "",
            comment: ""
          })
        })
    }

    // delete a beer
    deleteBeer = () => {
      let id = this.state.currentBeer.id

      fetch(`http://localhost:4000/api/v1/delete-beer/${id}`, {
        method: "DELETE"
      }).then(() => {
        let copyOfState = this.state.beers.slice();
        let indexOfDeletedBeer = copyOfState.findIndex((beer)=> { return beer === this.state.currentBeer })
        copyOfState.splice(indexOfDeletedBeer, 1)

        this.setState({
          currentBeer: null,
          beers: copyOfState,
          name: "",
          style: "",
          abv: "",
          rating: "3",
          tastingNote: "",
          comment: ""
        })
      })
    }


  render(){
    return(
      <>

        <Nav
          logged_in={this.state.currentUser}
          onLogOut={this.handleLogOut}
          resetSearch={this.resetSearch}
          myBreweriesClick={this.myBreweriesClick}
          onClickReset={this.onClickReset}
        />
        <main className="main-container">
          <Grid centered verticalAlign='middle'>
            <Grid.Row>
            { !this.state.loadingUser ?
              <Switch>
                {!this.state.addingBeer ?
                  <>
                    <Route exact path='/' render={ () =>
                      <Home />
                    }/>

                    <Route exact path='/profile' render={()=>{
                      return this.state.currentUser ?
                        <UserProfile
                          user={this.state.currentUser}
                          myBreweriesClick={this.myBreweriesClick}
                          resetSearch={this.resetSearch}
                          onClickReset={this.onClickReset}
                        />
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
                        handleSearch={this.handleSearch}
                        handleClickSubmit={this.handleSearchSubmit}
                        searchTermName={this.state.searchTermName}
                        searchTermState={this.state.searchTermState}
                        searchTermCity={this.state.searchTermCity}

                        resetSearchInput={this.resetSearchInput}
                        onBreweryClick={this.onBreweryClick}
                        handleFavs={this.handleFavs}
                        modalOpen={this.state.modalOpen}
                        onClickClose={this.onClickClose}
                        handleBeerLog={this.handleBeerLog}
                        />
                    }} />

                    <Route exact path='/breweries' render={()=>{
                      return !this.state.currentUser ?
                        <Redirect to='/login' />
                        : <Favorites
                            breweries={this.state.breweries}
                            currentBrewery={this.state.currentBrewery}
                            favs={this.state.favs}
                            breweryBeers={this.state.currentBreweryBeers}

                            onFavListBreweryClick={this.onFavListBreweryClick}
                            onClickClose={this.onClickClose}

                            username={this.state.currentUser.username}
                            avatar={this.state.currentUser.avatar}

                            beers={this.state.beers}
                            findBreweryBeers={this.findBreweryBeers}
                            currentBeer={this.state.currentBeer}
                            handleBeerLog={this.handleBeerLog}
                            showBreweryBeer={this.showBreweryBeer}

                            deleteBrewery={this.deleteBrewery}
                            favorites={this.state.favorites}
                            />
                    }} />

                    <Route exact path='/beers' render={()=>{
                      return <BeerIndex
                          beers={this.state.beers}
                          currentBeer={this.state.currentBeer}
                          favs={this.state.favs}
                          brewery={this.state.currentBrewery}
                          findBreweryBeers={this.findBreweryBeers}
                          onBreweryClick={this.onBreweryClick}

                          onBeerClick={this.onBeerClick}
                          onClickReset={this.onClickReset}

                          renderEdit={this.state.renderEdit}
                          cancelBeer={this.cancelBeer}
                          editBeer={this.editBeerOnClick}
                          submitBeerEdit={this.submitBeerEdit}
                          deleteBeer={this.deleteBeer}
                          name={this.state.name}
                          style={this.state.style}
                          abv={this.state.abv}
                          rating={this.state.rating}
                          tastingNote={this.state.tastingNote}
                          comment={this.state.comment}

                          inputValue={this.inputValue}
                          handleABV={this.handleABV}
                          handleRating={this.handleRating}
                        />
                    }} />
                  </>
                :   <AddBeer
                      currentBrewery={this.state.currentBrewery}
                      beers={this.state.beers}
                      favs={this.state.favs}
                      addingBeer={this.state.addingBeer}
                      cancelBeer={this.cancelBeer}

                      handleSubmitBeer={this.handleSubmitBeer}
                      name={this.state.name}
                      style={this.state.style}
                      abv={this.state.abv}
                      rating={this.state.rating}
                      tastingNote={this.state.tastingNote}
                      comment={this.state.comment}

                      inputValue={this.inputValue}
                      handleABV={this.handleABV}
                      handleRating={this.handleRating}
                    />
                }
              </Switch>
            : null }
            </Grid.Row>
          </Grid>
        </main>

        <footer className='Footer'>
          <Grid centered>
            <Grid.Row>
              <Footer />
            </Grid.Row>
          </Grid>
        </footer>
      </>
    )
  }
}

export default withRouter(App)

// <Footer />

// <Link class='link' to="/bright-spots">see more spots.</Link>
//  <Link class='link' to={`/bright-spots/${this.props.currentPost.id}`}>go back.</Link>
