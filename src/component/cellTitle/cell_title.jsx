import React, { useState } from 'react';

const sortData = (fa, fb, des)=>{
  if(des){
    if (fa > fb) {
      return -1;
    }else if(fa < fb) {
      return 1;
    }
  }else{
    if (fa > fb) {
      return 1;
    }else if (fa < fb) {
      return -1;
    }
  }
  return 0;
}
const sortColumn = (data1, data2, type, des=true)=>{

  if(data1==='' && data2===''){
    return 0
  }else if(data1==''&& data2!==''){
    return 1
  }else if(data1!==''&& data2==''){
    return -1
  }else{
    let fa;
    let fb;
    const dateToNbr = (date)=>{
      const dateString = date.split('/');
      const dateFormat = `${dateString[2]}${dateString[1]}${dateString[0]}`;
      return parseInt(dateFormat)
    }
    switch(type){
      case 'string':
        fa = data1.toLowerCase();
        fb = data2.toLowerCase();
        return sortData(fa,fb,des);
      case 'date':
        fa = dateToNbr(data1);
        fb = dateToNbr(data2);
        if(data1==''){
          fa = 0;
        }
        if(data2==''){
          fb=0;
        }
        return sortData(fa,fb,des);
      case 'number':
        return sortData(data1,data2,des);
      default:
        return 0 // non sort data
    }

  }

}


export default function Cell_title({style, name, type, sortable, updateDataTbl, data, isActive, updateIndexActive, index}) {

  const [count, setCount] = useState(0);
  const [activeArrowUpColor, setActiveArrowUpColor] = useState(style.icon.color);
  const [activeArrowDownColor, setActiveArrowDownColor] = useState(style.icon.color);

  const employees = data.rows;
  const filterdColumn = data.columns.filter(ele=>ele.name===name);
  const value = filterdColumn[0].value;

  const sortEmployees = (employees, des=true)=>{
    const sortedData = employees.sort((row1, row2)=>sortColumn(row1[value],row2[value],type,des));
    return sortedData
  }

  
  const updateDataSortUp=()=>{
    const ascData = sortEmployees(employees,false);
    const newData = {columns:data.columns,rows:ascData};
    updateDataTbl(newData);
  }


  const updateDataSortDown=()=>{
    const desData = sortEmployees(employees,true);
    const newData = {columns:data.columns,rows:desData};
    updateDataTbl(newData);
  }

  const handleClick = ()=>{
    if(sortable){
      if(count%2===0){
        updateDataSortUp();
        setActiveArrowUpColor(style.icon.color_actived);
        setActiveArrowDownColor(style.icon.color);
      }else{
        updateDataSortDown();
        setActiveArrowDownColor(style.icon.color_actived);
        setActiveArrowUpColor(style.icon.color);
      }
      setCount(count + 1);
      updateIndexActive(index);
    }
    return
  }


  let arrowUpColor;
  let arrowDownColor;
  if(!isActive){
    arrowUpColor = style.icon.color;
    arrowDownColor = style.icon.color;
  }else{
    arrowUpColor = activeArrowUpColor;
    arrowDownColor = activeArrowDownColor;
  }

  return (
    <div className={style.container} onClick={handleClick}>
      <div className={style.name}>{name}</div>
      {sortable && 
      <div className={style.icon.container} role='sortTbl'>
        <svg  role='sortUp' viewBox="0 0 320 512"  height={style.icon.size} width={style.icon.size} fill={arrowUpColor}><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
        <svg  role='sortDown' viewBox="0 0 320 512"  height={style.icon.size} width={style.icon.size} fill={arrowDownColor}><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
      </div> 
      }
    </div>
  )
}
