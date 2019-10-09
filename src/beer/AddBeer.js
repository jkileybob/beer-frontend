import React from 'react';
// import { Grid, Header, Segment, Form, Button, Divider, Rating, Input, TextArea, Image } from 'semantic-ui-react'
const AddBeer = (props) => {
  console.log(props)

  // getBrewery = (props.whatever) => {
  //   let breweryId = props with breweryId attached
  //   this.props.favs.filter(brewery =>
  //     brewery.id === breweryId ?
  //       this.props.setBrewery(brewery)
  //     : null
  //   )
  // }

  return(
  <React.Fragment>
    {props.addingBeer ?
      <div>add beer</div>
    : null}
  </React.Fragment>
  )
}

export default AddBeer

// <Grid textAlign='center' centered columns={1}>
//   <Grid.Column>
//     <Image centered size="medium" src='https://cdn.dribbble.com/users/278870/screenshots/1573076/preloader_gif.gif' />
//     <Header textAlign='center'> Add a new beer to your diary!</Header>
//   </Grid.Column>
//   <Grid.Column>
//     <Form reply>
//       <Divider horizontal> NAME </Divider>
//         <Form.Input />
//       <Divider horizontal> STYLE </Divider>
//         <Form.Input />
//       <Divider horizontal> ALCOHOL BY VOLUME </Divider>
//         <Form.Input />
//       <Divider horizontal> RATING </Divider>
//         <Segment textAlign='center'>
//           <Rating
//             defaultRating={props.beer.rating}
//             maxRating={5}
//             icon='star'
//             size='massive'
//           />
//         </Segment>
//       <Divider horizontal> TASTING NOTES </Divider>
//         <Form.TextArea />
//       <Divider horizontal> COMMENTS </Divider>
//         <Form.TextArea />
//     </Form>
//   </Grid.Column>
//
//   <Grid.Row centered columns={8}>
//     <Grid.Column>
//       <Button size='large' color="teal" >
//         Submit
//       </Button>
//     </Grid.Column>
//     <Grid.Column>
//       <Button size='large' color="teal" onClick={props.cancelEdit}>
//         Cancel
//       </Button>
//     </Grid.Column>
//   </Grid.Row>
// </Grid>
