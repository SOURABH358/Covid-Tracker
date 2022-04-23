import React, {useState, useEffect} from "react"
import { fetchCountries, fetchData, fetchLast } from "../../api";
import "./CountryPicker.css"
import { Chart } from "./Chart";

const CountryPicker = (props) =>{

    let [Countries, SetCountries] = useState([])
    let [state, SetState] = useState({})
    let [line, SetLine] = useState({})
    const date = new Date().toLocaleDateString('en-CA')
    
    // fetch countries data for select and then adding World as the first element it will just work on first render
    
    useEffect(()=>{
        async function getCountries(){
            SetCountries(await fetchCountries())
            SetCountries(preValue =>{
                return [
                    'World',
                    ...preValue
                ]
            })
        }
        getCountries();
    },[])

    // this is to fetch data for a particular country till today for barchart

    useEffect(()=>{
        async function getDailyData(){
            SetState(await fetchData(props.country,date))
            SetLine(await fetchLast(props.country))
        }
        getDailyData()
    },[props.country])

    
    const options = Countries.map(item=>{
        return <option value = {item}>{item[0].toUpperCase()+item.slice(1)}</option>
    })


    return (
        <div>
        <select name = "countries" id = "countries" className = {"select-country " + props.mode} onChange={(e)=>{props.handleCountryChange(e.target.value)}}>
            {options}
        </select>
        {state.cases&&line.cases?<Chart
        country = {props.country} 
        active = {state.cases.active}
        recovered = {state.cases.recovered}
        deaths = {state.deaths.total}
        dataLine = {line}/>
        :
        <p>Loading...</p>}
        </div>
    )
}

export default CountryPicker;

