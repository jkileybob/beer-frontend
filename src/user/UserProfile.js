
import React from "react";
import { Card, Image } from "semantic-ui-react";

const UserProfile = ({ user }) => (
  <Card>
    <Image src={user.avatar} />
    <Card.Content>
      <Card.Header>{user.username}</Card.Header>

      <Card.Description>{user.bio}</Card.Description>
      <Card.Description>{user.location}</Card.Description>
    </Card.Content>
  </Card>
);

export default UserProfile;
