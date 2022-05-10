export const delistAddedToRangeCols = [
  {
    field: 'uniqueId',
    header: 'Unique ID',
    width: '100px',
  },
  {
    field: 'eventName',
    header: 'Event Name',
    width: '150px',
  },
  {
    field: 'dueDate',
    header: 'Due Date',
    width: '150px',
  },
  {
    field: 'status',
    header: 'Status',
    width: '100px',
  },
  {
    field: 'resetType',
    header: 'Reset Type',
    width: '150px',
  },
  {
    field: 'targetDate',
    header: 'Launch Date',
    width: '150px',
  },
  {
    field: 'group',
    header: 'Group',
    width: '100px',
  },
  {
    field: 'category',
    header: 'Category',
    width: '150px',
  },
  {
    field: 'department',
    header: 'Department',
    width: '150px',
  },
  {
    field: 'clearancePriceApplied',
    header: 'Clearance Price required',
    width: '100px',
  },
  {
    field: 'GSCOPDateCheckRequired',
    header: 'GSCOP Date check Required',
    width: '100px',
  },
  {
    field: 'stopOrder',
    header: 'Stop Order',
    width: '100px',
  },
  {
    field: 'buyer',
    header: 'Buyer',
    width: '250px',
  },
  {
    field: 'buyerAssistant',
    header: 'Buying Assistant',
    width: '250px',
  },
  {
    field: 'ownBrandManager',
    header: 'Own Brand Manager',
    width: '250px',
  },
  {
    field: 'seniorBuyingManager',
    header: 'Senior Buying Manager',
    width: '250px',
  },
  {
    field: 'merchandiser',
    header: 'Merchandiser',
    width: '250px',
  },
  {
    field: 'rangeResetManager',
    header: 'Range Reset Manager',
    width: '250px',
  },
  {
    field: 'categoryDirector',
    header: 'Category Director',
    width: '250px',
  },
  {
    field: 'supplyChainSplst',
    header: 'Supply Chain Splst',
    width: '200px',
  },
]

export const delistExistingProductsCols = [
  {
    field: 'productId',
    header: 'Product ID',
    width: '150px',
  },
  {
    field: 'storeCode',
    header: 'Store Code',
    width: '150px',
  },
  {
    field: 'supplier',
    header: 'Supplier',
    width: '150px',
  },
  {
    field: 'supplierSiteNumber',
    header: 'Supplier Site Number',
    width: '150px',
  },
  {
    field: 'local',
    header: 'Local',
    width: '80px',
  },
  {
    field: 'pin',
    header: 'Pin',
    width: '150px',
  },
  {
    field: 'buyingMinIngredients',
    header: 'Buying MIN / Ingredients',
    width: '150px',
  },
]

export const actionTypes = [
  { label: 'Delist MIN', value: 'Delist MIN' },
  { label: 'MIN Extension', value: 'MIN Extension' },
  { label: 'MIN Restriction', value: 'MIN Restriction' },
  { label: 'Space Extension', value: 'Space Extension' },
  { label: 'Space Restriction', value: 'Space Restriction' },
  { label: 'New MIN', value: 'New MIN' },
  { label: 'New PIN', value: 'New PIN' },
  { label: 'Delist PIN', value: 'Delist PIN' },
  { label: 'New Ingredient MIN', value: 'New Ingredient MIN' },
  { label: 'Delist Ingredient MIN', value: 'Delist Ingredient MIN' },
  { label: 'Supplier Change', value: 'Supplier Change' },
]

export const supplierCodes = [
  {
    label: '1001149 - RB UK',
    value: '1001149',
  },
  {
    label: '1002009 - PROFOOT',
    value: '1002009',
  },
  {
    label: '1001100 - G R LANE',
    value: '1001100',
  },
  {
    label: '1002662 - SEVENSEA',
    value: '1002662',
  },
]

export const salesChannels = [
  {
    label: 'Online',
    value: 'online',
  },
  {
    label: 'Retail',
    value: 'retail',
  },
  {
    label: 'Wholesale',
    value: 'wholesale',
  },
]

export const productListCols = [
  {
    field: 'action/type',
    header: 'Action/ Type',
    width: '100px',
  },
  {
    field: 'min/pin',
    header: 'MIN/ PIN',
    width: '100px',
  },
  {
    field: 'description',
    header: 'Description',
    width: '200px',
  },
  {
    field: 'replaceMin/pin',
    header: 'Replace MIN/ PIN',
    width: '100px',
  },
  // {
  //   field: "description1",
  //   header: "Description",
  //   width: "200px",
  // },
  {
    field: 'fromDate',
    header: 'Effective Date (From)',
    width: '150px',
  },
  {
    field: 'toDate',
    header: 'Effective Date (To)',
    width: '150px',
  },
  {
    field: 'lineStatus',
    header: 'Line Status',
    width: '150px',
  },
  {
    field: 'clearancePricing',
    header: 'Clearance Pricing',
    width: '150px',
  },
  {
    field: 'clearDepotBy',
    header: 'Clear Depot By',
    width: '150px',
  },
]

export const massActions = [
  {
    value: 'Delete',
    label: 'Delete',
  },
  {
    value: 'Derange',
    label: 'Derange',
  },
  {
    value: 'Delist',
    label: 'Delist',
  },
  {
    value: 'Draft',
    label: 'Draft',
  },
  {
    value: 'Confirmed',
    label: 'Confirmed',
  },
  {
    value: 'Cancel',
    label: 'Cancel',
  },
  {
    value: 'Clear Depot By: Week-1',
    label: 'Clear Depot By: Week-1',
  },
  {
    value: 'Clear Depot By: Week-2',
    label: 'Clear Depot By: Week-2',
  },
  {
    value: 'Clear Depot By: Week-3',
    label: 'Clear Depot By: Week-3',
  },
  {
    value: 'Clear Depot By: Week-4',
    label: 'Clear Depot By: Week-4',
  },
  {
    value: 'Clear Depot By: Week-5',
    label: 'Clear Depot By: Week-5',
  },
  {
    value: 'Clear Depot By: Week-6',
    label: 'Clear Depot By: Week-6',
  },
  {
    value: 'Clear Depot By: Week-7',
    label: 'Clear Depot By: Week-7',
  },
  {
    value: 'Clear Depot By: Week-8',
    label: 'Clear Depot By: Week-8',
  },
  {
    value: 'EXCLUDE FROM',
    label: 'EXCLUDE FROM',
  },
  {
    value: 'MARKDOWN PRICING',
    label: 'MARKDOWN PRICING',
  },
  {
    value: 'INCLUDE IN',
    label: 'INCLUDE IN',
  },
]
