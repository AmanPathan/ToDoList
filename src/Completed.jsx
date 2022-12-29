import React from "react";

const Completed = (props) => {
    
  return (
    <>
      <div className='list_section'>
            <li>{props.text}</li>
            <div className='buttons'>
            <i className="fa-solid fa-circle-xmark" onClick={()=>{
                props.onSelect(props.id);
            }}></i>
            </div>
        </div>
    </>
  );
};

export default Completed;
