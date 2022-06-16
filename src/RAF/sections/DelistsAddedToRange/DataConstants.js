export const delistAddedToRangeCols = [
  // {
  //   field: 'uniqueId',
  //   header: 'Unique ID',
  //   width: '100px',
  // },
  {
    field: "eventName",
    header: "Event Name",
    width: "150px",
  },
  {
    field: "dueDate",
    header: "Due Date",
    width: "150px",
  },
  {
    field: "status",
    header: "Status",
    width: "100px",
  },
  {
    field: "resetType",
    header: "Reset Type",
    width: "150px",
  },
  {
    field: "targetDate",
    header: "Launch Date",
    width: "150px",
  },
  {
    field: "group",
    header: "Group",
    width: "100px",
  },
  {
    field: "category",
    header: "Category",
    width: "150px",
  },
  {
    field: "department",
    header: "Department",
    width: "150px",
  },
  {
    field: "eventId",
    header: "Event ID",
    width: "150px",
  },
  {
    field: "clearancePriceCheck",
    header: "Clearance Price required",
    width: "100px",
  },
  {
    field: "orderStopDateCheck",
    header: "Order Stop Date check Required",
    width: "100px",
  },
  {
    field: "stopOrder",
    header: "Stop Order (Stock Rundown)",
    width: "100px",
  },
  {
    field: "buyer",
    header: "Buyer",
    width: "250px",
  },
  {
    field: "buyerAssistant",
    header: "Buying Assistant",
    width: "250px",
  },
  {
    field: "ownBrandManager",
    header: "Own Brand Manager",
    width: "250px",
  },
  {
    field: "seniorBuyingManager",
    header: "Senior Buying Manager",
    width: "250px",
  },
  {
    field: "merchandiser",
    header: "Merchandiser",
    width: "250px",
  },
  {
    field: "rangeResetManager",
    header: "Range Reset Manager",
    width: "250px",
  },
  {
    field: "categoryDirector",
    header: "Category Director",
    width: "250px",
  },
  {
    field: "supplyChainSplst",
    header: "Supply Chain Splst",
    width: "200px",
  },
];

export const yesOrNo = [
  {
    name: "Y",
    text: "Yes",
  },
  {
    name: "N",
    text: "No",
  },
];

export const supplierCodeOptions = [
  {
    label: "12345",
    text: "12345",
  },
  {
    label: "Supplier",
    text: "Supplier",
  },
  {
    label: "Code",
    text: "Code",
  },
];

export const delistToRangeData = [
  {
    eventName: "Household & Pet Food",
    dueDate: "05-Nov-22",
    status: "Not started",
    resetType: "Full Range Reset",
    targetDate: "3-Jan-22",
    group: "Frozen",
    category: "Frozen Food",
    department: "Frozen Fish",
    eventId: "10001",
    clearancePriceCheck: "Y",
    orderStopDateCheck: "Y",
    stopOrder: "Y",
    buyer: "helen.barker@morrisonsplc.co.uk",
    buyingAssistant: "paul.allman@morrisonsplc.co.uk",
    ownBrandManager: "naomi.anderson@morrisonsplc.co.uk",
    seniorBuyingManager: "sophie.olding@morrisonsplc.co.uk",
    merchandiser: "helen.barker@morrisonsplc.co.uk",
    rangeResetManager: "naomi.anderson@morrisonsplc.co.uk",
    categoryDirector: "sophie.olding@morrisonsplc.co.uk",
    supplyChainSplst: "Cristine Black",
  },
];

export const delistExistingProductsCols = [
  {
    field: "productId",
    header: "Product ID",
    width: "150px",
  },
  {
    field: "storeCode",
    header: "Store Numbers",
    width: "150px",
  },
  {
    field: "supplier",
    header: "Supplier",
    width: "150px",
  },
  {
    field: "supplierSiteNumber",
    header: "Supplier Site Number",
    width: "150px",
  },
  {
    field: "local",
    header: "Local",
    width: "80px",
  },
  {
    field: "pin",
    header: "Pin",
    width: "150px",
  },
  {
    field: "buyingMinIngredients",
    header: "Buying MIN / Ingredients",
    width: "150px",
  },
];

export const actionTypes = [
  { label: "Delist MIN", value: "Delist MIN" },
  { label: "MIN Extension", value: "MIN Extension" },
  { label: "MIN Restriction", value: "MIN Restriction" },
  { label: "Space Extension", value: "Space Extension" },
  { label: "Space Restriction", value: "Space Restriction" },
  { label: "New MIN", value: "New MIN" },
  { label: "New PIN", value: "New PIN" },
  { label: "Delist PIN", value: "Delist PIN" },
  { label: "New Ingredient MIN", value: "New Ingredient MIN" },
  { label: "Delist Ingredient MIN", value: "Delist Ingredient MIN" },
  { label: "Supplier Change", value: "Supplier Change" },
];

export const supplierCodes = [
  {
    label: "1001149 - RB UK",
    value: "1001149",
  },
  {
    label: "1002009 - PROFOOT",
    value: "1002009",
  },
  {
    label: "1001100 - G R LANE",
    value: "1001100",
  },
  {
    label: "1002662 - SEVENSEA",
    value: "1002662",
  },
];

export const salesChannels = [
  {
    label: "Online",
    value: "online",
  },
  {
    label: "Retail",
    value: "retail",
  },
  {
    label: "Wholesale",
    value: "wholesale",
  },
];
//Product List

export const productListCols = [
  {
    field: "actionType",
    header: "Action/ Type",
    width: "100px",
  },
  {
    field: "lineStatus",
    header: "Line Status",
    width: "200px",
  },
  {
    field: "man",
    header: "MAN",
    width: "100px",
  },
  {
    field: "min",
    header: "MIN",
    width: "100px",
  },
  {
    field: "ingredientMin",
    header: "No. of Unique Ingredient MIN",
    width: "100px",
  },
  // {
  //   field: 'noOfUniqueIngredientMin',
  //   header: 'No. of Unique Ingredient MIN',
  //   width: '100px',
  // },
  {
    field: "pin",
    header: "PIN",
    width: "100px",
  },
  {
    field: "description",
    header: "Description",
    width: "200px",
  },
  {
    field: "replaceMin",
    header: "Replace MIN/ PIN",
    width: "100px",
  },
  {
    field: "replaceMinDescription",
    header: "Description (Replacing MIN)",
    width: "200px",
  },

  {
    field: "existingSupplier",
    header: "Existing Supplier",
    width: "150px",
  },
  {
    field: "existingSupplierSite",
    header: "Existing Supplier Site",
    width: "150px",
  },
  {
    field: "barcode",
    header: "Barcode",
    width: "200px",
  },

  {
    field: "legacyItemNumbers",
    header: "Legacy Code",
    width: "200px",
  },
  {
    field: "supplierId",
    header: "Supplier Name",
    width: "200px",
  },
  {
    field: "supplierSiteNameCode",
    header: "Supplier Site Name & Code",
    width: "200px",
  },
  {
    field: "currentnoofrangedstores",
    header: "Current No. of Ranged Stores",
    width: "200px",
  },
  {
    field: "newnoofrangestores",
    header: "New No. of Range Stores",
    width: "200px",
  },
  {
    field: "current_versus_news_tores",
    header: "Current Versus New Stores",
    width: "200px",
  },
  {
    field: "stores_ranged_current_vs_proposed",
    header: "% stores ranged (current vs proposed)",
    width: "200px",
  },
  {
    field: "current_shelf_fill",
    header: "Current Shelf Fill (Units)",
    width: "200px",
  },
  {
    field: "new_shelf_fill",
    header: "New Shelf Fill (Units)",
    width: "200px",
  },
  {
    field: "currentshelffill_vs_newfill",
    header: "Current Shelf Fill Vs New Fill",
    width: "200px",
  },
  {
    field: "currentshelffill_vs_newfill_%",
    header: "Current Shelf Fill Vs New Fill %",
    width: "200px",
  },
  {
    field: "unitcost",
    header: "Unit Cost",
    width: "200px",
  },
  {
    field: "casecost",
    header: "Case Cost",
    width: "200px",
  },
  {
    field: "packquantity",
    header: "Case Size",
    width: "200px",
  },
  {
    field: "noofrecipeMin",
    header: "No. of Recipe MIN",
    width: "200px",
  },
  {
    field: "local",
    header: "Local",
    width: "200px",
  },
  {
    field: "onlineCFC",
    header: "Online (CFC)",
    width: "200px",
  },
  {
    field: "onlineStorePick",
    header: "Online Store Pick",
    width: "200px",
  },
  {
    field: "wholesale",
    header: "Wholesale",
    width: "200px",
  },
  {
    field: "ownBrand",
    header: "Own Brand",
    width: "200px",
  },
  {
    field: "includein_clearance_pricing",
    header: "Include In Clearance Pricing",
    width: "200px",
  },
  {
    field: "includein_store_wastage",
    header: "Include In Store Wastage",
    width: "200px",
  },
  {
    field: "clear_depot_by",
    header: "Clear Depot By",
    width: "200px",
  },
  {
    field: "supplier_commitment_includingfixedbuys_seasonal",
    header: "Supplier Commitment Including Fixed Buys/Seasonal",
    width: "200px",
  },
  {
    field: "Final_stop_order_date",
    header: "Final Stop Order Date",
    width: "200px",
  },
  {
    field: "system_suggested_stop_orderdate",
    header: "System Suggested Stop Order date",
    width: "200px",
  },
  {
    field: "lastpo_date",
    header: "Last PO Date",
    width: "200px",
  },
  {
    field: "totalstock",
    header: "Total Stock",
    width: "200px",
  },
  {
    field: "store_stock_unit",
    header: "Store Stock Unit",
    width: "200px",
  },
  {
    field: "depot_stock_unit",
    header: "Depot Stock Unit",
    width: "200px",
  },
  {
    field: "open_pos",
    header: "Open POs",
    width: "200px",
  },
  {
    field: "forward_forecast_to_launch",
    header: "Forward Forecast to Launch",
    width: "200px",
  },
  {
    field: "excessstock",
    header: "Excess stock",
    width: "200px",
  },
  {
    field: "numberOfRangeStores",
    header: "New Number of Range Stores",
    width: "150px",
  },
  {
    field: "storeCode",
    header: "Store Number",
    width: "150px",
  },
  {
    field: "comments",
    header: "Comments",
    width: "200px",
  },
];

export const massActions = [
  {
    value: "Delete",
    label: "Delete",
  },
  {
    value: "Derange",
    label: "Derange",
  },
  {
    value: "Delist",
    label: "Delist",
  },
  {
    value: "Draft",
    label: "Draft",
  },
  {
    value: "Confirmed",
    label: "Confirmed",
  },
  {
    value: "Cancel",
    label: "Cancel",
  },
  {
    value: "Clear Depot By: Week-1",
    label: "Clear Depot By: Week-1",
  },
  {
    value: "Clear Depot By: Week-2",
    label: "Clear Depot By: Week-2",
  },
  {
    value: "Clear Depot By: Week-3",
    label: "Clear Depot By: Week-3",
  },
  {
    value: "Clear Depot By: Week-4",
    label: "Clear Depot By: Week-4",
  },
  {
    value: "Clear Depot By: Week-5",
    label: "Clear Depot By: Week-5",
  },
  {
    value: "Clear Depot By: Week-6",
    label: "Clear Depot By: Week-6",
  },
  {
    value: "Clear Depot By: Week-7",
    label: "Clear Depot By: Week-7",
  },
  {
    value: "Clear Depot By: Week-8",
    label: "Clear Depot By: Week-8",
  },
  {
    value: "EXCLUDE FROM",
    label: "EXCLUDE FROM",
  },
  {
    value: "MARKDOWN PRICING",
    label: "MARKDOWN PRICING",
  },
  {
    value: "INCLUDE IN",
    label: "INCLUDE IN",
  },
];

export const placeholderCols = [
  {
    field: "min",
    header: "MIN",
    width: "100px",
  },
  {
    field: "description",
    header: "Description",
    width: "200px",
  },
  {
    field: "ownBrand",
    header: "Own Brand",
    width: "100px",
  },
  {
    field: "barcode",
    header: "Bar Code",
    width: "200px",
  },
  {
    field: "existingSupplier",
    header: "Supplier Code",
    width: "200px",
  },
  {
    field: "existingSupplierSite",
    header: "Supplier Site Code",
    width: "200px",
  },
  {
    field: "packquantity",
    header: "Case Pack",
    width: "200px",
  },
  {
    field: "numberOfRangeStores",
    header: "New No.of Range Stores",
    width: "150px",
  },
  {
    field: "local",
    header: "Local",
    width: "100px",
  },

  {
    field: "onlineCFC",
    header: "Online (CFC)",
    width: "100px",
  },

  {
    field: "onlineStorePick",
    header: "Online Store Pick",
    width: "150px",
  },
  {
    field: "wholesale",
    header: "Wholesale",
    width: "150px",
  },
  {
    field: "comments",
    header: "Comments",
    width: "150px",
  },
];

export const replacementAssociationCols = [
  // {
  //   field: "min",
  //   header: "Delist MIN/PIN",
  //   width: "150px",
  // },
  {
    field: "delist_min_pin",
    header: "Delist MIN/PIN",
    width: "150px",
  },
  {
    field: "replace_min_pin",
    header: "Replace MIN/PIN",
    width: "200px",
  },
  {
    field: "effectivedatefrom",
    header: "Effective Date(From)",
    width: "200px",
  },
  {
    field: "effectivedateto",
    header: "Effective Date(To)",
    width: "200px",
  },
  {
    field: "comments",
    header: "Comments",
    width: "200px",
  },
];

export const lineStatusOptions = [
  {
    value: "Request For Stock Count",
    label: "Request For Stock Count",
  },
  {
    value: "Draft",
    label: "Draft",
  },
];

export const supplierCode_Supplier = {
  StatusCode: "200",
  StatusMessage: "Success",
  SupplierInfo: [
    {
      stepSupplierId: "S1359705",
      ebsSupplierId: "2000185",
      ebsSupplierNumber: "2022910",
      supplierName: "THE NASDAQ STOCK MARKET",
      supplierType: "VENDOR",
      supplierStatus: "Active",
      dealCustAccNo: "",
      SiteInfo: [
        {
          stepSiteId: "T1361172",
          stepSupplierId: "S1359705",
          ebsSiteId: "1526000",
          ebsSupplierId: "2000185",
          siteName: "pizza",
          mainframeSupplierNo: "8712",
          tsSiteId: "2022910",
          rmsSupplier: "Y",
          primaryPaySite: "Y",
          siteStatus: "Active",
          siteOperatingUnit: "82",
        },
        {
          stepSiteId: "T1361173",
          stepSupplierId: "S1359706",
          ebsSiteId: "1526000",
          ebsSupplierId: "2000186",
          siteName: "pizza",
          mainframeSupplierNo: "8712",
          tsSiteId: "2022910",
          rmsSupplier: "Y",
          primaryPaySite: "Y",
          siteStatus: "Active",
          siteOperatingUnit: "82",
        },
      ],
    },
  ],
};

export const supplierSearchSiteCode_Site = {
  StatusCode: "200",
  StatusMessage: "Success",
  SiteInfo: [
    {
      stepSiteId: "T963891",
      stepSupplierId: "S107926",
      ebsSiteId: "20005",
      ebsSupplierId: "2917",
      siteName: "ASHBY",
      mainframeSupplierNo: "",
      tsSiteId: "1002917",
      toleranceName: "11000",
      SupplierInfo: {
        stepSupplierId: "S107926",
        ebsSupplierNumber: "1002917",
        supplierName: "PLADIS",
        supplierType: "",
        supplierStatus: "Active",
        dealCustAccNo: "",
      },
    },
    {
      stepSiteId: "T963890",
      stepSupplierId: "S107927",
      ebsSiteId: "20006",
      ebsSupplierId: "2916",
      siteName: "ASHBY",
      mainframeSupplierNo: "",
      tsSiteId: "1002917",
      toleranceName: "11000",
      SupplierInfo: {
        stepSupplierId: "S107926",
        ebsSupplierNumber: "1002917",
        supplierName: "PLADIS",
        supplierType: "",
        supplierStatus: "Active",
        dealCustAccNo: "",
      },
    },
  ],
};
