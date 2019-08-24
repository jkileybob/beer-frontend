import React from "react";
import { withRouter } from "react-router";
import { Button, Form, Segment, Message, Image, Header } from "semantic-ui-react";

class LoginForm extends React.Component {

  state = {
    username: "",
    password: ""
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Segment>
        <Form
          onSubmit={()=>{this.props.onLogIn(this.state.username, this.state.password)}}
          size="mini"
          key="mini"
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
          <Message
            error
            header={this.props.failedLogin ? this.props.error : null}
          />
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBrQMPMFvLBeZHaTp8BbzFQ9TPHPOkNV5G-lzQcOeedYoQsqNs' />
            Login
          </Header>
          <Form.Group widths="equal">

            <Form.Input
              label="username"
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
            />
            <Form.Input
              type="password"
              label="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button type="submit" color='teal'>Login</Button>
        </Form>
      </Segment>
    );
  }
}

export default withRouter(LoginForm);
