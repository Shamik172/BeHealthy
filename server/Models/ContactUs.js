const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactUsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    msg: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const ContactUsModel = mongoose.model('ContactUs', ContactUsSchema);
module.exports = ContactUsModel;
