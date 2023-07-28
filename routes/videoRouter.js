const express = require('express');
const router = express.Router();
const Video = require('../models/videoModel');

router.get('/',async (req,res)=>{
  try{
    const video = await Video.find();
    res.status(200).json(video);
  } catch(error){
    res.status(500).json({ message: error.message });
  }
})

router.get("/listProduk", async(req,res)=>{
  try{
    const video = await Video.find();
    const product = video.map((video) => {
      return video.product
    });
    res.status(200).json(product);
  } catch(error){
    res.status(500).json({ message: error.message });
  }
})

router.get('/:id', async(req,res) =>{
  try{
    const video = await Video.aggregate([
      { $match: {videoId : req.params.id} },
      {
        $lookup: {
          from: "comments",
          localField: "videoId", 
          foreignField: "videoId",
          as: "comments",
        },
      },
    ])
    res.status(200).json(video);
  } catch(error){
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

