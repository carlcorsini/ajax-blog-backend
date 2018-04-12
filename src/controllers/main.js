const model = require("../models/main");

finder = (array, paramId) => {
  return array.find(a => {
    return a.id === paramId;
  });
};

createPost = (req, res, next) => {
  const result = model.createPost(req.body.title, req.body.content);
  if (result.error) next(result);
  else
    res.status(201).json({
      result,
      message: "item created"
    });
};

getAllPosts = (req, res, next) => {
  const result = model.getAllPosts(req.query.limit);
  if (result.error) next(result);
  else
    res.status(201).json({
      result,
      message: "all posts returned"
    });
};

getPostById = (req, res, next) => {
  const result = model.getPostById(req.params.id);
  if (result.error) next(result);
  else
    res.status(200).json({
      result,
      message: `Post with ID: ${req.params.id} returned`
    });
};

update = (req, res, next) => {
  const result = model.update(
    req.params.id,
    req.body.editTitle,
    req.body.editContent
  );
  if (result.error) next(result);
  else
    res.status(200).json({
      result,
      message: `item with ID: ${req.params.id} updated`
    });
};
deletePost = (req, res, next) => {
  const result = model.deletePost(req.params.id);
  if (result.error) next(result);
  else
    res.status(200).json({
      result,
      message: `item with ID: ${req.params.id} deleted`
    });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  update,
  deletePost
};
