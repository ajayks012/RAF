import { routes } from './Constants'
const {
  DASHBOARD,
  USERCONFIG_USERCREATE,
  USERCONFIG_USERMANAGE,
  USERCONFIG_USERGROUP,
  RANGEAMEND,
  PROMOFUNDNG,
  RETAILPRICE,
  SUPPLIERPORT,
  PRODUCTPORT,
  USERCONFIG,
  // EVENT_BULK_UPLOAD
  RANGEAMEND_EVENTDASH,
  RANGEAMEND_MANAGE,
  RANGEAMEND_DELIST,
} = routes
export const apps = [
  {
    appMenuId: 1,
    appCode: 'COMDSBRD',
    appName: 'Dashboard',
    menu1Code: null,
    menu1Desc: null,
    menu2Code: null,
    menu2Desc: null,
    url: DASHBOARD,
    more: [],
  },
  {
    appMenuId: 2,
    appCode: 'COMUSRM',
    appName: 'User Management',
    menu1Code: null,
    menu1Desc: null,
    menu2Code: null,
    menu2Desc: null,
    url: USERCONFIG,
    more: [],
  },
  {
    appMenuId: 3,
    appCode: 'COMRANGE',
    appName: 'Range Change Management',
    menu1Code: null,
    menu1Desc: null,
    menu2Code: null,
    menu2Desc: null,
    url: RANGEAMEND,
    more: [],
  },
  {
    appMenuId: 4,
    appCode: 'COMPROMO',
    appName: 'Promotions and Funding',
    menu1Code: null,
    menu1Desc: null,
    menu2Code: null,
    menu2Desc: null,
    url: PROMOFUNDNG,
    more: [],
  },
  {
    appMenuId: 5,
    appCode: 'COMPRICE',
    appName: 'Retail Price Change',
    menu1Code: null,
    menu1Desc: null,
    menu2Code: null,
    menu2Desc: null,
    url: RETAILPRICE,
    more: [],
  },
  {
    appMenuId: 6,
    appCode: 'COMSUPP',
    appName: 'Supplier Portal',
    menu1Code: null,
    menu1Desc: null,
    menu2Code: null,
    menu2Desc: null,
    url: SUPPLIERPORT,
    more: [],
  },
  {
    appMenuId: 7,
    appCode: 'COMPRDP',
    appName: 'Product Portal',
    menu1Code: null,
    menu1Desc: null,
    menu2Code: null,
    menu2Desc: null,
    url: PRODUCTPORT,
    more: [],
  },
  {
    appMenuId: 8,
    appCode: 'COMUSRM',
    appName: 'User Management',
    menu1Code: 'CR',
    menu1Desc: 'Create Request',
    menu2Code: null,
    menu2Desc: null,
    url: USERCONFIG_USERCREATE,
    more: [],
  },
  {
    appMenuId: 9,
    appCode: 'COMUSRM',
    appName: 'User Management',
    menu1Code: 'MU',
    menu1Desc: 'Manage User',
    menu2Code: null,
    menu2Desc: null,
    url: USERCONFIG_USERMANAGE,
    more: [],
  },
  {
    appMenuId: 10,
    appCode: 'COMUSRM',
    appName: 'User Management',
    menu1Code: 'MUG',
    menu1Desc: 'Manage User Group',
    menu2Code: null,
    menu2Desc: null,
    url: USERCONFIG_USERGROUP,
    more: [],
  },

  {
    appMenuId: 11,
    appCode: 'COMRANGE',
    appName: 'Range Change Management',
    menu1Code: 'EMD',
    menu1Desc: 'Event Management Dashboard',
    menu2Code: null,
    menu2Desc: null,
    url: RANGEAMEND_EVENTDASH,
    more: [],
  },
  {
    appMenuId: 12,
    appCode: 'COMRANGE',
    appName: 'Range Change Management',
    menu1Code: 'ME',
    menu1Desc: 'Manage Event',
    menu2Code: null,
    menu2Desc: null,
    url: RANGEAMEND_MANAGE,
    more: [],
  },
  {
    appMenuId: 13,
    appCode: 'COMRANGE',
    appName: 'Range Change Management',
    menu1Code: 'DLL',
    menu1Desc: 'De-List Letter',
    menu2Code: null,
    menu2Desc: null,
    url: RANGEAMEND_DELIST,
    more: [],
  },
]
