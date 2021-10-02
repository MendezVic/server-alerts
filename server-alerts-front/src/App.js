// import logo from './logo.svg';
import './App.css';
import HomePage from './view/homePage/homePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const useStyles = makeStyles({
  root: {
    backgroundColor: 'black',
  },
});
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <div className='App'>
          <HomePage />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
