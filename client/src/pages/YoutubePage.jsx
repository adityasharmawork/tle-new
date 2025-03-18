// import { useState } from "react";
// import { ExternalLink, PlaySquare, FileText } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";

// export default function YouTubeResources() {
//   const [activeTab, setActiveTab] = useState("contest-solutions");

//   const contestPlaylists = [
//     {
//       title: "LeetCode Contest Solutions",
//       description: "Video solutions and explanations for LeetCode weekly contests",
//       platform: "leetcode",
//       url: "https://youtube.com/playlist?list=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr&si=x3P-Q9xI8--95jzQ",
//       thumbnail: "/api/placeholder/320/180"
//     },
//     {
//       title: "Codeforces Contest Solutions",
//       description: "Video solutions for Codeforces rounds and competitions",
//       platform: "codeforces",
//       url: "https://youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB&si=rpzs5nQyVpZgUA12",
//       thumbnail: "/api/placeholder/320/180"
//     },
//     {
//       title: "CodeChef Contest Solutions",
//       description: "Video solutions for CodeChef long and short challenges",
//       platform: "codechef",
//       url: "https://youtube.com/playlist?list=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr&si=C1qKniQtqsdT1JgP",
//       thumbnail: "/api/placeholder/320/180"
//     }
//   ];

//   const cpSheetResources = [
//     {
//       title: "CP-31 Sheet",
//       description: "Curated DSA / CP Sheet by TLE Eliminators",
//       url: "https://www.tle-eliminators.com/cp-sheet",
//       icon: FileText
//     },
//     {
//       title: "CP-31 Sheet Launch Video",
//       description: "Introduction to the CP-31 methodology and approach",
//       url: "https://youtu.be/jzzjTa3z9xE?si=zsURTu2XEktvrRif",
//       icon: PlaySquare
//     }
//   ];

//   const cpSheetSolutions = [
//     {
//       title: "800 Rated Problems Solutions",
//       description: "Video solutions for beginner-level CP-31 Sheet problems",
//       url: "https://youtube.com/playlist?list=PLcXpkI9A-RZLDpszcEU9e7gpimdZwe1B_&si=dd5QzIPL1U8xMKnz",
//       thumbnail: "/api/placeholder/320/180"
//     },
//     {
//       title: "900 Rated Problems Solutions",
//       description: "Video solutions for intermediate CP-31 Sheet problems",
//       url: "https://youtube.com/playlist?list=PLcXpkI9A-RZJ_ISNA7Ym6-76GUpw9O11R&si=d-YWe8DzMFYMjSLD",
//       thumbnail: "/api/placeholder/320/180"
//     }
//   ];

//   const renderPlaylistCard = (playlist) => (
//     <Card key={playlist.title} className="overflow-hidden flex flex-col h-full">
//       <div className="aspect-video bg-muted">
//         <img 
//           src={playlist.thumbnail} 
//           alt={`${playlist.title} thumbnail`} 
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <CardHeader className="pb-2">
//         <CardTitle className="text-lg">
//           {playlist.title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="pb-4 flex-grow">
//         <p className="text-muted-foreground text-sm">{playlist.description}</p>
//       </CardContent>
//       <CardFooter className="pt-0">
//         <Button 
//           variant="outline" 
//           className={`w-full ${
//             playlist.platform === 'leetcode' ? 'hover:border-yellow-500 hover:text-yellow-500' : 
//             playlist.platform === 'codeforces' ? 'hover:border-red-500 hover:text-red-500' : 
//             'hover:border-green-700 hover:text-green-700'
//           }`}
//           onClick={() => window.open(playlist.url, '_blank', 'noopener,noreferrer')}
//         >
//           <ExternalLink className="h-4 w-4 mr-2" />
//           View Playlist
//         </Button>
//       </CardFooter>
//     </Card>
//   );

//   return (
//     <div className="animate-fade-in">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold mb-2">Learning Resources</h1>
//         <p className="text-muted-foreground">
//           Video tutorials, contest solutions, and practice resources for competitive programming.
//         </p>
//       </div>

//       <Tabs defaultValue="contest-solutions" className="w-full" onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="contest-solutions">Contest Solutions</TabsTrigger>
//           <TabsTrigger value="cp-sheet">CP-31 Sheet</TabsTrigger>
//         </TabsList>

//         <TabsContent value="contest-solutions" className="mt-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {contestPlaylists.map(renderPlaylistCard)}
//           </div>
//         </TabsContent>

//         <TabsContent value="cp-sheet" className="mt-6">
//           <div className="mb-8">
//             <h2 className="text-xl font-medium mb-4">CP-31 Sheet Resources</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {cpSheetResources.map((resource) => (
//                 <Card key={resource.title} className="flex flex-col h-full">
//                   <CardHeader className="pb-2">
//                     <div className="flex items-center space-x-2">
//                       <resource.icon className="h-5 w-5 text-primary" />
//                       <CardTitle className="text-lg">{resource.title}</CardTitle>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="pb-4 flex-grow">
//                     <p className="text-muted-foreground text-sm">{resource.description}</p>
//                   </CardContent>
//                   <CardFooter className="pt-0">
//                     <Button 
//                       variant="outline" 
//                       className="w-full hover:border-primary hover:text-primary"
//                       onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
//                     >
//                       <ExternalLink className="h-4 w-4 mr-2" />
//                       Open Resource
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h2 className="text-xl font-medium mb-4">CP-31 Sheet Solutions</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {cpSheetSolutions.map(renderPlaylistCard)}
//             </div>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }









import { useState } from "react";
import { ExternalLink, PlaySquare, FileText, Youtube } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function YouTubeResources() {
  const [activeTab, setActiveTab] = useState("contest-solutions");

  const contestPlaylists = [
    {
      title: "LeetCode Contest Solutions",
      description: "Video solutions and explanations for LeetCode weekly contests",
      platform: "leetcode",
      url: "https://youtube.com/playlist?list=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr&si=x3P-Q9xI8--95jzQ",
      color: "bg-yellow-500/10 text-yellow-500"
    },
    {
      title: "Codeforces Contest Solutions",
      description: "Video solutions for Codeforces rounds and competitions",
      platform: "codeforces",
      url: "https://youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB&si=rpzs5nQyVpZgUA12",
      color: "bg-red-500/10 text-red-500"
    },
    {
      title: "CodeChef Contest Solutions",
      description: "Video solutions for CodeChef long and short challenges",
      platform: "codechef",
      url: "https://youtube.com/playlist?list=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr&si=C1qKniQtqsdT1JgP",
      color: "bg-green-700/10 text-green-700"
    }
  ];

  const cpSheetResources = [
    {
      title: "CP-31 Sheet",
      description: "Curated DSA / CP Sheet by TLE Eliminators",
      url: "https://www.tle-eliminators.com/cp-sheet",
      icon: FileText
    },
    {
      title: "CP-31 Sheet Launch Video",
      description: "Introduction to the CP-31 methodology and approach",
      url: "https://youtu.be/jzzjTa3z9xE?si=zsURTu2XEktvrRif",
      icon: PlaySquare
    }
  ];

  const cpSheetSolutions = [
    {
      title: "800 Rated Problems Solutions",
      description: "Video solutions for beginner-level CP-31 Sheet problems",
      url: "https://youtube.com/playlist?list=PLcXpkI9A-RZLDpszcEU9e7gpimdZwe1B_&si=dd5QzIPL1U8xMKnz",
      color: "bg-blue-500/10 text-blue-500",
      level: "Beginner"
    },
    {
      title: "900 Rated Problems Solutions",
      description: "Video solutions for intermediate CP-31 Sheet problems",
      url: "https://youtube.com/playlist?list=PLcXpkI9A-RZJ_ISNA7Ym6-76GUpw9O11R&si=d-YWe8DzMFYMjSLD",
      color: "bg-purple-500/10 text-purple-500",
      level: "Intermediate"
    }
  ];

  const renderPlaylistCard = (playlist) => (
    <Card key={playlist.title} className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${playlist.color.split(" ")[0]}`}>
            <Youtube className={`h-5 w-5 ${playlist.color.split(" ")[1]}`} />
          </div>
          <CardTitle className="text-lg">
            {playlist.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-muted-foreground text-sm">{playlist.description}</p>
        {playlist.level && (
          <div className="mt-2">
            <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
              {playlist.level}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          className={`w-full ${
            playlist.platform === 'leetcode' ? 'hover:border-yellow-500 hover:text-yellow-500' : 
            playlist.platform === 'codeforces' ? 'hover:border-red-500 hover:text-red-500' : 
            playlist.platform === 'codechef' ? 'hover:border-green-700 hover:text-green-700' :
            playlist.color ? `hover:border-${playlist.color.split(" ")[1]} hover:${playlist.color.split(" ")[1]}` :
            'hover:border-primary hover:text-primary'
          }`}
          onClick={() => window.open(playlist.url, '_blank', 'noopener,noreferrer')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Playlist
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Learning Resources</h1>
        <p className="text-muted-foreground">
          Video tutorials, contest solutions, and practice resources for competitive programming.
        </p>
      </div>

      <Tabs defaultValue="contest-solutions" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contest-solutions">Contest Solutions</TabsTrigger>
          <TabsTrigger value="cp-sheet">CP-31 Sheet</TabsTrigger>
        </TabsList>

        <TabsContent value="contest-solutions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 my-8">
            {contestPlaylists.map(renderPlaylistCard)}
          </div>
        </TabsContent>

        <TabsContent value="cp-sheet" className="mt-6">
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">CP-31 Sheet Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cpSheetResources.map((resource) => (
                <Card key={resource.title} className="flex flex-col h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <resource.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <p className="text-muted-foreground text-sm">{resource.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full hover:border-primary hover:text-primary"
                      onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Resource
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-4">CP-31 Sheet Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cpSheetSolutions.map(renderPlaylistCard)}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
