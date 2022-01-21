var HttpService =require("../modules/HttpService");
require('dotenv').config();
var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);
const {v4: uuidv4} = require('uuid');


router.get('/', async (req, res, next) => {
  const comments = await db('Movie_Comments').select();
  res.status(200).json(comments)
});

router.post('/create/:episode', async (req,res,next) =>{
  try {
    const content = req.body;
 //   console.log(content.content)
    const episode = req.params.episode
    if(!content){
      return res.status(400).json({message: 'Comment cannot be empty'})
    }
    if(content.length> 500){
      return response
        .status(400)
        .json({message: 'content length must be greater than 500 characters'});
    }
    const reg = /^\d+$/;
    if(!reg.test(episode)){
      return response
        .status(400)
        .json({message: 'movie_id can only be numeric value'});
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  //  console.log(ip)
    const date = new Date()
    const d=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

    const payload ={
     id:uuidv4(), message:content.content,episode:episode,ip:ip,created_at:d
    }
    const id = await db('Movie_Comments').insert(payload, 'id');
    res.status(201).json({ id })
  } catch (error) {
    console.error(
      `Create Comment({ content: ${req.body.content} }) >> Error: ${error.stack}`
    );
    response.status(500).json(error);
  }
})
/* Get Movie COmments */
router.get('/:episode', async(req,res,next)=>{
try {
  const episode = req.params.episode
  if(!episode){
    return res.status(400).json({message: 'Movie Episode is required'})
  }
  if(isNaN(episode)){
    return response
      .status(400)
      .json({message: 'Episode is not a number'});
  }
  const comments =   await db('Movie_Comments').select().where('episode',episode);
  res.status(200).json(comments)
} catch (error) {
  console.error(
    `Get Comment({ content: ${req.params.episode} }) >> Error: ${error.stack}`
  );
  response.status(500).json(error);
}
})
module.exports= router;
