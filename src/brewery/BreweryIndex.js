import React from 'react';
import { Input, List } from 'semantic-ui-react';

class BreweryIndex extends React.Component{
  state = {
    breweries: [],
    currentBrewery: null,
    searchTermName: "",
    searchTermState: ""
  };


handleNameSearch = (e) => {
  let inputName = e.target.value
  // console.log(input)
  this.setState({
    searchTermName: inputName
  })
}

handleStateSearch = (e) => {
  let inputState = e.target.value
  // console.log(input)
  this.setState({
    searchTermState: inputState
  })
}

handleClickSubmit = () => {
 if (this.state.searchTermName && !this.state.searchTermState){
    let inputName = this.state.searchTermName
    fetch(`https://api.openbrewerydb.org/breweries?by_name=${inputName}`)
    .then(res => res.json())
    .then(breweries => {
      console.log(breweries);
      this.setState({
        breweries: breweries
      })
    })
  } else if (!this.state.searchTermName && this.state.searchTermState) {
    let inputState = this.state.searchTermState
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${inputState}`)
    .then(res => res.json())
    .then(breweries => {
      console.log(breweries);
      this.setState({
        breweries: breweries
      })
    })
  } else {
    let inputName = this.state.searchTermName
    let inputState = this.state.searchTermState
    fetch(`https://api.openbrewerydb.org/breweries?by_name=${inputName}&by_state=${inputState}`)
    .then(res => res.json())
    .then(breweries => {
      console.log(breweries);
      this.setState({
        breweries: breweries
      })
    })
  }
}

  render(){
    return(
      <React.Fragment>
      <h1>Search the Brewery Database... </h1>
        <Input
        fluid
        size='big'
        icon='search'
        onChange={this.handleNameSearch}
        placeholder='...by name...'
        />

        <Input
        fluid
        size='big'
        icon='search'
        onChange={this.handleStateSearch}
        placeholder='...by state...'
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
