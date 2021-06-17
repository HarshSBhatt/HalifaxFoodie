const admin = require("firebase-admin");
const { handleError } = require("../../utils/handleError");
const { mapQuestionToUser } = require("../questions/service");
const { createUser } = require("./service");

exports.create = async (req, res) => {
  try {
    const {
      displayName,
      password,
      email,
      phoneNumber,
      role,
      questionId,
      answer,
    } = req.body;

    if (
      !displayName ||
      !password ||
      !email ||
      !role ||
      !questionId ||
      !answer
    ) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const { uid, ...user } = await admin.auth().createUser({
      displayName,
      password,
      email,
      phoneNumber,
    });

    await admin.auth().setCustomUserClaims(uid, { role });

    const userData = [
      uid,
      user.email,
      user.displayName,
      user.phoneNumber,
      user.photoURL,
      user.providerData[0].providerId,
      user.metadata.creationTime,
    ];

    createUser(userData, async (err, results) => {
      if (err) {
        await admin.auth().deleteUser(uid);
        return handleError(res, err);
      }
      if (!results) {
        const error = {
          code: "Issue to fetch result",
          message: "Something went wrong",
        };
        return handleError(res, error);
      }
      const userQuestionData = [uid, questionId, answer];
      mapQuestionToUser(userQuestionData, async (err, results) => {
        if (err) {
          await admin.auth().deleteUser(uid);
          return handleError(res, err);
        }
        if (!results) {
          const error = {
            code: "Issue to fetch result",
            message: "Something went wrong",
          };
          return handleError(res, error);
        }
        return res.status(201).json({ uid });
      });
    });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.all = async (req, res) => {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map(mapUser);
    return res.status(200).json({ users });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await admin.auth().getUser(id);
    return res.status(200).json({ user: mapUser(user) });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.patch = async (req, res) => {
  try {
    const { id } = req.params;
    const { displayName, password, email, role } = req.body;

    if (!id || !displayName || !password || !email || !role) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await admin.auth().updateUser(id, { displayName, password, email });
    await admin.auth().setCustomUserClaims(id, { role });
    const user = await admin.auth().getUser(id);

    return res.status(204).json({ user: mapUser(user) });
  } catch (err) {
    return handleError(res, err);
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.auth().deleteUser(id);
    return res.status(204).json({});
  } catch (err) {
    return handleError(res, err);
  }
};

const mapUser = (user) => {
  const customClaims = user.customClaims || { role: "" };
  const role = customClaims.role ? customClaims.role : "";
  return {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    role,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
  };
};
