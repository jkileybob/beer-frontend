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
