const express = require('express');
const redisClient = require('../db/redis');
const router = new express.Router();

router.post("/set-string", async(req,res) => {
  try{
    const {key, value} = req.body;
    await redisClient.set(key, value);
  } catch(err){
    console.log(err);
  }
})

router.get('/get-string/:key', async (req, res) => {
  try{
    const value = await redisClient.get(req.params.key);
    res.send({ value });
  } catch(err) {
    console.log(err);
  }
})

router.post('/set-list', async (req,res) => {
  try{
    await redisClient.rPush(req.body.key, req.body.list);
    res.send();
  } catch(err){
    console.log(err);
  }
})

router.get('/get-list/:key', async(req, res) => {
  try{
    const list = await redisClient.lRange(req.params.key, 0, -1);
    res.send(list);
  } catch(err){
    console.log(err);
  }
})


router.post('/set-hash', async (req,res) => {
  const hashArray = []
  for(let [k,v] of Object.entries(req.body.hash)){
    hashArray.push(k);
    hashArray.push(v);
  }
  try{
    await redisClient.hSet(req.body.key, hashArray);
    res.send();
  } catch(err){
    console.log(err);
  }
})

router.get('/get-hash/:key', async(req, res) => {
  try{
    const hash = await redisClient.hGetAll(req.params.key);
    res.send(hash);
  } catch(err){
    console.log(err);
  }
})


module.exports = router;