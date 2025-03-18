
import { useState, useEffect } from "react";
import { getPastContests, getSolutions } from "../services/api";
import ContestCard from "../components/ContestCard";
import PlatformFilter from "../components/PlatformFilter";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function PastContests() {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [platforms, setPlatforms] = useState({
    codeforces: true,
    codechef: true,
    leetcode: true
  });

  const [searchQuery, setSearchQuery] = useState("");

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
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [contestsData, solutionsData] = await Promise.all([
          getPastContests(),
          getSolutions()
        ]);
        
        // Ensure each contest has a unique identifier
        const uniqueContests = [];
        const seen = new Set();
        
        contestsData.forEach(contest => {
          const key = getContestUniqueKey(contest);
          if (!seen.has(key)) {
            seen.add(key);
            uniqueContests.push(contest);
          }
        });
        
        setContests(uniqueContests);
        setSolutions(solutionsData);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch past contests:", err);
        setError("Failed to load past contests. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);





  // useEffect(() => {
  //   // Apply platform filters
  //   if (contests.length > 0) {
  //     // Apply strict platform filtering
  //     const filtered = contests.filter(contest => {
  //       const platform = contest.platform.toLowerCase();
  //       return platforms[platform] === true;
  //     });
      
  //     // Sort by start time (newest first for past contests)
  //     filtered.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
      
  //     setFilteredContests(filtered);
  //   }
  // }, [platforms, contests]);









  useEffect(() => {
     // Apply platform filters and search query
     if (contests.length > 0) {
      // Apply platform filtering
      let filtered = contests.filter(contest => {
        const platform = contest.platform.toLowerCase();
        return platforms[platform] === true;
      });
      
      // Apply search filtering if there's a search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(contest => {
          // Search in name
          if (contest.name.toLowerCase().includes(query)) return true;
          
          // Search in platform
          if (contest.platform.toLowerCase().includes(query)) return true;
          
          // Search in date
          const date = new Date(contest.startTime).toLocaleDateString();
          if (date.toLowerCase().includes(query)) return true;
          
          return false;
        });
      }
      
      // Sort by start time (newest first for past contests)
      filtered.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
      
      setFilteredContests(filtered);
    }
  }, [platforms, contests, searchQuery]);







  const handleFilterChange = (selected) => {
    setPlatforms(selected);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Find a solution for a given contest
  const findSolution = (contest) => {
    const solution = solutions.find(
      s => {
        // Match by the unique key where possible
        const contestKey = getContestUniqueKey(contest);
        const solutionKey = s.platform + '-' + (s.id || s.code || s.name);
        return contestKey === solutionKey;
      }
    );
    return solution ? solution.youtubeLink : null;
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Past Contests</h1>
        <p className="text-muted-foreground">
          Browse through previous contests and access solutions where available.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />
      
      <div className="mb-8">
        <p className="text-sm font-medium mb-2">Filter by platform:</p>
        <PlatformFilter onChange={handleFilterChange} />
      </div>
      
      {filteredContests.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContests.map((contest) => (
            <ContestCard 
              key={getContestUniqueKey(contest)} 
              contest={contest} 
              isPast={true}
              solution={findSolution(contest)}
              showDetails={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
