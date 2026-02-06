import React from "react";
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "./CustomToolbarSelect";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const TableComponent = ({ title, columns, data, filter, download ,selectableRowsHideCheckboxes=true ,expandableRows = false, onRowsSelect=()=>{}, rowsPerPage=10}) => {

  const options = {
    filterType: 'dropdown',
    download: download,
    filter: filter,
    print: false,
    viewColumns: false,
    search: true,
    selectableRowsHideCheckboxes: selectableRowsHideCheckboxes,
    selectableRows: 'multiple',
    expandableRows: expandableRows,
    onRowSelectionChange:onRowsSelect,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
    ),
    rowsPerPage:rowsPerPage,
    renderExpandableRow: (rowData, rowMeta) => {
      console.log(rowData, rowMeta);
      return (
        <React.Fragment>
          <tr>
            <td colSpan={6}>
              <TableContainer component={Paper}>
                <Table style={{ minWidth: "650" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {rows.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </td>
          </tr>
        </React.Fragment>
      );
    },
    // rowsPerPageOptions:[5,10,15,100]
  };

  return (
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
  )
}

export default TableComponent;