
import { Link, useLocation } from "react-router-dom";
import { Calendar, Clock, BookmarkCheck, ShieldCheck, Home, Youtube } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const location = useLocation();
  
  // Check if a route is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <header className="border-b border-border py-2">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold inline-flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            {/* <span>TLE CP-Tracker</span> */}
            <div>
                    <h1 className='text-2xl font-bold'>TLE <span className='text-[#F83002]'>CP-Tracker</span></h1>
              </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1 ml-64">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/") 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <span className="flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Home
              </span>
            </Link>
            
            <Link
              to="/upcoming"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/upcoming") 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Upcoming
              </span>
            </Link>
            
            <Link
              to="/past"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/past") 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Past
              </span>
            </Link>

            <Link
              to="/youtube"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/youtube") 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <span className="flex items-center">
                <Youtube className="h-4 w-4 mr-1" />
                YouTube Resources
              </span>
            </Link>
            
            <Link
              to="/bookmarks"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/bookmarks") 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <span className="flex items-center">
                <BookmarkCheck className="h-4 w-4 mr-1" />
                Bookmarks
              </span>
            </Link>
            
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/admin") 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <span className="flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1" />
                Admin
              </span>
            </Link>
          </nav>
          
          <div className="flex items-center">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button className="ml-2 p-1 rounded-md text-muted-foreground md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
