import React from "react"
import {Bar, Line} from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";

export function Chart(props){
    
    const Bardata = {
        labels: ['Active', 'Recovered', 'Death'],
        datasets: [{
            label: props.country,
            data: [props.active, props.recovered, props.deaths],
            backgroundColor: [
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)'
            ]
        }]
    }
    const Linedata = {
        labels: Object.keys(props.dataLine.cases),
        datasets: [{
            data: Object.values(props.dataLine.cases).map(item=>item),
            label: 'Cases',
            borderColor: 'rgba(0,0,255,0.5)',
            fill: true
        },
        {
            data: Object.values(props.dataLine.deaths).map(item=>item),
            label: 'Deaths',
            borderColor: 'rgba(255,0,0,0.5)',
            backgroundColor: 'rgba(255,0,0,0.3)',
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
