import React, {useState, useEffect} from "react"
import { fetchData, fetchLast } from "../../api";
import {Bar, Line} from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";

function Chart(props){
    const [bar, SetBar] = useState({});
    const [line, SetLine] = useState({});
    useEffect(()=>{

        async function getData(){
            SetBar(await fetchData(props.country))
            SetLine(await fetchLast(props.country))
        }
        getData()
    },[props.country])
    const Bardata = {
        labels: ['New','Active', 'Deaths'],
        datasets: [{
            label: props.country,
            data: [bar.new, bar.active, bar.deaths],
            backgroundColor: [
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)'
            ]
        }]
    }
    const Linedata = {
        labels: Object.keys(line.cases),
        datasets: [{
            data: Object.values(line.cases).map(item=>item),
            label: 'Cases',
            backgroundColor: 'rgb(0, 150, 255,0.2)',
            borderColor: 'rgba(0,0,255,0.5)',
            fill: true
        },
        {
            data: Object.values(line.deaths).map(item=>item),
            label: 'Deaths',
            borderColor: 'rgba(255,0,0,0.5)',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true
        }]
    }
    return (
        <div className="chart-container">
            <Line
            data = {Linedata}
            />
            <Bar
            data = {Bardata}
            />
        </div>)
}

export default Chart;