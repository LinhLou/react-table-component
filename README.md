# React Data Table Component

react-data-table-ll is a simple and flexible React table component for displaying data.

## Key Features

- Declarative configuration
- Built-in and configurable:
  - Sorting
  - Filtering 
  - Pagination
- Style Customizable

## Installation
```bash
  npm install --save react-data-table-ll
```

## Usage
### import
```bash
 import { DataTable } from 'react-data-table-ll'
```
### simple use
```jsx
 const data = {
  columns: [
    {
      name:'Name',
      value:'name',
      type:'string',
      sortable:true
    },
    {
      name:'Age',
      value: 'age',
      type:'number',
      sortable:false
    }
  ],
  rows: [
    {
      name: 'Linh Dang',
      age: 36,
      birthday:'25/05/1987',
      city: 'Saint-Nazaire'
    },
    { 
      name: 'Liam Dan',
      age: 1,
      birthday:'10/04/2022',
      city:'Saint-Nazaire'
    },
    {
      name: 'Bui Huu Kien',
      age: 35,
      birthday:'10/10/1987',
      city:'Saint-Nazaire'
    }
  ]
}

<DataTable data = {data} titleTbl = {'your title'}/>
```
### Filtering and Pagination

```jsx
paginationConfig = {
  nbrRows:6 
}

<DataTable data = {data} searchTbl pagination  paginationConfig={paginationConfig}/>
```

### Style Customizable

#### in css file
```
.table_title_ct{
  color: red;
}
.table_filter_ct{
  background: red;
}
```
#### in jsx file
```jsx
styleCustom = {
      table_title: 'table_title_ct',
      table_filter: 'table_filter_ct'
}
<DataTable data = {data} titleTbl = {'your title'} searchTbl pagination  paginationConfig styleCustom={styleCustom}/>
```
#### style options


| prop                                       | type      | value              | Description                                                    |
| :----------------------------------------- |:---------:| :-----------------:|:---------------------------------------------------------------|
| table_section                              | string    |  style class name  | Section that contains the DataTable component                  |
| table_container                            | string    |  style class name  | The `<div>` element contains the content of the DataTable      |
| table_header                               | string    |  style class name  | Header contains the title and filter of the table              |
| table_title                                | string    |  style class name  | The title of the table                                         |
| table_filter                               | string    |  style class name  | The filter of the table                                        |
| table_footer                               | string    |  style class name  | Footer contains the pagination section                         |
| table_contenu__table                       | string    |  style class name  | The element `<table>` contain data of the table                |
| table_contenu__thead__tr                   | string    |  style class name  | The element `<tr>` inside element `<thead>` of the table       |
| table_contenu__thead__th__icon__container  | string    |  style class name  | The icon container for sorting                                 |
| table_contenu__thead__th__icon__color      | string    |  name of color     | The icon color for sorting (Ex.: 'red')                        |
| table_contenu__thead__th__icon__size       | string    |  size of icon      | The icon size for sorting (Ex.: '1.5rem')                      |
| table_contenu__thead__th__container        | string    |  style class name  | The container for the header cell of each column               |
| table_contenu__thead__th__name             | string    |  style class name  | The title in the header cell of each column                    |
| table_contenu__tbody__tr                   | string    |  style class name  | The element `<tr>` in the element `<tbody>` of the table       |
| table_contenu__tbody__td                   | string    |  style class name  | The element `<td>` in the element `<tbody>` of the table       |
| table_pagination__container                | string    |  style class name  | The container contains the content of the pagination section   |
| table_pagination__select__icon__color      | string    |  name of color     | The icon color in the select menu (Ex.: 'red')                 |
| table_pagination__select__icon__size       | string    |  size of icon      | The icon size in the select menu (Ex.: '1.5rem')               |
| table_pagination__select__container        | string    |  style class name  | The container contains the select menu                         |
| table_pagination__select__title            | string    |  style class name  | The title of the seclect menu                                  |
| table_pagination__select__options          | string    |  style class name  | The option of menu                                             |
| table_pagination__currentPage              | string    |  style class name  | The description of the actual data displayed                   |
| table_pagination__arrows__container        | string    |  style class name  | The conatiner contains the arrows                              |
| table_pagination__arrows__icon__color      | string    |  name of color     | The double arrow color in the pagination section (Ex.: 'red')  |
| table_pagination__arrows__icon__size       | string    |  size of icon      | The double arrow size in the pagination section (Ex.: '1.5rem')|


## License

