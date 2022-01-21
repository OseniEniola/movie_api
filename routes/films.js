var express = require("express");
var router = express.Router();
var HttpService = require("../modules/HttpService");
require("dotenv").config();
const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const db = require("knex")(configuration);
/* GET home page. */

//Routes
/** 
 * @swagger
 * /films:
 * get:
 *    description: Use to get all movies
 *    responses:
 *      '200':
 *        description: A succesful response
*/
router.get("/", async (req, res, next) => {
  try {
    const url = process.env.API_URL + "films";
    console.log("Url: " + url);
    const content = await HttpService.get(url);
    const movies = content?.results;
    // console.log(movies);
    var m = [];

    const comments = await db("Movie_Comments").select();
    //  console.log(comments);

    movies.forEach((movie) => {
      var filteredComments = comments.filter((comment) => {
        return comment.episode === movie["episode_id"];
      });
      //  console.log(filteredComments);
      m.push({
        title: movie.title,
        opening_crawl: movie.opening_crawl,
        episode: movie.episode_id,
        release_date: movie.release_date,
        comments: filteredComments,
        comment_count: filteredComments.length,
      });
    });

    m = m.sort(function (a, b) {
      return new Date(b.release_date) - new Date(a.release_date);
    });
    res.status(200).json(m);
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  }
});

router.get("/characters/:movie", async (req, res, next) => {
  const sort = req.query.sort;
  const sortBy = ["name", "gender", "height"];
  const canSort = sortBy.includes(sort);
  const movieId = req.params.movie;
  const url = process.env.API_URL + "films" + "/" + movieId;
  const orderBy = req.query.orderBy;
  const order = orderBy ?? "desc";
  const filterBy = req.query.filter;
  const filter = filterBy ?? "";

  if (sort && !canSort) {
    return res
      .send(400)
      .json({ message: "Can only sort by gender,name or height" });
  }

  if (filter && !["male", "female"].includes(filter)) {
    return response
      .status(400)
      .json({ message: 'filter can only be ["gender"]' });
  }

  const data = await HttpService.get(url);
  const characters = data.characters;
  const charactersArr = [];
  characters.forEach((itemUrl) => {
    charactersArr.push(HttpService.get(itemUrl));
  });
  const characterPromise = await Promise.all(charactersArr);

  let characterData = [...characterPromise];
  if (sort) {
    characterData = characterData.sort((name) => (a, b) => {
      if (a[name] < b[name]) {
        return -1;
      } else if (a[name] > b[name]) {
        return 1;
      }
      return 0;
    });
  }

  if (filter) {
    characterData = characterData.filter(
      (character) => character.gender === filter
    );
  }
//console.log(characterData)
const reg = /^\d+$/;
const height = characterData.filter(it=>it.height).map(it=>it.height).filter(num=>reg.test(num));
//console.log(height)
var totalHeight= 0
height.forEach(ele =>{
 return totalHeight = parseInt(ele) + totalHeight;
})
const calculateHeightInInch = totalHeight/2.54;
const heightInFT = Math.floor(totalHeight/12);
const remainingInches = calculateHeightInInch - heightInFT * 12;
const dataResponse = {
  characters: characterData,
  metadata:{
  count:characterData.length,
  totalHeight:characterData.length>0? {
    cm:totalHeight,
    ft: `${heightInFT}ft and ${Math.round(remainingInches)} inches `
  }:{}
  }};

  return res
    .status(200)
    .json({
      message: "Movie characters successfully retrieved",
      data: dataResponse,
    });
});

module.exports = router;
