
import { Calendar, Clock, ExternalLink, Bookmark, BookmarkCheck, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

// Format relative time in a human-readable way
const formatTimeRemaining = (startTime) => {
  const now = new Date().getTime();
  const start = new Date(startTime).getTime();
  const diff = start - now;
  
  if (diff <= 0) return "Started";
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

// Get the platform badge class
const getPlatformBadgeClass = (platform) => {
  const platformLower = platform.toLowerCase();
  return `platform-badge platform-badge-${platformLower}`;
};

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

export default function ContestCard({ contest, isPast = false, solution = null, onBookmark, showDetails = false }) {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  
  useEffect(() => {
    // Check if this contest is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedContests") || "[]");
    const isAlreadyBookmarked = bookmarks.some(
      b => getContestUniqueKey(b) === getContestUniqueKey(contest)
    );
    setIsBookmarked(isAlreadyBookmarked);
    
    // Only update the timer for upcoming contests
    if (!isPast) {
      setTimeRemaining(formatTimeRemaining(contest.startTime));
      
      const timer = setInterval(() => {
        setTimeRemaining(formatTimeRemaining(contest.startTime));
      }, 60000); // Update every minute
      
      return () => clearInterval(timer);
    }
  }, [contest, isPast]);
  
  const handleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    
    // Update localStorage
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedContests") || "[]");
    
    if (newBookmarkState) {
      bookmarks.push(contest);
    } else {
      const index = bookmarks.findIndex(
        b => getContestUniqueKey(b) === getContestUniqueKey(contest)
      );
      if (index !== -1) bookmarks.splice(index, 1);
    }
    
    localStorage.setItem("bookmarkedContests", JSON.stringify(bookmarks));
    
    // Call the onBookmark handler if provided
    if (onBookmark) onBookmark(contest, newBookmarkState);
  };
  
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };
  
  const startDate = new Date(contest.startTime);
  const formattedDate = startDate.toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  const formattedTime = startDate.toLocaleTimeString(undefined, { 
    hour: '2-digit', 
    minute: '2-digit'
  });
  
  return (
    <>
      <div className="contest-card animate-zoom-in cursor-pointer" onClick={toggleDialog}>
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-start">
            <span className={getPlatformBadgeClass(contest.platform)}>
              {contest.platform}
            </span>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleBookmark();
              }}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark contest"}
            >
              {isBookmarked ? (
                <BookmarkCheck size={18} className="text-primary" />
              ) : (
                <Bookmark size={18} />
              )}
            </button>
          </div>
          
          <h3 className="mt-3 text-lg font-medium line-clamp-2 h-14">
            {contest.name}
          </h3>
          
          <div className="mt-auto pt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>{formattedTime} • {contest.duration}</span>
            </div>
            
            {!isPast && (
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                  Starts in {timeRemaining}
                </span>
                
                <a 
                  href={contest.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="mr-1">Visit</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
            
            {isPast && (
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                  Ended
                </span>
                
                <div className="flex space-x-2">
                  {solution && (
                    <a 
                      href={solution} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="mr-1">Solution</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  
                  <a 
                    href={contest.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="mr-1">Visit</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDetails && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl">{contest.name}</DialogTitle>
              <DialogDescription className="text-sm">
                <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded ${getPlatformBadgeClass(contest.platform)} text-white`}>
                  {contest.platform}
                </span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                  <p className="flex items-center">
                    <Calendar size={16} className="mr-2 text-primary" />
                    {formattedDate}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Start Time</p>
                  <p className="flex items-center">
                    <Clock size={16} className="mr-2 text-primary" />
                    {formattedTime}
                  </p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                <p>{contest.duration}</p>
              </div>
              
              {!isPast && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className="text-sm font-medium px-2 py-1 bg-primary/10 text-primary rounded-full inline-block">
                    Starts in {timeRemaining}
                  </p>
                </div>
              )}
              
              {isPast && solution && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Solution</p>
                  <a 
                    href={solution} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center"
                  >
                    Watch solution on YouTube
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              )}
              
              <div className="pt-4 flex justify-between">
                <button
                  onClick={handleBookmark}
                  className="inline-flex items-center px-3 py-2 rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck size={16} className="mr-2" />
                      Bookmarked
                    </>
                  ) : (
                    <>
                      <Bookmark size={16} className="mr-2" />
                      Bookmark
                    </>
                  )}
                </button>
                
                <a 
                  href={contest.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Visit Contest
                  <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
