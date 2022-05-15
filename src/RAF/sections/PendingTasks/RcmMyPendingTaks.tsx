import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.css'
import { teal } from '@material-ui/core/colors'
import { Link, useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  useTheme,
  useMediaQuery,
  Dialog,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core'

const cols = [
  // {
  //   field: 'uniqueId',
  //   header: 'uniqueId',
  //   width: '100px',
  // },
  // {
  //   field: 'uniqueId1',
  //   header: 'uniqueId1',
  //   width: '100px',
  // },
  {
    field: 'name',
    header: 'eventName',
    width: '100px',
  },
  {
    field: 'task',
    header: 'task',
    width: '100px',
  },
  {
    field: 'dueDate',
    header: 'dueDate',
    width: '100px',
  },
  {
    field: 'status',
    header: 'status',
    width: '100px',
  },
  {
    field: 'resetType',
    header: 'resetType',
    width: '100px',
  },
  {
    field: 'launchDate',
    header: 'launchDate',
    width: '100px',
  },
  {
    field: 'group',
    header: 'group',
    width: '100px',
  },
  {
    field: 'category',
    header: 'category',
    width: '100px',
  },
  {
    field: 'department',
    header: 'department',
    width: '100px',
  },
]

const rows = [
  {
    // uniqueId: '356555',
    // uniqueId1: '356555',
    name: 'Household & Pet Food',
    task: 'Scoping Meeting',
    dueDate: '05-Nov-22',
    status: 'Not started ',
    resetType: 'Full Range Reset',
    launchDate: '3-Jan-22',
    group: 'Frozen',
    category: 'Frozen Food',
    department: 'Household & Pet Food',
  },
]

const useStyles = makeStyles((theme: any) => {
  return {
    backButton: {
      border: 0,
      color: 'blue',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontSize: '18px',
    },
    buttons: {
      height: 40,
      [theme.breakpoints.up('sm')]: {
        '&:hover': {
          fontSize: '0.97rem',
        },
        width: '200px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.6rem',
        // height: 50,
        padding: '1px',
      },
      width: '100%',
    },
    dialogButton: {
      height: 40,
      [theme.breakpoints.up('sm')]: {
        '&:hover': {
          fontSize: '0.97rem',
        },
        width: '80px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.6rem',
        // height: 50,
        padding: '1px',
      },
      width: '100%',
    },
    buttonContainer: {
      [theme.breakpoints.up('lg')]: {
        textAlign: 'right',
      },
      [theme.breakpoints.down('lg')]: {
        textAlign: 'center',
      },
    },
    dialogTitle: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      alignItems: 'baseline',
    },
    dialogCloseButton: {
      color: '#ff5252',
      backgroundColor: theme.palette.primary.main,
      fontSize: '18px',
      '&:hover': {
        color: '#d50000',
        backgroundColor: '#00e676',
        cursor: 'pointer',
        borderRadius: 10,
      },
    },
    comments: {
      width: '100%',
    },
    dialogTextfield: {
      width: '100%',
    },
  }
})

function RcmMyPendingTaks() {
  const classes = useStyles()
  const history = useHistory()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.up('md'))

  const [selectedRows, setSelectedRows] = useState<any>()
  const [searchFilter, setSearchFilter] = useState<any>()
  const [openAssignToOther, setOpenAssignToOther] = useState(false)

  const goBack = () => {
    history.goBack()
  }

  const handleAssignToOtherOpen = () => {
    if (selectedRows && selectedRows.length > 0) {
      setOpenAssignToOther(true)
    }
  }

  const handleAssignToOtherClose = () => {
    setOpenAssignToOther(false)
  }

  const handleAssignToOther = () => {
    history.push('/commercial/eventdashboard')
  }

  // const handleUniqueIdClick = (data: any) => {
  //   history.push({
  //     pathname: '/commercial-webapp/delistsaddedtorange',
  //     search: `?task=${data['uniqueId']}`, // query string
  //     state: {
  //       // location state
  //       data: data,
  //     },
  //   })
  // }
  // const handleUniqueId1Click = (data: any) => {
  //   history.push({
  //     pathname: '/commercial/rangechange/productbrief',
  //     search: `?task=${data['uniqueId']}`, // query string
  //     state: {
  //       // location state
  //       data: data,
  //     },
  //   })
  // }

  const handleNameClick = (data: any) => {
    history.push({
      pathname: '/commercial-webapp/delistsaddedtorange',
      search: `?task=${data['name']}`, // query string
      state: {
        // location state
        data: data,
      },
    })
  }

  // const uniqueIdTemplate = (rowData: any) => {
  //   return (
  //     <div
  //       style={{
  //         cursor: 'pointer',
  //         color: 'blue',
  //       }}
  //       onClick={() => handleUniqueIdClick(rowData)}
  //     >
  //       {rowData.uniqueId}
  //     </div>
  //   )
  // }

  const eventNameTemplate = (rowData: any) => {
    return (
      <div
        style={{
          cursor: 'pointer',
          color: 'blue',
        }}
        onClick={() => handleNameClick(rowData)}
      >
        {rowData.name}
      </div>
    )
  }

  // const uniqueId1Template = (rowData: any) => {
  //   return (
  //     <div
  //       style={{
  //         cursor: 'pointer',
  //         color: 'blue',
  //       }}
  //       onClick={() => handleUniqueId1Click(rowData)}
  //     >
  //       {rowData.uniqueId}
  //     </div>
  //   )
  // }

  const table = (
    <DataTable
      value={rows}
      paginator
      rows={10}
      alwaysShowPaginator={false}
      selectionMode="checkbox"
      selection={selectedRows}
      onSelectionChange={(e) => setSelectedRows(e.value)}
      globalFilter={searchFilter}
      emptyMessage="No Events found."
      showGridlines
      scrollable
    >
      <Column
        selectionMode="multiple"
        headerStyle={{
          width: '50px',
          color: 'white',
          backgroundColor: teal[900],
        }}
      ></Column>
      {cols.map((col: any, index: any) => {
        return (
          <Column
            key={index}
            field={col.field}
            header={col.header}
            body={col.field === 'name' && eventNameTemplate}
            style={{
              width: col.width,
              fontSize: '0.8rem',
              padding: '8px',
            }}
            headerStyle={{
              color: 'white',
              backgroundColor: teal[900],
              width: col.width,
              fontSize: '0.9rem',
              padding: '8px',
            }}
          />
        )
      })}
    </DataTable>
  )

  const assignToOtherDialog = (
    <Dialog open={openAssignToOther} onClose={handleAssignToOtherClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: small ? '400px' : '230px',
          // height: "250px",
          border: '3px solid green',
          borderRadius: 5,
          padding: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: 30,
            flexDirection: 'row',
            borderRadius: 10,
          }}
          className={classes.dialogTitle}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1">Assign To Other</Typography>
          </Box>
          <Box
            sx={{
              paddingRight: 2,
            }}
          >
            <button
              style={{
                border: 0,
                padding: 0,
                height: 22,
                width: 22,
              }}
              className={classes.dialogCloseButton}
              onClick={handleAssignToOtherClose}
            >
              <b>X</b>
            </button>
          </Box>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div>
                <Typography variant="body2">Search User Name</Typography>
              </div>
              <TextField
                value={searchFilter}
                className={classes.dialogTextfield}
                onChange={(e: any) => setSearchFilter(e.target.value)}
                placeholder="Search User Details"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <Typography variant="body2">Select Reason</Typography>
              </div>
              <select defaultValue="" className={classes.dialogTextfield}>
                <option value="" disabled>
                  --- Select Reason ---
                </option>
                <option value="select">Select</option>
              </select>
            </Grid>
            <Grid item xs={12}>
              <div>
                <Typography variant="body2">Comments</Typography>
              </div>
              <textarea rows={5} className={classes.comments} />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                // type="submit"
                variant="contained"
                color="primary"
                className={classes.dialogButton}
                onClick={handleAssignToOther}
              >
                Assign
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  )

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          spacing={2}
          style={{
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <Typography variant="h5">Pending Tasks</Typography>
          </Grid>

          <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
            <TextField
              value={searchFilter}
              onChange={(e: any) => setSearchFilter(e.target.value)}
              placeholder="Search User Details"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid
            item
            xl={1}
            lg={1}
            md={1}
            sm={4}
            xs={4}
            style={{
              textAlign: 'right',
            }}
          >
            <button className={classes.backButton} onClick={goBack}>
              Back
            </button>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          {table}
        </Grid>
        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          spacing={2}
          style={{
            justifyContent: 'right',
          }}
        >
          <Grid
            item
            xl={2}
            lg={3}
            md={3}
            sm={6}
            xs={12}
            style={{
              textAlign: 'right',
            }}
          >
            <Button
              // type="submit"
              variant="contained"
              color="primary"
              className={classes.buttons}
              onClick={handleAssignToOtherOpen}
            >
              Assign to Other
            </Button>
          </Grid>
        </Grid>
        {assignToOtherDialog}
      </Grid>
    </>
  )
}

export default RcmMyPendingTaks
