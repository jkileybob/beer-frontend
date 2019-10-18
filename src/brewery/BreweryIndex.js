import React from 'react';
import { Grid, Header, Input, List, Button } from 'semantic-ui-react';
import BreweryModal from "./BreweryModal"

class BreweryIndex extends React.Component{

  render(){
    const style={color: '#20B2AA'}
    return(
      <>
        <Grid centered >
          <Grid.Row>
            <Header size='huge' style={style} >Search the American Brewery Database</Header>
          </Grid.Row>

          <Grid.Row>
            <Header>...by name and/or state...</Header>
          </Grid.Row>

          <Grid.Row columns={2} >
            <Grid.Column width={7} >
              <Input
                fluid
                size='big'
                icon='search'
                onChange={this.props.handleNameSearch}
                placeholder='...by name...'
              />
            </Grid.Column>
            <Grid.Column width={7} >
              <Input
                fluid
                size='big'
                icon='search'
                onChange={this.props.handleStateSearch}
                placeholder='...by state...'
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Header>...or search by city...</Header>
          </Grid.Row>

          <Grid.Row columns={1} >
            <Grid.Column width={7} >
              <Input
                fluid
                size='big'
                icon='search'
                onChange={this.props.handleCitySearch}
                placeholder='...by city...'
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column width={2} >
              <Button
                className="ui button"
                color='teal'
                size='large'
                onClick={this.props.handleClickSubmit}>
                  Submit
              </Button>
            </Grid.Column>

            <Grid.Column width={2} >
              <Button
                className="ui button"
                color='teal'
                size='large'
                onClick={this.props.resetSearch}>
                Clear
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>


        {this.props.breweries ?

          <List animated verticalAlign='middle' >
            {this.props.breweries.map((brew) =>{
              return <React.Fragment key={`brewery-list-item-${brew.id}`}>
                <List.Item
                  id={`${brew.id}`}
                  key={`brewery-list-item-${brew.id}`}
                  onClick={this.props.onBreweryClick}
                  >
                    <Header size='medium' >
                      {brew.name}
                    </Header>
                  </List.Item>
              </React.Fragment>
            })}

          </List> : null
        }

        {this.props.currentBrewery ?
          <>
             <BreweryModal
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
