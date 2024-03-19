import React from 'react';
import Cell_title from '../cellTitle/cell_title';



export default function Table({ data, style, updateDataTbl}) {

  return (
      <table className={style.table}>
          <thead>
            <tr className={style.thead.tr}>
            {
              data.columns.map((ele,index)=>{
                return(
                  <th key= {`title_${index}`} scope="col" role='titleColumn'>
                      <Cell_title style={style.thead.th} name={ele.name} type = {ele.type} sortable={ele.sortable}  data={data} updateDataTbl={updateDataTbl}/>
                  </th>
                )
              })
            }
            </tr>
          </thead>
          <tbody data-testid ='employeeList'>
            { data.rows.length!==0 ? 
              data.rows.map((ele,indexrow)=>{
                return(
                  <tr key={`row${indexrow}`} className={style.tbody.tr} role='employeeInfosContainer'>
                    {
                      Object.entries(ele).map((ele,indexItem)=>{
                        return(
                          <td key={`item${indexrow}${indexItem}`} scope="row" className={style.tbody.td} role='cellTbl'>
                            {ele[1]}
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
              : <tr  className={style.tbody.tr} ><td colSpan={data.columns.length} className={style.tbody.td} data-testid ='noEmployeeFound'>No employee corresponds to the search criteria</td></tr>
            }
          </tbody>
      </table>
  )
}
