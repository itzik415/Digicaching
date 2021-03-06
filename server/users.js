const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  getUserByEmail,
  postNewUser
} = require('./database');

let checkToken = async (req, res, next) => {
  let { authorization: Bearertoken } = req.headers;
  if (Bearertoken === undefined) {
    res.send(401);
  }
  let token = Bearertoken.split(" ")[1];
  let payload;
  try {
    payload = jwt.verify(token, process.env.SIGNATURE);
  } catch (err) {
    console.log(err);
  }

  if (payload) {
    req.jwt = payload;
    next();
  } else {
    res.send(401);
  }
};

let createToken = user =>
  jwt.sign(
    { userId: user.id },
    process.env.SIGNATURE,
    { expiresIn: '7d' }
  );

let userLogin = async (req, res) => {
  let { email, password } = req.body;
  let user;
  try {
    user = await getUserByEmail(email);
  } catch (err) {
    res.status(401).send("User Not Found");
  }

  let isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    let token = createToken(user);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ token }));
  } else {
    res.status(401).send("Missing/Incorrect Password");
  }
};

let userRegister = async (req, res) => {
  let {
    name,
    email,
    password
  } = req.body;
  let hashPass = await bcrypt.hash(password, 10);

  let insertPromise = postNewUser(name, email, hashPass);
  insertPromise
    .then(() => { userLogin(req, res); })
    .catch(err => {
      res.setHeader("Content-Type", "application/json");
      res.status(422).send(JSON.stringify(err));
    });
};

module.exports = {
  checkToken,
  createToken,
  userLogin,
  userRegister
};
