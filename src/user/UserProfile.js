
import React from "react";
import { Link } from 'react-router-dom';
import { Grid, Card, Image, Menu, Icon, Message, Divider } from "semantic-ui-react";

const border = { border: '5px solid #20B2AA'}
const style = {color: 'white'}

const UserProfile = ({ user, resetSearch, myBreweriesClick }) => (
  <Grid centered columns={2} >
    <Grid.Row>
      <Grid.Column width={3} >
        <Image style={border} circular centered size='medium' src={'https://i.pinimg.com/originals/17/be/5c/17be5c644f35f2b4be5a8bf3dbd30424.gif'} alt="dripping beer" />

        <Message size='large' info color='teal' >
          <Message.Header>Welcome, {user.username}!</Message.Header>
          <p>Have you tried any new beers lately?</p>
        </Message>

        <Divider horizontal>explore!</Divider>

        <Menu fluid inverted pointing vertical color='teal' size='large' >

          <Link to='/search-breweries'>
            <Menu.Item onClick={resetSearch} >
              <Icon link name='search' />Search
            </Menu.Item>
          </Link>

          <Link to='/breweries'>
            <Menu.Item onClick={myBreweriesClick} >
              <Icon link name='beer' />Breweries
            </Menu.Item>
          </Link>

          <Link to='/beers'>
            <Menu.Item >
              <Icon link name='beer' />Beers
            </Menu.Item>
          </Link>
        </Menu>
      </Grid.Column>

      <Grid.Column width={4} >
        <Card centered size='huge' >
          <Image src={user.avatar} />
          <Card.Content textAlign='center' >
            <Card.Header>{user.username}</Card.Header>
            <Card.Description>{user.location}</Card.Description>
          </Card.Content>
          <Card.Content textAlign='center' >
            <Card.Description>{user.bio}</Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default UserProfile;
