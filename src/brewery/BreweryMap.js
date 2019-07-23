import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class BreweryMap extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      center: {}
    };
  }

  componentDidMount(){
    let latitude = this.props.brewery.latitude
    let longitude = this.props.brewery.longitude
    
    this.setState({
      center: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      }
    })
  }

  render(){
    // console.log(this.props);
    return(
      <React.Fragment>
          <Map
            google={this.props.google}
            zoom={18}
            center={this.state.center}
          />
      </React.Fragment>
    )
  }
}

export default GoogleApiWrapper(
  (props)=>({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
}))(BreweryMap)
