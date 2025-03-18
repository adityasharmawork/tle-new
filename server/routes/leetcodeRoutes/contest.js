const express = require('express');
const router = express.Router();

const { getLeetcodeContests } = require('../../controllers/leetcodeControllers/leetcodeController');
const { getUpcomingLeetcodeContests } = require('../../controllers/leetcodeControllers/upcomingLeetcodeController');
const { getPastLeetcodeContests } = require('../../controllers/leetcodeControllers/pastLeetcodeController');

// const verifyToken = require('../middlewares/auth');

// router.get('/leetcode', verifyToken, getCodeforcesContests);

router.get('/', getLeetcodeContests);
router.get('/upcoming', getUpcomingLeetcodeContests);
router.get('/past', getPastLeetcodeContests);


module.exports = router;