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

// Info Window constructor from Utilities
import { infoWindowContent } from '../../utilities/infoWindow';

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
  showInfoOnHover = (e) => {
    const { markers, fourSquaresVenues, google, map } = this.props;
    const venueItem = e.target.parentElement.parentElement;

    fourSquaresVenues.forEach((v) => {
      if (v.venue.id === venueItem.id) {
        const contentString = infoWindowContent(
          v.venue.name,
          v.venue.categories[0].name,
          v.venue.location.city,
          v.venue.location.postalCode,
          v.venue.location.address,
          v.venue.location.lat,
          v.venue.location.lng,
        );

        const infoWindow = new google.InfoWindow({
          content: contentString,
        });

        markers.find((marker) => {
          if (marker.id === venueItem.id) {
            marker.setAnimation(google.Animation.BOUNCE);
            infoWindow.open(map, marker);
          } else {
            marker.setAnimation(null);
            venueItem.addEventListener('mouseleave', () =>
              infoWindow.close(map, marker),
            );
          }

          if (e.target !== venueItem || venueItem.children) {
            marker.setAnimation(null);
          }
        });
      }
    });
  };

  filterVenuesByQuery = (query) => {
    if (query) {
      const fourSquaresVenues = this.props.fourSquaresVenues.filter((v) =>
        v.venue.name.toLowerCase().includes(this.props.query.toLowerCase()),
      );

      return fourSquaresVenues;
    }
    return this.props.fourSquaresVenues;
  };

  displayMarkersIfMatch = (query) => {
    this.filterVenuesByQuery(query).map((v) => {
      let match = v.venue.name.toLowerCase().includes(query);

      const marker = Array.from(this.props.markers)
        .map((marker) => marker)
        .find((marker) => marker.id === v.venue.id);

      // If marker and query match,marker will be visible else not
      match ? marker.setVisible(true) : marker.setVisible(false);
    });
  };

  render() {
    const { onHandleQuery, query } = this.props;
    return (
      <div className="sidebar" role="navigation">
        <TextField
          onChange={(e) =>
            this.displayMarkersIfMatch(onHandleQuery(e.target.value))
          }
          classes={styles.textField}
          placeholder="Filter Pointers"
          style={{ width: '100%', margin: '1em 0 1em 0' }}
        />
        <br />

        <List className="sidebar-list">
          {this.filterVenuesByQuery(query).map((venue, index) => (
            <div key={index} tabIndex="0">
              <ListItem
                className="sidebar-item"
                id={venue.venue.id}
                onMouseOver={(e) => this.showInfoOnHover(e)}>
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
        <p style={{ textAlign: 'center' }}>
          Powered by <FontAwesomeIcon icon={faFoursquare} size={'1x'} /> and{' '}
          <FontAwesomeIcon icon={faGoogle} size={'1x'} />
        </p>
      </div>
    );
  }
}

export default Sidebar;
