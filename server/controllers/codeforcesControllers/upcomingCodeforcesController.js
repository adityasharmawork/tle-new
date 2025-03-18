const axios = require('axios');

exports.getUpcomingCodeforcesContests = async (req, res) => {
    try {
        const response = await axios.get('https://codeforces.com/api/contest.list');
        // const contests = response.data.result;


        const contests = response.data.result
        .filter(contest => contest.phase === 'BEFORE')
        .map(contest => ({
            id: contest.id,
            platform: 'Codeforces',
            name: contest.name,
            type: contest.type,
            phase: contest.phase,
            frozen: contest.frozen,
            startTimeSeconds: contest.startTimeSeconds,
            startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
            relativeTimeSeconds: contest.relativeTimeSeconds,
            durationSeconds: contest.durationSeconds,
            duration: `${Math.floor(contest.durationSeconds / 3600)} hours ${(contest.durationSeconds % 3600) / 60} minutes`,
            url: `https://codeforces.com/contests/${contest.id}`
        }));


        res.json({
            contests,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching CodeForces Contests!",
        });
    }
}






// exports.getUpcomingCodeforcesContests = async (req, res) => {
//     try {
//         const response = await axios.get('https://codeforces.com/api/contest.list');
//         const contests = response.data.result;
//         res.json({
//             contests,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Error fetching CodeForces Contests!",
//         });
//     }
// }
