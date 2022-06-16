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
  Tooltip,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { teal } from '@material-ui/core/colors'
import { SearchOutlined } from '@material-ui/icons'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
// import { RiFileExcel2Fill } from 'react-icons/ri'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import React, { useState, useEffect, useRef } from 'react'
import { tableBodyStyle, tableHeaderStyle, useStyles } from './styles'
import {
  actionTypes,
  delistAddedToRangeCols,
  delistExistingProductsCols,
  massActions,
  productListCols,
  salesChannels,
  delistToRangeData,
  placeholderCols,
  lineStatusOptions,
  yesOrNo,
  supplierCodeOptions,
  replacementAssociationCols,
  supplierSearchSiteCode_Site,
  supplierCode_Supplier,
  // supplierCodes
} from './DataConstants'
// import TextFieldWithSearch from './sections/TextFieldWithSearch/TextFieldWithSearch'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import AutocompleteSelect from '../../components/AutoCompleteSelect/AutocompleteSelect'
import Autocomplete from '@material-ui/lab/Autocomplete'
import DialogHeader from '../../components/DialogHeader/DialogHeader'
import ConfirmCheckSign from '../../components/ConfirmCheck/ConfirmCheckSign'
import {
  getConfigType,
  getRangeByRangeResetId,
  getProductServiceByItemnumber,
  getProductSupplierServiceByItemnumber,
  getSupplierServiceBySupplierId,
  getProductCompositionServiceByItemnumber,
} from '../../../api/Fetch'
import { life } from '../../../util/Constants'
import { allMessages } from '../../../util/Messages'
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent'
import { Toast } from 'primereact/toast'
import SearchSelect from '../../components/SearchSelect/SearchSelect'
// const useStyles = makeStyles((theme: any) => {
//   return {
//     backButton: {
//       border: 0,
//       color: 'blue',
//       backgroundColor: 'white',
//       cursor: 'pointer',
//       fontSize: '18px',
//     },
//     uploadTextfield: {
//       [theme.breakpoints.up('sm')]: {
//         width: 200,
//       },
//       [theme.breakpoints.down('sm')]: {
//         width: 100,
//       },

//       height: '32px',
//       cursor: 'pointer',
//     },
//     uploadButton: {
//       width: 100,
//       height: '32px',
//       cursor: 'pointer',
//       backgroundColor: teal[900],
//       color: 'white',
//     },
//     dialogTitle: {
//       backgroundColor: theme.palette.primary.main,
//       color: 'white',
//       alignItems: 'baseline',
//     },
//     dialogCloseButton: {
//       color: '#ff5252',
//       backgroundColor: theme.palette.primary.main,
//       fontSize: '18px',
//       '&:hover': {
//         color: '#d50000',
//         backgroundColor: '#00e676',
//         cursor: 'pointer',
//         borderRadius: 10,
//       },
//     },
//     submitButtons: {
//       width: 'auto',
//       backgroundColor: teal[900],
//       color: 'white',
//       height: 40,
//       '&:hover': {
//         backgroundColor: teal[600],
//         color: 'white',
//       },
//     },
//     placeholderCountStyle: {
//       borderTop: 'none',
//       borderLeft: 'none',
//       borderRight: 'none',
//       fontSize: '1rem',
//       padding: '10px',
//       marginTop: '5px',
//     },
//     placeholderSelect: {
//       width: '100%',
//       fontSize: '1rem',
//       padding: '5px',
//       marginTop: '5px',
//     },
//     addActionFields: {
//       height: '40px',
//       width: '100%',
//     },
//   }
// })

function DelistsAddedToRange() {
  const classes = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.up('md'))
  const radio = <Radio color="primary" />

  const [productType, setProductType] = useState<any>('existingProducts')
  const [eventDetails, setEventDetails] = useState<any>(delistToRangeData)
  const [actionType, setActionType] = useState<any>()
  const [actionTypeSelected, setActionTypeSelected] = useState<any>()
  const [actionTypeOptions, setActionTypeOptions] = useState<any>()
  const [min, setMin] = useState<any>('')
  const [existingSearchFields, setExistingSearchFields] = useState<any>()
  const [productId, setProductId] = useState<any>('')
  const [noOfStores, setNoOfStores] = useState<any>('')
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
  const [placeholderProducts, setPlaceholderProducts] = useState<any>([])
  const [replacementAssociationProduct, setReplacementAssociationProduct] =
    useState<any>([])
  const [newProductId, setNewProductId] = useState<any>('')
  const [selectedProductListItems, setSelectedProductListItems] =
    useState<any>()
  const [bulkActions, setBulkActions] = useState<any>()
  const [openActionTypeDialog, setOpenActionTypeDialog] = useState(false)

  const [replaceMinOrPin, setReplaceMinOrPin] = useState<any>('')
  const [fromDate, setFromDate] = useState<any>()
  const [toDate, setToDate] = useState<any>()
  const [addStoreCode, setAddStoreCode] = useState<any>('')
  const [comments, setComments] = useState<any>('')
  const [openPlaceholderDialog, setOpenPlaceholderDialog] = useState(false)
  const [openPlaceholderUpload, setOpenPlaceholderUpload] = useState(false)
  const [placeholderFile, setPlaceholderFile] = useState<any>()

  const [selectedPlaceholderData, setSelectedPlaceholderData] = useState<any>(
    []
  )
  const [selectedReplaceAssData, setSelectedReplaceAssData] = useState<any>([])
  const toast = useRef<any>(null)
  const [toastRemove, setToastRemove] = React.useState('')
  const [barCodeDoesnotExists, setBarCodeDoesnotExists] = useState<any>([])
  const [isProgressLoader, setIsProgressLoader] = useState(false)
  const [barCodeExists, setBarCodeExists] = useState<any>([])
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2022-05-18T21:11:54')
  )
  const [replaceError, setReplaceError] = useState<any>(false)
  const [replaceErrorMsg, setReplaceErrorMsg] = useState<any>(false)
  // const stylesInp = {
  //   container: {
  //     width: '1000px',
  //   },
  //   '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
  //     padding: '0px',
  //   },
  // }

  useEffect(() => {
    getRangeByRangeResetId('2220')
      .then((res: any) => {
        console.log(res.data.items)
        if (res.data.items.length > 0) {
          const data = res.data.items.map((item: any) => {
            return {
              actionType: item.type,
              itemNumber: item.itemNumber,
              description: item.description,
              lineStatus: 'Draft',
              comments: comments,
            }
          })
          setImportedData(data)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])

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

  const existingSupplierProductListTemplate = (rowData: any) => {
    return <span>{rowData.existingSupplier}</span>
  }

  const ingredientMinTemplate = (rowData: any) => {
    console.log('ingredientMinTemplate', rowData)
    if (
      rowData.actionType === 'Delist MIN' ||
      rowData.actionType === 'Derange'
    ) {
      return (
        <a href="#" style={{ color: '#0074cc' }}>
          <span>{rowData.ingredientMin}</span>
        </a>
      )
    } else {
      return <span>{rowData.ingredientMin}</span>
    }
  }

  useEffect(() => {
    getConfigType('Action Type').then((res: any) => {
      const actionOptions = res.data.map((actionType: any) => {
        return {
          label: actionType.configValue,
          value: actionType.configValue,
        }
      })
      console.log(actionOptions)
      setActionTypeOptions(actionOptions)
    })
  }, [])

  const handleActionType = (e: any) => {
    if (e) {
      setActionType(e)
      setActionTypeSelected(e.value)
      console.log('ACTION TYPE', e)
    } else {
      setActionType('')
    }
  }

  const handleBulkActions = (e: any) => {
    if (e) {
      setBulkActions(e)
    } else {
      setBulkActions('')
    }
  }

  const handleUploadDialogOpen = () => {
    actionType && setOpenUploadDialog(true)
  }

  const handleUploadDialogClose = () => {
    setOpenUploadDialog(false)
    setUploadedFile(null)
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
          const data1 = xlsx.utils.sheet_to_json(ws, { header: 1 })
          const cols: any = data1[0]

          const json = JSON.parse(
            // JSON.stringify(data).replace(/ /g, '_')
            JSON.stringify(data).replace(/"\s+|\s+"/g, '"')
          )

          const convert = (obj: any) => {
            const result: any = {}
            Object.keys(obj).forEach(function (key: any) {
              result[key.replace(/ /g, '_')] = obj[key]
            })
            return result
          }

          var result = json.map(function (o: any) {
            return convert(o)
          })
          console.log('trimSpace', result)

          let newData = result.map((d: any, index: any) => {
            if (d.Action_Type && d.Action_Type === 'Delist MIN') {
              getAndCheckItemNumber(
                d.MIN,
                'Delist MIN',
                index + 1,
                d.Comments,
                'NA',
                'NA'
              )
              // return {
              //   actionType: d.Action_Type ? d.Action_Type : '',
              //   min: d.MIN ? d.MIN : '',
              //   comments: d.Comments ? d.Comments : '',
              //   lineStatus: 'Request For Stock Count',
              //   man: 'NA',
              //   ingredientMin: 'NA',
              //   pin: '111111',
              //   description: 'Blahh Blahh',
              //   replaceMin: 'NA',
              //   replaceMinDescription: 'NA',
              //   existingSupplier: 'Futura-1001098',
              //   existingSupplierSite: 'Tetbury-9866',
              //   numberOfRangeStores: 'NA',
              //   storeCode: 'NA',
              // }
            } else if (d.Action_Type && d.Action_Type === 'New MIN') {
              getAndCheckItemNumber(
                d.MIN,
                'New MIN',
                index + 1,
                d.Comments,
                d.New_Number_of_Range_Stores,
                d.Store_Code
              )
              // return {
              //   actionType: d[cols[0]] ? d[cols[0]] : '',
              //   min: d[cols[1]] ? d[cols[1]] : '',
              //   numberOfRangeStores: d[cols[2]] ? d[cols[2]] : '',
              //   storeCode: d[cols[3]] ? d[cols[3]] : '',
              //   comments: d[cols[4]] ? d[cols[4]] : '',
              //   lineStatus: 'Draft',
              //   man: 'NA',
              //   ingredientMin: 'NA',
              //   pin: '111111',
              //   description: 'Blahh Blahh',
              //   replaceMin: 'NA',
              //   replaceMinDescription: 'NA',
              //   existingSupplier: 'Futura-1001098',
              //   existingSupplierSite: 'Tetbury-9866',
              // }
            }
            // else if (
            //   d.Action_Type &&
            //   d.Action_Type === 'Delist Ingredient MIN'
            // ) {
            //   getAndCheckItemNumber(
            //     d.MIN,
            //     'Delist Ingredient MIN',
            //     index + 1,
            //     d.Comments,
            //     'NA',
            //     'NA'
            //   )
            // } else if (
            //   d.Action_Type &&
            //   d.Action_Type === 'New Ingredient MIN'
            // ) {
            //   getAndCheckItemNumber(
            //     d.MIN,
            //     'New Ingredient MIN',
            //     index + 1,
            //     d.Comments,
            //     'NA',
            //     'NA'
            //   )
            // }
          })

          // console.log(newData)
          // if (importedData && importedData.length > 0) {
          //   setImportedData((prevState: any) => {
          //     return [...prevState, ...newData]
          //   })
          // } else {
          //   setImportedData([...newData])
          // }
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
        <DialogHeader
          title={`Upload ${actionType && actionType.value}`}
          onClose={handleUploadDialogClose}
        />

        <Box sx={{ p: 1 }}>
          <Typography variant="body2" color="primary">
            Upload {actionType && actionType.value}
          </Typography>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
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
              style={{ width: '60%' }}
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
            <Typography color="primary">
              Supported file type in MS Excel
              <i className="pi pi-file-excel" style={{ fontSize: '18px' }}></i>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            p: 3,
            justifyContent: 'right',
          }}
        >
          <Button
            //   className={classes.submitButtons}
            variant="contained"
            color="primary"
            onClick={handleUpload}
          >
            Select
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const handleActionTypeDialogOpen = () => {
    actionType && setOpenActionTypeDialog(true)
  }

  const handleActionTypeDialogClose = () => {
    setOpenActionTypeDialog(false)
    setMin('')
    setComments('')
    setNoOfStores('')
    setStoreCode('')
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
      min ||
      replaceMinOrPin ||
      fromDate ||
      toDate ||
      addStoreCode ||
      comments
    ) {
      if (actionType && actionType.value !== 'Derange MIN') {
        let addData = {
          'action/type': actionType && actionType,
          'min/pin': min && min,
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
          setImportedData((prevState: any) => {
            let newData = [...prevState]
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
  // console.log('minValue', minValue)
  // getProductServiceByItemnumber &&
  //   getProductServiceByItemnumber(minValue)
  //     .then((res: any) => {
  //       console.log('Item res 100001498', res)
  //     })
  //     .catch((err: any) => {
  //       console.log('Item err 100001498', err)
  //     })

  const renderApiCall = (
    values: any,
    supplierV1: any,
    minValue: any,
    type: any,
    comment: any,
    newnoofrangestoreNewMin: any,
    storecodeNewMin: any
  ) => {
    const formData: any = {
      min: min !== '' ? min : minValue,
      pin: '',
      packquantity: '',
      description: '',
      actionType: type,
      legacyItemNumbers: '',
      supplierId: '',
      comments: comments,
      storeCode: 'NA',
      numberOfRangeStores: 'NA',
      lineStatus:
        actionTypeSelected === 'Delist Product (MIN)'
          ? 'Request For Stock Count'
          : 'Draft',
      ingredientMin: 'NA',
      man: '',
    }
    console.log('values-promise.allSettled', values)
    values.map((val: any) => {
      if (val.status === 'rejected') {
        setIsProgressLoader(false)
        return
      } else {
        console.log('FULLFILLED', val.statu)
      }
    })
    formData.pin = values[0].value.data.packs[0].packNumber //pin
    formData.man = values[0].value.data.parentItemNumber // parentItemNumber
    formData.packquantity = parseInt(values[0].value.data.packs[0].packQuantity) // Packquantity
    formData.description = values[0].value.data.itemDescription // itemDescription
    formData.legacyItemNumbers = values[0].value.data.legacyItemNumbers //legacyItemNumbers
    formData.supplierId = supplierV1

    if (type === 'Delist MIN') {
      formData.comments = comments === '' ? comment : comments
      formData.ingredientMin = parseInt(values[0].value.data.ingredients.length)
    }
    if (type === 'New MIN') {
      formData.storeCode = storecodeNewMin
      formData.numberOfRangeStores = newnoofrangestoreNewMin
      formData.comments = comments === '' ? comment : comments
    }
    if (type === 'Delist Ingredient MIN') {
      formData.comments = comments === '' ? comment : comments
    }
    if (type === 'New Ingredient MIN') {
      formData.comments = comments === '' ? comment : comments
    }

    if (importedData && importedData.length > 0) {
      setImportedData((prevState: any) => {
        return [...prevState, formData]
      })
    } else {
      setImportedData([formData])
    }
    console.log('formData', formData)
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: `${minValue} ${allMessages.success.itemIdSuccess}`,
      life: life,
      className: 'login-toast',
    })
    setIsProgressLoader(false)
    setActionType('')
  }

  const getAndCheckItemNumber = (
    minValue: any,
    type: any,
    index: any,
    comment: any,
    newnoofrangestoreNewMin: any,
    storecodeNewMin: any
  ) => {
    setIsProgressLoader(true)
    const formData: any = {
      min: min !== '' ? min : minValue,
      pin: '',
      packquantity: '',
      description: '',
      actionType: type,
      legacyItemNumbers: '',
      supplierId: '',
      comments: comments,
      storeCode: 'NA',
      numberOfRangeStores: 'NA',
      lineStatus:
        actionTypeSelected === 'Delist Product (MIN)'
          ? 'Request For Stock Count'
          : 'Draft',
      ingredientMin: 'NA',
      man: '',
    }

    Promise.allSettled([
      //Dont change sequence order below api calls
      getProductServiceByItemnumber(minValue),
      getRangeByRangeResetId('2220'),
      getProductSupplierServiceByItemnumber(minValue),
    ])
      .then((values: any) => {
        console.log('promise1, promise2', values)

        const [rREventId, productV1, ProductSupp] = values
        let values3Supplier = values[2].value.data
        getSupplierServiceBySupplierId(
          values3Supplier.itemSuppliers[0].supplierId
        )
          .then((res: any) => {
            console.log('Nested APi Success ', res)
            let supplierV1 = res.data.supplierName
            renderApiCall(
              values,
              supplierV1,
              minValue,
              type,
              comment,
              newnoofrangestoreNewMin,
              storecodeNewMin
            )
          })
          .catch((err: any) => {
            setIsProgressLoader(false)
            renderApiCall(
              values,
              'No data found',
              minValue,
              type,
              comment,
              newnoofrangestoreNewMin,
              storecodeNewMin
            )
            console.log('Nested APi Error', err)
          })
      })
      .catch((err: any) => {
        setIsProgressLoader(false)
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: `${minValue} ${allMessages.error.itemIdError}`,
          life: life,
          className: 'login-toast',
        })

        console.log('promise1, ERRor', err)
      })
  }

  const handleManualRAF = () => {
    if (min === '') {
      handleActionTypeDialogOpen()
      return
    }
    console.log('clicked')

    handleActionTypeDialogClose()
    // return
    if (actionType.value === 'Delist Product (MIN)') {
      if (min !== '') {
        console.log('hello')
        getAndCheckItemNumber(min, 'Delist MIN', '', '', 'NA', 'NA')
        // const formData = {
        //   actionType: actionType.value,
        //   itemNumber: min,
        //   comments: comments,
        //   lineStatus: 'Request For Stock Count',
        //   man: 'NA',
        //   ingredientMin: 'NA',
        //   pin: '111111',
        //   description: 'Blahh Blahh',
        //   replaceMin: 'NA',
        //   replaceMinDescription: 'NA',
        //   existingSupplier: 'Futura-1001098',
        //   existingSupplierSite: 'Tetbury-9866',
        //   numberOfRangeStores: 'NA',
        //   storeCode: 'NA',
        // }
        // if (importedData && importedData.length > 0) {
        //   setImportedData((prevState: any) => {
        //     return [...prevState, formData]
        //   })
        // } else {
        //   setImportedData([formData])
        // }
      }
    } else if (actionType.value === 'New Product (MIN)') {
      if (min !== '') {
        console.log('hello')
        getAndCheckItemNumber(min, 'New MIN', '', '', '', '')
        // const formData = {
        //   actionType: actionType.value,
        //   min: min,
        //   comments: comments,
        //   lineStatus: 'Draft',
        //   man: 'NA',
        //   ingredientMin: 'NA',
        //   pin: '111111',
        //   description: 'Blahh Blahh',
        //   replaceMin: 'NA',
        //   replaceMinDescription: 'NA',
        //   existingSupplier: 'Futura-1001098',
        //   existingSupplierSite: 'Tetbury-9866',
        //   numberOfRangeStores: noOfStores ? noOfStores : 'NA',
        //   storeCode: storeCode ? storeCode : 'NA',
        // }
        // if (importedData && importedData.length > 0) {
        //   setImportedData((prevState: any) => {
        //     return [...prevState, formData]
        //   })
        // } else {
        //   setImportedData([formData])
        // }
      }
    } else if (actionType.value === 'Delist Ingredient (MIN)') {
      getAndCheckItemNumber(min, 'Delist Ingredient MIN', '', '', 'NA', 'NA')
    } else if (actionType.value === 'New Ingredient (MIN)') {
      getAndCheckItemNumber(min, 'New Ingredient MIN', '', '', 'NA', 'NA')
    }
  }

  const handleProductListSave = () => {
    console.log('handleProductListSave', importedData)
  }

  const actionTypeDialog = (
    <Dialog
      open={openActionTypeDialog}
      onClose={handleActionTypeDialogClose}
      fullWidth
      classes={{ paperFullWidth: classes.placeholderDialog }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          //   width: small ? '500px' : '260px',
          // height: "250px",
          border: '3px solid green',
          borderRadius: 5,
          padding: '10px',
        }}
      >
        {/* <Box
          sx={{
            display: 'flex',
            height: 30,
            flexDirection: 'row',
            borderRadius: 10,
          }}
          //   className={classes.dialogTitle}
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
              //   className={classes.dialogCloseButton}
              onClick={handleActionTypeDialogClose}
            >
              <b>X</b>
            </button>
          </Box>
        </Box> */}
        <DialogHeader
          title={`Add ${actionType && actionType.value}`}
          onClose={handleActionTypeDialogClose}
        />

        {/* <Box sx={{ p: 1 }}>
          <Typography variant="body2">Add {actionType}</Typography>
        </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <table cellPadding={'10px'}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                        // className={classes.addActionFields}
                        size="small"
                        value={min}
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
                        // className={classes.addActionFields}
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
                      
                    </th>
                  </tr>

                  {actionType === 'Derange MIN' && (
                    <tr>
                      <th>Store Code</th>
                      <th>
                        <TextField
                          variant="outlined"
                          //   className={classes.addActionFields}
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
                        // className={classes.addActionFields}
                        size="small"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      />
                    </th>
                  </tr>
                </thead>
              </MuiPickersUtilsProvider>

            </table>
          </Box>

          <Box
            sx={{
              display: 'flex',
              p: 3,
              justifyContent: 'right',
            }}
          >
            <Button
              // className={classes.submitButtons}
              type="submit"
            >
              Add
            </Button>
          </Box> */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle2" color="primary">
              {`Add ${actionType && actionType.value}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              p: 1,
              width: '100%',
            }}
          >
            {actionType && actionType.value === 'Delist Product (MIN)' && (
              <>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Delist Product (MIN)
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Comments
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
              </>
            )}

            {actionType && actionType.value === 'New Product (MIN)' && (
              <>
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      New Product (MIN)
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      New no. of Range Stores
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={noOfStores}
                        onChange={(e: any) => setNoOfStores(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={noOfStores}
                        onChange={(e: any) => setNoOfStores(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Store Code
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                        placeholder="--Select--"
                        value={storeCode}
                        onChange={(e: any) => setStoreCode(e.target.value)}
                        style={{ width: '160px' }}
                      >
                        <option value="001">Store-001</option>
                      </select> */}

                      <Select
                        value={storeCode}
                        onChange={(e) => setStoreCode(e.target.value)}
                        input={
                          <OutlinedInput
                            margin="dense"
                            className={classes.inputFields}
                          />
                        }
                      >
                        <MenuItem
                          value={'001'}
                          // key={type.id}
                          className={classes.muiSelect}
                        >
                          Store-001
                        </MenuItem>
                      </Select>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Comments
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
            {actionType && actionType.value === 'Delist Ingredient (MIN)' && (
              <>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Delist Ingredient (MIN)
                      <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Comments
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
            {actionType && actionType.value === 'New Ingredient (MIN)' && (
              <>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      New Ingredient (MIN)
                      <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Comments
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Box sx={{ p: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleManualRAF} //De-list save
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
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
                  // style={{
                  //   width: col.width,
                  //   fontSize: '0.9rem',
                  //   padding: '0.5rem',
                  // }}
                  // headerStyle={{
                  //   backgroundColor: teal[900],
                  //   color: 'white',
                  //   width: col.width,
                  //   fontSize: '0.9rem',
                  //   padding: '0.5rem',
                  // }}
                  bodyStyle={tableBodyStyle(col.width)}
                  headerStyle={tableHeaderStyle(
                    col.width,
                    theme.palette.primary.main
                  )}
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
            // className={classes.placeholderCountStyle}
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
    console.log('importedData', importedData)
  }, [importedData])

  //   const placeholderProducts = (
  //     <Grid
  //       item
  //       container
  //       xl={12}
  //       lg={12}
  //       md={12}
  //       sm={12}
  //       xs={12}
  //       style={{
  //         alignItems: 'center',
  //         padding: '10px',
  //       }}
  //       spacing={2}
  //     >
  //       <Grid item container md={7} sm={12} xs={12}>
  //         <Grid item xs={8}>
  //           <Typography variant="subtitle2" color="primary">
  //             How many new lines do you wish to enter?
  //             <br />
  //             <input
  //               type="text"
  //               required
  //               // className={classes.placeholderCountStyle}
  //               style={{
  //                 width: small ? '88%' : '100%',
  //               }}
  //               value={placeholderCount}
  //               onChange={(e: any) => setPlaceholderCount(e.target.value)}
  //             />
  //           </Typography>
  //         </Grid>
  //         <Grid
  //           item
  //           //   xl={2}
  //           //   lg={2}
  //           //   md={2}
  //           //   sm={6}
  //           xs={4}
  //           style={{ textAlign: 'center' }}
  //         >
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             type="submit"
  //             style={{ width: '80px' }}
  //           >
  //             ADD
  //           </Button>
  //         </Grid>
  //       </Grid>

  //       <Grid item sm={1} xs={12}>
  //         <Typography variant="subtitle2" color="primary">
  //           OR
  //         </Typography>
  //       </Grid>
  //       <Grid item md={3} sm={12} xs={12}>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           // type="submit"
  //           // style={{ width: '80px' }}
  //         >
  //           Upload File
  //         </Button>
  //       </Grid>
  //     </Grid>
  //   )

  const handleTableStatusChange = (rowData: any, e: any) => {
    let newData: any = []
    importedData.map((d: any) => {
      if (d.min === rowData.min) {
        let selectValue = d
        selectValue.lineStatus = e.target.value
        newData.push(selectValue)
      } else {
        newData.push(d)
      }
    })
    console.log(newData)
    setImportedData(newData)
  }

  const lineStatusTemplate = (rowData: any) => {
    // return (
    //   <select
    //     value={rowData !== undefined ? rowData.lineStatus : 'Draft'}
    //     onChange={(e: any) => handleTableStatusChange(rowData, e)}
    //   >
    //     {lineStatusOptions.map((status: any) => {
    //       return (
    //         <option value={status.value} key={status.value}>
    //           {status.label}
    //         </option>
    //       )
    //     })}
    //   </select>
    // )
    return (
      <Select
        value={rowData.lineStatus}
        onChange={(e: any) => handleTableStatusChange(rowData, e)}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {lineStatusOptions.map((type) => {
          return (
            <MenuItem value={type.value} key={type.value}>
              {type.label}
            </MenuItem>
          )
        })}
      </Select>
    )
  }

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
        <Typography variant="subtitle1" color="primary">
          Product List
        </Typography>
      </Grid>
      <Grid item container xl={5} lg={5} md={5} sm={5} xs={12} spacing={2}>
        <Grid item xl={8} lg={8} md={8} sm={8} xs={7}>
          {/* <FormControl
            variant="outlined"
            style={{
              width: '90%',
            }}
          > */}
          {/* {!bulkActions && (
              <InputLabel
                id="demo-simple-select-outlined-label"
                style={{
                  color: 'white',
                  fontSize: '14px',
                }}
              >
                BULK ACTIONS
              </InputLabel>
            )} */}
          {/* <InputLabel>Bulk Actions</InputLabel>

            <Select
              value={bulkActions}
              // displayEmpty
              // inputProps={{ 'aria-label': 'Without label' }}
              onChange={(e: any) => setBulkActions(e.target.value)}
              className={classes.bulkActionSelect}
              // input={
              //   <OutlinedInput
              //     margin="dense"
              //     className={classes.bulkActionSelect}
              //     placeholder="BULK ACTIONS"
              //   />
              // }
            >
              
              {massActions.map((action: any) => {
                return (
                  <MenuItem value={action.value} key={action.value}>
                    {action.label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl> */}
          <Typography color="primary">
            <AutocompleteSelect
              value={bulkActions}
              options={massActions}
              onChange={handleBulkActions}
              placeholder="Bulk Actions"
            />
          </Typography>
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
          // editMode="cell"
          selectionMode="checkbox"
          selection={selectedProductListItems}
          onSelectionChange={(e: any) => {
            setSelectedProductListItems(e.value)
            setReplacementAssociationProduct(e.value)
          }}
          showGridlines
          scrollable
          rowHover
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
                  (col.field === 'ingredientMin' && ingredientMinTemplate) ||
                  (col.field === 'clearDepotBy' && clearDepotByTemplate) ||
                  (col.field === 'existingSupplier' &&
                    existingSupplierProductListTemplate)
                }
                // style={{
                //   width: col.width,
                //   fontSize: '0.8rem',
                //   padding: '8px',
                // }}
                // headerStyle={{
                //   color: 'white',
                //   backgroundColor: teal[900],
                //   width: col.width,
                //   fontSize: '0.9rem',
                //   padding: '8px',
                // }}
                bodyStyle={tableBodyStyle(col.width)}
                headerStyle={tableHeaderStyle(
                  col.width,
                  theme.palette.primary.main
                )}
              />
            )
          })}
        </DataTable>
      </Grid>
      {/* <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <button
        //  className={classes.backButton}
        >
          <Typography variant="subtitle1">View More Columns</Typography>
        </button>
      </Grid> */}
    </Grid>
  )

  const handlePlaceholderDialogOpen = () => {
    setOpenPlaceholderDialog(true)
  }
  const handlePlaceholderDialogClose = () => {
    setOpenPlaceholderDialog(false)
  }

  const [openReplacementAssDialog, setOpenReplacementAssDialog] =
    useState(false)

  const handleReplacemantAssociationDialogOpen = () => {
    setOpenReplacementAssDialog(true)
  }
  const handleReplacemantAssociationDialogClose = () => {
    setOpenReplacementAssDialog(false)
  }

  console.log('placeholderProducts CHeck', placeholderProducts)

  const handlePlaceholderAdd = (count: any) => {
    if (count != 0) {
      console.log('adding ', count)
      const newData: any = []
      for (var i = 0; i < count; i++) {
        var min = 1000000000000
        var max = 9999999999999
        var rand = Math.floor(min + Math.random() * (max - min))

        newData.push({
          _idCheck: rand,
          actionType: 'Placeholder MIN',
          min: '',
          comments: '',
          lineStatus: 'Draft',
          man: 'NA',
          ingredientMin: 'NA',
          pin: 'NA    ',
          description: '',
          replaceMin: 'NA',
          replaceMinDescription: 'NA',
          existingSupplier: '',
          existingSupplierSite: '',
          numberOfRangeStores: '',
          storeCode: '',
          ownBrand: 'Y',
          barcode: i === 0 ? '5010228012933' : '501022801293' + i,
          packquantity: '',
          local: 'Y',
          onlineCFC: 'Y',
          onlineStorePick: 'Y',
          wholesale: 'Y',
        })
      }

      console.log(newData)
      if (placeholderProducts && placeholderProducts.length > 0) {
        setPlaceholderProducts((prevState: any) => {
          return [...prevState, ...newData]
        })
      } else {
        setPlaceholderProducts(newData)
      }
    }
  }
  const handleReplacementAssAdd = (count: any) => {
    if (count != 0) {
      console.log('adding ', count)
      const newData: any = []
      for (var i = 0; i < count; i++) {
        var min = 1000000000000
        var max = 9999999999999
        var rand = Math.floor(min + Math.random() * (max - min))

        newData.push({
          delist_min_pin: '111913101',
          replace_min_pin: '148759650',
          effectivedatefrom: '12/02/2022',
          effectivedateto: '12/02/2022',
          comments: 'Hello',
        })
      }

      console.log(newData)
      if (
        replacementAssociationProduct &&
        replacementAssociationProduct.length > 0
      ) {
        setReplacementAssociationProduct((prevState: any) => {
          return [...prevState, ...newData]
        })
      } else {
        setReplacementAssociationProduct(newData)
      }
    }
  }

  // const removeReplaceAssociate = () => {
  //   let _tasks = replacementAssociationProduct.filter(
  //     (value: any) => !selectedReplaceAssData.includes(value)
  //   )
  //   console.log(_tasks)
  //   setReplacementAssociationProduct(_tasks)
  //   setSelectedReplaceAssData(null)
  // }

  useEffect(() => {
    console.log('selectedReplaceAssData', selectedReplaceAssData)
  }, [selectedReplaceAssData])

  const removePlaceholder = () => {
    if (
      selectedPlaceholderData.length < 1 ||
      selectedPlaceholderData === null
    ) {
      return
    }

    setIsProgressLoader(true)
    let _tasks = placeholderProducts.filter(
      (value: any) => !selectedPlaceholderData.includes(value)
    )

    // let _bar = barCodeExists.map((val: any) => {
    //   return selectedPlaceholderData.filter((fil: any) => {
    //     return val.barcode !== fil.barcode
    //   })
    // })
    // if (_bar && _bar.length > 0 && _bar[0].length === 0) {
    //   setBarCodeExists([])
    // }

    let barExistsUniq = barCodeExists.filter((array: any) => {
      return selectedPlaceholderData.some((filter: any) => {
        return array.barcode != filter.barcode
      })
    })

    console.log(_tasks)
    console.log(barExistsUniq)
    setBarCodeExists(barExistsUniq)
    // setBarCodeDoesnotExists(_bar)
    setPlaceholderProducts(_tasks)
    setSelectedPlaceholderData(null)
    setTimeout(() => {
      setIsProgressLoader(false)
    }, 1000)
  }

  useEffect(() => {
    console.log('barCodeExists', barCodeExists)
    console.log('barCodeDoesnotExists', barCodeDoesnotExists)
  }, [barCodeExists, barCodeDoesnotExists])

  const handlePlaceholderSave = () => {
    setIsProgressLoader(true)
    let arrEmpty: any = []
    setBarCodeExists(arrEmpty)
    setBarCodeDoesnotExists(arrEmpty)

    placeholderProducts.map((val: any) => {
      getProductServiceByItemnumber(val.barcode)
        .then((res: any) => {
          console.log('Success', res)
          setBarCodeExists((prevState: any) => {
            return [
              ...prevState,
              {
                barcode: res.data.gtins[0].id,
                minNum: res.data.itemNumber,
              },
            ]
          })
        })
        .catch((err: any) => {
          console.log('ERror')
          setBarCodeDoesnotExists((prevState: any) => {
            return [
              ...prevState,
              {
                barcode: val.barcode,
              },
            ]
          })
        })
    })
    setTimeout(() => {
      setIsProgressLoader(false)
    }, 1000)
    if (barCodeDoesnotExists.length === placeholderProducts.length) {
      handlePlaceholderDialogClose()

      setPlaceholderCount('')
      setPlaceholderProducts([])
      setBarCodeExists(arrEmpty)
      setBarCodeDoesnotExists(arrEmpty)
      if (importedData && importedData.length > 0) {
        let newData = [...importedData, ...placeholderProducts]
        console.log(newData)
        setImportedData(newData)
      } else {
        setImportedData(placeholderProducts)
      }
    }
  }

  const handlePlaceholderUploadOpen = () => {
    setOpenPlaceholderUpload(true)
  }
  const handlePlaceholderUploadClose = () => {
    setOpenPlaceholderUpload(false)
    setPlaceholderFile('')
  }

  const handlePlaceholderUpload = (event: any) => {
    setPlaceholderFile(event.target.files[0])
  }
  const handlePlaceholderFileUpload = () => {
    console.log('handlePlaceholderFileUpload', 'Clicked')
    if (
      placeholderFile &&
      (placeholderFile.type === 'text/csv' ||
        placeholderFile.type === 'application/vnd.ms-excel' ||
        placeholderFile.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      console.log(placeholderFile)
      import('xlsx').then((xlsx) => {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          const wb = xlsx.read(event.target.result, { type: 'array' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = xlsx.utils.sheet_to_json(ws)
          console.log(data)
          const data1 = xlsx.utils.sheet_to_json(ws, { header: 1 })
          const cols: any = data1[0]

          let newData = data.map((d: any, index: any) => {
            var min = 1000000000000
            var max = 9999999999999
            var rand = Math.floor(min + Math.random() * (max - min))
            return {
              _idCheck: rand,
              actionType: 'Placeholder MIN',
              min: `0${index}00${index}`,
              comments: d[cols[12]] ? d[cols[12]] : '',
              lineStatus: 'Draft',
              man: 'NA',
              ingredientMin: 'NA',
              pin: 'NA    ',
              description: d[cols[0]] ? d[cols[0]] : '',
              replaceMin: 'NA',
              replaceMinDescription: 'NA',
              existingSupplier: d[cols[3]] ? d[cols[3]] : '',
              existingSupplierSite: d[cols[4]] ? d[cols[4]] : '',
              numberOfRangeStores: d[cols[6]] ? d[cols[6]] : '',
              storeCode: d[cols[7]] ? d[cols[7]] : '',
              ownBrand: d[cols[1]] ? d[cols[1]] : '',
              barcode: d[cols[2]] ? d[cols[2]] : '',
              packquantity: d[cols[5]] ? d[cols[5]] : '',
              local: d[cols[8]] ? d[cols[8]] : '',
              onlineCFC: d[cols[9]] ? d[cols[9]] : '',
              onlineStorePick: d[cols[10]] ? d[cols[10]] : '',
              wholesale: d[cols[11]] ? d[cols[11]] : '',
            }
          })

          console.log(newData)
          if (placeholderProducts && placeholderProducts.length > 0) {
            setPlaceholderProducts((prevState: any) => {
              return [...prevState, ...newData]
            })
          } else {
            setPlaceholderProducts([...newData])
          }
        }

        reader.readAsArrayBuffer(placeholderFile)
      })
      handlePlaceholderUploadClose()
    } else {
      alert('Upload correct file')
      setPlaceholderFile(null)
    }
  }

  const uploadPlaceholderDialog = (
    <Dialog
      open={openPlaceholderUpload}
      onClose={handlePlaceholderUploadClose}
      fullWidth
      classes={{
        paperFullWidth: classes.placeholderDialog,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // width: small ? '400px' : '260px',
          // height: "250px",
          border: '3px solid green',
          borderRadius: 5,
        }}
      >
        <DialogHeader
          title={`Upload Placeholder Products`}
          onClose={handlePlaceholderUploadClose}
        />

        <Box sx={{ p: 1 }}>
          <Typography variant="body2" color="primary">
            Upload Placeholder Products
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
              type="text"
              value={placeholderFile ? placeholderFile.name : ''}
              onClick={() =>
                document.getElementById('placeholderFile')!.click()
              }
              className={classes.uploadTextfield}
              placeholder="No file selected"
              readOnly
            />
            <Input
              type="file"
              id="placeholderFile"
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handlePlaceholderUpload}
              required
            />
            <button
              type="button"
              onClick={() =>
                document.getElementById('placeholderFile')!.click()
              }
              className={classes.uploadButton}
              style={{ width: '60%' }}
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
            <Typography color="primary">
              Supported file type in MS Excel
              <i className="pi pi-file-excel" style={{ fontSize: '18px' }}></i>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            p: 3,
            justifyContent: 'right',
          }}
        >
          <Button
            //   className={classes.submitButtons}
            variant="contained"
            color="primary"
            onClick={handlePlaceholderFileUpload}
          >
            Select
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const onEditorValueChange = (props: any, value: any) => {
    let updatedProducts = [...props.value]
    updatedProducts[props.rowIndex][props.field] = value
    setPlaceholderProducts(updatedProducts)
  }

  const inputTextEditor = (props: any, field: any) => {
    return (
      <input
        type="text"
        value={props.rowData[field]}
        onChange={(e: any) => onEditorValueChange(props, e.target.value)}
      />
    )
  }

  useEffect(() => {
    console.log('placeholderProducts', placeholderProducts)
  }, [placeholderProducts])

  const onChangePlaceHolderFields = (
    prevState: any,
    field: any,
    rowDataSelected: any,
    eventValue: any
  ) => {
    return prevState.map((obj: any) =>
      obj._idCheck === rowDataSelected._idCheck
        ? Object.assign(obj, { [field]: eventValue })
        : obj
    )
  }

  const ownBrandPlaceholderTemplate = (rowData: any) => {
    console.log('ownBrandPlaceholderTemplate', rowData)
    return (
      <Select
        value={rowData.ownBrand}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          setPlaceholderProducts((prevState: any) => {
            return onChangePlaceHolderFields(
              prevState,
              'ownBrand',
              rowData,
              e.target.value
            )
          })
          // setPlaceholderProducts((prevState: any) => {
          //   return prevState.map((obj: any) =>
          //     obj.min === rowData.min
          //       ? Object.assign(obj, { ownBrand: e.target.value })
          //       : obj
          //   )
          // })
        }}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type: any) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }
  const barCodePlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData.barcode}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'barcode',
                rowData,
                e.target.value
              )
            })
          }
        }}
      />
    )
  }

  const descriptionPlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData.description}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'description',
                rowData,
                e.target.value
              )
            })
          }
        }}
      />
    )
  }

  const supplierCodePlaceholderTemplate = (rowData: any) => {
    return (
      // <SearchSelect
      //   value={rowData.existingSupplier}
      //   // onChange={handleBuyer}
      //   className={classes.muiSelect}
      //   onChange={(e: any) => {
      //     if (e.target.value !== null) {
      //       setPlaceholderProducts((prevState: any) => {
      //         return onChangePlaceHolderFields(
      //           prevState,
      //           'existingSupplier',
      //           rowData,
      //           e.target.value
      //         )
      //       })
      //     }
      //   }}
      //   styles={{
      //     fontSize: '12px',
      //   }}
      // />
      <Autocomplete
        id="combo-box-demo3"
        // className={stylesInp}
        options={supplierCodeOptions}
        getOptionLabel={(option: any) => option.label}
        renderInput={(params: any) => (
          <TextField {...params} variant="outlined" size="small" />
        )}
        popupIcon={<SearchOutlined />}
        onChange={(e: any, value: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'existingSupplier',
                rowData,
                value ? value.label : ''
              )
            })
          }
        }}
      />
    )
  }

  // const [siteSuccess, SetSiteSuccess] = useState<boolean>(false)
  // const supplierSiteCode = (e: any) => {
  //   const value = e
  //   console.log('e.target.value', value)
  //   const filterData = supplierSearchSiteCode_Site.SiteInfo.filter(
  //     (val: any) => {
  //       return value === val.ebsSiteId
  //     }
  //   )
  //   console.log('click supplierSiteCode', filterData)
  //   if(filterData.length > 0){
  //     SetSiteSuccess(true)
  //   } else if(filterData.length ===0){
  //     SetSiteSuccess(false)
  //   }
  // }

  const [supplierSiteValue, setSupplierSiteValue] = useState<any>('')

  const supplierSiteCodePlaceholderTemplate = (rowData: any) => {
    return (
      <SearchSelect
        value={rowData.existingSupplierSite}
        // onChange={handleBuyer}
        className={classes.muiSelect}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'existingSupplierSite',
                rowData,
                e.target.value
              )
            })
            setSupplierSiteValue(e.target.value)
          }
        }}
        // onClick={() => supplierSiteCode(supplierSiteValue)}
        styles={{
          fontSize: '12px',
        }}
      />
    )
  }

  const casePackPlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData.packquantity}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'packquantity',
                rowData,
                e.target.value
              )
            })
          }
        }}
      />
    )
  }
  const newNoOfRangeStorePlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData.numberOfRangeStores}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'numberOfRangeStores',
                rowData,
                e.target.value
              )
            })
          }
        }}
      />
    )
  }

  const localPlaceholderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData.local}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'local',
                rowData,
                e.target.value
              )
            })
          }
        }}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type: any) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }
  const onlineCFCPlaceholderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData.onlineCFC}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'onlineCFC',
                rowData,
                e.target.value
              )
            })
          }
        }}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type: any) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }
  const onlineStorePickPlaceholderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData.onlineStorePick}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'onlineStorePick',
                rowData,
                e.target.value
              )
            })
          }
        }}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type: any) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }
  const wholeSalePlaceHolderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData.wholesale}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'wholesale',
                rowData,
                e.target.value
              )
            })
          }
        }}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type: any) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }

  const commentsPlaceHolderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData.comments}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangePlaceHolderFields(
                prevState,
                'comments',
                rowData,
                e.target.value
              )
            })
          }
        }}
      />
    )
  }

  const placeholderDialog = (
    <Dialog
      open={openPlaceholderDialog}
      onClose={handlePlaceholderDialogClose}
      fullWidth
      classes={{
        paperFullWidth:
          placeholderProducts && placeholderProducts.length > 0
            ? classes.placeholderDialogFull
            : classes.placeholderDialog,
      }}
    >
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
        <DialogHeader
          title="Add placeholder Products"
          onClose={handlePlaceholderDialogClose}
        />

        {barCodeExists &&
          barCodeExists.map((val: any) => (
            <Alert
              className={classes.alertMsg}
              style={{ color: '#000' }}
              severity="error"
            >
              <b>• {'\u00A0'}</b> BAR Code <b> '{val.barcode}' </b> is belongs
              to MIN <b> '{val.minNum}' </b>
            </Alert>
          ))}

        {/* {renderAlert()} */}

        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{
            textAlign: 'center',
            padding: '10px',
          }}
          spacing={2}
        >
          <Grid item md={7} sm={12} xs={12}>
            <Typography variant="subtitle2" color="primary">
              How many new lines do you wish to enter?
            </Typography>
          </Grid>
          <Grid item container md={7} sm={12} xs={12}>
            {/* <Grid item container xs={12}> */}

            <Grid item xs={12} sm={8}>
              <Typography variant="subtitle2" color="primary">
                <input
                  type="text"
                  required
                  // className={classes.placeholderCountStyle}
                  style={{
                    width: small ? '88%' : '100%',
                  }}
                  value={placeholderCount}
                  onChange={(e: any) => setPlaceholderCount(e.target.value)}
                />
              </Typography>
            </Grid>
            <Grid item sm={4} xs={12} style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '80px' }}
                onClick={() =>
                  handlePlaceholderAdd(placeholderCount ? placeholderCount : 0)
                }
              >
                ADD
              </Button>
            </Grid>
            {/* </Grid> */}
          </Grid>

          <Grid item md={1} sm={12} xs={12}>
            <Typography variant="subtitle2" color="primary">
              OR
            </Typography>
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              // type="submit"
              // style={{ width: '80px' }}
              onClick={handlePlaceholderUploadOpen}
            >
              Upload File
            </Button>
          </Grid>
          {placeholderProducts && placeholderProducts.length > 0 && (
            <Grid
              item
              container
              xs={12}
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                paddingTop: '20px',
              }}
            >
              <Grid
                item
                xs={10}
                style={{ textAlign: 'left', paddingBottom: '5px' }}
              >
                <Typography variant="body2" color="primary">
                  Product List {/* placeholder  */}
                </Typography>
              </Grid>
              <Grid item xs={2} style={{ paddingBottom: '5px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePlaceholderAdd(1)}
                >
                  Add Row
                </Button>
              </Grid>
              <Grid item xs={12}>
                <DataTable
                  value={placeholderProducts && placeholderProducts}
                  selectionMode={
                    placeholderProducts > 0 ? 'single' : 'checkbox'
                  }
                  selection={selectedPlaceholderData}
                  onSelectionChange={(e) => setSelectedPlaceholderData(e.value)}
                  // globalFilter={globalFilter}
                  className="p-datatable-sm"
                  //   stateStorage="session"
                  //   stateKey="dt-state-demo-session-eventmanage"
                  showGridlines
                  scrollable
                  scrollHeight="300px"
                  // editMode="cell"
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{
                      width: '50px',
                      color: 'white',

                      backgroundColor: theme.palette.primary.main,
                    }}
                    // frozen
                  ></Column>
                  {placeholderCols.map((col: any, index: any) => {
                    return (
                      <Column
                        key={index}
                        field={col.field}
                        header={col.header}
                        body={
                          (col.field === 'ownBrand' &&
                            ownBrandPlaceholderTemplate) ||
                          (col.field === 'barcode' &&
                            barCodePlaceholderTemplate) ||
                          (col.field === 'description' &&
                            descriptionPlaceholderTemplate) ||
                          (col.field === 'existingSupplier' &&
                            supplierCodePlaceholderTemplate) ||
                          (col.field === 'packquantity' &&
                            casePackPlaceholderTemplate) ||
                          (col.field === 'numberOfRangeStores' &&
                            newNoOfRangeStorePlaceholderTemplate) ||
                          (col.field === 'local' && localPlaceholderTemplate) ||
                          (col.field === 'onlineCFC' &&
                            onlineCFCPlaceholderTemplate) ||
                          (col.field === 'onlineStorePick' &&
                            onlineStorePickPlaceholderTemplate) ||
                          (col.field === 'wholesale' &&
                            wholeSalePlaceHolderTemplate) ||
                          (col.field === 'comments' &&
                            commentsPlaceHolderTemplate) ||
                          (col.field === 'existingSupplierSite' &&
                            supplierSiteCodePlaceholderTemplate)
                        }
                        bodyStyle={tableBodyStyle(col.width)}
                        headerStyle={tableHeaderStyle(
                          col.width,
                          theme.palette.primary.main
                        )}

                        // editor={(props: any) =>
                        //   inputTextEditor(props, 'description')
                        // }
                      />
                    )
                  })}
                </DataTable>
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={2} style={{ paddingTop: '5px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={removePlaceholder}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item xs={2} style={{ paddingTop: '5px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePlaceholderSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Dialog>
  )

  const delistminpinTemplate = (rowData: any) => {
    return <span>{rowData ? rowData.min : ''}</span>
  }
  const replaceminpinTemplate = (rowData: any) => {
    return <span>{rowData ? rowData.min : ''}</span>
  }

  // Uncomment for Replacement Association

  const [replacePopupData, setReplacePopupData] = useState<any>({
    replaceMin: '',
    effectiveDateFrom: '',
    effectiveDateTo: '',
  })

  useEffect(() => {
    console.log('replacePopupData', replacePopupData)
  }, [replacePopupData])

  // const replacementEditorValueChange = (props: any, value: any) => {
  //   let updatedProducts = [...props.value]
  //   updatedProducts[props.rowIndex][props.field] = value
  //   setReplacementAssociationProduct(updatedProducts)
  // }

  // const checkReplaceMinClick = () => {
  //   console.log('checkReplaceMinClick', checkReplaceMinClick)
  //   getProductServiceByItemnumber(replacePopupData.replaceMin)
  //     .then((res: any) => {
  //       console.log('Success')
  //       setReplaceError(true)
  //     })
  //     .catch((err: any) => {
  //       setReplaceError(false)
  //       console.log('Error')
  //     })
  // }

  const checkReplaceMinClick = (rowData: any) => {
    console.log('checkReplaceMinClick', checkReplaceMinClick)
    getProductServiceByItemnumber(rowData.replaceMin)
      .then((res: any) => {
        console.log('Success')
        setReplacementAssociationProduct((prevState: any) => {
          return prevState.map((state: any) => {
            if (state.min === rowData.min) {
              return {
                ...state,
                replaceError: true,
              }
            } else {
              return state
            }
          })
        })
      })
      .catch((err: any) => {
        console.log('Error')
        setReplaceError(true)
        setReplaceErrorMsg(`Invalid Replacement MIN - ${rowData.replaceMin}`)
        setReplacementAssociationProduct((prevState: any) => {
          return prevState.map((state: any) => {
            if (state.min === rowData.min) {
              return {
                ...state,
                replaceError: false,
              }
            } else {
              return state
            }
          })
        })
      })
  }

  const replaceMin_Pin_Association_Template = (rowData: any) => {
    return (
      <div style={{ display: 'flex' }}>
        <SearchSelect
          value={rowData.existingSupplierSite}
          // onChange={handleBuyer}
          className={classes.muiSelect}
          onChange={(e: any) => {
            setReplaceError(false)
            setReplacementAssociationProduct((prevState: any) => {
              return prevState.map((state: any) => {
                if (state.min === rowData.min) {
                  return {
                    ...state,
                    replaceMin: e.target.value,
                    replaceError: false,
                  }
                } else {
                  return state
                }
              })
            })
          }}
          // onClick={() => checkReplaceMinClick()}
          onClick={() => checkReplaceMinClick(rowData)}
          styles={{
            fontSize: '12px',
          }}
        />
        <span style={{ marginLeft: '5px', marginTop: '5px' }}>
          <ConfirmCheckSign confirmValue={rowData.replaceError} />
        </span>
      </div>
    )
  }

  // const replaceEffectiveDateToEditor = (props: any) => {
  //   return (
  //     <>
  //  <DatePicker
  //         format="dd/MM/yy"
  //         value={
  //           props.rowData['effectivedateto']
  //             ? props.rowData['effectivedateto']
  //             : null
  //         }
  //         onChange={(date: any) => {
  //           let newDate = date.toISOString().split('T')[0]
  //           let dateVal = newDate
  //           // setReplacementAssociationProduct((prevState: any) => {
  //           //   return [
  //           //     {
  //           //       ...prevState[0],
  //           //       effectivedateto: dateVal,
  //           //     },
  //           //   ]
  //           // })
  //           onEditorValueChange(props, dateVal)
  //         }}
  //         // maxDate={rowData['targetDate']}
  //         // maxDateMessage={allMessages.error.rafDateError}
  //         // minDate={new Date()}
  //       />
  //     </>
  //   )
  // }

  const replaceEffectiveDateToTemplate = (rowData: any) => {
    return (
      <DatePicker
        format="dd/MM/yy"
        value={rowData['effectivedateto'] ? rowData['effectivedateto'] : null}
        onChange={(date: any) => {
          let newDate = date.toISOString().split('T')[0]
          console.log('new Date', newDate)
          console.log('min', rowData.min)
          console.log(rowData)
          setReplacementAssociationProduct((prevState: any) => {
            return prevState.map((state: any) => {
              if (state.min === rowData.min) {
                return {
                  ...state,
                  effectivedateto: newDate,
                }
              } else {
                return state
              }
            })
          })
        }}
        // maxDate={rowData['targetDate']}
        // maxDateMessage={allMessages.error.rafDateError}
        // minDate={new Date()}
      />
    )
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date)
  }
  const replaceEffectiveDateFromTemplate = (rowData: any) => {
    return (
      <DatePicker
        format="dd/MM/yy"
        value={
          rowData['effectivedatefrom'] ? rowData['effectivedatefrom'] : null
        }
        onChange={(date: any) => {
          let newDate = date.toISOString().split('T')[0]
          console.log('new Date', newDate)
          console.log('min', rowData.min)
          console.log(rowData)
          setReplacementAssociationProduct((prevState: any) => {
            return prevState.map((state: any) => {
              if (state.min === rowData.min) {
                return {
                  ...state,
                  effectivedatefrom: newDate,
                }
              } else {
                return state
              }
            })
          })
        }}
        // maxDate={rowData['targetDate']}
        // maxDateMessage={allMessages.error.rafDateError}
        // minDate={new Date()}
      />
    )
  }

  const replacementCommentsTemplate = (rowData: any) => {
    return (
      <TextField
        value={rowData.comments}
        onChange={(e: any) => {
          setReplacementAssociationProduct((prevState: any) => {
            return prevState.map((state: any) => {
              if (state.min === rowData.min) {
                return {
                  ...state,
                  comments: e.target.value,
                }
              } else {
                return state
              }
            })
          })
        }}
      />
    )
  }

  const removeReplacements = () => {
    let replacements = replacementAssociationProduct.filter(
      (value: any) => !selectedReplaceAssData.includes(value)
    )
    console.log(replacements)
    setReplacementAssociationProduct(replacements)
    setSelectedReplaceAssData([])
  }

  // const handleReplacementSave = () => {
  //   console.log('handleReplacementSave', importedData)
  //   if (replaceError) {
  //     const data = importedData.map((singleTask: any) => {

  //       let a = replacementAssociationProduct.filter(
  //         (t: any) => t.min !== singleTask.min
  //       )
  //       let b = singleTask
  //       b.replaceMin = replacePopupData.replaceMin
  //       a.push(b)
  //       a.sort((x: any, y: any) => (x.min > y.min ? 1 : y.min > x.min ? -1 : 0))
  //       setImportedData(a)
  //     })
  //   }
  //   setReplaceError(false)
  //   setOpenReplacementAssDialog(false)
  // }

  const handleReplacementSave = () => {
    console.log('handleReplacementSave', importedData)
    let proceedSave = true
    for (var i = 0; i < replacementAssociationProduct.length; i++) {
      if (!replacementAssociationProduct[i].replaceError) {
        proceedSave = false
        break
      }
    }
    if (proceedSave) {
      setImportedData((prevState: any) => {
        return prevState.map((state: any) => {
          let singleData = replacementAssociationProduct.filter(
            (prod: any) => prod.min === state.min
          )
          console.log(singleData[0])
          if (state.min === singleData[0].min) {
            return {
              ...state,
              ...singleData[0],
            }
          } else {
            return state
          }
        })
      })
      setReplacementAssociationProduct([])
      setSelectedProductListItems([])
      setOpenReplacementAssDialog(false)
    } else {
      setReplaceError(true)
      setReplaceErrorMsg('Enter a Replacement MIN and Press the Search icon')
    }
  }

  useEffect(() => {
    console.log('handleReplacementSave', importedData)
  }, [importedData])

  const replacementAssociationDialog = (
    <Dialog
      open={openReplacementAssDialog}
      onClose={handleReplacemantAssociationDialogClose}
      fullWidth
      classes={{
        paperFullWidth:
          replacementAssociationProduct &&
          replacementAssociationProduct.length > 0
            ? classes.placeholderDialogFull
            : classes.placeholderDialog,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: '3px solid green',
          borderRadius: 5,
          padding: '10px',
        }}
      >
        <DialogHeader
          title="Add Replacement Association"
          onClose={handleReplacemantAssociationDialogClose}
        />
        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{
            textAlign: 'center',
            padding: '10px',
          }}
          spacing={2}
        >
          <Grid
            item
            container
            xs={12}
            style={{
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingTop: '20px',
            }}
          >
            <Grid
              item
              xs={10}
              style={{ textAlign: 'left', paddingBottom: '5px' }}
            >
              <Typography variant="body1" color="primary">
                Add Replacement Association
              </Typography>
            </Grid>
            <Grid item xs={2} style={{ paddingBottom: '5px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleReplacementAssAdd(1)}
              >
                Add Row
              </Button>
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DataTable
                  value={
                    replacementAssociationProduct &&
                    replacementAssociationProduct
                  }
                  selectionMode={
                    replacementAssociationProduct > 0 ? 'single' : 'checkbox'
                  }
                  selection={selectedReplaceAssData}
                  onSelectionChange={(e) => setSelectedReplaceAssData(e.value)}
                  // globalFilter={globalFilter}
                  className="p-datatable-sm"
                  //   stateStorage="session"
                  //   stateKey="dt-state-demo-session-eventmanage"
                  showGridlines
                  scrollable
                  scrollHeight="300px"
                  // editMode="cell"
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{
                      width: '50px',
                      color: 'white',

                      backgroundColor: theme.palette.primary.main,
                    }}
                  ></Column>
                  {replacementAssociationCols.map((col: any, index: any) => {
                    return (
                      <Column
                        key={index}
                        field={col.field}
                        header={col.header}
                        body={
                          (col.field === 'delist_min_pin' &&
                            delistminpinTemplate) ||
                          (col.field === 'replace_min_pin' &&
                            replaceMin_Pin_Association_Template) ||
                          (col.field === 'effectivedateto' &&
                            replaceEffectiveDateToTemplate) ||
                          (col.field === 'effectivedatefrom' &&
                            replaceEffectiveDateFromTemplate) ||
                          (col.field === 'comments' &&
                            replacementCommentsTemplate)
                        }
                        // editor={(props) =>
                        //   col.field === 'effectivedateto' &&
                        //   replaceEffectiveDateToEditor(props)
                        // }
                        bodyStyle={tableBodyStyle(col.width)}
                        headerStyle={tableHeaderStyle(
                          col.width,
                          theme.palette.primary.main
                        )}
                      />
                    )
                  })}
                </DataTable>
              </MuiPickersUtilsProvider>
            </Grid>
            {replaceError && (
              <Grid item xs={12}>
                <Typography color="error">{replaceErrorMsg}</Typography>
              </Grid>
            )}
            <Grid item xs={8}></Grid>
            <Grid item xs={2} style={{ paddingTop: '5px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={removeReplacements}
              >
                Delete
              </Button>
            </Grid>
            <Grid item xs={2} style={{ paddingTop: '5px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleReplacementSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )

  return (
    <>
      <Toast
        ref={toast}
        position="bottom-left"
        // onRemove={() => {
        //   history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
        // }}
        // onRemove={handleToaster}
      />
      <LoadingComponent showLoader={isProgressLoader} />
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
          <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
            <Typography variant="h6" color="primary">
              Pending Action -{' '}
              <b>Delists added to the Range Change Management App</b>
            </Typography>
          </Grid>

          <Grid item xl={2} lg={2} md={2} sm={3} xs={5}>
            <button
              // className={classes.backButton}
              className="backButton"
            >
              {/* <Typography variant="subtitle1" color="primary"> */}
              View Log
              {/* </Typography> */}
            </button>
          </Grid>

          <Grid item xl={1} lg={1} md={1} sm={3} xs={3}>
            <button
              // className={classes.backButton}
              className="backButton"
            >
              {/* <Typography variant="subtitle1" color="primary"> */}
              <svg
                className="MuiSvgIcon-root"
                focusable="false"
                viewBox="0 0 34 34"
                aria-hidden="true"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
              </svg>
              Back
              {/* </Typography> */}
            </button>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <DataTable
            value={eventDetails}
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
          <Grid
            item
            container
            md={6}
            sm={12}
            xs={12}
            spacing={2}
            style={{ textAlign: 'center' }}
          >
            <Grid item xs={10} sm={5} style={{ textAlign: 'left' }}>
              <Typography color="primary">
                <AutocompleteSelect
                  value={actionType}
                  options={actionTypeOptions}
                  onChange={handleActionType}
                  placeholder="--- Action Type ---"
                />
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Tooltip
                title={
                  actionType ? (
                    ''
                  ) : (
                    <Typography variant="caption">
                      {"Please select the 'Action Type'."}
                    </Typography>
                  )
                }
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleActionTypeDialogOpen}
                >
                  Add
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={12}>
              OR
            </Grid>
            <Grid item sm={4} xs={12}>
              <Tooltip
                title={
                  actionType ? (
                    ''
                  ) : (
                    <Typography variant="caption">
                      {"Please select the 'Action Type'."}
                    </Typography>
                  )
                }
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUploadDialogOpen}
                >
                  Upload File
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            item
            container
            md={6}
            sm={12}
            xs={12}
            spacing={2}
            style={{ textAlign: 'center' }}
          >
            <Grid item sm={4} xs={12}>
              <button
                className="backButton"
                onClick={handlePlaceholderDialogOpen}
              >
                <Typography variant="body2" color="primary">
                  Add Placeholder MIN/PIN
                </Typography>
              </button>
            </Grid>
            <Grid item sm={4} xs={12}>
              <button
                className="backButton"
                onClick={handleReplacemantAssociationDialogOpen}
              >
                <Typography variant="body2" color="primary">
                  Replacement Association
                </Typography>
              </button>
            </Grid>
            <Grid item sm={4} xs={12}>
              <button
                className="backButton"
                // onClick={handlePlaceholderDialogOpen}
              >
                <Typography variant="body2" color="primary">
                  Issue Delist Letter
                </Typography>
              </button>
            </Grid>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProductListSave}
                >
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
      {replacementAssociationDialog}
      {/* Uncomment for Replacement Association  */}
      {uploadPlaceholderDialog}
    </>
  )
}

export default DelistsAddedToRange
