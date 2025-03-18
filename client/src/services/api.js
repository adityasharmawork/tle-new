
const BASE_URL = "http://localhost:8080/api";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Network response was not ok");
  }
  return response.json();
};

// Get all upcoming contests from all platforms
export const getUpcomingContests = async () => {
  try {
    const [codeforces, codechef, leetcode] = await Promise.all([
      fetch(`${BASE_URL}/codeforces/upcoming`).then(handleResponse),
      fetch(`${BASE_URL}/codechef/upcoming`).then(handleResponse),
      fetch(`${BASE_URL}/leetcode/upcoming`).then(handleResponse)
    ]);
    
    // Combine and sort by start time
    const allContests = [
      ...codeforces.contests,
      ...codechef.contests,
      ...leetcode.contests
    ].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    
    return allContests;
  } catch (error) {
    console.error("Error fetching upcoming contests:", error);
    throw error;
  }
};

// Get all past contests from all platforms
export const getPastContests = async () => {
  try {
    const [codeforces, codechef, leetcode] = await Promise.all([
      fetch(`${BASE_URL}/codeforces/past`).then(handleResponse),
      fetch(`${BASE_URL}/codechef/past`).then(handleResponse),
      fetch(`${BASE_URL}/leetcode/past`).then(handleResponse)
    ]);
    
    // Combine and sort by start time (descending for past contests)
    const allContests = [
      ...codeforces.contests,
      ...codechef.contests,
      ...leetcode.contests
    ].sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    
    return allContests;
  } catch (error) {
    console.error("Error fetching past contests:", error);
    throw error;
  }
};

// Get Codeforces contests
export const getCodeforcesContests = async () => {
  try {
    return fetch(`${BASE_URL}/codeforces`).then(handleResponse);
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error);
    throw error;
  }
};

// Get CodeChef contests
export const getCodechefContests = async () => {
  try {
    return fetch(`${BASE_URL}/codechef`).then(handleResponse);
  } catch (error) {
    console.error("Error fetching CodeChef contests:", error);
    throw error;
  }
};

// Get LeetCode contests
export const getLeetcodeContests = async () => {
  try {
    return fetch(`${BASE_URL}/leetcode`).then(handleResponse);
  } catch (error) {
    console.error("Error fetching LeetCode contests:", error);
    throw error;
  }
};

// Save a YouTube solution link for a contest
export const saveSolution = async (contestData) => {
  try {
    // This would normally be a POST request to your backend
    // For now, we'll simulate by saving to localStorage
    const solutions = JSON.parse(localStorage.getItem("contestSolutions") || "[]");
    
    // Check if this contest already has a solution
    const existingIndex = solutions.findIndex(
      s => s.id === contestData.id && s.platform === contestData.platform
    );
    
    if (existingIndex >= 0) {
      solutions[existingIndex] = contestData;
    } else {
      solutions.push(contestData);
    }
    
    localStorage.setItem("contestSolutions", JSON.stringify(solutions));
    return { success: true };
  } catch (error) {
    console.error("Error saving solution:", error);
    throw error;
  }
};

// Get all saved solutions
export const getSolutions = async () => {
  try {
    // This would normally be a GET request to your backend
    // For now, we'll load from localStorage
    return JSON.parse(localStorage.getItem("contestSolutions") || "[]");
  } catch (error) {
    console.error("Error fetching solutions:", error);
    throw error;
  }
};



























// // Save a solution
// export const saveSolution = async (solution) => {
//   // In a real app, this would be an API call
//   const solutions = JSON.parse(localStorage.getItem('solutions') || '[]');
  
//   // Check if this solution already exists
//   const index = solutions.findIndex(s => 
//     s.id === solution.id && s.platform === solution.platform
//   );
  
//   if (index !== -1) {
//     // Update existing solution
//     solutions[index] = solution;
//   } else {
//     // Add new solution
//     solutions.push(solution);
//   }
  
//   localStorage.setItem('solutions', JSON.stringify(solutions));
//   return solution;
// };

// // Get all solutions
// export const getSolutions = async () => {
//   // In a real app, this would be an API call
//   const solutions = JSON.parse(localStorage.getItem('solutions') || '[]');
//   return solutions;
// };




// // Delete a solution
// export const deleteSolution = async (solution) => {
//   // In a real app, this would be an API call
//   const solutions = JSON.parse(localStorage.getItem('solutions') || '[]');
  
//   // Filter out the solution to delete
//   const updatedSolutions = solutions.filter(s => 
//     !(s.id === solution.id && s.platform === solution.platform)
//   );
  
//   localStorage.setItem('solutions', JSON.stringify(updatedSolutions));
//   return true;
// };










// Delete a solution
export const deleteSolution = async (solution) => {
  try {
    // Get data from the correct localStorage key
    const solutions = JSON.parse(localStorage.getItem('contestSolutions') || '[]');
    
    // Filter out the solution to delete
    const updatedSolutions = solutions.filter(s => 
      !(s.id === solution.id && s.platform === solution.platform)
    );
    
    // Save back to the correct localStorage key
    localStorage.setItem('contestSolutions', JSON.stringify(updatedSolutions));
    return { success: true };
  } catch (error) {
    console.error("Error deleting solution:", error);
    throw error;
  }
};