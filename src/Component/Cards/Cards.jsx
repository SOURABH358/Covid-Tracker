import React, {useState, useEffect} from "react"
import "./Cards.css"
import CountUp  from "react-countup";
import { fetchData } from "../../api";

const Cards = (props) =>{
    let [state, SetState] = useState({})
    const date = new Date().toLocaleDateString('en-CA')
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    useEffect(()=>{
        async function getData(){
            SetState(await fetchData(props.country)) 
        }
        getData()
    },[props.country])
    
    if(state.cases){
    }
    else {
        return 'Loading...'
    }
    return (
        <div className="card-container">
            <div className="card new">
                <h2 className = "card-title">Active</h2>
                <p className = "card-data">
                    <CountUp 
                    start = {0}
                    end = {state.active}
                    duration = {1.5}
                    separator = ","
                    />
                </p>
                <p className = "card-date">{new Date().toLocaleDateString('en-US',options)}</p>
                <p className = "info">Number of active cases covid-19</p>
            </div>
            <div className="card active">
                <h2 className = "card-title">Total Cases</h2>
                <p className = "card-data">
                    <CountUp 
                    start = {0}
                    end = {state.cases}
                    duration = {1.5}
                    separator = ","
                    />
                </p>
                <p className = "card-date">{new Date().toLocaleDateString('en-US', options)}</p>
                <p className = "info">Number of total cases covid-19</p>

            </div>
            <div className="card recovery">
                <h2 className = "card-title">recovered</h2>
                <p className = "card-data">
                    <CountUp 
                    start = {0}
                    end = {state.recovered}
                    duration = {1.5}
                    separator = ","
                    />
                </p>
                <p className = "card-date">{new Date().toLocaleDateString('en-US', options)}</p>
                <p className = "info">Number of recoveries from covid-19</p>

            </div>
            <div className="card death">
                <h2 className = "card-title">Deaths</h2>
                <p className = "card-data">
                    <CountUp 
                    start = {0}
                    end = {state.deaths}
                    duration = {1.5}
                    separator = ","
                    />
                </p>
                <p className = "card-date">{new Date().toLocaleDateString('en-US', options)}</p>
                <p className = "info">Number of deaths from covid-19</p>

            </div>
        </div>
    )
}

export default Cards;