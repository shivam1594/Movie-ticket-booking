'use strict';

import mongoose from 'mongoose';

var SeatSchema = new mongoose.Schema({
  shivCity: String,
  shivLocation: String,
  shivName: String,
  movieName: String,
  shivDate: String,
  shivTime: String
});

export default mongoose.model('Seat', SeatSchema);
