import React, { Component } from 'react';

import styles from './styles.model.css';

export class CreateCard extends Component {

  render() {
    const weatherImage = this.props.weatherImage;
    return (
      <div className="Card">
        <div className="Temperature">{this.props.temp.toFixed(1)} °C</div>
        <img src={require('../../img/' + weatherImage + '.svg').default} alt="weather picture" />
        <div className="WeekDay">{this.props.weekDay}</div>
        <div>
          <div>Wind speed: <span className="windSpeed">{this.props.windSpeed}</span> km/h</div>
          <div className="Wind">Wind direction:
   
            <div style={{ fontSize: '70px', transform: 'rotate(' + this.props.windDeg + 'deg)'}}>&#11161;</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCard
