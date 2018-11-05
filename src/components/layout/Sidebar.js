import React from 'react';

//React Material UI
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

// Font awesome
import { faFoursquare, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

const styles = () => ({
  textField: {
    margin: '0 auto',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const Sidebar = ({ pointers, onHandleQuery }) => (
  <div className="sidebar" role="navigation">
    <p>
      Powered by <FontAwesomeIcon icon={faFoursquare} size={'1x'} /> and{' '}
      <FontAwesomeIcon icon={faGoogle} size={'1x'} />
    </p>
    <TextField
      onChange={(e) => onHandleQuery(e.target.value)}
      classes={styles.textField}
      placeholder="Filter Pointers"
      style={{ width: '100%', margin: '1em 0 1em 0' }}
    />
    <br />

    <List>
      {pointers.map((pointer, index) => (
        <div key={index}>
          <ListItem style={{ marginBottom: '10px' }}>
            <br />
            <Avatar>
              <FontAwesomeIcon icon={faMapMarkedAlt} />
            </Avatar>
            <ListItemText
              primary={`${pointer.venue.name}`}
              secondary={`Latitude: ${pointer.venue.location.lat}, Longitude: ${
                pointer.venue.location.lng
              }`}
            />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  </div>
);

export default Sidebar;
