import PostModel from '../models/Post.js'

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec()
    const tags = posts
      .map((item) => item.tags)
      .flat()
      .slice(0, 5)

    res.json(tags)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'failed to get articles',
    })
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec()
    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'failed to get articles',
    })
  }
}

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )
      .populate('user')
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Article not defined',
          })
        }
        res.json(doc)
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({
          message: 'failed to get article!',
        })
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'failed to get article!',
    })
  }
}

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags ? req.body.tags.split(',') : [],
      user: req.userId,
    })
    const post = await doc.save()
    res.json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to create the post',
    })
  }
}

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags ? req.body.tags.split(',') : [],
        user: req.userId,
      }
    )

    res.json({
      success: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to update the post',
    })
  }
}

export const removePost = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findByIdAndDelete({
      _id: postId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Article not defined',
          })
        }
        res.json({
          success: true,
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          message: 'failed to remove article!',
        })
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'failed to remove article!',
    })
  }
}
