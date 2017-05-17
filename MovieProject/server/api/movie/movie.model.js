'use strict';

import mongoose from 'mongoose';

var MovieSchema = new mongoose.Schema({
  Title: String,
  Year: String,
  Genre: String,
  Poster: String
});

export default mongoose.model('Movie', MovieSchema);
