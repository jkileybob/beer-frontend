import React from 'react';
import { Grid, Header, Segment, Form, Button, Divider, Rating, Input, TextArea, Image } from 'semantic-ui-react'
const AddBeer = (props) => {
  // console.log(props);
  const style = {color: '#20B2AA'}
  return(
    <React.Fragment>
      <Grid textAlign='center' centered columns={1}>
        <Grid.Column>
          <Image centered size="medium" src='https://cdn.dribbble.com/users/278870/screenshots/1573076/preloader_gif.gif' />
          <Header style={style} size='large' textAlign='center'>
            Add a new beer from<br/>
            {props.currentBrewery.name}<br/>
            to your diary!
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Form reply>
            <Divider horizontal> NAME </Divider>
              <Form.Input
                id='name'
                type='text'
                value={props.name}
                onChange={props.inputValue}
                placeholder='name of beer goes here'
              />
            <Divider horizontal> STYLE </Divider>
              <Form.Input
                id='style'
                type='text'
                value={props.style}
                onChange={props.inputValue}
                placeholder='style of beer goes here'
              />
            <Divider horizontal> ALCOHOL BY VOLUME </Divider>
              <Form.Input
                id='abv'
                type='text'
                value={props.abv}
                onChange={props.inputValue}
                placeholder='percentage of ABV of beer goes here'
              />
            <Divider horizontal> RATING </Divider>
              <Segment textAlign='center'>
                <Rating
                  clearable
                  defaultRating={props.rating}
                  onRate={props.handleRating}
                  maxRating={5}
                  icon='star'
                  size='massive'
                />
              </Segment>
            <Divider horizontal> TASTING NOTES </Divider>
              <TextArea
                id='tastingNote'
                value={props.tastingNote}
                onChange={props.inputValue}
                placeholder='add some taste descriptors here'
              />
            <Divider horizontal> COMMENTS </Divider>
              <TextArea
                id='comment'
                value={props.comment}
                onChange={props.inputValue}
                placeholder='did you love it? did you hate it? would you drink it again? who did you drink it with? write whatever you want or nothing at all. seriously, all comments or lack thereof welcome! this is your diary.'
              />
          </Form>
        </Grid.Column>

        <Grid.Row centered columns={8}>
          <Grid.Column>
            <Button
              size='large'
              color="teal"
              onClick={props.handleSubmitBeer}
            >
              Submit
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              size='large'
              color="teal"
              onClick={props.cancelBeer}
            >
              Cancel
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  )
}

export default AddBeer
