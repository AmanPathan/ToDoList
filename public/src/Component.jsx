import React, { useState } from 'react';
import "./CSS/style.css";

const Component = (props)=>{

    return (
        <>
        <div className='list_section'>
            <li>{props.text}</li>
            <div className='buttons'>
            <i className="fa-solid fa-pen" onClick={()=>{
                props.onPress(props.id);
            }}></i>            
            <i className="fa-solid fa-circle-check" aria-hidden="true" onClick={()=>{
                props.onChange(props.id);
            }}></i>
            <i className="fa-solid fa-circle-xmark" onClick={()=>{
                props.onSelect(props.id);
            }}></i>
            </div>
        </div>
        </>
    );
}

export default Component;