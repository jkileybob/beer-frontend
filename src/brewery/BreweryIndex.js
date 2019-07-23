import React from 'react';
import { Input, List, Button, Pagination } from 'semantic-ui-react';
import BreweryProfile from "./BreweryProfile"
class BreweryIndex extends React.Component{
  state = {
    breweries: [],
    currentBrewery: null,
    searchTermName: "",
    searchTermCity: "",
    searchTermState: "",
    modalOpen: false
  };


handleNameSearch = (e) => {
  let inputName = e.target.value
  this.setState({
    searchTermName: inputName
  })
}

handleCitySearch = (e) => {
  let inputCity = e.target.value
  this.setState({
    searchTermCity: inputCity
  })
}

handleStateSearch = (e) => {
  let inputState = e.target.value
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
      // console.log(breweries);
      this.setState({
        breweries: breweries
      })
    })
  } else if (!this.state.searchTermName && this.state.searchTermState) {
    let inputState = this.state.searchTermState
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${inputState}`)
    .then(res => res.json())
    .then(breweries => {
      // console.log(breweries);
      this.setState({
        breweries: breweries
      })
    })
  } else if (this.state.searchTermName && this.state.searchTermState) {
    let inputName = this.state.searchTermName
    let inputState = this.state.searchTermState
    fetch(`https://api.openbrewerydb.org/breweries?by_name=${inputName}&by_state=${inputState}`)
    .then(res => res.json())
    .then(breweries => {
      // console.log(breweries);
      this.setState({
        breweries: breweries
      })
    })
  } else if (!this.state.searchTermName && !this.state.searchTermState && this.state.searchTermCity){
    let inputCity = this.state.searchTermCity
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${inputCity}`)
    .then(res => res.json())
    .then(breweries => {
      // console.log(breweries);
      this.setState({
        breweries: breweries
      })
    })
  } else {
    alert("Please Enter Something. Anything. Preferrably not nonsense.")
  }
}

onBreweryClick = (e) => {
  // console.log(e.currentTarget.id)
  this.state.breweries.filter(brew=>{
    let brewId = e.currentTarget.id;
    return brew.id.toString() === brewId ?
      this.setState({
        currentBrewery: brew,
        modalOpen: true
      })
    : null
  })
}

onClickClose = (e) => {
  this.setState({
    modalOpen: false
  })
}

  render(){
    return(
      <React.Fragment>

      <h1>Search the Brewery Database</h1>
      <h2>...by name and/or state...</h2>
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
      <h2>...or search by city...</h2>
        <Input
        fluid
        size='big'
        icon='search'
        onChange={this.handleCitySearch}
        placeholder='...by city...'
        />

        <Button className="ui button"
        compact
        color='teal'
        size='large'
        onClick={this.handleClickSubmit}>Submit</Button>

        {this.state.breweries ?

          <List animated verticalAlign='middle'>
            {this.state.breweries.map((brew) =>{
              return <React.Fragment key={`brewery-list-item-${brew.id}`}>
                <List.Item
                  id={`${brew.id}`}
                  key={`brewery-list-item-${brew.id}`}
                  onClick={this.onBreweryClick}
                  > {brew.name}</List.Item>
              </React.Fragment>
            })}

          </List> : null
        }

        {this.state.currentBrewery ?
          <React.Fragment>
             <BreweryProfile
               brewery={this.state.currentBrewery}
               open={this.state.modalOpen}
               onClickClose={this.onClickClose}
             />
           </React.Fragment>

        : null
        }

        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={5}
        />

      </React.Fragment>
  )}
}

export default BreweryIndex


// eventually add functionailty to pagination...
// https://api.openbrewerydb.org/breweries?by_name=cooper&page=1&per_page=5
