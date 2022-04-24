import React, {useState} from "react"
import {Cards, CountryPicker, Chart} from "./Component"
import Header from "./Component/Header/Header"
import "./App.css"

export default function App(){
    let [Curr, SetCurr] = useState('World')
    let [toggle, SetToggle] = useState('light');

    function handleCountryChange(country){
        SetCurr(country)
    }
    function handleToggle(){
        SetToggle(preValue=>{return preValue==='light'?'dark':'light'});
        
    }
    return (
        <div className={'App '+ toggle}>
            <Header 
            mode = {toggle}
            handleToggle = {handleToggle}/>
            <Cards 
            country = {Curr}
            />
            <CountryPicker 
            handleCountryChange = {handleCountryChange}
            country = {Curr}
            mode = {toggle}
            />
            <Chart
            country = {Curr}/>
        </div>
    )
}