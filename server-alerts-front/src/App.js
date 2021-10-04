// import logo from './logo.svg';
import './App.css';
import HomePage from './view/homePage/homePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='App'>
          <HomePage />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
