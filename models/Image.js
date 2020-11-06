const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    image: String,
    imageId: String
});

module.exports = Image = mongoose.model("Image", ImageSchema);
