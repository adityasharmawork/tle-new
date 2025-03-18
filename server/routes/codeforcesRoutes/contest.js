const express = require('express');
const router = express.Router();

const { getCodeforcesContests } = require('../../controllers/codeforcesControllers/codeforcesController');
const { getUpcomingCodeforcesContests } = require('../../controllers/codeforcesControllers/upcomingCodeforcesController');
const { getPastCodeforcesContests } = require('../../controllers/codeforcesControllers/pastCodeforcesController');

// const verifyToken = require('../middlewares/auth');

// router.get('/codeforces', verifyToken, getCodeforcesContests);

router.get('/upcoming', getUpcomingCodeforcesContests);
router.get('/past', getPastCodeforcesContests);
router.get('/', getCodeforcesContests);


module.exports = router;