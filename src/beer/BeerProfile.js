import React from "react"
import { Link } from 'react-router-dom';
import { Card, Image, Popup, Icon, Button, Comment, Grid, Segment, Divider, Rating } from "semantic-ui-react";
import EditBeer from '../beer/EditBeer'

const BeerProfile = (props) => {
  // console.log(props.beer)
  const style={color: '#20B2AA'}

  return (
    <React.Fragment>
      { !props.renderEdit ?
        <Grid textAlign='center' columns={2}>
        <Grid.Column>
            <Card centered >
              <h1>{props.beer.name}</h1>
              <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5pWI5uO7RYDHvfNml_lhxw_HCl0GsR1-2g5543nul2b5LbakAg"/>
              <Card.Content>
                <Card.Header>
                  {props.beer.style}
                  <Card.Meta size='small' style={style} >
                    {props.beer.abv} ABV
                  </Card.Meta>
                </Card.Header>
                <Popup
                  trigger={<Card.Header>{props.brewery.name}</Card.Header>}
                  size='large'
                  position='right center'
                  style={style} >
                    <Popup.Content>
                      from {props.brewery.city}, {props.brewery.state}
                    </Popup.Content>
                </Popup>

                <Popup
                  trigger={ <Link to='/breweries' ><Icon link circular inverted color='teal' name='beer' /></Link> }
                  size='large'
                  position='right center'
                  onClick={props.onBreweryClick}
                  style={style} >
                    <Popup.Content>
                      click to checkout {props.brewery.name}
                    </Popup.Content>
              </Popup>

              </Card.Content>
            </Card>

        </Grid.Column>

        <Grid.Column>
          <Divider horizontal> TASTING NOTES </Divider>
            <Comment.Group minimal>
            </Comment.Group>
              <Comment>
                <Comment.Content>
                  <Segment>
                  <Comment.Text>
                      {props.beer.tasting_note}
                  </Comment.Text>
                </Segment>
                </Comment.Content>
              </Comment>

          <Divider horizontal> COMMENTS </Divider>
              <Comment.Group minimal>
              </Comment.Group>
                <Comment>
                  <Comment.Content>
                    <Segment>
                    <Comment.Text>
                        {props.beer.comment}
                    </Comment.Text>
                  </Segment>
                  </Comment.Content>
                </Comment>

          <Divider horizontal> RATING </Divider>
            <Segment>
              <Rating
                disabled
                defaultRating={props.beer.rating}
                maxRating={5}
                icon='star'
                size='massive'
              />
            </Segment>

        </Grid.Column>

        <Button color="teal" onClick={props.onClickReset}>
          Back to My Beers
        </Button>

        <Button beer={props.beer} color='teal' size='large' onClick={props.editBeer}>
          Edit this Beer
        </Button>
      </Grid>
      : <EditBeer
          beer={props.beer}
          renderEdit={props.renderEdit}
          cancelBeer={props.cancelBeer}

          name={props.name}
          style={props.style}
          abv={props.abv}
          rating={props.rating}
          tastingNote={props.tastingNote}
          comment={props.comment}

          inputValue={props.inputValue}
          handleABV={props.handleABV}
          handleRating={props.handleRating}

          submitBeerEdit={props.submitBeerEdit}
          deleteBeer={props.deleteBeer}
         />
    }
    </React.Fragment>
  )
}

export default BeerProfile

//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
// STRETCH FEATURES:
// eventually give each beer profile page a name slug in broswer url
  // `http://localhost:3000/beers/${beer.name}`
// Ability for user to upload a photo of beer that will persist in dB
  // will require additional column for photos on backend beer and beer-related tables
////////////////////////////////////////////////////////////////////////////////
