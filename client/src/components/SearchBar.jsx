import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
  
  return (
    <div className="relative mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search contests by name, platform, or date..."
          value={query}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>
    </div>
  );
}