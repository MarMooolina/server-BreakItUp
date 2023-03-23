const { Schema, model } = require("mongoose");

const quoteSchema = new Schema(
  {
    quote:{
      type: String,
    },
    author:{
      type: String,
    },
    _owner:{
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

const Quote = model("Quote", quoteSchema);

module.exports = Quote;
