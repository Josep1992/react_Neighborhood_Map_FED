import React, { Component } from 'react';

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

class Sidebar extends Component {
  checkIfIdMatches = (e) => {
    const { markers, fourSquaresVenues, updateState } = this.props;

    fourSquaresVenues.filter((v) => {
      if (v.venue.id === e.target.parentElement.parentElement.id) {
        markers.find(marker => {
          if(marker.id === e.target.parentElement.parentElement.id)
          updateState({ markers: marker });
        })
      }
    });

  };

  render() {
    const { fourSquaresVenues, onHandleQuery } = this.props;
    return (
      <div className="sidebar" role="navigation">
        <p>
          Powered by <FontAwesomeIcon icon={faFoursquare} size={'1x'} /> and{' '}
          <FontAwesomeIcon icon={faGoogle} size={'1x'} />
        </p>
        <TextField
          onChange={(e) => onHandleQuery(e)}
          classes={styles.textField}
          placeholder="Filter Pointers"
          style={{ width: '100%', margin: '1em 0 1em 0' }}
        />
        <br />

        <List className="sidebar-list">
          {fourSquaresVenues.map((venue, index) => (
            <div key={index}>
              <ListItem
                className="sidebar-item"
                id={venue.venue.id}
                onClick={(e) => this.checkIfIdMatches(e)}>
                <br />
                <Avatar className="sidebar-avatar">
                  <img
                    src={
                      venue.venue.categories[0].icon.prefix +
                      32 +
                      venue.venue.categories[0].icon.suffix
                    }
                    alt={venue.venue.categories[0].name}
                  />
                </Avatar>
                <ListItemText primary={`${venue.venue.name}`} />
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
