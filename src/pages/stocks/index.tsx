// import * as React from 'react'
// import { DataGrid, GridColumns, GridRowsProp, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid'
// import { randomCreatedDate, randomTraderName, randomUpdatedDate } from '@mui/x-data-grid-generator'
// import { useDemoData } from '@mui/x-data-grid-generator'
// import { Button, Box, Typography } from '@mui/material'

// const PageSizeCustomOptions = () => {
//    const [pageSize, setPageSize] = React.useState<number>(5)
//    const [isEditable, setIsEditable] = React.useState<boolean>(false)
//    const columns: GridColumns = [
//       { field: 'name', headerName: 'Name', width: 180, editable: isEditable },
//       { field: 'age', headerName: 'Age', type: 'number', editable: isEditable },
//       {
//          field: 'dateCreated',
//          headerName: 'Date Created',
//          type: 'date',
//          width: 180,
//          editable: isEditable,
//       },
//       {
//          field: 'lastLogin',
//          headerName: 'Last Login',
//          type: 'dateTime',
//          width: 220,
//          editable: isEditable,
//       },
//    ]

//    const rows: GridRowsProp = [
//       {
//          id: 1,
//          name: randomTraderName(),
//          age: 25,
//          dateCreated: randomCreatedDate(),
//          lastLogin: randomUpdatedDate(),
//       },
//       {
//          id: 2,
//          name: randomTraderName(),
//          age: 36,
//          dateCreated: randomCreatedDate(),
//          lastLogin: randomUpdatedDate(),
//       },
//       {
//          id: 3,
//          name: randomTraderName(),
//          age: 19,
//          dateCreated: randomCreatedDate(),
//          lastLogin: randomUpdatedDate(),
//       },
//       {
//          id: 4,
//          name: randomTraderName(),
//          age: 28,
//          dateCreated: randomCreatedDate(),
//          lastLogin: randomUpdatedDate(),
//       },
//       {
//          id: 5,
//          name: randomTraderName(),
//          age: 23,
//          dateCreated: randomCreatedDate(),
//          lastLogin: randomUpdatedDate(),
//       },
//    ]

//    const { data } = useDemoData({
//       dataSet: 'Commodity',
//       rowLength: 1000000,
//       maxColumns: 6,
//       editable: isEditable,
//    })

//    function CustomToolbar() {
//       return (
//          <Box sx={{ width: '100%' }}>
//             <GridToolbarContainer>
//                <GridToolbar />
//                <Button
//                   variant={`${isEditable ? 'contained' : 'outlined'}`}
//                   onClick={() => setIsEditable((prev) => !prev)}
//                >
//                   Edit
//                </Button>
//             </GridToolbarContainer>
//          </Box>
//       )
//    }

//    return (
//       <Box
//          sx={{
//             height: '70vh',
//             maxHeight: '100%',
//             width: '100%',
//             padding: 2,
//             borderRadius: 1,
//          }}
//       >
//          <DataGrid
//             pageSize={pageSize}
//             onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//             rowsPerPageOptions={[5, 10, 20, 100]}
//             components={{ Toolbar: CustomToolbar }}
//             pagination
//             columns={columns}
//             rows={rows}
//             // {...data}
//          />
//       </Box>
//    )
// }

// export default function Stocks() {
//    return (
//       <Box
//          sx={{
//             backgroundColor: (theme) => theme.palette.common.white,
//             borderRadius: 1,
//             padding: (theme) => theme.spacing(1),
//          }}
//       >
//          <Typography variant="h6" sx={{ p: 2, pb: 0, color: 'primary.main' }}>
//             Customers
//          </Typography>
//          <PageSizeCustomOptions />
//       </Box>
//    )
// }

// import { useDemoData } from '@mui/x-data-grid-generator'
// import StyledTable from '../../components/table'

// export default function StylingRowsGrid() {
//    const { data } = useDemoData({
//       dataSet: 'Commodity',
//       rowLength: 100,
//       maxColumns: 6,
//       editable: true,
//    })

//    return <StyledTable data={data}></StyledTable>
// }

import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {
   GridColumns,
   GridRowsProp,
   DataGrid,
   GridCellParams,
   GridEventListener,
   MuiEvent,
   GridEvents,
   useGridApiContext,
} from '@mui/x-data-grid'
import { randomCreatedDate, randomTraderName, randomUpdatedDate } from '@mui/x-data-grid-generator'

interface EditToolbarProps {
   selectedCellParams?: any
   setSelectedCellParams: (value: any) => void
}

function EditToolbar(props: EditToolbarProps) {
   const apiRef = useGridApiContext()
   const { selectedCellParams, setSelectedCellParams } = props

   const handleClick = async () => {
      if (!selectedCellParams) {
         return
      }

      const { id, field, rowMode } = selectedCellParams
      console.log(rowMode, id, field)
      if (rowMode === 'edit') {
         apiRef.current.setRowMode(id, 'view')
         setSelectedCellParams({ ...selectedCellParams, rowMode: 'view' })
      } else {
         apiRef.current.setRowMode(id, 'edit')
         setSelectedCellParams({ ...selectedCellParams, rowMode: 'edit' })
      }
   }

   const handleMouseDown = (event: any) => {
      // Keep the focus in the cell
      event.preventDefault()
   }

   return (
      <Box
         sx={{
            justifyContent: 'center',
            display: 'flex',
            borderBottom: 1,
            borderColor: 'divider',
         }}
      >
         <Button
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            disabled={!selectedCellParams}
            color="primary"
         >
            {selectedCellParams?.cellMode === 'edit' ? 'Save' : 'Edit'}
         </Button>
      </Box>
   )
}

export default function StartEditButtonGrid() {
   const [selectedCellParams, setSelectedCellParams] = React.useState<GridCellParams | null>(null)

   const handleCellClick = React.useCallback((params: GridCellParams) => {
      setSelectedCellParams(params)
   }, [])

   const handleCellEditStart = (params: GridCellParams, event: MuiEvent<React.SyntheticEvent>) => {
      event.defaultMuiPrevented = true
   }

   const handleCellEditStop: GridEventListener<GridEvents.cellEditStop> = (params, event) => {
      event.defaultMuiPrevented = true
   }

   return (
      <div style={{ height: 400, width: '100%' }}>
         <DataGrid
            editMode="row"
            rows={rows}
            columns={columns}
            onCellClick={handleCellClick}
            onCellEditStart={handleCellEditStart}
            onCellEditStop={handleCellEditStop}
            components={{
               Toolbar: EditToolbar,
            }}
            componentsProps={{
               toolbar: {
                  selectedCellParams,
                  setSelectedCellParams,
               },
            }}
            // experimentalFeatures={{ newEditingApi: true } as any}
         />
      </div>
   )
}

const columns: GridColumns = [
   { field: 'name', headerName: 'Name', width: 180, editable: true },
   { field: 'age', headerName: 'Age', type: 'number', editable: true },
   {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'date',
      width: 180,
      editable: true,
   },
   {
      field: 'lastLogin',
      headerName: 'Last Login',
      type: 'dateTime',
      width: 220,
      editable: true,
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
