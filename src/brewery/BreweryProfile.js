import React from 'react'
import { Button, Header, Image, Modal } from "semantic-ui-react";

const BreweryProfile = (props) => {
  // console.log(props)

  return (
    <React.Fragment>
      { props.open ?
        <Modal
          open={props.open}
          size='large'
        >
          <Modal.Content>
            <Header size='huge'>{props.brewery.name}</Header>
            <Modal.Description>
              <Header size='tiny'> Brewery type: {props.brewery.brewery_type}</Header>
              <Header size='tiny'>telephone: {props.brewery.phone}</Header>
              <Header size='tiny'>
                website: <a href={`${props.brewery.website_url}`}>{props.brewery.website_url}</a>
              </Header>
              <Image size='large' src='https://www.harvard.edu/sites/default/files/content/harvard-map-google.jpg' wrapped />
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
