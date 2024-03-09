import { createNewReply } from "../repositories/reply.repository.js";

export const createReply = async (req, res) => {
  const { commentId } = req.params;
  const { comment, userId } = req.body;

  try {
    const newReply = await createNewReply({
      commentId,
      text: comment,
      userId,
    });

    res.json({ success: true, data: newReply, message: "Reply created" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
