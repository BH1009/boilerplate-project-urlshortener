const mongoose = require('mongoose');
const {urlSchema} = require('./schema.js');

const urlModel = mongoose.model("url", urlSchema);

const createShortener = async (original, short) => {
    try {
        createdShort = await urlModel.create({original_url: original, short_url: short});
        return createdShort;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

const searchUrl = async (original) => {
    try{
        const url = await urlModel.findOne({original_url: original}, {'_id': 0, '__v': 0});
        return url;
    } catch(err){
        console.log(err);
        throw err;
    }
}

const searchShort = async (short) => {
    try {
        const shortUrl = await urlModel.findOne({short_url: short}, {'_id': 0, '__v': 0});
        return shortUrl;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
  createShortener,
  searchUrl,
  searchShort
}