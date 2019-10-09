import React from 'react';
import { Input, List, Button } from 'semantic-ui-react';
import BreweryProfile from "./BreweryProfile"

class BreweryIndex extends React.Component{

  render(){
    const style={color: '#20B2AA'}
    return(
      <>
        <h1 style={style} >Search the American Brewery Database</h1>
        <h2>...by name and/or state...</h2>
          <Input
            fluid
            size='big'
            icon='search'
            onChange={this.props.handleNameSearch}
            placeholder='...by name...'
          />
          <Input
            fluid
            size='big'
            icon='search'
            onChange={this.props.handleStateSearch}
            placeholder='...by state...'
          />
        <h2>...or search by city...</h2>
          <Input
            fluid
            size='big'
            icon='search'
            onChange={this.props.handleCitySearch}
            placeholder='...by city...'
          />

          <Button className="ui button"
            compact
            color='teal'
            size='large'
            onClick={this.props.handleClickSubmit}>
              Submit
          </Button>

        {this.props.breweries ?

          <List animated verticalAlign='middle'>
            {this.props.breweries.map((brew) =>{
              return <React.Fragment key={`brewery-list-item-${brew.id}`}>
                <List.Item
                  id={`${brew.id}`}
                  key={`brewery-list-item-${brew.id}`}
                  onClick={this.props.onBreweryClick}
                  >
                    <List.Header>
                      {brew.name}
                    </List.Header>
                  </List.Item>
              </React.Fragment>
            })}

          </List> : null
        }

        {this.props.currentBrewery ?
          <>
             <BreweryProfile
               brewery={this.props.currentBrewery}
               handleFavs={this.props.handleFavs}
               handleBeerLog={this.props.handleBeerLog}
               open={this.props.modalOpen}
               onClickClose={this.props.onClickClose}
             />
           </>
        : null
        }
      </>
    )
  }
}

export default BreweryIndex

// <Pagination />


// <Pagination
//   boundaryRange={0}
//   defaultActivePage={1}
//   ellipsisItem={null}
//   firstItem={null}
//   lastItem={null}
//   siblingRange={1}
//   totalPages={5}
// />


// eventually add functionailty to pagination...
// https://api.openbrewerydb.org/breweries?by_name=cooper&page=1&per_page=5
