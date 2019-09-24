import React from 'react';
import { List } from 'semantic-ui-react';
import BreweryProfile from "../brewery/BreweryProfile"

class Favorites extends React.Component{
  render(){
    // this.props.favs.map((fav) => {console.log(fav)});
    return(
      <>
        <div>My Favorite Breweries:</div>
        <List animated verticalAlign='middle'>
          {this.props.favs.map(fav =>{
            return <React.Fragment key={`fav-brewery-list-item-${fav.id}`}>
              <List.Item
                id={`${fav.id}`}
                key={`fav-brewery-list-item-${fav.id}`}
                onClick={this.props.onFavListBreweryClick}
                >
                  <List.Header>
                    {fav.brewery_id}
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
