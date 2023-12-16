const express = require('express');
const router = express.Router();

router.get('/music/:name', (req, res)=>{
    res.json(musics[`${req.params.name}`])
})

module.exports = router