const fourSquares = {
  client_id: 'XNSAG0PISJ411W3EJODIW51APQE2EXZ2RASS5DLQZDIAMKLV',
  secret: 'Y4PC0YTCUZ0EMHUVPDPEYZBRYIYKGFAZTCF4EWHV2E3M3WHR',
  query: 'beaches',
  limit: 8,
  near: 'San Juan',
};

export const endpoint = `https://api.foursquare.com/v2/venues/explore?client_id=${
  fourSquares.client_id
}&client_secret=${fourSquares.secret}&v=20180323&limit=${
  fourSquares.limit
}&ll=18.4655394,-66.1057355&query=${fourSquares.query}`;
