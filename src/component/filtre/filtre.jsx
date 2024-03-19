import React, { useRef } from 'react'

export default function FiltreBar({dataRef, style, updateFilterdData, updateDataTbl, nbrRows, updateIndexTbl}) {
  const searchRef = useRef();
  const rows = dataRef.rows;

  const filterData = (searchText)=>{
    
    const filteredRows = rows.filter(ele=>{
      const values = Object.values(ele);
      const filterValues = values.filter(ele=>{
        
        if(typeof(ele)!=='string'){
          const eleString = ele.toString();
          return eleString.includes(searchText.toLowerCase())
        }else{
          return ele.toLowerCase().includes(searchText.toLowerCase())
        }
      });
      if(filterValues.length!=0){
        return true
      }
      return false
    })
    return  filteredRows
  }

  const handleChange = ()=>{
    const searchText = searchRef.current.value;
    const filteredRows = filterData(searchText);
    const newData = {columns:dataRef.columns, rows:filteredRows};
    const newDataTbl = {columns:dataRef.columns,rows:filteredRows.slice(0,nbrRows)}
    updateFilterdData(newData);
    updateDataTbl(newDataTbl);
    updateIndexTbl(0);
  }

  return (
    <input ref={searchRef} placeholder='search' type='text' onChange={handleChange} className={style}/>
  )
}
