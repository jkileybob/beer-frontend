import React from 'react';
import { List } from 'semantic-ui-react';
import BreweryProfile from "../brewery/BreweryProfile"

class Favorites extends React.Component{

  render(){
    const style={color: '#20B2AA'}
    return(
      <>
      {!this.props.currentBrewery ?
        <>
          <div><h1 style={style} >My Breweries:</h1></div>
          <List animated verticalAlign='middle'>
            {this.props.favs.map(brewery =>{
              return <React.Fragment key={`fav-brewery-list-item-${brewery.id}`}>
                <List.Item
                  id={`${brewery.id}`}
                  key={`fav-brewery-list-item-${brewery.id}`}
                  onClick={this.props.onFavListBreweryClick}
                  >
                    <List.Header>
                      <h3>
                        {brewery.name}
                      </h3>
                    </List.Header>
                  </List.Item>
              </React.Fragment>
            })}
          </List>
        </>
      : <>
          <BreweryProfile
            brewery={this.props.currentBrewery}
            favs={this.props.favs}
            breweryBeers={this.props.breweryBeers}

            handleFavs={this.props.handleFavs}
            handleBeerLog={this.props.handleBeerLog}
            onClickClose={this.props.onClickClose}

            beers={this.props.beers}
            findBreweryBeers={this.props.findBreweryBeers}
            currentBeer={this.props.currentBeer}
            showBreweryBeer={this.props.showBreweryBeer}

            username={this.props.username}
            avatar={this.props.avatar}
          />
        </>
      }
      </>
  )}
}

export default Favorites
