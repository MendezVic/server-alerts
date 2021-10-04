import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Cards from '../../component/cards/cards';
import AlertsService from '../../service/getAlertsService';

const { getAlerts } = AlertsService;

const HomePage = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAlerts = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await getAlerts(searchText, page);
      setAlerts(response.data);
      setTotalPages(response.pages);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setTotalPages(0);
      setAlerts(e);
    }
  };
  useEffect(() => {
    fetchAlerts();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAlerts();
  };

  const handleChangePage = (e, newPage) => {
    setCurrentPage(newPage);
    fetchAlerts(newPage);
  };
  const showPagination = () => {
    if (totalPages === 0) {
      return <span></span>;
    } else if (!isLoading) {
      return (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ marginTop: '10px' }}
        />
      );
    }
  };
  return (
    <Box mt={2} component='form' onSubmit={handleSubmit}>
      <Grid
        container
        spacing={2}
        alignItems='center'
        justifyContent='center'
        direction='column'
      >
        <Grid item>
          <TextField
            label='Search by alert description or by server'
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            sx={{ minWidth: '450px' }}
          ></TextField>
        </Grid>
        <Grid item>
          {isLoading ? <CircularProgress /> : <Cards alerts={alerts} />}
        </Grid>
        {showPagination()}
      </Grid>
    </Box>
  );
};

export default HomePage;
