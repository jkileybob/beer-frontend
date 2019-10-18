import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment, Form, Button, Divider, Rating, TextArea, Image, Dropdown } from 'semantic-ui-react'

const AddBeer = (props) => {

  const style = {color: '#20B2AA'}
  const link = {color: 'white'}

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
              <Segment textAlign='center'>
                <Button.Group color='teal'>
                  <Button size='large' >ABV</Button>
                  <Dropdown
                    size='large'
                    scrolling
                    selection
                    className='button icon'
                    id='abv'
                    placeholder='Select ABV'
                    options={abvDropDown()}
                    onChange={props.handleABV}
                  />
                </Button.Group>
              </Segment>
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
            <Button size='large' color="teal" onClick={props.handleSubmitBeer} >
              <Link style={link} to='/beers'>
                Submit
              </Link>
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button size='large' color="teal" onClick={props.cancelBeer} >
              Cancel
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  )
}

export default AddBeer
