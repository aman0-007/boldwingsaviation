import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  intro: {
    type: String,
    required: true,
    trim: true
  },
  isLocal: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Team = mongoose.model('Team', teamSchema);