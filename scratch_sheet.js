beer cheers gif:
https://i.pinimg.com/originals/0a/54/23/0a5423767cc73d2bec52d93aa4317656.gif


coloful beer gifs search query:
https://www.google.com/search?q=cheers+beer+gif&tbm=isch&tbs=rimg:CU5FwB_1CXzHfImB9g2MhMXLLDC_1hGROZondCmZZLYRNYLbskWvEN2fldEf_1vq33zoVKlvHOEWQ7pm2Mhl4puGgfUu5DCRDhlntakVJ61BWnDivRNDA5Dh48wR14N6whiVcMFOW4_1U79zufUqEgl9g2MhMXLLDBHpKAXAzXjE8CoSCS_1hGROZondCESjKCV8A1mQGKhIJmZZLYRNYLbsRSFuFIJdoOuIqEgkkWvEN2fldEREu2Jse87IyvioSCf_1vq33zoVKlETqSdZPttNlPKhIJvHOEWQ7pm2MRjxzK41y8PwYqEgkhl4puGgfUuxG6FpBJbUG8RyoSCZDCRDhlntakEYTErhe4x7OkKhIJVJ61BWnDivQRSwC7X139N-YqEglNDA5Dh48wRxGiF-aDVqEofSoSCV4N6whiVcMFEQmiTP8t0M5VKhIJOW4_1U79zufURwmqGbxj4TYA&tbo=u&sa=X&ved=2ahUKEwi78rDPhfzkAhVyZN8KHdF9BgoQuIIBegQIARAv&biw=1280&bih=720&dpr=1
promising results:
https://media1.giphy.com/media/X530jPOZXRMwo/source.gif
https://pro2-bar-s3-cdn-cf.myportfolio.com/f1d3f5920ee1922a991c2018bab68099/b18852d6c2ed9d8db7dde7cf_rw_1200.gif?h=f21bcc12ce77347d9cd8393d6fa93ea1
https://cdn.dribbble.com/users/948461/screenshots/2497876/beer-spin-gif-dribbb.gif

very cool, but don't quite fit the theme beer gif:
https://media.tenor.com/images/c32e4ba8012b4360f16937fff582c7b6/tenor.gif
https://media3.giphy.com/media/xT1R9XnFJkL1S2BFqo/giphy.gif
https://myrealdomain.com/images/animated-beer-5.gif


// window.location.replace('/add-beer') reloads window via JS


// conditional rendering for beer profile and beer edit pag in beer index
{if (this.state.currentBeer === null && this.state.renderEdit === false){
  <List animated verticalAlign='middle'>
    <List.Header as='h1'>My Beers:</List.Header>
      {this.state.beers.map((beer) => {
        return  <List.Item key={`beer-list-item-${beer.name}`}>
          <Modal trigger={<List.Header><h3>{beer.name}</h3></List.Header>} >
            <Modal.Header size='huge'>
              {beer.name}
            </Modal.Header>


            <Modal.Content>

              <Rating
                disabled
                defaultRating={beer.rating}
                maxRating={5}
                icon='star'
                size='massive'
              />

              <Modal.Description>
              <br/><p>Style:<br/>{beer.style}</p>
                  <p>Alcohol by Volume:<br/>{beer.abv}</p><br/>

              </Modal.Description>
              <Button
                color='teal'
                size='large'
                beer={beer}
                onClick={this.onBeerClick}>
                Show me more
                </Button>
            </Modal.Content>
          </Modal>

          </List.Item>
        }
      )}
      </List>
    } else if (this.state.currentBeer && this.state.renderEdit === false) {
        return  <BeerProfile
                  beer={this.state.currentBeer}
                  onClickReturn={this.onClickReturn}
                  editBeer={this.editBeer}
                />
    } else (this.state.currentBeer && this.state.renderEdit === true){
        return  <EditBeer
                  beer={this.state.currentBeer}
                />
    }
}












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
