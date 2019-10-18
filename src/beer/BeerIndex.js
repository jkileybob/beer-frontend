import React from 'react'
import { Popup, List, Button, Rating } from 'semantic-ui-react'
import BeerProfile from '../beer/BeerProfile'

class BeerIndex extends React.Component{
  render(){
    const style={color: '#20B2AA'}
    return(
      <React.Fragment>
        {!this.props.currentBeer ?
        <List animated verticalAlign='middle'>
          <List.Header as='h1' style={style} >My Beers:</List.Header>
            {this.props.beers.map((beer) => {
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
                        onClick={this.props.onBeerClick}>
                        Show me more
                      </Button>
                    </Popup.Content>
                  </Popup>
                </List.Item>
              }
            )}
        </List>
      : <BeerProfile
          beer={this.props.currentBeer}
          brewery={this.props.brewery}
          showBrewery={this.props.showBrewery}
          onBreweryClick={this.props.onBreweryClick}
          onClickReset={this.props.onClickReset}
          renderEdit={this.props.renderEdit}
          editBeer={this.props.editBeer}
          cancelBeer={this.props.cancelBeer}
          submitBeerEdit={this.props.submitBeerEdit}
          deleteBeer={this.props.deleteBeer}

          name={this.props.name}
          style={this.props.style}
          abv={this.props.abv}
          rating={this.props.rating}
          tastingNote={this.props.tastingNote}
          comment={this.props.comment}

          inputValue={this.props.inputValue}
          handleABV={this.props.handleABV}
          handleRating={this.props.handleRating}
          />
      }

      </React.Fragment>
  )}
}

export default BeerIndex

/////////////////////////////////////////////////////////////////////////////////

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
