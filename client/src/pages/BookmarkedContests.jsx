
import { useState, useEffect } from "react";
import ContestCard from "../components/ContestCard";
import EmptyState from "../components/EmptyState";

export default function BookmarkedContests() {
  const [bookmarkedContests, setBookmarkedContests] = useState([]);
  
  // Generate a unique key for a contest
  const getContestUniqueKey = (contest) => {
    if (contest.platform.toLowerCase() === 'leetcode') {
      // Use name for LeetCode contests since they might not have stable IDs
      return `${contest.platform}-${contest.name}`;
    } else {
      // Use ID or code for Codeforces and CodeChef
      return `${contest.platform}-${contest.id || contest.code}`;
    }
  };
  
  useEffect(() => {
    // Load bookmarks from localStorage
    const loadBookmarks = () => {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarkedContests") || "[]");
      
      // Ensure we have no duplicates
      const uniqueBookmarks = [];
      const seen = new Set();
      
      bookmarks.forEach(contest => {
        const key = getContestUniqueKey(contest);
        if (!seen.has(key)) {
          seen.add(key);
          uniqueBookmarks.push(contest);
        }
      });
      
      setBookmarkedContests(uniqueBookmarks);
    };
    
    loadBookmarks();
    
    // Add event listener for storage changes (for cross-tab sync)
    window.addEventListener("storage", loadBookmarks);
    
    return () => {
      window.removeEventListener("storage", loadBookmarks);
    };
  }, []);
  
  const handleBookmarkChange = (contest, isBookmarked) => {
    if (!isBookmarked) {
      // Remove the contest from the list when un-bookmarked
      const contestKey = getContestUniqueKey(contest);
      setBookmarkedContests(prev => 
        prev.filter(c => getContestUniqueKey(c) !== contestKey)
      );
    }
  };
  
  // Sort contests by start time
  const sortedContests = [...bookmarkedContests].sort((a, b) => {
    const dateA = new Date(a.startTime).getTime();
    const dateB = new Date(b.startTime).getTime();
    return dateA - dateB;
  });
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Bookmarked Contests</h1>
        <p className="text-muted-foreground">
          Your saved contests from all platforms.
        </p>
      </div>
      
      {sortedContests.length === 0 ? (
        <div className="py-8">
          <EmptyState message="You haven't bookmarked any contests yet." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedContests.map((contest) => {
            const isPast = new Date(contest.startTime) < new Date();
            
            return (
              <ContestCard 
                key={getContestUniqueKey(contest)} 
                contest={contest} 
                isPast={isPast}
                onBookmark={handleBookmarkChange}
                showDetails={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
