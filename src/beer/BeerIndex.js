import React from 'react'
// import { Link } from 'react-router-dom'
import { List, Card, Button, Header, Image, Modal } from 'semantic-ui-react'
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

  backToBeers = () => {
    console.log("going back")
  }

  render(){
    return(
      <React.Fragment>
      {!this.state.currentBeer ?
        <List animated verticalAlign='middle'>
            {this.state.beers.map((beer) => {
              return  <List.Item>
              <Modal
                key={beer.id}
                trigger={<List.Header>{beer.name}</List.Header>}
                centered={false}
                >

                        <Modal.Header size='huge'>
                          {beer.name}
                        </Modal.Header>

                        <Modal.Content>
                          <Modal.Description>
                              <h3>{beer.style}</h3>
                              <p>{beer.abv}</p>
                              <p>{beer.brewery.name}</p>
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



          : <BeerProfile beer={this.state.currentBeer} />
        }

      </React.Fragment>
    )
  }
}

export default BeerIndex
