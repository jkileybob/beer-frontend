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
    currentBreweryBeers: [],
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

// clears states to render search from Navbar onCLick 'search breweries'
// changes url path to search-breweries
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
      let newFavsArr = Array.from(this.state.favsById);
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
      // find a way to route to `/breweries` path
      // add link to submit button in brewery modal
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
      </>
    )
  }
}

export default withRouter(App)

// <Footer />

// <Link class='link' to="/bright-spots">see more spots.</Link>
//  <Link class='link' to={`/bright-spots/${this.props.currentPost.id}`}>go back.</Link>
