import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class BreweryMap extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 38.914530,
        lng: -77.045600
      }
    };
  }

  render(){
    return(
      <React.Fragment>
        <Map
          google={this.props.google}
          zoom={18}
        />
      </React.Fragment>
    )
  }
}

export default GoogleApiWrapper(
  (props)=>({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
}))(BreweryMap)
