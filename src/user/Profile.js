import React from 'react'
// import { Redirect } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'

const Profile = ({ user }) => {
  // console.log(this.props)

  return(

      <Card>
        <Image src={user.avatar} />
        <Card.Content>
          <Card.Header>{user.username}</Card.Header>
          <Card.Description>{user.bio}</Card.Description>
        </Card.Content>
      </Card>
      
  )
}

export default Profile


// user?
//   <Card>
//     <Image src={user.avatar} />
//     <Card.Content>
//       <Card.Header>{user.username}</Card.Header>
//       <Card.Description>{user.bio}</Card.Description>
//     </Card.Content>
//   </Card> : <Redirect to='/login' />
