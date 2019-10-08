import React from 'react';
import { withRouter } from "react-router-dom";
import { Segment, Container, Image, Grid } from 'semantic-ui-react';

const Footer = () => {
  const link={color: '#20B2AA'}
  const style={ color: '#20B2AA', margin: '5em 0em 0em', padding: '1em 0em', position: 'absolute', bottom: 0, width: '100%' }

  return(
    <Segment  vertical style={style}>
      <Container textAlign='center'>
        <Grid>
          <Grid.Column width={5}>
            <p as='h4' size='small' style={style} >
              Beer Diary 2019
            </p>
          </Grid.Column>
          <Grid.Column width={5}>
            <Image centered size='small' src='https://i.pinimg.com/originals/0a/54/23/0a5423767cc73d2bec52d93aa4317656.gif' />
          </Grid.Column>
          <Grid.Column width={5}>
            <p as='h4' size='small' style={style} >
              <a href='https://www.kileybobbitt.com' style={link} >www.kileybobbitt.com</a>
            </p>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  )
}

export default withRouter(Footer);
