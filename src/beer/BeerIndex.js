import React from 'react'
// import { Route, Link } from 'react-router-dom'
import { Popup, List, Button, Rating } from 'semantic-ui-react'
import BeerProfile from '../beer/BeerProfile'
import AddBeer from '../beer/AddBeer'
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
    this.getBreweries(props);
    this.setState({
      currentBeer: props.beer
    })
  }

  getBreweries = (props) => {
    let breweryId = props.beer.brewery_id
    this.props.favs.filter(brewery =>
      brewery.id === breweryId ?
        this.props.setBrewery(brewery)
      : null
    )
  }

  onClickReset = (e) => {
    this.setState({
      currentBeer: null
    });
    this.props.setBrewery(null)
  }

  editBeer = () => {
    this.setState({
      renderEdit: true
    })
  }

  cancelEdit = () => {
    this.setState({
      renderEdit: false
    })
  }

  render(){

    const style={color: '#20B2AA'}

    return(
      <React.Fragment>
      {!this.state.currentBeer ?
        <List animated verticalAlign='middle'>
          <List.Header as='h1' style={style} >My Beers:</List.Header>
            {this.state.beers.map((beer) => {
              return  <List.Item key={`beer-list-item-${beer.name}`}>
                  <Popup
                    on="click"
                    trigger={<List.Header><h3>{beer.name}</h3></List.Header>} >
                    <Popup.Content>
                      <Rating
                        disabled
                        defaultRating={beer.rating}
                        maxRating={5}
                        icon='star'
                        size='massive' />
                      <p>Style:<br/>{beer.style}</p>
                      <p>Alcohol by Volume:<br/>{beer.abv}</p><br/>
                      <Button
                        color='teal'
                        size='large'
                        beer={beer}
                        onClick={this.onBeerClick}>
                        Show me more
                      </Button>
                    </Popup.Content>
                  </Popup>
                </List.Item>
              }
            )}
        </List>
      : <BeerProfile
          beer={this.state.currentBeer}
          brewery={this.props.brewery}
          showBrewery={this.props.showBrewery}
          onClickReset={this.onClickReset}
          renderEdit={this.state.renderEdit}
          editBeer={this.editBeer}
          cancelEdit={this.cancelEdit} />
      }
      </React.Fragment>
  )}
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

// 3: Change beer modal from onCLick to onHover!
////////////////////////////////////////////////////////////////////////////////
