import { Schema, model } from 'mongoose'

const imageSchema = new Schema({
  name: String,
  url: String,
  remarks: String,
})
const imageModel = model('url-images', imageSchema)

module.exports = imageModel