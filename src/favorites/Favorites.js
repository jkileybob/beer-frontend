import React from 'react';
import { Grid, Header, List } from 'semantic-ui-react';
import BreweryProfile from "../brewery/BreweryProfile"

class Favorites extends React.Component{

  render(){
    const style={color: '#20B2AA'}
    return(
      <>
      {!this.props.currentBrewery ?
        <>
          <Grid centered >
            <Grid.Row>
              <Header style={style} size='large' >My Breweries:</Header>
            </Grid.Row>

            <Grid.Row>
              <List animated verticalAlign='middle'>
                {this.props.favs.map(brewery =>{
                  return <React.Fragment key={`fav-brewery-list-item-${brewery.id}`}>
                    <List.Item
                      id={`${brewery.id}`}
                      key={`fav-brewery-list-item-${brewery.id}`}
                      onClick={this.props.onFavListBreweryClick}
                    >
                      <Header size='medium' >{brewery.name}</Header>
                    </List.Item>
                  </React.Fragment>
                })}
              </List>
        </Grid.Row>
      </Grid>
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

            deleteBrewery={this.props.deleteBrewery}
            favorites={this.props.favorites}
          />
        </>
      }
      </>
  )}
}

export default Favorites
