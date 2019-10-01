import React from 'react';
import { Grid, Header, Segment, Form, Button, Divider, Rating, Input, TextArea, Image } from 'semantic-ui-react'
const EditBeer = (props) => {
  // console.log(props)
  return(
  <React.Fragment>
    <Grid textAlign='center' centered columns={1}>
      <Grid.Column>
        <Image centered size="medium" src='https://cdn.dribbble.com/users/278870/screenshots/1573076/preloader_gif.gif' />
        <Header textAlign='center'>sometimes mistakes are made when beer is involved <br/>make your edits below</Header>
      </Grid.Column>
      <Grid.Column>
        <Form reply>
          <Divider horizontal> NAME </Divider>
            <Form.Input />
          <Divider horizontal> STYLE </Divider>
            <Form.Input />
          <Divider horizontal> ALCOHOL BY VOLUME </Divider>
            <Form.Input />
          <Divider horizontal> RATING </Divider>
            <Segment textAlign='center'>
              <Rating
                defaultRating={props.beer.rating}
                maxRating={5}
                icon='star'
                size='massive'
              />
            </Segment>
          <Divider horizontal> TASTING NOTES </Divider>
            <Form.TextArea />
          <Divider horizontal> COMMENTS </Divider>
            <Form.TextArea />
        </Form>
      </Grid.Column>

      <Grid.Row centered columns={8}>
        <Grid.Column>
          <Button size='large' color="teal" >
            Submit
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button size='large' color="teal" onClick={props.cancelEdit}>
            Cancel
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </React.Fragment>
  )
}

export default EditBeer
