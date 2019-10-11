import React from 'react';
import { Grid, Header, Segment, Form, Button, Divider, Dropdown, Rating, Input, TextArea, Image } from 'semantic-ui-react'
const EditBeer = (props) => {
  const style = {color: '#20B2AA'}

  const abvDropDown = (number, suffix = '%') => {
    let abvOptions = []
    for (number = 2.5; number <= 20; number+=0.25) {
      abvOptions.push({
        text: `${number}${suffix}`,
        value: `${number}${suffix}`
      })
    }
    return abvOptions
  }

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
          <Segment textAlign='center'>
            <Button.Group color='teal'>
              <Button size='large' >ABV</Button>
              <Dropdown
                centered
                size='large'
                scrolling
                selection
                className='button icon'
                id='abv'
                placeholder={props.abv}
                options={abvDropDown()}
                onChange={props.handleABV}
              />
          </Button.Group>
        </Segment>
          <Divider horizontal> RATING </Divider>
            <Segment textAlign='center'>
              <Rating
                clearable
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
