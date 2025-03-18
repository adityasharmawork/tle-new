
import { useState, useEffect } from "react";
import { getUpcomingContests } from "../services/api";
import ContestCard from "../components/ContestCard";
import PlatformFilter from "../components/PlatformFilter";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function UpcomingContests() {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [platforms, setPlatforms] = useState({
    codeforces: true,
    codechef: true,
    leetcode: true
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setIsLoading(true);
        const data = await getUpcomingContests();
        
        // Ensure each contest has a unique identifier
        const uniqueContests = [];
        const seen = new Set();
        
        data.forEach(contest => {
          const key = getContestUniqueKey(contest);
          if (!seen.has(key)) {
            seen.add(key);
            uniqueContests.push(contest);
          }
        });
        
        setContests(uniqueContests);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch upcoming contests:", err);
        setError("Failed to load upcoming contests. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchContests();
  }, []);

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

  // useEffect(() => {
  //   // Apply platform filters
  //   if (contests.length > 0) {
  //     // Apply strict platform filtering
  //     const filtered = contests.filter(contest => {
  //       const platform = contest.platform.toLowerCase();
  //       return platforms[platform] === true;
  //     });
      
  //     // Sort by start time
  //     filtered.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
      
  //     setFilteredContests(filtered);
  //   }
  // }, [platforms, contests]);

  // const handleFilterChange = (selected) => {
  //   setPlatforms(selected);
  // };







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
      
      // Sort by start time
      filtered.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
      
      setFilteredContests(filtered);
    }
  }, [platforms, contests, searchQuery]);



  const handleFilterChange = (selected) => {
    setPlatforms(selected);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };





  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Upcoming Contests</h1>
        <p className="text-muted-foreground">
          Stay updated with all the upcoming programming contests across different platforms.
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
              showDetails={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
