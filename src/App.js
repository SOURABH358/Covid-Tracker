import React, {useEffect, useState} from "react"
import {Cards, CountryPicker, Chart, Map} from "./Component"
import Header from "./Component/Header/Header"
import "leaflet/dist/leaflet.css"
import "./App.css"
import { fetchCountries, fetchData } from "./api"
import axios from "axios"

export default function App(){
    let [Curr, SetCurr] = useState('World');
    let [toggle, SetToggle] = useState('light');
    let [CountryData, SetCountryData] = useState({})
    let [ShowMap, SetShowMap] = useState([34.80746, -40.4796])
    let [Countries, SetCountries] = useState({});
    function handleCountryChange(country){
        SetCurr(country)
        async function getData(){
            country = country.toLowerCase()
            const url = country === 'world'?
            'https://disease.sh/v3/covid-19/all':
            'https://disease.sh/v3/covid-19/countries/'+country;
            await fetch(url).then(response=>response.json()).then((data)=>{
                SetCountryData(data)
                SetShowMap([data.countryInfo.lat,data.countryInfo.long])
            })
        }
        getData()
    }

    function handleToggle(){
        SetToggle(preValue=>{return preValue==='light'?'dark':'light'});
        
    }
    console.log(Countries)
    useEffect(()=>{
        async function getData(){
            SetCountryData(await fetchData(Curr))
            SetCountries(await fetch('https://disease.sh/v3/covid-19/countries').then(response=>response.json()).then((data)=>data))
        }
        getData()
    }, [])
    return (
        <div className={'App '+ toggle}>
            <Header 
            mode = {toggle}
            handleToggle = {handleToggle}/>
            <Cards 
            country = {Curr}
            CountryData = {CountryData}
            />
            <CountryPicker 
            handleCountryChange = {handleCountryChange}
            country = {Curr}
            mode = {toggle}
            />
            <Map 
            center = {ShowMap}
            countries = {Countries}
            />
            <Chart
            country = {Curr}
            CountryData = {CountryData}/>
            
        </div>
    )
}