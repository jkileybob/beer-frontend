import React from "react"
import { Card, Image, Button, Comment, Form, Header, Grid, Segment } from "semantic-ui-react";


// needs addition of tasting notes, rating (add stars maybe?), and comments
// needs clickable brewery modal popup

const BeerProfile = (props) => {
  console.log(props.beer.name)

  return (
    <React.Fragment>
      <Grid stackable columns={2}>
        <Grid.Column>
            <Card>
              <h1>{props.beer.name}</h1>
              <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5pWI5uO7RYDHvfNml_lhxw_HCl0GsR1-2g5543nul2b5LbakAg"/>
              <Card.Content>
                <Card.Header>{props.beer.style}</Card.Header>
                <Card.Description>
                  {props.beer.abv} ABV <br/>
                  {props.beer.rating}/5 Rating <br/>

                </Card.Description>
              </Card.Content>
            </Card>
        </Grid.Column>

        <Grid.Column>
            <Comment.Group minimal>
              <Header>
                Tasting Notes:
              </Header>
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
                <Form reply>
                  <Form.TextArea />
                  <Button compact color="teal" icon='edit'>
                    Add Tasting Note
                  </Button>
                </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}

export default BeerProfile

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

// each comment will create it's own <Comment> tag, respecitvely, as saved in the data
