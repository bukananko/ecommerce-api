import {
  createNewComment,
  findCommentsByProductId,
} from "../repositories/comment.repository.js";

export const createComment = async (req, res) => {
  const { productId } = req.params;
  const { comment, userId } = req.body;

  try {
    const newComment = await createNewComment({
      productId,
      text: comment,
      userId,
    });

    res.json({ success: true, data: newComment, message: "Comment created" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCommentsOnProduct = async (req, res) => {
  const { productId } = req.params;
  const { skip } = req.query;

  try {
    const comments = await findCommentsByProductId({
      productId,
      skip: Number(skip),
    });

    res.json({ success: true, data: comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
