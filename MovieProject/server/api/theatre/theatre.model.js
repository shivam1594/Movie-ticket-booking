'use strict';

import mongoose from 'mongoose';

var TheatreSchema = new mongoose.Schema({
  Name: String,
  Location: String,
  City: String
});

export default mongoose.model('Theatre', TheatreSchema);
