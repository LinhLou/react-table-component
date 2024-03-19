import React from 'react';

const sortData = (fa, fb, des)=>{
  if(fa==''){
    return 1
  }else if(fb==''){
    return -1
  }
  
  if(des){
    if (fa > fb) {
        return -1;
    }
    if (fa < fb) {
        return 1;
    }
  }else{
    if (fa > fb) {
      return 1;
    }
    if (fa < fb) {
        return -1;
    }
  }
  return 0;
}
const sortColumn = (data1, data2, type, des=true)=>{
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
      return sortData(fa,fb,des);
    case 'number':
      return sortData(data1,data2,des);
    default:
      return 0 // non sort data
  }
}



export default function Cell_title({style, name, type, sortable, updateDataTbl, data }) {

  const employees = data.rows;
  const filterdColumn = data.columns.filter(ele=>ele.name===name);
  const value = filterdColumn[0].value;

  // console.log(employees);
  const dataSortedByEmptyFile = employees.sort((row1,row2)=>sortData(row1[value], row2[value], true))
  console.log(dataSortedByEmptyFile);

  const sortEmployees = (employees, des=true)=>{
    const sortedData = employees.sort((row1, row2)=>sortColumn(row1[value],row2[value],type,des));
    return sortedData
  }

  const handleClickUp=()=>{
    const ascData = sortEmployees(dataSortedByEmptyFile,false);
    const newData = {columns:data.columns,rows:ascData};
    updateDataTbl(newData);
  }


  const handleClickDown=()=>{
    const desData = sortEmployees(dataSortedByEmptyFile,true);
    const newData = {columns:data.columns,rows:desData};
    updateDataTbl(newData);
  }

  return (
    <div className={style.container}>
      <div className={style.name}>{name}</div>
      {sortable && 
      <div className={style.icon.container} role='sortTbl'>
      {/* <div role='sortUp' onClick = {handleClickUp}> */}
        <svg  role='sortUp' onClick = {handleClickUp} viewBox="0 0 320 512"  height={style.icon.size} width={style.icon.size} fill={style.icon.color}><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
      {/* </div> */}
      {/* <div role='sortDown' onClick = {handleClickDown}> */}
        <svg  role='sortDown' onClick = {handleClickDown} viewBox="0 0 320 512"  height={style.icon.size} width={style.icon.size} fill={style.icon.color}><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
      {/* </div> */}
      </div> 
      }
    </div>
  )
}
