import React, { Component } from 'react';
import './App.css';
import CreateCard from './components/CreateCard';
import FormSearch from './components/FormSearch'
import api from './api'

class App extends Component {

  state = {
    weekData: [],
    city: ''
  }

  getData = () => {
    api.getDailyWeatherByCityCountry({
      city: this.state.city,
      country: ''
    },
      (data) => this.setState({
        weekData: data
      }),
      (error) => console.error(error)
    )
  }

  getImage = (cloudIndex) => {
    if (cloudIndex <= 15) {
      return 'sun';
    } if (cloudIndex > 15 && cloudIndex <= 75) {
      return 'cloudy';
    } else {
      return 'cloud'
    }
  }

  handleInputData = (e) => {
    e.preventDefault();
    this.setState({ city: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value)
  
  }


  componentDidMount() {
    this.getData();
    
  }



  render() {
    return (
      <div className="App">
        <div className="Search-Container">
          <FormSearch inputData={this.handleInputData} submitData={this.handleSubmit}/>
        </div>
        <div className="Cards-container">
          {this.state.weekData.map(data =>
            <CreateCard
              key={data.sunrise}
              temp={data.temp}
              weekDay={data.weekDay}
              windSpeed={data.windSpeed}
              windDeg={data.windDeg}
              weatherImage={this.getImage(data.cloudPercentage)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
