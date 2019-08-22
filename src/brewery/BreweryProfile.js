import React from 'react'
import { Button, Header, Container, Modal } from "semantic-ui-react";
import BreweryMap from './BreweryMap'

class BreweryProfile extends React.Component{

    render(){
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
              <Header size='huge'>{this.props.brewery.name}</Header>
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
                  color='teal'
                  size='small'
                  onClick={this.props.favs}
                >
                  Add to my Favorites
                </Button>
            </Modal.Content>
          </Modal>
       : null }

      </React.Fragment>
    )
  }
}

export default BreweryProfile
