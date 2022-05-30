import { makeStyles } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme) => {
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
    placeholderDialog: {
      [theme.breakpoints.up('xs')]: {
        'max-width': '45%',
      },
      [theme.breakpoints.down('xs')]: {
        'max-width': '75%',
      },
      'max-width': '85%',
    },
    uploadTextfield: {
      [theme.breakpoints.up(670)]: {
        width: 250,
      },
      [theme.breakpoints.down(670)]: {
        width: 100,
      },

      height: '32px',
      cursor: 'pointer',
    },
    uploadButton: {
      width: 100,
      height: '32px',
      cursor: 'pointer',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  }
})

export const tableHeaderStyle = (width, color) => {
  return {
    color: 'white',
    backgroundColor: color,
    width: width,
    // fontSize: '0.9rem',
    fontSize: '12px',
    // padding: '8px',
    height: 'auto',
  }
}

export const tableBodyStyle = (width) => {
  return {
    width: width,
    // fontSize: '0.8rem',
    fontSize: '12px',
    // padding: '8px',
    // height: '43px',
    overflowX: 'auto',
  }
}
