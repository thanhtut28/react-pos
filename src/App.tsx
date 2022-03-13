import Dashboard from './components/dashboard'
import * as React from 'react'
import { DataGrid, GridColumns, GridRowsProp, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid'
import { randomCreatedDate, randomTraderName, randomUpdatedDate } from '@mui/x-data-grid-generator'
import { useDemoData } from '@mui/x-data-grid-generator'
import { Button } from '@mui/material'

const PageSizeCustomOptions = () => {
   const [pageSize, setPageSize] = React.useState<number>(5)
   const [isEditable, setIsEditable] = React.useState<boolean>(false)
   const columns: GridColumns = [
      { field: 'name', headerName: 'Name', width: 180, editable: isEditable },
      { field: 'age', headerName: 'Age', type: 'number', editable: isEditable },
      {
         field: 'dateCreated',
         headerName: 'Date Created',
         type: 'date',
         width: 180,
         editable: isEditable,
      },
      {
         field: 'lastLogin',
         headerName: 'Last Login',
         type: 'dateTime',
         width: 220,
         editable: isEditable,
      },
   ]

   const rows: GridRowsProp = [
      {
         id: 1,
         name: randomTraderName(),
         age: 25,
         dateCreated: randomCreatedDate(),
         lastLogin: randomUpdatedDate(),
      },
      {
         id: 2,
         name: randomTraderName(),
         age: 36,
         dateCreated: randomCreatedDate(),
         lastLogin: randomUpdatedDate(),
      },
      {
         id: 3,
         name: randomTraderName(),
         age: 19,
         dateCreated: randomCreatedDate(),
         lastLogin: randomUpdatedDate(),
      },
      {
         id: 4,
         name: randomTraderName(),
         age: 28,
         dateCreated: randomCreatedDate(),
         lastLogin: randomUpdatedDate(),
      },
      {
         id: 5,
         name: randomTraderName(),
         age: 23,
         dateCreated: randomCreatedDate(),
         lastLogin: randomUpdatedDate(),
      },
   ]

   const { data } = useDemoData({
      dataSet: 'Commodity',
      rowLength: 100,
      maxColumns: 6,
      editable: isEditable,
   })

   function CustomToolbar() {
      return (
         <GridToolbarContainer>
            <GridToolbar />
            <Button
               variant={`${isEditable ? 'contained' : 'outlined'}`}
               onClick={() => setIsEditable((prev) => !prev)}
            >
               Edit
            </Button>
         </GridToolbarContainer>
      )
   }

   return (
      <div style={{ height: '80vh', width: '100%' }}>
         <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20, 100]}
            components={{ Toolbar: CustomToolbar }}
            pagination
            columns={columns}
            rows={rows}
         />
      </div>
   )
}

function App() {
   return <PageSizeCustomOptions />
}

export default App
