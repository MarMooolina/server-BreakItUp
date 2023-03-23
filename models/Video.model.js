const { Schema, model } = require("mongoose");

const videoSchema = new Schema(
  {
    title: {
      type: String,
    },
    videoId:{
      type: String,
    },
    image:{
      type: String,
    },
    _owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

const Video = model("Video", videoSchema);

module.exports = Video;
