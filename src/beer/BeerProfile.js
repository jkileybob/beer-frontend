import React from "react"
import { Card, Image, Button, Comment, Form, Header, Grid, Segment, Divider, Rating } from "semantic-ui-react";

const BeerProfile = (props) => {
  // console.log(props.beer.name)
  return (
    <React.Fragment>
      <Grid textAlign='center' columns={2}>
        <Grid.Column>
            <Card centered >
              <h1>{props.beer.name}</h1>
              <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5pWI5uO7RYDHvfNml_lhxw_HCl0GsR1-2g5543nul2b5LbakAg"/>
              <Card.Content>
                <Card.Header>{props.beer.style}</Card.Header>
                <Card.Description>
                  {props.beer.abv} ABV <br/>
                BREWERY NAME GOES HERE<br/>
                with a clickable link<br/>
                </Card.Description>
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

        <Button center color="teal" onClick={props.onClickReturn}>
          Back to My Beers
        </Button>

        <Button color='teal' size='large' onClick={props.editBeer}>
          Edit this Beer
        </Button>

      </Grid>
    </React.Fragment>
  )
}

export default BeerProfile

//////////////////////////////////////////////////////////////////////////
// GOAL: functionality to edit a rating onClick
// through patch requests that will persist
// ratings data for that beer on backend


/////////////////////////////////////////////////////////////////////////
// GOAL: wire up data from breweries
// Line 20:
// <p>{props.beer.brewery.name}</p>
// <p>{props.beer.brewery.city}, {props.beer.brewery.state}</p>
/////////////////////////////////////////////////////////////////////////
// GOAL: wire up data from user(image, name) and find JS method for comment timestamp
// first Comment around line 36:
// <Comment.Avatar as='a' width="100" height="100" src='https://cdn.dribbble.com/users/283756/screenshots/1317854/loading-beer_2.gif'>
// </Comment.Avatar>
//
// <Comment.Content>
//   <Comment.Author>
//     {props.user.name}
//   </Comment.Author>
//
//   <Comment.Metadata>
//     <span>{date.toString()}</span>
//   </Comment.Metadata>
//   <Comment.Text>How artistic!</Comment.Text>
//     <Comment.Actions>
//       <a>Reply</a>
//     </Comment.Actions>
// </Comment.Content>

// build it so that each comment will create it's own <Comment> tag,
// respecitvely, as saved in the data
////////////////////////////////////////////////////////////////////////////////

// GOAL: add functionality to edit each comment/ tasting note within this page
///////////////OR: create an edit page to that can update
///////////////////beer name, abv, tasing notes, comments, style, rating

/////////////////////////////////////////////////////////////////////////////////
// STRETCH FEATURES:
// eventually give each beer profile page a name slug in broswer url
  // `http://localhost:3000/beers/${beer.name}`
// Ability for user to upload a photo of beer that will persist in dB
  // will require additional column for photos on backend beer and beer-related tables

////////////////////////////////////////////////////////////////////////////////
