import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#e68422',
    },
    secondary: {
      main: '#4c453f',
    },
    footer: {
      main: '#527271'
    },
    subheader: {
      main: '#51463b'
    },
    link: '#0645ad',
    gridItem: '#eee',
    icon: '#999999',
    text: '#333333',
    lightText: '#666666',
    extraLightText: '#979797'
  },
  typography: {
    fontFamily: 'inherit',
    letterSpacing: 0
  }
});

export default theme;