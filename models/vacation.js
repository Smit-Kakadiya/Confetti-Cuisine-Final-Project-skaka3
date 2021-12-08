"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

var vacationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    heroImage: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        enum: [ null , "Continental", "Traditional", "Haute-cuisine", "Nouvelle-cuisine", "Fusion", "Vegan", "Vegetarian", "Asian", "Indian", "Middle-Eastern", "African", "Central American", "South American" ],
        required: true
    },
    cost: {
        type: Number,
        default: 0,
        min: [0, "Vacation packages cannot have a negative cost"],
        required: false
    },
    maxTravelers: {
        type: Number,
        default: 0,
        max: [25, "Vacation packages cannot have more than 25 travelers"],
        min: [0, "Vacation packages cannot have a negative number of travelers"],
        required: false
    },
    destination: {
        type: String,
        default: "None specified",
        required: true
    },
    departureLocation: {
        type: String,
        enum: [ null , "New York (JFK)", "Boston (BOS)", "Chicago (ORD)", "Miami (MIA)", "St. Louis (STL)", "Dallas (DFW)", "Seattle (SEA)", "San Francisco (SFO)" ],
        required: true
    },
    departureDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    returnDate: {
        type: Date,
        default: Date.now,
        required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("vacation", vacationSchema);