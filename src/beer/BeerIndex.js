import React from 'react'
// import { Link } from 'react-router-dom'
import { List, Button, Modal } from 'semantic-ui-react'
import BeerProfile from '../beer/BeerProfile'

// BACKEND: data returned needs to be adjusted so as not to return user information

class BeerIndex extends React.Component{
  state = {
    beers: [],
    currentBeer: null
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




  render(){
    return(
      <React.Fragment>
      {!this.state.currentBeer ?

        <List animated verticalAlign='middle'>
          <List.Header as='h1'>My Beers:</List.Header>
            {this.state.beers.map((beer) => {
              return  <List.Item key={`beer-list-item-${beer.name}`}>
                <Modal
                  trigger={<List.Header>{beer.name}</List.Header>}
                  centered={false}
                  >
                    <Modal.Header size='huge'>
                      {beer.name}
                    </Modal.Header>

                    <Modal.Content>
                      <Modal.Description>
                          <p>Style:<br/>{beer.style}</p>
                          <p>Alcohol by Volume:<br/>{beer.abv}</p>
                          <p>Rating:<br/>{beer.rating}/5</p>
                      </Modal.Description>
                      <Button
                        compact
                        color='teal'
                        size='mini'
                        beer={beer}
                        onClick={this.onBeerClick}>
                        Show me more.
                        </Button>
                    </Modal.Content>

                </Modal>
              </List.Item>
              }
            )}
        </List>

          : <List>
              <BeerProfile beer={this.state.currentBeer} />
              <Button compact color="teal" onClick={this.onClickReturn}>
                back to beers.
              </Button>
            </List>
        }

      </React.Fragment>
    )
  }
}

export default BeerIndex

// Line 80:
// need to connect brewery data to shaow name
// <p>Producer: <h3>{beer.breweries.name}</h3></p>
