beer cheers gif footer:
https://i.pinimg.com/originals/0a/54/23/0a5423767cc73d2bec52d93aa4317656.gif

bright tank sketch:
https://bellinghamsbestbeer.files.wordpress.com/2008/10/bright_tank.jpg

colorful cartoon cans:
teal-
https://www.google.com/imgres?imgurl=https%3A%2F%2Fbrewhall.com%2Fwp-content%2Fuploads%2F2019%2F04%2Four-beer-hazy-borders-beer-xl.png&imgrefurl=https%3A%2F%2Fbrewhall.com%2Fbrewery%2F&docid=RVjNtHO5E_HppM&tbnid=U1iOt3Cy9D9YYM%3A&vet=10ahUKEwjzp-WGnJzlAhWjmuAKHeiDBrEQMwivASheMF4..i&w=800&h=608&bih=720&biw=1280&q=bright%20tank%20cartoon%20beer&ved=0ahUKEwjzp-WGnJzlAhWjmuAKHeiDBrEQMwivASheMF4&iact=mrc&uact=8
grey-
https://www.google.com/imgres?imgurl=https%3A%2F%2Fbrewhall.com%2Fwp-content%2Fuploads%2F2019%2F04%2Four-beer-pixie-xl.png&imgrefurl=https%3A%2F%2Fbrewhall.com%2Fbrewery%2F&docid=RVjNtHO5E_HppM&tbnid=_HO-YpiH6GAz9M%3A&vet=10ahUKEwjzp-WGnJzlAhWjmuAKHeiDBrEQMwibAShKMEo..i&w=800&h=608&bih=720&biw=1280&q=bright%20tank%20cartoon%20beer&ved=0ahUKEwjzp-WGnJzlAhWjmuAKHeiDBrEQMwibAShKMEo&iact=mrc&uact=8

coloful beer gifs search query:
https://www.google.com/search?q=cheers+beer+gif&tbm=isch&tbs=rimg:CU5FwB_1CXzHfImB9g2MhMXLLDC_1hGROZondCmZZLYRNYLbskWvEN2fldEf_1vq33zoVKlvHOEWQ7pm2Mhl4puGgfUu5DCRDhlntakVJ61BWnDivRNDA5Dh48wR14N6whiVcMFOW4_1U79zufUqEgl9g2MhMXLLDBHpKAXAzXjE8CoSCS_1hGROZondCESjKCV8A1mQGKhIJmZZLYRNYLbsRSFuFIJdoOuIqEgkkWvEN2fldEREu2Jse87IyvioSCf_1vq33zoVKlETqSdZPttNlPKhIJvHOEWQ7pm2MRjxzK41y8PwYqEgkhl4puGgfUuxG6FpBJbUG8RyoSCZDCRDhlntakEYTErhe4x7OkKhIJVJ61BWnDivQRSwC7X139N-YqEglNDA5Dh48wRxGiF-aDVqEofSoSCV4N6whiVcMFEQmiTP8t0M5VKhIJOW4_1U79zufURwmqGbxj4TYA&tbo=u&sa=X&ved=2ahUKEwi78rDPhfzkAhVyZN8KHdF9BgoQuIIBegQIARAv&biw=1280&bih=720&dpr=1
promising results:
https://media1.giphy.com/media/X530jPOZXRMwo/source.gif
https://pro2-bar-s3-cdn-cf.myportfolio.com/f1d3f5920ee1922a991c2018bab68099/b18852d6c2ed9d8db7dde7cf_rw_1200.gif?h=f21bcc12ce77347d9cd8393d6fa93ea1
https://cdn.dribbble.com/users/948461/screenshots/2497876/beer-spin-gif-dribbb.gif

very cool, but don't quite fit the theme beer gif:
https://media.tenor.com/images/c32e4ba8012b4360f16937fff582c7b6/tenor.gif
https://media3.giphy.com/media/xT1R9XnFJkL1S2BFqo/giphy.gif
https://myrealdomain.com/images/animated-beer-5.gif





import React from "react";
import { Link } from 'react-router-dom';
import { Grid, Card, Image, Menu, Icon, Message, Divider } from "semantic-ui-react";

const border = { border: '5px solid #20B2AA'}
const style = {color: 'white'}

const UserProfile = ({ user, resetSearch, myBreweriesClick, onClickReset }) => (
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
            <Menu.Item onClick={onClickReset} >
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





<Route exact path='/profile' render={()=>{
  return this.state.currentUser ?
    <UserProfile
      user={this.state.currentUser}
      myBreweriesClick={this.myBreweriesClick}
      resetSearch={this.resetSearch}
      onClickReset={this.onClickReset}
    />
  : <Redirect to='/login' />
}} />
























<<<<<<< HEAD
import quote from '../images/quote.png'
<Image src={quote} alt="Ben Franklin Quote" />
<Message info>
  <Message.Header>Was this what you wanted?</Message.Header>
  <p>Did you know it's been a while?</p>
</Message>
=======
// window.location.replace('/add-beer') reloads window via JS
>>>>>>> 1b4ce4f013025245f827ab480f59d837cfba6f00



// conditional rendering for beer profile and beer edit pag in beer index
{if (this.state.currentBeer === null && this.state.renderEdit === false){
  <List animated verticalAlign='middle'>
    <List.Header as='h1'>My Beers:</List.Header>
      {this.state.beers.map((beer) => {
        return  <List.Item key={`beer-list-item-${beer.name}`}>
          <Modal trigger={<List.Header><h3>{beer.name}</h3></List.Header>} >
            <Modal.Header size='huge'>
              {beer.name}
            </Modal.Header>


            <Modal.Content>

              <Rating
                disabled
                defaultRating={beer.rating}
                maxRating={5}
                icon='star'
                size='massive'
              />

              <Modal.Description>
              <br/><p>Style:<br/>{beer.style}</p>
                  <p>Alcohol by Volume:<br/>{beer.abv}</p><br/>

              </Modal.Description>
              <Button
                color='teal'
                size='large'
                beer={beer}
                onClick={this.onBeerClick}>
                Show me more
                </Button>
            </Modal.Content>
          </Modal>

          </List.Item>
        }
      )}
      </List>
    } else if (this.state.currentBeer && this.state.renderEdit === false) {
        return  <BeerProfile
                  beer={this.state.currentBeer}
                  onClickReturn={this.onClickReturn}
                  editBeer={this.editBeer}
                />
    } else (this.state.currentBeer && this.state.renderEdit === true){
        return  <EditBeer
                  beer={this.state.currentBeer}
                />
    }
}
