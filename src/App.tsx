import React, { useState, useEffect } from 'react';
import './App.css';
import { dataJson } from './data';
import RecursiveProperty from './components/RecursiveProperty';

export interface elementLvl {
    id: string;
    isOpen: boolean;
};

let arr: any =  [];

const  App = ()=> {
    const [expandState, setExpandState] = useState(false);
    const [allExpanded, setAllExpanded] = useState(false);
    const [allCollapsed, setAllCollapsed] = useState(false);

    const CollapseAll = () => <button className="btn success" onClick={()=>setExpandState(false)}>Collapse all</button>;
    const ExpandAll = () => <button  className="btn danger" onClick={()=>setExpandState(true)}>Expand all</button>;

    const onLvlChange = (element: elementLvl)=> {
        const index = arr.findIndex((item:elementLvl)=>element.id===item.id);
        index !== -1 ? arr.splice(index, 1, element) : arr.push(element);
        setAllExpanded(arr.every((item: elementLvl)=>item.isOpen));
        setAllCollapsed(arr.every((item: elementLvl)=>!item.isOpen));
        };

    const onLvlUnMount = (n: elementLvl) => arr = arr.filter((item: elementLvl)=> item.id !== n.id);

    useEffect(() => {
        if(allCollapsed) setExpandState(false)
        if(allExpanded) setExpandState(true)
    }, [allCollapsed, allExpanded]);


    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Casumo Javascript Challenge</h1>
        </header>
        <div className="App-intro">
            <div className="btn-wrapper">
                { allExpanded && <CollapseAll/> }
                { allCollapsed && <ExpandAll/> }
            </div>
          <RecursiveProperty onLvlUnMount={onLvlUnMount}  onLvlChange={onLvlChange}  property={dataJson} propertyName="Root Property" excludeBottomBorder={false} rootProperty={expandState} expandAll={expandState}/>
        </div>
      </div>
    );
  }


export default App;
