import React from "react"
import { Link } from "react-router-dom"
import { List, Card, Button, Header, Image, Modal } from "semantic-ui-react";

const BeerProfile = (props) => {
  console.log(props)

  return (
    <React.Fragment>
      <Card>
        <h1>{props.beer.name}</h1>
        <Image />
        <Card.Content>
          <Card.Header>{props.beer.style}</Card.Header>
          <Card.Description>
            {props.beer.brewery.name}
          </Card.Description>
        </Card.Content>
      </Card>
      <Button>
        <Link to='/beers'>back to beers.</Link>
      </Button>
    </React.Fragment>
  )
}

export default BeerProfile
