import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Grid, Card, Header, Image, Divider, List, Button, Icon } from 'semantic-ui-react'
import AddBeer from '../beer/AddBeer'
import BreweryMap from '../brewery/BreweryMap'

const BreweryProfile = (props) => {
  const style={color: '#20B2AA'}
  const gotBeers = props.breweryBeers.length

  return(
    <>
      <Grid centered columns='equal' >

        <Grid.Row columns={1}>
            <Grid.Column>
              <Divider horizontal>{props.brewery.name}</Divider>
              <Card centered >
                <Card.Content>
                  <Card.Description textAlign='center' size='small' color='black' >Brewery Type:
                    <Card.Header textAlign='center' style={style} >
                      {props.brewery.brewery_type}
                    </Card.Header>
                  </Card.Description>
                </Card.Content>

                <Image centered size='small' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAwFBMVEXifD7////vyEr09PTiejv08/LkiVP09ffvxkDy5sXx3qb1+PrhdzXieTjy03npsZLhdC3vzGD++/TmnXfv167v1Z/35rPvyljwylLllWb78dXgcSfv1cf88uz66uHvyEv44dXjgUb11MPzzLjom3HwvqT889/srIrx0W/xxKztsZHqon3li1X77eXomm3yyLPz14L13ZfuwzD13Zj++/H89uT46b302Yzv05Pv16ny0nTlj1/z14H789vhbx7w39iQHSpoAAAP80lEQVR4nM2dCXfauBaAbRDGjeUgoDPAGBzMUhaHJJNOkvdgkvz/fzW2MUY2krXacE/PmbZDW33o6m66kgyzapn449nzZhs+HSwrCAzDCALLOjyF283zbOxPKv/3jQr/7t5utgxHAUIIQugCAIyTRD93o9+L/k8wCpezXa/CUVRF6M9XowCimMwok5gUwWC0evYrGkkVhP7myYiGzWArcEaYi00VlLoJJ7OV4YnA5TA9YzXTvTK1Ek7mCxdBGbqMEiJ3MdcKqY+wN18YyFWgO4mLjMVcn+3RRTgNkRa8EyQKp5pGpoVwsrQ8qA3vKNCzllq0VQOhv3KRytqjCUDuSoNxVSacLqDu6TsLhAtlRkXC6cHTt/pI4noHxQWpROj3vSrUMy/A6yvNowLhLqxQP3GBMNxdgbC3RfXwJYxoK+0gZQk3bn18CaO7qZVwbFXiH8oEIGtcH+Gqdr4j46omwlnNCnoW6M5qIJyENXgImgAvFI7kRAnHwbUm8CgwEF2NgoTbq6xAXADaVkjoW+jKfLEgSyjGESGcudXGoLziChkcAcLl1TX0JAAtqyBc3IKGngT1tRNOrOva0KJAi9dtcBJOg9tYgmdxA057w0c4VioRViMA8nlGLsLnr9sDjBC/5roIN961YSji8WRUHIRLVSOa7DNJFfpZwuM12IQdNUAAURB2Ntu+UUVNgAORSdhRU1EIOieb528riIm8jiqhooqiPu62diP9UQNzFhmEG0XAYlYeVoDIMDflhIpWlJDorKABNNschkUtJZx9Kf3T7ojwd1puEACktstYkK/SVKOMcKo4DEiKqyax+LPOQZ9pBbCs8F9COAkUActLY7sl1JWOgaAkDC8htBRtO2JuqWyAJvfh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' /><br/>

                <Card.Content textAlign='center'>
                  <Card.Description textAlign='center' color="black" size='small' href={props.brewery.website_url} >
                    <Icon link circular inverted color='teal' name='beer' />
                    Website
                  </Card.Description>
                </Card.Content>
                <Card.Content>
                  <Card.Description textAlign="center" style={style} >
                    <Icon circular inverted color='teal' name='phone' size='small' />
                    {props.brewery.phone}
                  </Card.Description>
                </Card.Content>
                <Card.Content textAlign='center' >
                    <Button onClick={props.onClickClose} color="teal">
                      Back To My Breweries
                    </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column>
              <Divider horizontal>{props.brewery.city}, {props.brewery.state}</Divider>
              <Image centered size='medium' src='https://bellinghamsbestbeer.files.wordpress.com/2008/10/bright_tank.jpg' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row column={1}>
            <Grid.Column>
              <Divider horizontal>{props.username}&#8217;s Logged Beers</Divider>

            { gotBeers >= 1 ?
                <Card centered >
                <Card.Content>
                  <List>
                    {props.breweryBeers.map(beer=>{
                      return  <List.Item
                                key={`logged-beer-list-item-${beer.id}`}
                                onClick={props.showBreweryBeer} >
                                  <List.Header centered style={style}>
                                    <Link to='/beers' style={style} >
                                      <h3 id={`${beer.id}`} >
                                        {beer.name}
                                      </h3>
                                    </Link>
                                  </List.Header>
                              </List.Item>

                    })}
                  </List>
                </Card.Content>

                <Card.Content textAlign='center'>
                  <Button
                    id={props.brewery.id}
                    brewery={props.brewery}
                    onClick={props.handleBeerLog}
                    color='teal'
                    size='large'
                    >
                    Log Another
                  </Button>
                </Card.Content>
              </Card>

            : <Card centered >
                <Card.Content>
                  <Card.Description>
                    It appears no beers have been logged from {props.brewery.name}.
                  </Card.Description>
                </Card.Content>

                <Card.Content textAlign='center'>
                  <Button
                    id={props.brewery.id}
                    brewery={props.brewery}
                    onClick={props.handleBeerLog}
                    color='teal'
                    size='large'
                    >
                    Wanna Add a New One?
                  </Button>
                </Card.Content>
              </Card>
            }
            </Grid.Column>
        </Grid.Row>

        <Grid.Row column={1}>
          <Grid.Column>
            <Divider horizontal>Address</Divider>
            <Card centered >
              <Card.Content textAlign='center' >
                <Card.Description size='small' style={style} >{props.brewery.street}</Card.Description>
                <Card.Description size='small' style={style} >{props.brewery.city}, {props.brewery.state}</Card.Description>
                <Card.Description size='small' style={style} >{props.brewery.country} {props.brewery.postal_code}</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row column={1}>
          <Grid.Column>
            <Divider horizontal>Location</Divider>
            <Card centered id="map-card" >
              <Card.Content>
                <Container className='Map-Container'>
                  <BreweryMap brewery={props.brewery} />
                </Container>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </>
)}

export default BreweryProfile

// HTML CODE FOR A SINGLE APOSTROPHE:
// &#8217;

// {
