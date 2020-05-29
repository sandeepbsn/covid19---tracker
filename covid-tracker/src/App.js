import React from 'react';
import {Cards, Chart, CountryPicker} from './components'
import {fetchData} from './api/asynccalls'

import styles from './App.module.css'

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      data: {},
      country:"",
    }
  }

  async componentDidMount(){
    const fetchedData = await fetchData()
    
    this.setState({data:fetchedData})
  }

  handleChangeCountry = async(country) => {
    const countryData = await fetchData(country)

    this.setState({data:countryData, country:country})
  }
  
  render(){
    const {data, country} = this.state
    console.log(country)
    return (
      <div className={styles.container}>
        <img src="/covid.png" alt = "COVID" className = {styles.image}></img>
        <Cards data = {data}/>
        <CountryPicker handleOnChange = {this.handleChangeCountry}/>
        <Chart data = {data} country = {country} />
      </div>
    )
  }
}
export default App;
