const express = require('express');
const router = express.Router();

// const { getCodeforcesContests } = require('../controllers/codeforcesController');
// const { getUpcomingCodeforcesContests } = require('../controllers/upcomingCodeforcesController');
// const { getUpcomingCodechefContests } = require('../controllers/upcomingCodechefController');
// const { getPastCodechefContests } = require('../controllers/pastCodechefController');
// const { getPastCodeforcesContests } = require('../controllers/pastCodeforcesController');
// const { getLeetcodeContests } = require('../controllers/leetcodeController');
// const { getUpcomingLeetcodeContests } = require('../controllers/upcomingLeetcodeController');
// const { getPastLeetcodeContests } = require('../controllers/pastLeetcodeController');
// const { getCodechefContests } = require('../controllers/codechefController');


const codeforcesRoutes = require("./codeforcesRoutes/contest");
const codechefRoutes = require("./codechefRoutes/contest");
const leetcodeRoutes = require("./leetcodeRoutes/contest");



// const verifyToken = require('../middlewares/auth');

// router.get('/codeforces', verifyToken, getCodeforcesContests);

// router.get('/codeforces', getCodeforcesContests);
// router.get('/leetcode', getLeetcodeContests);
// router.get('/codechef', getCodechefContests);
// router.get('/upcomingleetcode', getUpcomingLeetcodeContests);
// router.get('/pastleetcode', getPastLeetcodeContests);
// router.get('/upcomingcodeforces', getUpcomingCodeforcesContests);
// router.get('/pastcodeforces', getPastCodeforcesContests);
// router.get('/upcomingcodechef', getUpcomingCodechefContests);
// router.get('/pastcodechef', getPastCodechefContests);


router.use('/codeforces', codeforcesRoutes);
router.use('/leetcode', leetcodeRoutes);
router.use('/codechef', codechefRoutes);



module.exports = router;