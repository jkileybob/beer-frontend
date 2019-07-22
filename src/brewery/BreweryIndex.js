import React from 'react';
import { Input, List } from 'semantic-ui-react';

class BreweryIndex extends React.Component{
  state = {
    breweries: [],
    currentBrewery: null,
    searchTerm: ""
  };


handleSearch = (e) => {
  let input = e.target.value
  // console.log(input)
  this.setState({
    searchTerm: input
  })
}

handleClickSubmit = () => {
  let input = this.state.searchTerm
  console.log(input)
  // using input, make fetch call to open brew DB
  // set state of list of breweries to
  // whatever the search returns

  fetch(`https://api.openbrewerydb.org/breweries?by_name=${input}`)
  .then(res => res.json())
  .then(breweries => {
    console.log(breweries);
    this.setState({
      breweries: breweries
    })
  })


}

  render(){
    return(
      <React.Fragment>
        <Input
        fluid
        size='big'
        icon='search'
        onChange={this.handleSearch}
        placeholder='Search Brewery Database...'
        />

        <button className="ui button" onClick={this.handleClickSubmit}>Submit</button>

        {this.state.breweries ?
          <List animated verticalAlign='middle'>
            {this.state.breweries.map((brew) =>{
              return <List.Item key={`brewery-list-item-${brew.id}`}> {brew.name}</List.Item>
            })}
          </List> : null
        }

      </React.Fragment>
  )}
}

export default BreweryIndex
