const express = require('express');
const router = express.Router();


const { getCodechefContests } = require('../../controllers/codechefControllers/codechefController');
const { getUpcomingCodechefContests } = require('../../controllers/codechefControllers/upcomingCodechefController');
const { getPastCodechefContests } = require('../../controllers/codechefControllers/pastCodechefController');

// const verifyToken = require('../middlewares/auth');

// router.get('/codeforces', verifyToken, getCodeforcesContests);

router.get('/', getCodechefContests);
router.get('/upcoming', getUpcomingCodechefContests);
router.get('/past', getPastCodechefContests);



module.exports = router;