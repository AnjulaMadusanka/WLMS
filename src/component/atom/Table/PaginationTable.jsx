import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";

const PaginationTable = ({
  title,
  columns,
  data,
  totalRecords,
  currentPage,
  rowsPerPage = 10,
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
  onSearchChange = () => {},
  filter = true,
  download = true,
  selectableRowsHideCheckboxes = true,
  expandableRows = false,
  onRowsSelect = () => {},
}) => {
  // Define MUIDataTable options
  const options = {
    filterType: "dropdown",
    download: download,
    filter: filter,
    print: false,
    viewColumns: false,
    search: true,
    selectableRowsHideCheckboxes: selectableRowsHideCheckboxes,
    selectableRows: "multiple",
    rowsPerPage: rowsPerPage,
    serverSide: true,
    rowsPerPageOptions: [10,20,50,100], 
    count: totalRecords, 
    page: currentPage - 1, 
    onChangePage: (newPage) => {
      onPageChange(newPage + 1); 
    },
    onChangeRowsPerPage: (newRowsPerPage) => {
      onRowsPerPageChange(newRowsPerPage);
    },
    expandableRows: expandableRows,
    onRowSelectionChange: onRowsSelect,
    onSearchChange: (searchText) => {
      const sanitizedSearch = searchText ? searchText.trim() : ""; // Ensure it's a string
      onSearchChange(sanitizedSearch);
    }
    
    
  };



  return (
    <MUIDataTable
      key={currentPage} 
      data={data} 
      columns={columns} 
      options={options}
    />
  );
};

export default PaginationTable;
