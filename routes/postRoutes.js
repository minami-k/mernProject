const express = require("express");
const router = express.Router();
const Post = require("../models/post");
router.post("/", async (req, res) => {
  const newPost = await new Post(req, body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new posts

router.post("/newpost", (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const savePost = newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }

  /*     if(!req.body.title){
        res.status(500).send({
            name: "TitleError",
            message: "Title is required"
        })
    }else{
        Post.create(
            new Post({ username: req.body.username }),
            req.body.password,
            (err, user) => {
                if(err){
                    res.status(500).send(err)
                }else{
                    user.firstName = req.body.firstName
                    user.lastName = req.body.lastName
                    const token = getToken({ _id: user._id })
                    const refreshToken = getRefreshToken({ _id: user._id })
                    user.refreshToken.push({ refreshToken })
                    user.save((err, user) => {
                        if(err){
                            res.status(500).send(err)
                        }else{
                            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                            res.send({ success: true, token })
                        }
                    })
                }
            }
        )
    }
 */
});

module.exports = router;
