
import { useState, useEffect } from "react";
// import { getPastContests, saveSolution, getSolutions } from "../services/api";
import { getPastContests, saveSolution, getSolutions, deleteSolution } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
// import { Check, AlertCircle } from "lucide-react";
import { Check, AlertCircle, Trash, Edit, X } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function AdminPage() {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedContest, setSelectedContest] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingSolution, setEditingSolution] = useState(null);


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
        
        setContests(contestsData);
        setSolutions(solutionsData);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load contests. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter contests by selected platform
    if (contests.length > 0) {
      if (selectedPlatform === "all") {
        setFilteredContests(contests);
      } else {
        const filtered = contests.filter(contest => 
          contest.platform.toLowerCase() === selectedPlatform.toLowerCase()
        );
        setFilteredContests(filtered);
      }
      
      // Reset selected contest when platform changes
      setSelectedContest("");
    }
  }, [selectedPlatform, contests]);

  // Get the selected contest object
  const getSelectedContestObj = () => {
    if (!selectedContest) return null;
    return contests.find(c => 
      getContestUniqueKey(c) === selectedContest
    );
  };

  // Get existing solution for the selected contest
  const getExistingSolution = () => {
    const contest = getSelectedContestObj();
    if (!contest) return null;
    
    return solutions.find(
      s => s.id === contest.id && s.platform === contest.platform
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setSuccessMessage("");
    setErrorMessage("");
    
    const contest = getSelectedContestObj();
    if (!contest) {
      setErrorMessage("Please select a contest");
      return;
    }
    
    if (!youtubeLink) {
      setErrorMessage("Please enter a YouTube link");
      return;
    }
    
    try {
      // Save the solution
      await saveSolution({
        id: contest.id,
        code: contest.code,
        platform: contest.platform,
        name: contest.name,
        youtubeLink
      });
      
      // Update the solutions list
      const updatedSolutions = await getSolutions();
      setSolutions(updatedSolutions);
      
      // Show success message
      setSuccessMessage("Solution link saved successfully!");
      
      // Reset the form
      setYoutubeLink("");
      setSelectedContest("");
    } catch (err) {
      console.error("Failed to save solution:", err);
      setErrorMessage("Failed to save solution. Please try again.");
    }
  };

  useEffect(() => {
    // Check if there's already a solution for this contest
    const existingSolution = getExistingSolution();
    if (existingSolution) {
      setYoutubeLink(existingSolution.youtubeLink);
    } else {
      setYoutubeLink("");
    }
  }, [selectedContest]);






    // Start editing a solution
    const handleEdit = (solution) => {
      setEditingSolution(solution);
    };
  
    // Cancel editing
    const handleCancelEdit = () => {
      setEditingSolution(null);
    };
  
    // Save edited solution
    const handleSaveEdit = async (solution, newLink) => {
      try {
        // Reset messages
        setSuccessMessage("");
        setErrorMessage("");
        
        // Update the solution
        await saveSolution({
          ...solution,
          youtubeLink: newLink
        });
        
        // Update the solutions list
        const updatedSolutions = await getSolutions();
        setSolutions(updatedSolutions);
        
        // Cancel editing mode
        setEditingSolution(null);
        
        // Show success message
        setSuccessMessage("Solution link updated successfully!");
      } catch (err) {
        console.error("Failed to update solution:", err);
        setErrorMessage("Failed to update solution. Please try again.");
      }
    };
  
    // Delete a solution
    const handleDelete = async (solution) => {
      if (window.confirm("Are you sure you want to delete this solution?")) {
        try {
          // Reset messages
          setSuccessMessage("");
          setErrorMessage("");
          
          // Delete the solution
          await deleteSolution(solution);
          
          // Update the solutions list
          const updatedSolutions = await getSolutions();
          setSolutions(updatedSolutions);
          
          // Show success message
          setSuccessMessage("Solution deleted successfully!");
        } catch (err) {
          console.error("Failed to delete solution:", err);
          setErrorMessage("Failed to delete solution. Please try again.");
        }
      }
    };




  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">
          Add YouTube solution links to past contests.
        </p>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Platform</label>
            <select
              value={selectedPlatform}
              onChange={(e) => {
                setSelectedPlatform(e.target.value);
                setSelectedContest("");
              }}
              className="w-full bg-background border border-input rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Platforms</option>
              <option value="codeforces">Codeforces</option>
              <option value="codechef">CodeChef</option>
              <option value="leetcode">LeetCode</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contest</label>
            <select
              value={selectedContest}
              onChange={(e) => setSelectedContest(e.target.value)}
              className="w-full bg-background border border-input rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select a contest</option>
              {filteredContests.map((contest) => (
                <option 
                  key={getContestUniqueKey(contest)}
                  value={getContestUniqueKey(contest)}
                >
                  {contest.platform} - {contest.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">YouTube Link</label>
            <input
              type="url"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="w-full bg-background border border-input rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://youtube.com/watch?v=..."
              required
            />
          </div>
          
          {successMessage && (
            <div className="mb-4 p-3 bg-primary/10 text-primary rounded-md flex items-center">
              <Check size={16} className="mr-2" />
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center">
              <AlertCircle size={16} className="mr-2" />
              {errorMessage}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Save Solution Link
          </button>
        </form>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Existing Solutions</h2>
        {solutions.length === 0 ? (
          <p className="text-muted-foreground">No solutions have been added yet.</p>
        ) : (
          <div className="bg-card rounded-lg border border-border divide-y divide-border">
            {solutions.map((solution, index) => (
              <div key={index} className="p-4">
                {/* <h3 className="font-medium">
                  {solution.platform} - {solution.name}
                </h3>
                <a 
                  href={solution.youtubeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-1 inline-block"
                >
                  {solution.youtubeLink}
                </a> */}






{editingSolution && editingSolution.id === solution.id && editingSolution.platform === solution.platform ? (
                  <div className="space-y-3">
                    <h3 className="font-medium">
                      {solution.platform} - {solution.name}
                    </h3>
                    <Input 
                      defaultValue={solution.youtubeLink}
                      id={`edit-solution-${index}`}
                      className="mb-2"
                    />
                    <div className="flex space-x-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleSaveEdit(solution, document.getElementById(`edit-solution-${index}`).value)}
                      >
                        <Check size={16} className="mr-1" /> Save
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        <X size={16} className="mr-1" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium">
                      {solution.platform} - {solution.name}
                    </h3>
                    <a 
                      href={solution.youtubeLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm mt-1 inline-block"
                    >
                      {solution.youtubeLink}
                    </a>
                    <div className="mt-3 flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(solution)}
                      >
                        <Edit size={16} className="mr-1" /> Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(solution)}
                      >
                        <Trash size={16} className="mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                )}



              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
