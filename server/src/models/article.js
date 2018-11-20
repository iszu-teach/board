'use strict'

const db = require('../lib/db').default
const { Schema } = require('mongoose')

const schema = new Schema({
  _id: String,
  type: Number,
  sticky: {
    type: Boolean,
    index: true
  },
  title: String,
  author: String,
  content: String,
  attachments: [{
    _id: false,
    name: String,
    href: String
  }],
  lecture: {
    type: Boolean,
    default: false
  },
  date: Date,
  lastEdit: {
    type: Date,
    index: true
  }
})

schema.set('toJSON', { versionKey: false })
schema.set('toObject', { versionKey: false })
module.exports = db.model('Article', schema)
