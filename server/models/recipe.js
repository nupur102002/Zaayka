const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {         // will be in url form
    type: String, 
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",      //this refer to user model
  },
});

mongoose.model("Recipe", recipeSchema);