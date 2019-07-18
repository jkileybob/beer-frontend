import React from "react"
import { Card, Image } from "semantic-ui-react";

const BeerProfile = (props) => {
  // console.log(props.beer)

  return (
    <React.Fragment>
      <Card>
        <h1>{props.beer.name}</h1>
        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5pWI5uO7RYDHvfNml_lhxw_HCl0GsR1-2g5543nul2b5LbakAg"/>
        <Card.Content>
          <Card.Header>{props.beer.style}</Card.Header>
          <Card.Description>
            {props.beer.abv} ABV
            <p>{props.beer.brewery.name}</p>
            <p>{props.beer.brewery.city}, {props.beer.brewery.state}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    </React.Fragment>
  )
}

export default BeerProfile
