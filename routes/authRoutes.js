const express = require("express");
const { register, login } = require("../controllers/authControllers");
const router = express.Router();
const resp = require("../response")

router.post("/register", register);
router.post("/login", login);
router.get("/logout", (req, res)=>{
    try {
        res.clearCookie("token")
        res.redirect("/login")
    } catch (error) {
        resp(400, "nothing", "gagal bang", res)
    }
})
module.exports = router;