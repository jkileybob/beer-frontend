import React from 'react';
import { withRouter } from "react-router-dom";
import { Segment, Container, Image, Grid, Divider, Header } from 'semantic-ui-react';

const Footer = () => {
  const style={color: '#20B2AA'}

  return(
        <Grid centered verticalAlign='bottom' columns='equal' >
          <Divider horizontal ></Divider>
          <Grid.Row>
            <Grid.Column>
              <Header className="Footer-Text" style={style} >
                Beer Diary 2019
              </Header>
            </Grid.Column>

            <Grid.Column>
              <Image size='small' src='https://i.pinimg.com/originals/0a/54/23/0a5423767cc73d2bec52d93aa4317656.gif' />
            </Grid.Column>

            <Grid.Column>
              <Header className="Footer-Text" >
                <a style={style} href='https://www.kileybobbitt.com' >www.kileybobbitt.com</a>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
  )
}

export default withRouter(Footer);
