import axios from 'axios'

const url = "https://covid19.mathdro.id/api"
export const fetchData = async (country) => {
    let changeAbleUrl = url
    if(country){
        if(country!=="global"){
            changeAbleUrl = `${url}/countries/${country}`   
        }
    }
    const {data:{confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeAbleUrl)

    return {confirmed, recovered, deaths, lastUpdate}
}

export const fetchDailyData = async () => {
    const {data} = await axios.get(`${url}/daily`)

    const fetchedData = data.map((dailyData) => ({
        confirmed:dailyData.confirmed.total,
        deaths:dailyData.deaths.total,
        date:dailyData.reportDate,
    }))

    return fetchedData
}

export const fetchCountries = async () => {
    const {data:{countries}} = await axios.get(`${url}/countries`)

    const fetchedCountries = countries.map(country => country)    
    return fetchedCountries
}