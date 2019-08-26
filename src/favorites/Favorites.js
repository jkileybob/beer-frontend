import React from 'react'

class Favorites extends React.Component{
  render(){
    return(
      <React.Fragment>
        <div>My Favorite Breweries...eventually</div>
        // <List animated verticalAlign='middle'>
        //   {this.props.favs.map(brewery =>{
        //     return <React.Fragment key={`fav-brewery-list-item-${brewery.id}`}>
        //       <List.Item
        //         id={`${brewery.id}`}
        //         key={`fav-brewery-list-item-${brewery.id}`}
        //         >
        //           <List.Header>
        //             {brewery.name}
        //           </List.Header>
        //         </List.Item>
        //     </React.Fragment>
        //   })}
        // </List>
      </React.Fragment>
  )}
}

export default Favorites
