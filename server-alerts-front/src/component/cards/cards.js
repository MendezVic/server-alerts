import React, { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function Cards({ alerts }) {
  const stringifyDate = (createdAt) => {
    const date = new Date(createdAt);
    return `${date.getFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
  };

  const secondaryColor = (server_type) => {
    return server_type === 'onprem'
      ? { color: 'info.main' }
      : { color: 'secondary.main' };
  };
  const showData = () => {
    if (alerts.length > 0) {
      return alerts.map((data, i) => {
        const secondary = (
          <ListItemText
            primary={data.server_type}
            secondary={stringifyDate(data.createdAt)}
            sx={{
              textAlign: 'right',
              '& .MuiListItemText-primary': () => {
                return secondaryColor(data.server_type);
              },
            }}
          />
        );
        return (
          <Fragment key={i}>
            <ListItem secondaryAction={secondary}>
              <ListItemText
                primary={data.description}
                secondary={data.server}
              />
            </ListItem>
            <Divider />
          </Fragment>
        );
      });
    } else {
      return (
        <ListItem button key='error'>
          <ListItemText>{alerts.message || 'Internal Error'}</ListItemText>
        </ListItem>
      );
    }
  };
  return (
    <>
      <List
        sx={{
          bgcolor: 'action.disabledBackground',
          minWidth: '500px',
        }}
      >
        {showData()}
      </List>
    </>
  );
}

export default Cards;
