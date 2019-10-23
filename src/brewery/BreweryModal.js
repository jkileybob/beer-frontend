import React from 'react'
import { Link } from 'react-router-dom';
import { Grid, Button, Header, Container, Modal } from "semantic-ui-react";
import BreweryMap from './BreweryMap'

class BreweryModal extends React.Component{

    render(){
      const style={color: '#20B2AA'}
      return (
      <React.Fragment>
        { this.props.open ?
          <Modal
            centered
            open={this.props.open}
            size='large'
          >

          <Grid textAlign='center' columns='equal' >
            <Grid.Row columns={2}>
              <Grid.Column id='modal-content-column' >
                <Modal.Content>
                  <Header style={style} size='huge'>{this.props.brewery.name}</Header>
                    <Header size='tiny'>
                      brewery type: {this.props.brewery.brewery_type} <br/>
                      telephone: {this.props.brewery.phone} <br/>
                      website: <a href={`${this.props.brewery.website_url}`}>{this.props.brewery.website_url}</a>
                    </Header>
                  </Modal.Content>
                  <Modal.Content id='modal-content' >
                    <Header size="small" >
                      {this.props.brewery.street} <br/>
                      {this.props.brewery.city}, {this.props.brewery.state} <br/>
                      {this.props.brewery.postal_code}
                    </Header>
                  </Modal.Content>
                  <Modal.Content id='modal-content' >
                    <Link to="/breweries" style={style} >
                      <Button
                        id={this.props.brewery.id}
                        brewery={this.props.brewery}
                        color='teal'
                        size='small'
                        onClick={this.props.handleFavs} >
                        Log Brewery
                      </Button>
                    </Link>

                    <Button
                      id={this.props.brewery.id}
                      brewery={this.props.brewery}
                      color='teal'
                      size='small'
                      onClick={this.props.handleBeerLog}
                    >
                      Log a Beer
                    </Button>

                    <Button
                      onClick={this.props.onClickClose}
                      color='teal'
                      size='small' >
                      Close
                    </Button>
                </Modal.Content>
              </Grid.Column>

              <Grid.Column>
                <Modal.Content image>
                  <Container id='map-card'>
                    <BreweryMap brewery={this.props.brewery} />
                  </Container>
                </Modal.Content>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          </Modal>
       : null }

      </React.Fragment>
    )
  }
}

export default BreweryModal
