import {
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
  InputAdornment,
  Button,
  Dialog,
  Box,
  useTheme,
  useMediaQuery,
  styled,
  TextField,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import { SearchOutlined } from '@material-ui/icons'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
// import { RiFileExcel2Fill } from 'react-icons/ri'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import DateFnsUtils from '@date-io/date-fns'
import React, { useState, useEffect } from 'react'
import {
  actionTypes,
  delistAddedToRangeCols,
  delistExistingProductsCols,
  massActions,
  productListCols,
  salesChannels,
  // supplierCodes
} from './DataConstants'
// import TextFieldWithSearch from './sections/TextFieldWithSearch/TextFieldWithSearch'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import AutocompleteSelect from '../../../RangeChangeManagement/components/AutoCompleteSelect/AutocompleteSelect'

const useStyles = makeStyles((theme: any) => {
  return {
    backButton: {
      border: 0,
      color: 'blue',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontSize: '18px',
    },
    uploadTextfield: {
      [theme.breakpoints.up('sm')]: {
        width: 200,
      },
      [theme.breakpoints.down('sm')]: {
        width: 100,
      },

      height: '32px',
      cursor: 'pointer',
    },
    uploadButton: {
      width: 100,
      height: '32px',
      cursor: 'pointer',
      backgroundColor: teal[900],
      color: 'white',
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
    submitButtons: {
      width: 'auto',
      backgroundColor: teal[900],
      color: 'white',
      height: 40,
      '&:hover': {
        backgroundColor: teal[600],
        color: 'white',
      },
    },
    placeholderCountStyle: {
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      fontSize: '1rem',
      padding: '10px',
      marginTop: '5px',
    },
    placeholderSelect: {
      width: '100%',
      fontSize: '1rem',
      padding: '5px',
      marginTop: '5px',
    },
    addActionFields: {
      height: '40px',
      width: '100%',
    },
  }
})

const delistToRangeData = [
  {
    uniqueId: 325655,
    eventName: 'Household & Pet Food',
    dueDate: '05-Nov-22',
    status: 'Not started',
    resetType: 'Full Range Reset',
    launchDate: '3-Jan-22',
    group: 'Frozen',
    category: 'Frozen Food',
    department: '3-Jan-22',
    clearancePriceApplied: 'Y',
    GSCOPDateCheckRequired: 'Y',
    stopOrder: 'Y',
    buyer: 'helen.barker@morrisonsplc.co.uk',
    buyingAssistant: 'paul.allman@morrisonsplc.co.uk',
    ownBrandManager: 'naomi.anderson@morrisonsplc.co.uk',
    seniorBuyingManager: 'sophie.olding@morrisonsplc.co.uk',
    merchandiser: 'helen.barker@morrisonsplc.co.uk',
    rangeResetManager: 'naomi.anderson@morrisonsplc.co.uk',
    categoryDirector: 'sophie.olding@morrisonsplc.co.uk',
    supplyChainSplst: 'Cristine Black',
  },
]

function DelistsAddedToRange() {
  const classes = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.up('md'))
  const radio = <Radio color="primary" />

  const [productType, setProductType] = useState<any>('existingProducts')
  const [actionType, setActionType] = useState<any>('Delist MIN')
  const [existingSearchFields, setExistingSearchFields] = useState<any>()
  const [productId, setProductId] = useState<any>('')
  const [storeCode, setStoreCode] = useState<any>('')
  const [supplier, setSupplier] = useState<any>('')
  const [supplierSiteNumber, setSupplierSiteNumber] = useState<any>('')
  const [local, setLocal] = useState<any>('yes')
  const [pin, setPin] = useState<any>('')
  const [buyingMinIngredients, setBuyingMinIngredients] = useState<any>('')
  const [openUploadDialog, setOpenUploadDialog] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<any>()
  const [importedData, setImportedData] = useState<any>()
  const [supplierCode, setSupplierCode] = useState<any>()
  const [selectedSalesChannels, setSelectedSalesChannels] = useState<any>()
  const [placeholderCount, setPlaceholderCount] = useState<any>('')
  const [newProductId, setNewProductId] = useState<any>('')
  const [selectedProductListItems, setSelectedProductListItems] =
    useState<any>()
  const [bulkActions, setBulkActions] = useState<any>()
  const [openActionTypeDialog, setOpenActionTypeDialog] = useState(false)
  const [minOrPin, setMinOrPin] = useState<any>('')
  const [replaceMinOrPin, setReplaceMinOrPin] = useState<any>('')
  const [fromDate, setFromDate] = useState<any>()
  const [toDate, setToDate] = useState<any>()
  const [addStoreCode, setAddStoreCode] = useState<any>('')
  const [comments, setComments] = useState<any>('')
  const [openPlaceholderDialog, setOpenPlaceholderDialog] = useState(false)

  useEffect(() => {
    setExistingSearchFields([
      {
        productId: productId,
        storeCode: storeCode,
        supplier: supplier,
        supplierSiteNumber: supplierSiteNumber,
        local: local,
        pin: pin,
        buyingMinIngredients: buyingMinIngredients,
      },
    ])
  }, [
    productId,
    storeCode,
    supplier,
    supplierSiteNumber,
    local,
    pin,
    buyingMinIngredients,
  ])

  const Input = styled('input')({
    display: 'none',
  })

  const handleProductTypeChange = (e: any) => {
    setProductType(e.target.value)
  }

  // const productIdTemplate = (rowData: any) => {
  //     return <TextFieldWithSearch value={productId} onChangeFn={setProductId} onSearch={console.log} />
  // }

  // const storeCodeTemplate = () => {
  //     return <TextFieldWithSearch value={storeCode} onChangeFn={setStoreCode} onSearch={console.log} />
  // }

  // const supplierTemplate = () => {
  //     return <TextFieldWithSearch value={supplier} onChangeFn={setSupplier} onSearch={console.log} />
  // }

  // const supplierSiteNumberTemplate = () => {
  //     return <TextFieldWithSearch value={supplierSiteNumber} onChangeFn={setSupplierSiteNumber} onSearch={console.log} />
  // }

  const localTemplate = (rowData: any) => {
    return (
      <select
        value={rowData.local}
        onChange={(e: any) => {
          setExistingSearchFields((prevState: any) => {
            return [
              {
                ...prevState[0],
                local: e.target.value,
              },
            ]
          })
        }}
        style={{
          height: '30px',
          padding: '5px',
        }}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    )
  }

  // const pinTemplate = () => {
  //     return <TextFieldWithSearch value={pin} onChangeFn={setPin} onSearch={console.log} />
  // }

  // const buyingMinIngredientsTemplate = () => {
  //     return <TextFieldWithSearch value={buyingMinIngredients} onChangeFn={setBuyingMinIngredients} onSearch={console.log} />
  // }

  const lineStatusTemplate = (rowData: any) => {
    console.log(rowData)
    if (rowData['min/pin']) {
      return (
        <select value={rowData.lineStatus}>
          <option value="Request for">Request for</option>
          <option value="Draft">Draft</option>
        </select>
      )
    }
  }

  const clearancePricingTemplate = (rowData: any) => {
    if (rowData['min/pin']) {
      if (rowData.clearancePricing === 'NA') {
        return (
          <select defaultValue={rowData.clearancePricing} disabled>
            <option value="NA">NA</option>
          </select>
        )
      } else {
        return (
          <select defaultValue={rowData.clearancePricing}>
            <option value="Exclude from">Exclude from</option>
            <option value="NA">NA</option>
          </select>
        )
      }
    }
  }

  const clearDepotByTemplate = (rowData: any) => {
    if (rowData['min/pin']) {
      if (rowData.clearDepotBy === 'NA') {
        return (
          <select defaultValue={rowData.clearDepotBy} disabled>
            <option value="NA">NA</option>
          </select>
        )
      } else {
        return (
          <select value={rowData.clearDepotBy}>
            <option value="Week-4">Week-4</option>
            <option value="NA">NA</option>
          </select>
        )
      }
    }
  }

  const handleActionType = (e: any) => {
    if (e) {
      setActionType(e)
    } else {
      setActionType('')
    }
  }

  const handleUploadDialogOpen = () => {
    setOpenUploadDialog(true)
  }

  const handleUploadDialogClose = () => {
    setOpenUploadDialog(false)
  }

  const handleFileUpload = (event: any) => {
    setUploadedFile(event.target.files[0])
  }

  const handleUpload = (e: any) => {
    // e.preventDefault();
    handleUploadDialogClose()
    if (
      uploadedFile &&
      (uploadedFile.type === 'text/csv' ||
        uploadedFile.type === 'application/vnd.ms-excel' ||
        uploadedFile.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      console.log(uploadedFile)
      import('xlsx').then((xlsx) => {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          const wb = xlsx.read(event.target.result, { type: 'array' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = xlsx.utils.sheet_to_json(ws)
          console.log(data)

          let newData = data.map((d: any) => {
            if (d['Effective Date (From)'] || d['Effective Date (To)']) {
              var fromDate1 = new Date(
                Math.round(
                  (d['Effective Date (From)'] - (25567 + 1)) * 86400 * 1000
                )
              )
              var convertedFromDate = fromDate1.toISOString().split('T')[0]
              console.log(convertedFromDate)
              var toDate1 = new Date(
                Math.round(
                  (d['Effective Date (To)'] - (25567 + 1)) * 86400 * 1000
                )
              )
              var convertedToDate = toDate1.toISOString().split('T')[0]
              console.log(convertedToDate)

              // uploadData.push({
              //     "action/type": d['Action/ Type'],
              //     "min/pin": d['MIN/ PIN'],
              //     "description": d['Description'] ? d['Description'] : "",
              //     "replaceMin/pin": d['Replace MIN/ PIN'] ? d['Replace MIN/ PIN'] : "",
              //     "fromDate": d['Effective Date (From)'] ? convertedFromDate : "",
              //     "toDate": d['Effective Date (To)'] ? convertedToDate : "",
              //     "lineStatus": d['Line Status'] ? d['Line Status'] : "Request For",
              //     "clearancePricing": d['Clearance Pricing'] ? d['Clearance Pricing'] : "Include in",
              //     "clearDepotBy": d['Clear Depot By'] ? d['Clear Depot By'] : "Week-4",
              // })

              // if (d['Replace MIN/ PIN']) {
              //     replaceData.push(
              //         {
              //             "action/type": d['Action/ Type'],
              //             "min/pin": d['Replace MIN/ PIN'],
              //             "description": d['Description'] ? d['Description'] : "NA",
              //             "replaceMin/pin": "NA",
              //             "fromDate": d['Effective Date (From)'] ? convertedFromDate : "NA",
              //             "toDate": d['Effective Date (To)'] ? convertedToDate : "NA",
              //             "lineStatus": d['Line Status'] ? d['Line Status'] : "Request For",
              //             "clearancePricing": d['Clearance Pricing'] ? d['Clearance Pricing'] : "Include in",
              //             "clearDepotBy": d['Clear Depot By'] ? d['Clear Depot By'] : "Week-4",
              //         }
              //     )
              // }
              return {
                'action/type': d['Action/ Type'],
                'min/pin': d['MIN/ PIN'],
                description: d['Description'] ? d['Description'] : 'NA',
                'replaceMin/pin': d['Replace MIN/ PIN']
                  ? d['Replace MIN/ PIN']
                  : 'NA',
                fromDate: d['Effective Date (From)'] ? convertedFromDate : 'NA',
                toDate: d['Effective Date (To)'] ? convertedToDate : 'NA',
                lineStatus: d['Line Status'] ? d['Line Status'] : 'Request For',
                clearancePricing: d['Clearance Pricing']
                  ? d['Clearance Pricing']
                  : 'Include in',
                clearDepotBy: d['Clear Depot By']
                  ? d['Clear Depot By']
                  : 'Week-4',
              }
            } else {
              // uploadData.push({
              //     "action/type": d['Action/ Type'],
              //     "min/pin": d['MIN/ PIN'],
              //     "description": d['Description'] ? d['Description'] : "NA",
              //     "replaceMin/pin": d['Replace MIN/ PIN'] ? d['Replace MIN/ PIN'] : "NA",
              //     "fromDate": "NA",
              //     "toDate": "NA",
              //     "lineStatus": d['Line Status'] ? d['Line Status'] : "Request For",
              //     "clearancePricing": d['Clearance Pricing'] ? d['Clearance Pricing'] : "Include in",
              //     "clearDepotBy": d['Clear Depot By'] ? d['Clear Depot By'] : "Week-4",
              // })
              // if (d['Replace MIN/ PIN']) {
              //     replaceData.push(
              //         {
              //             "action/type": d['Action/ Type'],
              //             "min/pin": d['Replace MIN/ PIN'],
              //             "description": d['Description'] ? d['Description'] : "NA",
              //             "replaceMin/pin": "NA",
              //             "fromDate": "NA",
              //             "toDate": "NA",
              //             "lineStatus": d['Line Status'] ? d['Line Status'] : "Request For",
              //             "clearancePricing": d['Clearance Pricing'] ? d['Clearance Pricing'] : "Include in",
              //             "clearDepotBy": d['Clear Depot By'] ? d['Clear Depot By'] : "Week-4",
              //         }
              //     )

              // }
              return {
                'action/type': d['Action/ Type'],
                'min/pin': d['MIN/ PIN'],
                description: d['Description'] ? d['Description'] : 'NA',
                'replaceMin/pin': d['Replace MIN/ PIN']
                  ? d['Replace MIN/ PIN']
                  : 'NA',
                fromDate: 'NA',
                toDate: 'NA',
                lineStatus: d['Line Status'] ? d['Line Status'] : 'Request For',
                clearancePricing: d['Clearance Pricing']
                  ? d['Clearance Pricing']
                  : 'Include in',
                clearDepotBy: d['Clear Depot By']
                  ? d['Clear Depot By']
                  : 'Week-4',
              }
            }
          })

          let replaceMinData = newData.filter((d: any) => {
            return d['replaceMin/pin'] !== 'NA'
          })

          console.log(newData)
          console.log(replaceMinData)
          let tableData = [...newData]
          // tableData.append(...replaceData)
          console.log(tableData)
          setImportedData(newData)
        }

        reader.readAsArrayBuffer(uploadedFile)
      })
    } else {
      alert('Upload correct file')
      setUploadedFile(null)
    }
  }

  const uploadDialog = (
    <Dialog open={openUploadDialog} onClose={handleUploadDialogClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: small ? '400px' : '260px',
          // height: "250px",
          border: '3px solid green',
          borderRadius: 5,
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
            <Typography variant="subtitle1">Upload RAF</Typography>
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
              onClick={handleUploadDialogClose}
            >
              <b>X</b>
            </button>
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          <Typography variant="body2">Upload RAF</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box>
            <input
              type="text"
              value={uploadedFile ? uploadedFile.name : ''}
              onClick={() => document.getElementById('selectedFile')!.click()}
              className={classes.uploadTextfield}
              placeholder="No file selected"
              readOnly
            />
            <Input
              type="file"
              id="selectedFile"
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileUpload}
              required
            />
            <button
              type="button"
              onClick={() => document.getElementById('selectedFile')!.click()}
              className={classes.uploadButton}
            >
              Browse...
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            p: 2,
            justifyContent: 'right',
          }}
        >
          <Box>
            Supported file type in MS Excel
            <i className="pi pi-file-excel" style={{ fontSize: '18px' }}></i>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            p: 3,
            justifyContent: 'right',
          }}
        >
          <Button className={classes.submitButtons} onClick={handleUpload}>
            Select
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const handleActionTypeDialogOpen = (e: any) => {
    e.preventDefault()
    setOpenActionTypeDialog(true)
  }

  const handleActionTypeDialogClose = () => {
    setOpenActionTypeDialog(false)
  }

  const handleFromDate = (date: any) => {
    // const newDate = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
    const newDate =
      parseInt(date.getMonth() + 1) +
      '-' +
      date.getDate() +
      '-' +
      date.getFullYear()
    console.log(newDate)
    setFromDate(newDate)
  }

  const handleToDate = (date: any) => {
    // const newDate = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
    const newDate =
      parseInt(date.getMonth() + 1) +
      '-' +
      date.getDate() +
      '-' +
      date.getFullYear()
    console.log(newDate)
    setToDate(newDate)
  }

  const handleAddProduct = (e: any) => {
    e.preventDefault()
    if (
      minOrPin ||
      replaceMinOrPin ||
      fromDate ||
      toDate ||
      addStoreCode ||
      comments
    ) {
      if (actionType !== 'Derange MIN') {
        let addData = {
          'action/type': actionType && actionType,
          'min/pin': minOrPin && minOrPin,
          description: 'NA',
          'replaceMin/pin': replaceMinOrPin ? replaceMinOrPin : 'NA',
          fromDate: fromDate ? fromDate : 'NA',
          toDate: toDate ? toDate : 'NA',
          lineStatus: 'Request For',
          clearancePricing: 'Include in',
          clearDepotBy: 'Week-4',
        }
        console.log(addData)
        if (importedData) {
          setImportedData((prevSate: any) => {
            let newData = [...importedData]
            newData.push(addData)
            return newData
          })
        } else {
          setImportedData([addData])
        }
        // let newData = importedData ? [...importedData]: []
        // newData.push(addData)
        // console.log(newData);
        handleActionTypeDialogClose()
      }
    }
  }

  const actionTypeDialog = (
    <Dialog open={openActionTypeDialog} onClose={handleActionTypeDialogClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: small ? '500px' : '260px',
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
            <Typography variant="subtitle1">Add {actionType}</Typography>
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
              onClick={handleActionTypeDialogClose}
            >
              <b>X</b>
            </button>
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          <Typography variant="body2">Add {actionType}</Typography>
        </Box>
        <form onSubmit={handleAddProduct}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <table cellPadding={'10px'}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                <thead
                  style={{
                    fontSize: '12px',
                    textAlign: 'left',
                  }}
                >
                  <tr>
                    <th>{actionType}</th>
                    <th>
                      <TextField
                        variant="outlined"
                        className={classes.addActionFields}
                        size="small"
                        value={minOrPin}
                        onChange={(e: any) => setMinOrPin(e.target.value)}
                        required
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>Replace MIN/PIN</th>
                    <th>
                      <TextField
                        variant="outlined"
                        className={classes.addActionFields}
                        size="small"
                        value={replaceMinOrPin}
                        onChange={(e: any) =>
                          setReplaceMinOrPin(e.target.value)
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>Effective Date(from)</th>
                    <th>
                      <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        inputVariant="outlined"
                        value={fromDate}
                        onChange={handleFromDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        style={{
                          height: '35px',
                        }}
                        size="small"
                      />
                      {/* <DatePicker
                                                value={fromDate}
                                                onChange={handleFromDate}
                                                renderInput={(props: any) => (
                                                    <TextField {...props} variant="outlined" />
                                                )}
                                                
                                            /> */}
                    </th>
                  </tr>

                  <tr>
                    <th>Effective Date(to)</th>
                    <th>
                      <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        inputVariant="outlined"
                        value={toDate}
                        onChange={handleToDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        style={{
                          height: '35px',
                        }}
                        size="small"
                      />
                      {/* <DatePicker
                                                value={toDate}
                                                onChange={handleToDate}
                                                renderInput={(props: any) => (
                                                    <TextField {...props} variant="outlined" />
                                                )}
                                                
                                            /> */}
                    </th>
                  </tr>

                  {actionType === 'Derange MIN' && (
                    <tr>
                      <th>Store Code</th>
                      <th>
                        <TextField
                          variant="outlined"
                          className={classes.addActionFields}
                          size="small"
                          value={addStoreCode}
                          onChange={(e: any) => setAddStoreCode(e.target.value)}
                          required
                        />
                      </th>
                    </tr>
                  )}

                  <tr>
                    <th>Comments</th>
                    <th>
                      <TextField
                        variant="outlined"
                        className={classes.addActionFields}
                        size="small"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      />
                    </th>
                  </tr>
                </thead>
              </MuiPickersUtilsProvider>

              {/* </LocalizationProvider> */}
            </table>
          </Box>

          <Box
            sx={{
              display: 'flex',
              p: 3,
              justifyContent: 'right',
            }}
          >
            <Button className={classes.submitButtons} type="submit">
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  )

  const existingProducts = (
    <form style={{ width: '100%' }}>
      <Grid
        item
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ alignItems: 'center' }}
      >
        <Grid item container xl={8} lg={8} md={8} sm={12} xs={12}>
          <DataTable
            value={existingSearchFields}
            scrollable
            showGridlines
            style={{
              height: '100%',
              width: '100%',
            }}
            className="p-datatable-sm"
          >
            {delistExistingProductsCols.map((col: any, index: any) => {
              return (
                <Column
                  key={index}
                  field={col.field}
                  header={col.header}
                  style={{
                    width: col.width,
                    fontSize: '0.9rem',
                    padding: '0.5rem',
                  }}
                  headerStyle={{
                    backgroundColor: teal[900],
                    color: 'white',
                    width: col.width,
                    fontSize: '0.9rem',
                    padding: '0.5rem',
                  }}
                  body={
                    // (col.field === "productId" && productIdTemplate)
                    // ||
                    // (col.field === "storeCode" && storeCodeTemplate)
                    // ||
                    // (col.field === "supplier" && supplierTemplate)
                    // ||
                    // (col.field === "supplierSiteNumber" && supplierSiteNumberTemplate)
                    // ||
                    col.field === 'local' && localTemplate
                    // ||
                    // (col.field === "pin" && pinTemplate)
                    // ||
                    // (col.field === "buyingMinIngredients" && buyingMinIngredientsTemplate)
                  }
                />
              )
            })}
          </DataTable>
        </Grid>
        <Grid
          item
          container
          xl={4}
          lg={4}
          md={4}
          sm={12}
          xs={12}
          style={{ textAlign: 'center' }}
          spacing={2}
        >
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <Button variant="contained" color="primary" type="submit">
              ADD
            </Button>
          </Grid>
          <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
            OR
          </Grid>
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadDialogOpen}
            >
              Upload File
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )

  const submitNewProduct = (e: any) => {
    e.preventDefault()
    if (newProductId) {
      let newProductData: any = {
        productId: newProductId,
        description: '',
        'department/Category': 'Household & Pet Food/Pet Foods',
        lineStatus: 'Draft',
        type: 'New',
        clearancePricing: 'NA',
        clearDepotBy: 'NA',
      }
      if (importedData) {
        setImportedData((prevState: any) => {
          let newData = [...prevState]
          newData.push(newProductData)
          console.log(newData)
          return newData
        })
      } else {
        setImportedData([newProductData])
      }
    }
  }

  const newProducts = (
    <form style={{ width: '100%' }} onSubmit={submitNewProduct}>
      <Grid
        item
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ alignItems: 'end' }}
        spacing={2}
      >
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          New Products
          <br />
          <input
            type="text"
            required
            className={classes.placeholderCountStyle}
            style={{
              width: small ? '88%' : '100%',
            }}
            value={newProductId}
            onChange={(e: any) => setNewProductId(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={6}
          xs={12}
          style={{ textAlign: 'center' }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: '80px' }}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </form>
  )

  const submitPlaceholderProducts = (e: any) => {
    e.preventDefault()
    if (placeholderCount && supplierCode && salesChannels.length > 0) {
      let placeholderData: any = []
      for (var i = 0; i < placeholderCount; i++) {
        placeholderData.push({
          productId: `rand${Math.floor(100 + Math.random() * 900)}`,
          description: '',
          'department/Category': 'Household & Pet Food/Pet Foods',
          lineStatus: 'Draft',
          type: 'Placeholder',
          clearancePricing: 'NA',
          clearDepotBy: 'NA',
        })
      }
      console.log(placeholderData)
      if (importedData) {
        setImportedData((prevState: any) => {
          let newData = [...prevState]
          placeholderData.map((d: any) => {
            newData.push(d)
          })
          return newData
        })
      } else {
        setImportedData(placeholderData)
      }
    }
  }

  useEffect(() => {
    console.log(importedData)
  }, [importedData])

  const placeholderProducts = (
    <form style={{ width: '100%' }} onSubmit={submitPlaceholderProducts}>
      <Grid
        item
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{
          alignItems: 'center',
          padding: '10px',
        }}
        spacing={2}
      >
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          How many new lines do you wish to enter?
          <br />
          <input
            type="text"
            required
            className={classes.placeholderCountStyle}
            style={{
              width: small ? '88%' : '100%',
            }}
            value={placeholderCount}
            onChange={(e: any) => setPlaceholderCount(e.target.value)}
          />
        </Grid>

        {/* <Grid item
                    xl={2}
                    lg={2}
                    md={2}
                    sm={6}
                    xs={12}
                >
                    Supplier Code
                    <br />

                    <Dropdown
                        value={supplierCode}
                        options={supplierCodes}
                        onChange={(e: any) => setSupplierCode(e.value)}
                        optionLabel="label"
                        placeholder='--- select ---'
                        className={classes.placeholderSelect}

                    />
                    <input
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ opacity: 0, height: 0 }}
                        value={supplierCode}
                        // onChange={() => {}}
                        required={true}
                    />
                </Grid> 

                <Grid item
                    xl={2}
                    lg={2}
                    md={2}
                    sm={6}
                    xs={12}
                >
                    Sales Channel
                    <br />

                    <MultiSelect
                        value={selectedSalesChannels}
                        options={salesChannels}
                        onChange={(e: any) => setSelectedSalesChannels(e.value)}
                        optionLabel="label"
                        placeholder="--- Select ---"
                        maxSelectedLabels={1}
                        className={classes.placeholderSelect}
                    />
                    <input
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ opacity: 0, height: 0 }}
                        value={selectedSalesChannels}
                        // onChange={() => {}}
                        required={true}
                    />
                </Grid>*/}

        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={6}
          xs={12}
          style={{ textAlign: 'center' }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: '80px' }}
          >
            ADD
          </Button>
        </Grid>
        <Grid
          item
          container
          xl={4}
          lg={4}
          md={4}
          sm={4}
          xs={12}
          spacing={2}
          style={{ paddingLeft: '20px' }}
        >
          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
            OR
          </Grid>
          <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
            <Button
              variant="contained"
              color="primary"
              // type="submit"
              style={{ width: '80px' }}
            >
              Upload File
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )

  const productListTable = (
    <Grid
      item
      container
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      style={{ alignItems: 'center', paddingTop: '20px' }}
      spacing={2}
    >
      <Grid item xl={7} lg={7} md={7} sm={5} xs={12}>
        <Typography variant="subtitle1">Product List</Typography>
      </Grid>
      <Grid item container xl={5} lg={5} md={5} sm={5} xs={12}>
        <Grid item xl={8} lg={8} md={8} sm={8} xs={7}>
          <FormControl
            variant="outlined"
            style={{
              width: '90%',
            }}
          >
            {!bulkActions && (
              <InputLabel
                id="demo-simple-select-outlined-label"
                style={{
                  color: 'white',
                  fontSize: '14px',
                }}
              >
                BULK ACTIONS
              </InputLabel>
            )}

            <Select
              label="Age"
              style={{
                backgroundColor: teal[900],
                height: '40px',
                color: 'white',
                fontSize: '14px',
              }}
              onChange={(e: any) => setBulkActions(e.target.value)}
            >
              {massActions.map((action: any) => {
                return (
                  <MenuItem value={action.value} key={action.value}>
                    {action.label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={5}>
          <Button variant="contained" color="primary">
            Refresh
          </Button>
        </Grid>
      </Grid>

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <DataTable
          value={importedData && importedData}
          className="p-datatable-sm"
          // paginator
          // rows={10}
          // alwaysShowPaginator={false}
          editMode="row"
          selectionMode="checkbox"
          selection={selectedProductListItems}
          onSelectionChange={(e) => setSelectedProductListItems(e.value)}
          emptyMessage="No Events found."
          showGridlines
          scrollable
          lazy
        >
          <Column
            selectionMode="multiple"
            headerStyle={{
              width: '50px',
              color: 'white',
              backgroundColor: teal[900],
            }}
          ></Column>
          {/* <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column> */}
          {productListCols.map((col: any, index: any) => {
            return (
              <Column
                key={index}
                field={col.field}
                header={col.header}
                body={
                  (col.field === 'lineStatus' && lineStatusTemplate) ||
                  (col.field === 'clearancePricing' &&
                    clearancePricingTemplate) ||
                  (col.field === 'clearDepotBy' && clearDepotByTemplate)
                }
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
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <button className={classes.backButton}>
          <Typography variant="subtitle1">View More Columns</Typography>
        </button>
      </Grid>
    </Grid>
  )

  const handlePlaceholderDialogOpen = () => {
    setOpenPlaceholderDialog(true)
  }
  const handlePlaceholderDialogClose = () => {
    setOpenPlaceholderDialog(false)
  }

  const placeholderDialog = (
    <Dialog open={openPlaceholderDialog} onClose={handlePlaceholderDialogClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // width: small ? "600px" : "260px",
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
            <Typography variant="subtitle1">
              Add placeholder Products
            </Typography>
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
              onClick={handlePlaceholderDialogClose}
            >
              <b>X</b>
            </button>
          </Box>
        </Box>
        {placeholderProducts}
      </Box>
    </Dialog>
  )

  return (
    <>
      <Grid container spacing={2} style={{ padding: '20px' }}>
        <Grid
          container
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          spacing={2}
          style={{ paddingBottom: '20px' }}
        >
          <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
            <Typography variant="h6">
              Pending Action -{' '}
              <b>Delists added to the Range Change Management App</b>
            </Typography>
          </Grid>

          <Grid item xl={1} lg={1} md={1} sm={3} xs={5}>
            <button className={classes.backButton}>
              <Typography variant="subtitle1">View Log</Typography>
            </button>
          </Grid>

          <Grid item xl={1} lg={1} md={1} sm={3} xs={3}>
            <button className={classes.backButton}>
              <Typography variant="subtitle1">Back</Typography>
            </button>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <DataTable
            value={delistToRangeData}
            scrollable
            showGridlines
            style={{
              height: '100%',
            }}
            className="p-datatable-sm"
          >
            {delistAddedToRangeCols.map((col: any, index: any) => {
              return (
                <Column
                  key={index}
                  field={col.field}
                  header={col.header}
                  style={{
                    width: col.width,
                    fontSize: '0.9rem',
                    padding: '0.5rem',
                  }}
                  headerStyle={{
                    backgroundColor: teal[900],
                    color: 'white',
                    width: col.width,
                    fontSize: '0.9rem',
                    padding: '0.5rem',
                  }}
                />
              )
            })}
          </DataTable>
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
            alignItems: 'center',
          }}
        >
          <Grid item container xl={4} lg={4} md={4} sm={12} xs={12} spacing={2}>
            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
              {/* <select
                style={{
                  width: '100%',
                  height: '35px',
                }}
                value={actionType}
                onChange={(e: any) => setActionType(e.target.value)}
                required
              >
            
                <option value="Delist MIN">Delist MIN</option>
                <option value="MIN Extension">MIN Extension</option>
                <option value="MIN Restriction">MIN Restriction</option>
                <option value="Space Extension">Space Extension</option>
                <option value="Space Restriction">Space Restriction</option>
                <option value="New MIN">New MIN</option>
                <option value="New PIN">New PIN</option>
                <option value="Delist PIN">Delist PIN</option>
                <option value="Supplier Change">New Ingredient MIN</option>
                <option value="Supplier Change">Delist Ingredient MIN</option>
                <option value="Supplier Change">Supplier Change</option>
              </select> */}

              <AutocompleteSelect
                value={actionType}
                options={actionTypes}
                onChange={handleActionType}
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleActionTypeDialogOpen}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          <Grid item xl={1} lg={1} md={1} sm={1} xs={12}>
            OR
          </Grid>
          <Grid item xl={2} lg={2} md={2} sm={2} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadDialogOpen}
            >
              Upload File
            </Button>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
            <button
              className={classes.backButton}
              onClick={handlePlaceholderDialogOpen}
            >
              <Typography variant="subtitle1">
                Add placeholder products
              </Typography>
            </button>
          </Grid>
        </Grid>

        {/* <Grid item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >

                    <FormControl>
                        <RadioGroup
                            name="delistAddedToRange"
                            value={productType}
                            onChange={handleProductTypeChange}
                            style={{ display: "inline" }}>

                            <FormControlLabel value="existingProducts" control={radio} label="Existing Products" />
                            <FormControlLabel value="newProducts" control={radio} label="New Products" />
                            <FormControlLabel value="placeholderProducts" control={radio} label="Placeholder Products" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    {
                        productType &&
                            productType === "existingProducts" ?
                            existingProducts
                            :
                            productType === "newProducts" ?
                                newProducts
                                :
                                productType === "placeholderProducts" &&
                                placeholderProducts
                    }
                </Grid> */}

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          {importedData && productListTable}
        </Grid>

        {importedData && (
          <Grid item container xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}></Grid>
            <Grid
              item
              container
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              style={{ textAlign: 'center' }}
              spacing={2}
            >
              <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                <Button variant="contained" color="primary">
                  Submit Draft
                </Button>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                <Button variant="contained" color="primary" disabled>
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      {uploadDialog}
      {actionTypeDialog}
      {placeholderDialog}
    </>
  )
}

export default DelistsAddedToRange
