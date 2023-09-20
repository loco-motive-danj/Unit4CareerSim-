const express = require('express');
const router = express.Router();

router.use("/test", require("./test"))
router.use("/posts", require("./posts"))


module.exports = router;