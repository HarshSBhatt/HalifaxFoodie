const admin = require("firebase-admin");

exports.create = async (req, res) => {
  try {
    const { displayName, password, email, role } = req.body;

    if (!displayName || !password || !email || !role) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const { uid } = await admin.auth().createUser({
      displayName,
      password,
      email,
    });
    await admin.auth().setCustomUserClaims(uid, { role });

    return res.status(201).json({ uid });
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

const handleError = (res, err) => {
  return res.status(500).json({ code: err.code, message: err.message });
};
