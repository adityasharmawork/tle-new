// async function fetchLeetcodeContests() {
//     try {
//       const graphqlQuery = {
//         query: `
//           query getContestList {
//             allContests {
//               title
//               startTime
//               duration
//               titleSlug
//             }
//           }
//         `
//       };
      
//       const response = await axios.post('https://leetcode.com/graphql', graphqlQuery, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const allContests = response.data.data.allContests;
//       const now = Date.now();
      
//       // Filter only active contests (start time is in the future)
//       const activeContests = allContests
//         .filter(contest => contest.startTime * 1000 > now)
//         .map(contest => ({
//           platform: 'LeetCode',
//           name: contest.title,
//           startTimeUnix: contest.startTime,
//           startTime: new Date(contest.startTime * 1000).toISOString(),
//           durationSeconds: contest.duration,
//           duration: `${Math.floor(contest.duration / 3600)} hours ${(contest.duration % 3600) / 60} minutes`,
//           url: `https://leetcode.com/contest/${contest.titleSlug}`
//         }));
      
//       return activeContests;
//     } catch (error) {
//       console.error('Error fetching LeetCode contests:', error.message);
//       return [];
//     }
//   }






const axios = require('axios');

exports.getLeetcodeContests = async (req, res) => {
    try {

        const graphqlQuery = {
            query: `
              query getContestList {
                allContests {
                  title
                  startTime
                  duration
                  titleSlug
                }
              }
            `
          };
          
          const response = await axios.post('https://leetcode.com/graphql', graphqlQuery, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          const allContests = response.data.data.allContests;
          const now = Date.now();
          
          const contests = allContests
            .map(contest => ({
              platform: 'LeetCode',
              name: contest.title,
              startTimeUnix: contest.startTime,
              startTime: new Date(contest.startTime * 1000).toISOString(),
              durationSeconds: contest.duration,
              duration: `${Math.floor(contest.duration / 3600)} hours ${(contest.duration % 3600) / 60} minutes`,
              url: `https://leetcode.com/contest/${contest.titleSlug}`
            }));
                  
        res.json({
            contests,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching Leetcode Contests!",
        });
    }
}
