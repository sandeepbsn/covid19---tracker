import React, {useState, useEffect} from 'react'
import {fetchDailyData} from '../../api/asynccalls'
import {Line, Bar} from 'react-chartjs-2'

import styles from './Chart.module.css'

const Chart = ({data:{confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState([])

    useEffect(()=>{
        const fetchedDailyData = async () => {
            setDailyData(await fetchDailyData())
        }

        fetchedDailyData()        
    },[])
    
    const lineChart = (
        dailyData.length?
        (<Line
        data = {{
            labels: dailyData.map((elem)=>elem.date),
            datasets:[{
                data:dailyData.map(({confirmed})=>confirmed),
                label: 'infected',
                borderColor:'#3333ff',
                fill: true,
            }, {
                data:dailyData.map(({deaths})=>deaths),
                label:'deaths',
                borderColor:'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill: true,
            }]
        }}
        options = {{
            title:{display:true, text:"Current state worldwide"},
            responsive:true
        }}/>):"Loading..."
    )

    const barChart = (
        confirmed?
        <Bar data = {{
            labels:['Infected', 'Recovered', 'Deaths'],
            datasets: [{
                label:"People",
                backgroundColor:['rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)'],
                data:[confirmed.value, recovered.value, deaths.value]
            }]
        }}
        options = {{
            legends:{display:false},
            title:{display:true, text: `Current state in ${country}`}
        }}/>
        :"Loading..."
    )
    
    return(
        <div className={styles.container}>
            {country && country!=='global'?barChart:lineChart}
        </div>
    )
}

export default Chart