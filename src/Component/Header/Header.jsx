import React from "react"
import "../Header/Header.css"
export default function Header(props){
    return (

        <div className= 'header'>
            <h1 className='animate'>Covid Tracker</h1>
            <div className={'toggle ' + props.mode}>
                <div className='circle' onClick= {props.handleToggle}></div>
            </div>
        </div>
    )
}