
var express = require('express');
var router = express.Router();


router.get('/',(req, res)=>{
	req.session.destroy()
	console.log(req.session)
	res.redirect('/')
})

module.exports = router