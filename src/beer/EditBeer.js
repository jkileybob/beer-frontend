import React from 'react';
import { Form, Button, Divider, Rating, Input, TextArea } from 'semantic-ui-react'
const EditBeer = (props) => {
  // console.log(props)
  return(
    <React.Fragment>
    <h1>EDIT UR BEER HERE</h1>
    <Form reply>

      <Divider horizontal> NAME </Divider>
          <Form.Input />
      <Divider horizontal> STYLE </Divider>
          <Form.Input />
      <Divider horizontal> ALCOHOL BY VOLUME </Divider>
          <Form.Input />

    <Divider horizontal> RATING </Divider>
      <Rating
        defaultRating={props.beer.rating}
        maxRating={5}
        icon='star'
        size='massive'
      />
    <Divider horizontal> TASTING NOTES </Divider>

        <Form.TextArea />

    <Divider horizontal> COMMENTS </Divider>

        <Form.TextArea />


      <Button size='large' color="teal" onClick={props.cancelEdit}>
        Cancel
      </Button>

    </Form>
    </React.Fragment>
  )
}

export default EditBeer
