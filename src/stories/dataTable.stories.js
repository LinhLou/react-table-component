import { within, fireEvent, expect, fn } from '@storybook/test';
import DataTable from "../component/dataTable/dataTable";
import { data } from "../data";
import '../styles/tableStyles.css';

export default {
  component: DataTable,
  tags: ['autodocs']
};

export const Default = {
  args: {
    data: data,
    titleTbl: 'Title of the table',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const titleTblEle = canvas.getByRole('titleTbl');
    const titleColEles = canvas.getAllByRole('titleColumn');
    const employeeEles = canvas.getAllByRole('employeeInfosContainer');
    const sortTblEles = canvas.getAllByRole('sortTbl');

    await expect(titleTblEle.innerText).toBe('Title of the table');
    await expect(titleColEles.length).toBe(4);
    await expect(employeeEles.length).toBe(12);
  },
}

export const TableWithFilter = {
  args: {
    data: data,
    titleTbl: 'Title of the table',
    searchTbl: true,
    pagination: true,
    paginationConfig: {
      nbrRows: 5
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    //  interfaces
    const titleElement = canvas.getByRole('titleTbl');
    await expect(titleElement.innerText).toBe('Title of the table');

    // filter
    const filterEle = canvas.getByPlaceholderText('search');
    await fireEvent.change(filterEle, { target: { value: 'Hello' } });
    const resEle = canvas.queryByTestId('noEmployeeFound');
    await expect(resEle.innerText).toBe('No employee corresponds to the search criteria');


  },
}

export const StyleCustomized = {
  args: {
    data: data,
    titleTbl: 'Title of the table',
    searchTbl: true,
    pagination: true,
    paginationConfig: {
      nbrRows: 3
    },
    styleCustom: {
      table_section: 'table_section_ct',
      table_container: 'table_container_ct',
      table_header: 'table_header_ct',
      table_title: 'table_title_ct',
      table_filter: 'table_filter_ct',
      table_footer: 'table_footer_ct',
      table_contenu__table: 'table_ct',
      table_contenu__thead__tr: 'table_head_tr_ct',
      table_contenu__thead__th__icon__container: 'table_head_th_icon_ct',
      table_contenu__thead__th__icon__color: 'grey',
      table_contenu__thead__th__icon__size: '1.5rem',
      table_contenu__thead__th__container: 'table_head_th_ct',
      table_contenu__thead__th__name: 'table_head_th_name_ct',
      table_contenu__tbody__tr: 'table_body_tr_ct',
      table_contenu__tbody__td: 'table_body_td_ct',
      table_pagination__container: 'pagination_container_ct',
      table_pagination__select__icon__color: 'grey',
      table_pagination__select__icon__size: '1.5rem',
      table_pagination__select__container: 'pagination_select_container_ct',
      table_pagination__select__title: 'pagination_select_title_ct',
      table_pagination__select__options: 'pagination_select_option_ct',
      table_pagination__currentPage: 'pagination_currentPage_ct',
      table_pagination__arrows__container: 'pagination_arrows_container_ct',
      table_pagination__arrows__icon__color: 'grey',
      table_pagination__arrows__icon__size: '1.5rem'
    }

  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    //  interfaces
    const titleElement = canvas.getByRole('titleTbl');
    await expect(titleElement.innerText).toBe('Title of the table');

    // filter
    const filterEle = canvas.getByPlaceholderText('search');
    await fireEvent.change(filterEle, { target: { value: 'Hello' } });
    const resEle = canvas.queryByTestId('noEmployeeFound');
    await expect(resEle.innerText).toBe('No employee corresponds to the search criteria');

    
  },
}

