import { Add } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import Completed from "./Completed";
import Component from "./Component";
import "./CSS/style.css";

const getRemItems = () =>{
  let list = localStorage.getItem('data');
  if(list){
    return JSON.parse(localStorage.getItem('data'));
  }
  else{
    return [];
  }
}
const getCompItems = () =>{
  let list_comp = localStorage.getItem('data-comp');
  if(list_comp){
    return JSON.parse(localStorage.getItem('data-comp'));
  }
  else{
    return [];
  }
}

const Home = () => {
  const [Item, setItem] = useState("");
  const [NewItem, setNewItem] = useState(getRemItems());
  const [AddItem, addNewItem] = useState(getCompItems());
  const [editToggle, setEditToggle] = useState(true);
  const [editId, setEditId] = useState(null);

  const setValue = (event) => {
    const value = event.target.value;
    setItem(value);
  };

  const showItem = () => {
    if (!Item) {
      alert("Please fill data!");
    } else if (Item && !editToggle) {
      setNewItem(
        NewItem.map((elem, ind) => {
          if (ind === editId) {
            return Item;
          }
          return elem;
        })
      );
      setEditToggle(true);
      setItem("");
      setEditId(null);
    } else {
      setNewItem([...NewItem, Item]);
      setItem("");
    }
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(NewItem));
    localStorage.setItem('data-comp',JSON.stringify(AddItem));
  });

  const clearAll = ()=>{
    setNewItem([]);
    addNewItem([]);
  }

  const DeleteItem = (id) => {
    setNewItem((old) => {
      return old.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };
  const Delete = (id) => {
    setNewItem((oldItems) => {
      addNewItem((ind) => {
        return [...AddItem, oldItems[id]];
      });
      return oldItems.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };

  const DeleteIt = (id) => {
    addNewItem((ind) => {
      return ind.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };

  const editItem = (id) => {
    let EditItem = NewItem.find((elem, ind) => {
      if (ind === id) {
        return elem;
      }
    });
    setEditToggle(false);
    setItem(EditItem);
    setEditId(id);
  };

  const [toggleState, setToggleState] = useState(1);
  const setTab = (index) => {
    setToggleState(index);
    console.log(toggleState);
  };
  const twofunc = () => {
    showItem();
    setTab(1);
  };
  return (
    <>
    <div className="row justify-content-around p-3">
      <h3 style={{fontWeight:700}}>To-Do List</h3>
    </div>
      <div className="row justify-content-around mx-auto wrapper">
        <div className="container p-3 ">
          <div className="main">
            <input
              type="text"
              placeholder="Add A Task"
              value={Item}
              className="input"
              onChange={setValue}
              required
            />
            {editToggle ? (
              <i onClick={twofunc} className="btn fa-solid fa-circle-plus"></i>
            ) : (
              <i
                onClick={showItem}
                className="btn fa-solid fa-pen-to-square"
              ></i>
            )}
          </div>
          
          <div className="tabs">
            <button
              className={toggleState === 1 ? "tab_btn active" : "tab_btn"}
              onClick={() => setTab(1)}
            >
              Remaining
            </button>
            <button
              className={toggleState === 2 ? "tab_btn active" : "tab_btn"}
              onClick={() => setTab(2)}
            >
              Completed
            </button>
          </div>
          <div className="content">
            <div
              className={toggleState === 1 ? "tab list active_tab" : "tab list"}
            >
              <ol>
                {NewItem.map((val, index) => {
                  return (
                    <Component
                      key={index}
                      id={index}
                      text={val}
                      onPress={editItem}
                      onSelect={DeleteItem}
                      onChange={Delete}
                    />
                  );
                })}
              </ol>
            </div>
            <div
              className={toggleState === 2 ? "tab list active_tab" : "tab list"}
            >
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
      </div>
      <div className="footer">
        <button className="clear" onClick={clearAll}>Clear All</button>
      </div>
        
    </>
  );
};

export default Home;
