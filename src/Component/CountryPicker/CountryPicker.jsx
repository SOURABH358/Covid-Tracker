import React, {useState, useEffect} from "react"
import { fetchCountries} from "../../api";
import "./CountryPicker.css"

const CountryPicker = (props) =>{

    let [Countries, SetCountries] = useState([])
    // const date = new Date().toLocaleDateString('en-CA')
    
    // fetch countries data for select and then adding World as the first element it will just work on first render
    useEffect(()=>{
        async function getCountries(){
            SetCountries(await fetchCountries())
            SetCountries(preValue=>{
                return [{'name':'World',code:'All'},...preValue]
            })
        }
        getCountries();
    },[])
    
    const options = Countries.map((item,index)=>{
        return <option key = {index}value = {item.name}>{item.name}</option>
    })


    return (
        <select name = "countries" id = "countries" className = {"select-country " + props.mode} onChange={(e)=>{props.handleCountryChange(e.target.value)}}>
            {options}
        </select>
        
    )
}

export default CountryPicker;

