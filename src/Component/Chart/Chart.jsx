import React, {useState, useEffect} from "react"
import { fetchData, fetchLast } from "../../api";
import {Bar, Line} from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";
import './Chart.css'

function Chart(props){
    // const [bar, SetBar] = useState({});
    console.log(props.CountryData)
    const [line, SetLine] = useState({});
    let preVcase = 0;
    let preVdeath = 0;
    useEffect(()=>{
        async function getData(){
            SetLine(await fetchLast(props.country))
        }
        getData()
    },[props.country])
    const Bardata = {
        labels: ['New','Recovered', 'Deaths'],
        datasets: [{
            label: props.country,
            data: [props.CountryData.todayCases, props.CountryData.todayRecovered, props.CountryData.todayDeaths],
            backgroundColor: [
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)'
            ]
        }]
    }
    const Linedata = line.cases?{
        labels: Object.keys(line.cases),
        datasets: [{
            data: Object.values(line.cases).map((item,index)=>{
                if(index===0){
                    preVcase=item;
                    return 0;
                }
                let temp = preVcase;
                preVcase = item;
                return item-temp;
            }),
            label: 'Cases',
            backgroundColor: 'rgb(0, 150, 255,0.2)',
            borderColor: 'rgba(0,0,255,0.5)',
            fill: true
        },
        {
            data: Object.values(line.deaths).map((item,index)=>{
                if(index===0){
                    preVdeath=item;
                    return 0;
                }
                let temp = preVdeath;
                preVdeath = item;
                return item-temp;
            }),
            label: 'Deaths',
            borderColor: 'rgba(255,0,0,0.5)',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true
        }]
    }:null
    return (
        line.cases?
            <div className="chart-container">
            <Line className="line-chart"
            data = {Linedata}
            />
            <Bar
            data = {Bardata}
            />
        </div>:
        <p>Loading...</p>
    )
}

export default Chart;