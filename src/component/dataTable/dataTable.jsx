import React, { useState } from 'react';
import Table from '../table/table';
import FiltreBar from '../filtre/filtre';
import Pagination from '../pagination/pagination';
import '../../styles/tableStyles.css';

// default style

const styleDefault = [
  {
    nameStyle: 'table_section',
    value: 'table_section_df'
  },
  {
    nameStyle: 'table_container',
    value: 'table_container_df'
  },
  {
    nameStyle: 'table_header',
    value: 'table_header_df'
  },
  {
    nameStyle: 'table_title',
    value: 'table_title_df'
  },
  {
    nameStyle: 'table_filter',
    value: 'table_filter_df'
  },
  {
    nameStyle: 'table_footer',
    value: 'table_footer_df'
  },
  {
    nameStyle: 'table_contenu',
    value: {
      table: 'table_df',
      thead: {
        tr: 'table_head_tr_df',
        th: {
          icon: {
            container: 'table_head_th_icon_df',
            color: 'grey',
            size: '1.5rem',
            color_actived: 'black'
          },
          container: 'table_head_th_df',
          name: 'table_head_th_name_df'
        },
      },
      tbody: {
        tr: 'table_body_tr_df',
        td: 'table_body_td_df'
      }
    }
  },
  {
    nameStyle: 'table_pagination',
    value: {
      container: 'pagination_container_df',
      select: {
        icon: {
          color: 'grey',
          size: '1.5rem'
        },
        container: 'pagination_select_container_df',
        title: 'pagination_select_title_df',
        options: 'pagination_select_option_df'
      },
      currentPage: 'pagination_currentPage_df',
      arrows: {
        container: 'pagination_arrows_container_df',
        icon: {
          color: 'grey',
          size: '1.5rem'
        }
      }

    }
  }
];

const setNestedValueObj = (value, keys, obj)=>{
  const nbrKey = keys.length;
  const getDefaultStyle = (styles)=>{
    return styles.split(' ')[0]
  } 
  switch(nbrKey){
    case 1:
      if(keys.includes('color')||keys.includes('size')){
        obj[keys[0]] = value;
      }else{
        obj[keys[0]] = `${getDefaultStyle(obj[keys[0]])} ${value}`;
      }
      break;
    case 2:
      if(keys.includes('color')||keys.includes('size')){
        obj[keys[0]][keys[1]] = value;
      }else{
        obj[keys[0]][keys[1]] = `${getDefaultStyle(obj[keys[0]][keys[1]])} ${value}`;
      }
      
      break;
    case 3:
      if(keys.includes('color')||keys.includes('size')){
        obj[keys[0]][keys[1]][keys[2]] = value;
      }else{
        obj[keys[0]][keys[1]][keys[2]] = `${getDefaultStyle(obj[keys[0]][keys[1]][keys[2]])} ${value}`;
      }
      break;
    case 4:
      if(keys.includes('color')||keys.includes('size')){
        obj[keys[0]][keys[1]][keys[2]][keys[3]] = value;
      }else{
        obj[keys[0]][keys[1]][keys[2]][keys[3]] = `${getDefaultStyle(obj[keys[0]][keys[1]][keys[2]][keys[3]])} ${value}`;
      }
      
      break;
    case 5:
      if(keys.includes('color')||keys.includes('size')){
        obj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = value;
      }else{
        obj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = `${getDefaultStyle(obj[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]])} ${value}`;
      }
      break;
  }
}


export function DataTable({ titleTbl, data, searchTbl, pagination, paginationConfig, styleCustom }) {

  let style = styleDefault.reduce((acc, ele) => {
    const key = ele.nameStyle;
    const value = ele.value;
    acc[key] = value;
    return acc;
  }, {});

  if (styleCustom) {
    Object.entries(styleCustom).map(([prop, value]) => {
      if (prop.includes('__')) {   
        const keys = prop.split('__');
        setNestedValueObj(value, keys, style);
      } else {
        const styleClass =  style[prop].split(' ')[0];
        style[prop] = `${styleClass} ${value}`;
      }
    });
  }
  // default affichage when there is no pagination option
  let nbrRows_df;

  // default paginationConfig
  if (!paginationConfig) {
    nbrRows_df = 5;
  } else {
    nbrRows_df = paginationConfig.nbrRows;
  }
  if (!pagination) {
    nbrRows_df = data.rows.length;
  }

  const [filteredData, setFilteredData] = useState(data);
  const [nbrRows, setNbrRows] = useState(nbrRows_df);
  const [indexTbl, setIndexTabl] = useState(0);
  const [dataTbl, setDataTabl] = useState({ columns: filteredData.columns, rows: filteredData.rows.slice(nbrRows * indexTbl, nbrRows * (indexTbl + 1)) });

  const updateDataTbl = (value) => {
    setDataTabl(value);
  };

  const updateFilterdData = (value) => {
    setFilteredData(value);
  };

  const updateIndexTbl = (value) => {
    setIndexTabl(value);
  };

  const updateNbrRows = (nbr) => {
    setNbrRows(nbr);
  };

  return (
    <div className={style.table_section} data-testid='tableSection'>
      <div className={style.table_container} data-testid='tableContainer'>
        <div className={style.table_header}>
          <span className={style.table_title} role='titleTbl'>{titleTbl}</span>
          {searchTbl && <FiltreBar style={style.table_filter} dataRef={data} updateFilterdData={updateFilterdData} nbrRows={nbrRows} updateDataTbl={updateDataTbl} updateIndexTbl={updateIndexTbl} />}
        </div>
        <Table style={style.table_contenu} data={dataTbl} updateDataTbl={updateDataTbl} />
        <div className={style.table_footer}>
          {pagination && <Pagination style={style.table_pagination} data={filteredData} updateIndexTbl={updateIndexTbl} indexTbl={indexTbl} nbrRows={nbrRows} updateNbrRows={updateNbrRows} paginationConfig={nbrRows_df} updateDataTbl={updateDataTbl} />}
        </div>
      </div>
    </div>
  );
}
