import React from 'react'
// import { Route, Link } from 'react-router-dom'
import { List, Button, Modal, Rating } from 'semantic-ui-react'
import BeerProfile from '../beer/BeerProfile'
import EditBeer from '../beer/EditBeer'
// BACKEND: data returned needs to be adjusted so as not to return user information

class BeerIndex extends React.Component{
  state = {
    beers: [],
    currentBeer: null,
    renderEdit: false
  }
  componentDidMount(){
    fetch(`http://localhost:4000/api/v1/beers`)
    .then(res=> res.json())
    .then(beers =>{
      this.setState({
        beers: beers
      })
    })
  }

  onBeerClick = (e, props) => {
    // console.log(e.target)
    // console.log(props.beer)
    this.setState({
      currentBeer: props.beer
    })
  }

  onClickReturn = (e) => {
    this.setState({
      currentBeer: null
    })
  }

  // GOAL: attach brewery data onClick to beer data
  // use breweryId attached to each beer
  // console.log(this.state.beers.map(beer=>{return beer.breweries.map(brewery => {return brewery.id})}));
  // could pass props of favs list and grab brewery data using breweryId
  getBreweries = () => {
    // provides an array of brewery ids,
    let breweryId = this.state.beers.map(beer => {
      return beer.breweries.map(brewery => {
        return brewery.id
        })
      })

    this.state.favs.forEach(brewery => {
      return console.log(brewery.id === breweryId)
    })
  }

  editBeer = (e) => {
    this.setState({
      renderEdit: true
    })
  }


  render(){
    return(
      <React.Fragment>
      {!this.state.currentBeer ?
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

          :
              <BeerProfile
                beer={this.state.currentBeer}
                onClickReturn={this.onClickReturn}
                editBeer={this.editBeer}
               />

        }

      { this.state.renderEdit ?
        <EditBeer
          beer={this.state.currentBeer}
        />
      : null
      }
      </React.Fragment>
    )
  }
}

export default BeerIndex

/////////////////////////////////////////////////////////////////////////////////
// Line 80:
// need to connect brewery data to show name
// <p>Producer: <h3>{beer.breweries.name}</h3></p>

/////////////////////////////////////////////////////////////////////////////////
// STRETCH FEATURES:
// 1:
// eventually give each beer profile page a name slug in broswer url
    // `http://localhost:3000/beers/${beer.name}`

    // does this need to happen in APP component or can it occur here in beerIndex?
      // <Route exact path={`/beers/${this.state.currentBeer.name}`} render={()=>{
      //   return  <BeerProfile props={props...etc} />
      //   }}/>

// 2:
// Ability for user to upload a photo of beer that will persist in dB
  // will require additional column for photos on backend beer and beer-related tables

////////////////////////////////////////////////////////////////////////////////
