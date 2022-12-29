import React, { useState } from "react";
import Completed from "./Completed";
import Component from "./Component";
import "./CSS/style.css";

const App = () => {
  const [Item, setItem] = useState("");
  const [NewItem, setNewItem] = useState([]);
  const [AddItem, addNewItem] = useState([]);

  const setValue = (event) => {
    const value = event.target.value;
    setItem(value);
  };
  const showItem = () => {
    setNewItem((oldItems) => {
      return [...oldItems, Item];
    });
    setItem("");
  };
  const DeleteItem = (id)=>{
    setNewItem((old)=>{
        return old.filter((arrElem, index) => {
            return index !== id;
          });
    })
  }
  const Delete = (id) => {
    setNewItem((oldItems) => { 
        addNewItem((ind)=>{
            return [...ind,oldItems[id]];
        })       
      return oldItems.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };

  const DeleteIt = (id)=>{
    addNewItem((ind)=>{
        return ind.filter((arrElem, index) => {
            return index !== id;
          }); 
    })
  }

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1>To-Do List</h1>
          <br />
          <div className="main">
            <input
              type="text"
              placeholder="Add An Item"
              value={Item}
              className="input"
              onChange={setValue}
            />
            <i onClick={showItem} className="btn fa-solid fa-circle-plus"></i>
          </div>
          <div className="list">
            <ol>
              {NewItem.map((val, index) => {
                return (
                  <Component
                    key={index}
                    id={index}
                    text={val}
                    onSelect={DeleteItem}
                    onChange={Delete}
                  />
                );
              })}
            </ol>
          </div>
        </div>
        <div className="container">
        <h1>Completed List</h1>
          <br />
          <div className="list">
            <ol>
            {AddItem.map((val, index) => {
                return (
                  <Completed
                    key={index}
                    id={index}
                    text={val}
                    onSelect={DeleteIt}
                  />
                );
              })}
            </ol>
        </div>
        </div>
      </div>
    </>
  );
};

export default App;
