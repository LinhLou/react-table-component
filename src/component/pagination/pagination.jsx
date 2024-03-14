import React, { useRef, useState } from 'react';

export default function Pagination({style, data, updateIndexTbl, indexTbl, nbrRows, updateNbrRows,updateDataTbl, paginationConfig}) {
  const nbrTabls = Math.ceil(data.rows.length/nbrRows);
  const [selectState, setSelectState] = useState('selectHidden');
  const nbrEmployees = data.rows.length;
  const nbrOptions = new Array(Math.ceil(data.rows.length/paginationConfig)).fill(1);
  const optionsRefName = nbrOptions.map((ele,index)=>`option${index}Ref`);
  const optionRef = useRef(optionsRefName);
  let firstCurrentEmployee;
  let lastCurrentEmployee;

  if(nbrEmployees==0){
    firstCurrentEmployee =  0;
    lastCurrentEmployee = 0;
  }else if(nbrEmployees<=paginationConfig){
    firstCurrentEmployee =  1;
    lastCurrentEmployee = nbrEmployees;
  }else{
    firstCurrentEmployee =  indexTbl*nbrRows+1;
    if(firstCurrentEmployee+nbrRows-1>=nbrEmployees){
      lastCurrentEmployee = nbrEmployees;
    }else{
      lastCurrentEmployee = firstCurrentEmployee+nbrRows-1;
    }
  }

  const size = '1.3rem';
  const color = 'black';

  const setIndexTabl = (index,flag)=>{
    switch(flag){
      case 'next':
        if(index==nbrTabls-1){
          return index
        }
        return index+1;
      case 'previous':
        if(index==0){
          return index
        }
        return index-1;
      case 'last':
        return (nbrTabls-1);
      case 'first':
        return 0
    }
  }

  const setDataTbl = (nbrRows, indexTbl)=>{
    const newDataTable = {columns:data.columns,rows:data.rows.slice(nbrRows*indexTbl,nbrRows*(indexTbl+1))};
    updateDataTbl(newDataTable);
  }

  const togleTable = (flag)=>{
    if(data.rows.length!==0){
      const newIndex = setIndexTabl(indexTbl,flag);
      updateIndexTbl(newIndex);
      setDataTbl(nbrRows, newIndex);
    }
  }

  const handleNextClick = ()=>{
    togleTable('next');
    
  }

  const handlePreviousClick = ()=>{
    togleTable('previous');
  }

  const handleLastClick = ()=>{
    togleTable('last');
  }

  const handleFistClick = ()=>{
    togleTable('first');
  }

  const handleOptionClick = (e)=>{
    const nbr = parseInt(e.target.textContent);
    updateNbrRows(nbr);
    updateIndexTbl(0);
    setDataTbl(nbr, 0);
    setSelectState('selectHidden');
  }

  const handleSelectToggle = ()=>{
    if(selectState==='selectHidden'){
      setSelectState('selectVisib');
    }else{
      setSelectState('selectHidden');
    }
  }

  return (
    <div className={style.container}>
        <span> Rows per page:</span>
        <div className={style.select.container}>
          <div className={style.select.title}> 
            <div> {data.rows.length<=nbrRows?data.rows.length : nbrRows}</div>
            <svg viewBox="0 0 320 512" onClick = {handleSelectToggle} height={style.select.icon.size} width={style.select.icon.size} fill={style.select.icon.color}><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
          </div>
          <div className={style.select.options} id={selectState}>
            <ul>
              {
                nbrOptions.map((ele,index)=>{
                  return(
                    <li key={`option_${index}`} ref={optionRef[index]} onClick={(e)=>handleOptionClick(e)}>
                      {(index+1)*paginationConfig}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className={style.currentPage}>{firstCurrentEmployee}-{lastCurrentEmployee} of {nbrEmployees}</div>
        <div className={style.arrows.container}>
          <svg viewBox="0 0 512 512" onClick = {handleFistClick} height={style.arrows.icon.size} width={style.arrows.icon.size} fill={style.arrows.icon.color}><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>
          <svg viewBox="0 0 320 512" onClick = {handlePreviousClick} height={style.arrows.icon.size} width={style.arrows.icon.size} fill={style.arrows.icon.color}><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>

          <svg viewBox="0 0 320 512" onClick = {handleNextClick} height={style.arrows.icon.size} width={style.arrows.icon.size} fill={style.arrows.icon.color}><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>

          <svg viewBox="0 0 512 512" onClick = {handleLastClick} height={style.arrows.icon.size} width={style.arrows.icon.size} fill={style.arrows.icon.color}><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
        </div>
    </div>
  )
}
