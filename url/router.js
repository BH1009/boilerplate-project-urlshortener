const express = require('express');
const {createShortener, searchUrl, searchShort} = require('./model.js');

const urlRouter = express.Router();

// Verify url
const verifyUrl = (url) => {
   const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  // const regex = /^(https?:\/\/(www\.)?)?[A-Za-z0-9]+([-.][A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$
/;
  return regex.test(url); 
}

// Random short
const randomUrl = () => Math.floor(Math.random() * 1001);

// Your first API endpoint
urlRouter.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

urlRouter.post('/api/shorturl', async (req, res) => {
  const original = req.body.url;
  const short = randomUrl();
  if(verifyUrl(original)){
    const isShortCreate =  await searchUrl(original);
    if(!isShortCreate){
      createShortener(original, short);
      const showUrl = await searchUrl(original);
      res.status(201).json(showUrl);
    }
    else{
        res.status(200).json(isShortCreate);
    }
  } 
  else{
    res/*.status(400)*/.json({error: 'invalid url'});
  } 
});

urlRouter.get('/api/shorturl/:short', async (req, res) => {
    const saveUrl = await searchShort(req.params.short);
    res.status(200).redirect(saveUrl.original_url);
});


module.exports = {
  urlRouter
}