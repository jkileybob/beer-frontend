import React from 'react';
import { Grid, Header, Segment, Form, Button, Divider, Rating, Input, TextArea, Image } from 'semantic-ui-react'
const EditBeer = (props) => {
  // console.log(props.beer)
  const style = {color: '#20B2AA'}
  return(
  <React.Fragment>
    <Grid textAlign='center' centered columns={1}>
      <Grid.Column>
        <Image centered size="medium" src='https://cdn.dribbble.com/users/278870/screenshots/1573076/preloader_gif.gif' />
        <Header style={style} size='large' textAlign='center'>sometimes mistakes are made when beer is involved <br/>make your edits below</Header>
      </Grid.Column>
      <Grid.Column>
        <Form reply>
          <Divider horizontal> NAME </Divider>
            <Form.Input
              id='name'
              onChange={props.inputValue}
              value={props.name}
             />
          <Divider horizontal> STYLE </Divider>
            <Form.Input
              id='style'
              onChange={props.inputValue}
              value={props.style}
            />
          <Divider horizontal> ALCOHOL BY VOLUME </Divider>
            <Form.Input
              id='abv'
              onChange={props.inputValue}
              value={props.abv}
            />
          <Divider horizontal> RATING </Divider>
            <Segment textAlign='center'>
              <Rating
                id='rating'
                onRate={props.handleRating}
                defaultRating={props.rating}
                maxRating={5}
                icon='star'
                size='massive'
              />
            </Segment>
          <Divider horizontal> TASTING NOTES </Divider>
            <Form.TextArea
              id='tastingNote'
              onChange={props.inputValue}
              value={props.tastingNote}
            />
          <Divider horizontal> COMMENTS </Divider>
            <Form.TextArea
              id='comment'
              onChange={props.inputValue}
              value={props.comment}
            />
        </Form>
      </Grid.Column>

      <Grid.Row centered columns={8}>
        <Grid.Column>
          <Button size='large' color="teal" onClick={props.submitBeerEdit} >
            Submit
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button size='large' color="teal" onClick={props.cancelBeer}>
            Cancel
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </React.Fragment>
  )
}

export default EditBeer
