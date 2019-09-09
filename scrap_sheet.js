//FAVORITES COMPONENT LOGIC:

    // need to adjust #index in favs_controller to authenticate user
    // then user data can get specific favs list @user.favorites
    // and response to json that specific list
    // to be manioulated by front end

    // right now this is mapping through ALL favs
    // will need to adjust endpoint for specific user_id of currentUser
  getFavs = () => {
    let token = localStorage.getItem('token');
    if (token){
      fetch(`http://localhost:4000/api/v1/favorites`, {
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "Accept" : "application/json",
          "Authentication" : `Bearer ${token}`
          }
        }
      )
      .then(res => res.json())
      .then(favData => {
        console.log(favData);
      })
      // this.setState({
        //   favs: favData
        // })
    }
  }
    // from the backend, favData has id, user_id, and brewery_id
    // could do something conditional to test equality
    // between user_id of favData and user_id of currentUser in state


    //map through favData for each brewery_id,
    // then create a list of each brewery_id to update favs state
    // which should automatically update my breweries page list

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

    logBrewery =()=>{
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
          this.logBrewery();
          this.setState({
                favs: [...this.state.favs, this.state.currentBrewery]
              });
          this.logFavorites();
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

    require 'byebug'

    class Api::V1::FavoritesController < ApplicationController

      before_action :find_user_and_brewery, only: [:create]
      before_action :find_user_favs, only: [:index]

      def create
        @favorite = Favorite.create({
          user_id: @user.id,
          brewery_id: @brewery.id
        })
        render json: {
          brewery: @brewery,
          favs: @user.favorites.map { |fav| fav.brewery_id }

          #favs returns each favObj brewery_id number
          # keeps user data hidden, bc they are already securely logged in on front end
        }
        # byebug
      end


      def index
        render json: @user.favorites
      end

      private

      def find_user_and_brewery
        token = request.headers["Authentication"].split(' ')[1]
        payload = decode(token)
        @user = User.find(payload[0]["id"])
        @brewery = Brewery.find_by(id: params["brewery_id"])
        # byebug
        # so far this is only for a brewery that is saved in the local db
      end

      def find_user_favs
        token = request.headers["Authentication"].split(' ')[1]
        payload = decode(token)
        @user = User.find(payload[0]["id"])
      end

    end
