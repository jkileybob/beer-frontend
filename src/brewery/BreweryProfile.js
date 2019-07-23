import React from 'react'
import { Button, Header, Icon, Image, Modal } from "semantic-ui-react";

const BreweryProfile = (props) => {
  console.log(props)

  return (
    <React.Fragment>
    <h1>{props.brewery.name}</h1>

    <Modal.Header>Profile Picture</Modal.Header>
    <Modal.Content image scrolling>
      <Image size='medium' src='https://www.harvard.edu/sites/default/files/content/harvard-map-google.jpg' wrapped />

      <Modal.Description>
        <Header>Modal Header</Header>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>

      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed <Icon name='chevron right' />
      </Button>
    </Modal.Actions>

    </React.Fragment>
  )
}

export default BreweryProfile
