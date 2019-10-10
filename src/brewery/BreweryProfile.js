import React from 'react'
import { Button, Header, Container, Modal } from "semantic-ui-react";
import BreweryMap from './BreweryMap'

class BreweryProfile extends React.Component{

    render(){
      const style={color: '#20B2AA'}
      return (
      <React.Fragment>
        { this.props.open ?
          <Modal
            open={this.props.open}
            size='fullscreen'
          >
            <Container style={{width:'10%', height:'10%'}}>
              <BreweryMap
                brewery={this.props.brewery}
              />
            </Container>
            <Modal.Content>
              <Header style={style} size='huge'>{this.props.brewery.name}</Header>
                <Header size='tiny'>
                  brewery type: {this.props.brewery.brewery_type} <br/>
                  telephone: {this.props.brewery.phone} <br/>
                  website: <a href={`${this.props.brewery.website_url}`}>{this.props.brewery.website_url}</a>
                </Header>
              </Modal.Content>
              <Modal.Content>
                <Modal.Description >
                  {this.props.brewery.street} <br/>
                  {this.props.brewery.city}, {this.props.brewery.state} <br/>
                  {this.props.brewery.postal_code}
                </Modal.Description>
              </Modal.Content>
              <Modal.Content>
                <Button
                  onClick={this.props.onClickClose}
                  color='teal'
                  size='small' >
                  close
                </Button>

                <Button
                  id={this.props.brewery.id}
                  brewery={this.props.brewery}
                  color='teal'
                  size='small'
                  onClick={this.props.handleFavs}
                >
                  Log this Brewery
                </Button>

                <Button
                  id={this.props.brewery.id}
                  brewery={this.props.brewery}
                  color='teal'
                  size='small'
                  onClick={this.props.handleBeerLog}
                >
                  Log a Beer
                </Button>

            </Modal.Content>
          </Modal>
       : null }

      </React.Fragment>
    )
  }
}

export default BreweryProfile


// if brewery is included in favs list
// create a button element to remove from favs

// { this.props.favs.includes(fav =>{fav === this.props.currentBrewery) ?
//   <Button>Delete from Favs</Button>
//  : null
// }
