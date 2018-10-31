import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '0 auto',
    width: '100%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class Sidebar extends Component {
  state = {
    query: '',
  };

  handleChange = (query) => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    let filteredMarkers;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      filteredMarkers = this.props.pointers.filter((marker) =>
        match.test(marker.title),
      );
    } else {
      filteredMarkers = this.props.pointers;
    }

    return (
      <div
        className={styles.container}
        style={{
          width: 300,
          height: '93.5vh',
          zIndex: 1,
          position: 'absolute',
          top: '64px',
          left: 0,
          backgroundColor: '#fff',
          padding: '0.65em',
          opacity: 0.8,
        }}>
        <TextField
          onChange={(e) => this.handleChange(e.target.value)}
          classes={styles.textField}
          placeholder="Filter Pointers"
        />
        <br />

        <List>
          {filteredMarkers.map((item, index) => (
            <div key={index}>
              <ListItem>
                <Avatar>
                  <FontAwesomeIcon icon={faMapMarkedAlt} />
                </Avatar>
                <ListItemText
                  primary={`${item.title}`}
                  secondary={`Latitude: ${item.lat} Longitude${item.lng}`}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default Sidebar;
