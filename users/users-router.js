const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-mw.js");

router.get("/", restricted, (req, res) => {
	Users.find()
		.then((users) => {
			res.status(200).json({ data: users });
		})
		.catch((err) => res.send(err));
});

router.put("/:id", restricted, checkRole(["hr", "admin"]), (req, res) => {
	// use req.decodedToken data to restrict access by checking the role
	res.status(200).json({ hello: "you made it!" });
});

// role is an array of ["admin", "user"]
// .forEach worked for this
// .includes worked for this - I like this method more
// the below solution of mine prob would work but is totally non-scalable! So don't use it!

function checkRole(roles) {
	return function (req, res, next) {
		if (roles.includes(req.decodedToken.role)) {
			next();
		} else {
			res.status(403).json({ you: "can't touch this!" });
		}
	};
}

module.exports = router;
