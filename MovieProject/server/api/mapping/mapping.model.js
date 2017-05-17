'use strict';

import mongoose from 'mongoose';

var MappingSchema = new mongoose.Schema({
  theatreCity: String,
  theatreLocation: String,
  theatreName: String,
  movieName: String,
  movieDate: String,
  movieTime: String
});

export default mongoose.model('Mapping', MappingSchema);
