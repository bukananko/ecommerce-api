import bcrypt from "bcrypt";
import {
  createNewUser,
  editUser,
  findUserById,
  findUserByUsername,
} from "../repositories/user.repository.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Username or password is incorrect!",
      });
    }

    res.json({
      success: true,
      data: user.id,
      message: "Logged in successfully!",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists, try another username",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createNewUser({
      username,
      password: hashedPassword,
    });

    res.json({ success: true, message: "Registered successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { username } = req.body;
  const { id } = req.query;

  try {
    const user = await findUserById(id);

    if (user.updatedAt) {
      const currentDate = new Date();
      const isTwoWeeks = new Date(
        user.updatedAt.getTime() + 14 * 24 * 60 * 60 * 1000
      );
      const formatDate = isTwoWeeks.toLocaleDateString([], {
        dateStyle: "long",
      });

      if (currentDate !== isTwoWeeks && user.username !== username) {
        return res.status(400).json({
          success: false,
          message: `You can change your username after ${formatDate}`,
        });
      }
    }

    const isUserExists = await findUserByUsername(username);

    if (isUserExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists, try another username",
      });
    }

    await editUser({ id, username });

    res.json({ success: true, message: "Edit profile successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
