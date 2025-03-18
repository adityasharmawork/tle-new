const axios = require('axios');


exports.getUpcomingCodechefContests = async (req, res) => {
    try {
      const response = await axios.get('https://www.codechef.com/api/list/contests/all');
      
      const contests = response.data.future_contests.map(contest => ({
        platform: 'CodeChef',
        name: contest.contest_name,
        code: contest.contest_code,
        startTimeUnix: Math.floor(new Date(contest.contest_start_date).getTime() / 1000),
        startTime: new Date(contest.contest_start_date).toISOString(),
        endTime: new Date(contest.contest_end_date).toISOString(),
        duration: calculateDuration(contest.contest_start_date, contest.contest_end_date),
        url: `https://www.codechef.com/${contest.contest_code}`
      }));

      return res.json({
        contests,
      });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error fetching CodeChef Contests!",
        });
    }
  }

  function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationSeconds = Math.floor((end - start) / 1000);
    
    return `${Math.floor(durationSeconds / 3600)} hours ${(durationSeconds % 3600) / 60} minutes`;
  }