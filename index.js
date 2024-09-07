require('dotenv').config();
const express = require("express");
const sequelize = require('./lib/sequelize.js');
const userModel = require('./models/user.js');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
  console.log("Database Connected and Synced");
}).catch(() => {
  console.error("Unable to Connect")
})



//Exercise 2: Get all users
app.get("/users", async (req, res) => {
  try {
    users = await userModel.findAll();
    res.json({ users });
  } catch (error) {
    return res.status(500).json({ error: "Unable to fetch Users"})
  }
});

//Exercise 3: Get user by ID
app.get("/users/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let user = await userModel.findByPk(id);
    if (user) {
      return res.json({ user })
    } else {
      return res.status(404).json({ message: "No users found for " + id });
    }
  } catch (error) {
    return res.status(500).json({ error: "Unable to fetch User by Id"})
  }

})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})