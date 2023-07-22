import express from "express";
const router = express.Router();
import path from "path"
const __dirname = path.resolve();
import data from "../data/data.json" assert { type: "json" };

router.get('^/$|/subdir/index(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, 'view', 'subdir', 'index.html'));
});

router.get('/subdir/test(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, 'view', 'subdir', 'test.html'));
});

router.get('^/$|/index(.html)', (req, res) => {
	res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

router.get('/new-page(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, 'view', 'new-page.html'));
});

router.get('/old-page(.html)?', (req, res) => {
	res.redirect(301, '/new-page.html'); //302 by default
});

router.route('/')
	.get((req, res) => {
		res.json(data);
	})
	.post((req, res) => {
		res.json({
			"firstname": req.body.firstname,
			"lastname": req.body.lastname
		});
	})
	.put((req, res) => {
		res.json({
			"firstname": req.body.firstname,
			"lastname": req.body.lastname
		});
	})
	.delete((req, res) => {
		res.json({ "id": req.body.id })
	});

// router.route('/:id')
// 	.get((req, res) => {
// 		res.json({ "id": req.params.id });
// 	});

export default router;