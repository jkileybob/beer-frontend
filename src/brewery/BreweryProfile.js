import React from 'react'
import { Button, Header, Container, Modal } from "semantic-ui-react";
import BreweryMap from './BreweryMap'

const BreweryProfile = (props) => {
  // console.log(props)

  return (
    <React.Fragment>
      { props.open ?
        <Modal
          open={props.open}
          size='fullscreen'
        >
          <Modal.Content>
            <Header size='huge'>{props.brewery.name}</Header>
            <Modal.Description>
              <Header size='tiny'> Brewery type: {props.brewery.brewery_type}</Header>
              <Header size='tiny'>telephone: {props.brewery.phone}</Header>
              <Header size='tiny'>
                website: <a href={`${props.brewery.website_url}`}>{props.brewery.website_url}</a>
              </Header>
              <Container style={{width: '10%', height: '40px'}}>
                <BreweryMap />
              </Container>
              <p>
                {props.brewery.street} <br/>
                {props.brewery.city}, {props.brewery.state} <br/>
                {props.brewery.postal_code}
              </p>
            </Modal.Description>
            <Button
              textAlign='center'
              onClick={props.onClickClose}
              color='teal'
              size='small' >
              close
            </Button>
          </Modal.Content>
        </Modal>
     : null }

    </React.Fragment>
  )
}

export default BreweryProfile


// <Modal.Content image scrolling>
