import React from 'react';
import { List } from 'semantic-ui-react';
import BreweryProfile from "../brewery/BreweryProfile"

class Favorites extends React.Component{

  render(){
    // console.log(this.props.favs.map(b => {return b.id}));
    return(
      <>
        <div><h1>My Breweries:</h1></div>
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

        {this.props.currentBrewery ?
          <>
             <BreweryProfile
               brewery={this.props.currentBrewery}
               handleFavs={this.props.handleFavs}
               favs={this.props.favs}
               open={this.props.modalOpen}
               onClickClose={this.props.onClickClose}
             />
           </>
        : null
        }

      </>
  )}
}

export default Favorites
