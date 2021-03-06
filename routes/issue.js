var express = require('express');
var router = express.Router();
const Models = require('../models');
const checkLogin = require('../helpers/checkLogin')

router.use('/respond/:id', checkLogin)

let checkPermission = function(req, res, next){
	checkLogin(req, res, next, 'respond')
}

router.get('/',  (req, res)=>{
	// console.log(req.session)
	Models.Issue.findAll().then((result)=>{
		res.render('issue/list', {dataIssue:result})
	})
})


//router.get('/respond/:id',checkPermission, (req, res)=>{
router.get('/respond/:id', (req, res)=>{
	// console.log(checkLogin)
	// let data ={ userId: req.session.userId }
	// Models.Respond.findAll({where:{IssueId:req.params.id},include:Models.User}).then((result_respond)=>{
	// 	data.result_respond = result_respond
	// 	return Models.Issue.findById(req.params.id)
	// }).then((result_issue)=>{
	// 	data.result_issue = result_issue
	// 	res.send(data)
	//  	res.render('issue/respond', data)
	// })

	let data = {}
	Models.Respond.findAll({where:{IssueId:req.params.id},include:[Models.User]})
	.then((result)=>{
		data.result_respond = result
		Models.Issue.findById(req.params.id).then((result_issue)=>{
			data.result_issue = result_issue
			// res.send(data);
			res.render('issue/respond', data)
		})

	})

})

router.post('/respond/:id', (req, res)=>{
	// res.send(req.body)
	Models.Respond.create({
		IssueId: req.params.id,
		UserId: req.session.userId,
		respond: req.body.respond
	}).then(result=>{
		// res.send(result)
		res.redirect(`/issue/respond/${result.IssueId}`)
	})
})

router.get('/:id/:vote', (req, res)=>{
	Models.User.findById(req.session.userId).then((user)=>{
		return user.voteIssue(req.params.id, req.params.vote, Models.VoteIssue, Models.Issue)
	}).then((voteIssue)=>{
		res.redirect(`/issue/respond/${req.params.id}`)
	}).catch((err)=>{
		res.send(err)
	})
})

router.get('/respond/:issue_id/:res_id/:vote', (req, res)=>{
	Models.User.findById(req.session.userId).then((user)=>{
		return user.voteRespond(req.params.res_id, req.params.vote, Models.VoteRespond, Models.Respond)
	}).then(()=>{
		res.redirect(`/issue/respond/${req.params.issue_id}`)
	}).catch((err)=>{
		res.send(err)
	})
})

router.get('/respond/:id/command', (req, res)=>{
	console.log(req.session)
	let data = {
		id:req.params.id
	}

	res.render('issue/command', data)
})



router.get('/tes', (req, res)=>{
	console.log(req.body)
})

module.exports = router
