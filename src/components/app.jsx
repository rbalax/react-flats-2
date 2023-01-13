import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
import Flat from "./flat";
import Marker from "./marker";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      selectedFlat: null
    };
  }

  componentDidMount() {
    console.log("Rom wake up");
    fetch("https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json")
      .then(response => response.json())
      .then((data) => {
        this.setState({
          flats: data
        });
      });
  }

  selectFlat = (flat) => {
    this.setState({
      selectedFlat: flat
    });
  }

  render () {
    let center = {
      lat: 48.8566,
      lng: 2.3522
    };

    if (this.state.selectedFlat) {
      center = {
        lat:this.state.selectedFlat.lat,
        lng:this.state.selectedFlat.lng
      }
    }

    return (
      <div>
        <div className="flat-list">
          {this.state.flats.map((flat) => {
            return <Flat flat={flat} key={flat.name} selectFlat={this.selectFlat} />;
          })}
        </div>
        <div className="map-container">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBiVzxLyZCW5pQOnWemDlN6c_TVxZEYmeM" }}
              // defaultCenter={defaultProps.center}
              // defaultZoom={defaultProps.zoom}
            zoom={11}
            center={center}
            >
            {this.state.flats.map((flat) => {
              return <Marker
              key={flat.name}
              lat={flat.lat}
              lng={flat.lng}
              text={flat.price}
              selected= {flat === this.state.selectedFlat}
              />
              })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
