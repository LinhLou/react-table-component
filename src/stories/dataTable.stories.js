import { within, fireEvent, expect } from '@storybook/test';
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
    const sortUpAgeEle = canvas.getAllByRole('sortUp')[1];
    const sortDownAgeEle = canvas.getAllByRole('sortDown')[1];
    const cellTblEles = canvas.getAllByRole('cellTbl');

    await expect(titleTblEle.innerText).toBe('Title of the table');
    await expect(titleColEles.length).toBe(4);
    await expect(employeeEles.length).toBe(12);
    await expect(sortTblEles.length).toBe(3);
    await fireEvent.click(sortUpAgeEle);
    await expect(cellTblEles[0].innerText).toBe('Liam Dan');
    await expect(cellTblEles[44].innerText).toBe('Nguyen Thi Tac');
    await fireEvent.click(sortDownAgeEle);
    await expect(cellTblEles[0].innerText).toBe('Nguyen Thi Tac');
    await expect(cellTblEles[44].innerText).toBe('Liam Dan');
  },
};

export const TableWithFilter = {
  args: {
    data: data,
    titleTbl: 'Title of the table',
    searchTbl: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const filterEle = canvas.getByPlaceholderText('search');

    await fireEvent.change(filterEle, { target: { value: 'Hello' } });
    const resEle = canvas.queryByTestId('noEmployeeFound');
    await expect(resEle.innerText).toBe('No employee corresponds to the search criteria');

    await fireEvent.change(filterEle, { target: { value: 'Saint-Nazaire' } });
    const employeeEles = canvas.getAllByRole('employeeInfosContainer');
    const cellTblEles = canvas.getAllByRole('cellTbl');
    await expect(employeeEles.length).toBe(3);
    await expect(cellTblEles[0].innerText).toBe('Linh Dang');
    await expect(cellTblEles[4].innerText).toBe('Liam Dan');
    await expect(cellTblEles[8].innerText).toBe('Bui Huu Kien');
  },
};

export const TableWithPagination = {
  args: {
    data: data,
    titleTbl: 'Title of the table',
    pagination: true,
    paginationConfig: {
      nbrRows: 3
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const employeeEles = canvas.getAllByRole('employeeInfosContainer');
    const cellTblEles = canvas.getAllByRole('cellTbl');
    const goFirstEle = canvas.getByRole('goFirst');
    const goLastEle = canvas.getByRole('goLast');
    const goPrevioustEle = canvas.getByRole('goPrevious');
    const goNextEle = canvas.getByRole('goNext');
    const arrowDown = canvas.getByRole('arrowDown');

    await expect(employeeEles.length).toBe(3);
    await fireEvent.click(goNextEle);
    await expect(cellTblEles[0].innerText).toBe('Dang Van Cao');
    await expect(cellTblEles[4].innerText).toBe('Nguyen Thi Tac');
    await expect(cellTblEles[8].innerText).toBe('Dang Thi Thuy Duong');
    await fireEvent.click(goLastEle);
    await expect(cellTblEles[0].innerText).toBe('Le Minh Tien');
    await expect(cellTblEles[4].innerText).toBe('Ngo Hong Quan');
    await expect(cellTblEles[8].innerText).toBe('Tran Que Anh');
    await fireEvent.click(goPrevioustEle);
    await expect(cellTblEles[0].innerText).toBe('Dang Thi Nhat Linh');
    await expect(cellTblEles[4].innerText).toBe('Dang Thi Lan Huong');
    await expect(cellTblEles[8].innerText).toBe('Dang Van Dat');
    await fireEvent.click(goFirstEle);
    await expect(cellTblEles[0].innerText).toBe('Linh Dang');
    await expect(cellTblEles[4].innerText).toBe('Liam Dan');
    await expect(cellTblEles[8].innerText).toBe('Bui Huu Kien');
    await fireEvent.click(arrowDown);
    const liEles = canvas.queryAllByRole('nbrPage');
    await expect(...liEles).toBeInTheDocument();
    await fireEvent.click(liEles[1]);
    await expect(canvas.queryAllByRole('nbrPage')).toHaveLength(0);
    await expect(canvas.getAllByRole('employeeInfosContainer')).toHaveLength(6);
  },
};

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
      // table_header: 'table_header_ct',
      // table_title: 'table_title_ct',
      // table_filter: 'table_filter_ct',
      // table_footer: 'table_footer_ct',
      // table_contenu__table: 'table_ct',
      // table_contenu__thead__tr: 'table_head_tr_ct',
      // table_contenu__thead__th__icon__container: 'table_head_th_icon_ct',
      // table_contenu__thead__th__icon__color: 'grey',
      // table_contenu__thead__th__icon__size: '1.5rem',
      // table_contenu__thead__th__container: 'table_head_th_ct',
      // table_contenu__thead__th__name: 'table_head_th_name_ct',
      // table_contenu__tbody__tr: 'table_body_tr_ct',
      // table_contenu__tbody__td: 'table_body_td_ct',
      // table_pagination__container: 'pagination_container_ct',
      // table_pagination__select__icon__color: 'grey',
      // table_pagination__select__icon__size: '1.5rem',
      // table_pagination__select__container: 'pagination_select_container_ct',
      // table_pagination__select__title: 'pagination_select_title_ct',
      // table_pagination__select__options: 'pagination_select_option_ct',
      // table_pagination__currentPage: 'pagination_currentPage_ct',
      // table_pagination__arrows__container: 'pagination_arrows_container_ct',
      // table_pagination__arrows__icon__color: 'grey',
      // table_pagination__arrows__icon__size: '1.5rem'
    }

  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    //  interfaces
    const tableSectionEle = canvas.getByTestId('tableSection');
    const tableContainerEle = canvas.getByTestId('tableContainer');
    await expect(tableSectionEle).toHaveClass('table_section_ct');
    await expect(tableContainerEle).toHaveClass('table_container_ct');
  },
}

