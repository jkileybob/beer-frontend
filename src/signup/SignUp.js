import React from 'react'
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

class SignUp extends React.Component{

  state = {
    username: "",
    password: "",
    avatar: "",
    bio: "",
    location: ""
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };


  render(){
    return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.png' /> Sign-up for your account
      </Header>
      <Form size='large' onSubmit={()=>{this.props.createNewUser(this.state)}} >
        <Segment stacked>

          <Form.Input fluid
            icon='user'
            iconPosition='left'
            placeholder='username'
            name="username"
            onChange={this.handleChange}
           />

          <Form.Input
            fluid
            icon='lock'
            type='password'
            iconPosition='left'
            placeholder='Password'
            name="password"
            onChange={this.handleChange}
          />

          <Form.Input
            fluid
            placeholder="Image"
            name="avatar"
            onChange={this.handleChange}
          />

          <Form.Input
            fluid
            name="bio"
            placeholder="Short Bio"
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            name="Location"
            placeholder="location"
            onChange={this.handleChange}
          />

          <Button color='teal' fluid size='large'>
            Sign-Up
          </Button>
        </Segment>
      </Form>

    </Grid.Column>
  </Grid>
  )}
}

export default SignUp