import React from 'react'
// import { Link } from 'react-router-dom'
import { List, Button, Modal } from 'semantic-ui-react'
import BeerProfile from '../beer/BeerProfile'


class BeerIndex extends React.Component{
  state = {
    beers: [],
    currentBeer: null
  }
  componentDidMount(){
    fetch(`http://localhost:4000/api/v1/beers`)
    .then(res=> res.json())
    .then(beers =>{
      this.setState({
        beers: beers
      })
    })
  }

  onBeerClick = (e, props) => {
    // console.log(e.target)
    // console.log(props.beer)
    this.setState({
      currentBeer: props.beer
    })
  }

  onClickReturn = (e) => {
    // console.log("attempting")
    this.setState({
      currentBeer: null
    })
  }

  render(){
    return(
      <React.Fragment>
      {!this.state.currentBeer ?

        <List animated verticalAlign='middle'>
          <List.Header as='h1'>Index of Beers</List.Header>
            {this.state.beers.map((beer) => {
              return  <List.Item key={`beer-list-item-${beer.name}`}>
              <Modal
                trigger={<List.Header>{beer.name}</List.Header>}
                centered={false}
                >

                        <Modal.Header size='huge'>
                          {beer.name}
                        </Modal.Header>

                        <Modal.Content>
                          <Modal.Description>
                              <h3>{beer.style}</h3>
                              <p>{beer.abv} ABV</p>
                              <p>Made by {beer.brewery.name}</p>
                          </Modal.Description>
                          <Button
                            compact
                            color='teal'
                            size='mini'
                            beer={beer}
                            onClick={this.onBeerClick}>
                            Show me more.
                            </Button>
                        </Modal.Content>

                      </Modal>
                      </List.Item>
              }
            )}
        </List>

          : <List>
              <BeerProfile beer={this.state.currentBeer} />
              <Button compact color="teal" onClick={this.onClickReturn}>
                back to beers.
              </Button>
            </List>
        }

      </React.Fragment>
    )
  }
}

export default BeerIndex
