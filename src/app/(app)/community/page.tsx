
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { MessageSquare, Users, Edit3, Search, BookOpen, Brain, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div className="flex flex-col items-center text-center space-y-4">
        <Users className="h-20 w-20 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground">CODEEX-FOCUS Community Hub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Connect with fellow learners, share insights, ask questions, compete on the leaderboard, and grow together on your academic journey.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-in-out flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <MessageSquare className="h-7 w-7 text-primary" />
              Discussion Forums
            </CardTitle>
            <CardDescription className="text-base">Engage in subject-specific discussions or general study talks.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-4 text-muted-foreground">
              Dive into topics, get help with challenging concepts, or share your study strategies.
            </p>
          </CardContent>
          <CardContent>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-lg py-3">
              <Link href="/community/forums">Browse Forums</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-in-out flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Trophy className="h-7 w-7 text-primary" />
              Leaderboard
            </CardTitle>
            <CardDescription className="text-base">See how you rank among your peers and earn bragging rights!</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-4 text-muted-foreground">
              Challenge yourself, climb the ranks, and see who's leading the CODEEX-FOCUS community.
            </p>
          </CardContent>
          <CardContent>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-lg py-3">
              <Link href="/community/leaderboard">View Leaderboard</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-in-out flex flex-col bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Users className="h-7 w-7 text-muted-foreground" />
              Study Groups
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">Form or join study groups for collaborative learning. (Coming Soon)</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-4 text-muted-foreground">
              Collaborate with peers on specific subjects or projects. This feature is in active development.
            </p>
          </CardContent>
          <CardContent>
             <Button className="w-full text-lg py-3" variant="outline" disabled>
              Find Groups (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Search className="h-7 w-7 text-primary" />
            Find Members
          </CardTitle>
          <CardDescription className="text-base">Connect with other CODEEX-FOCUS users. (Profiles &amp; advanced search coming soon)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search for users by name or interest..." className="pl-10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Alex Lee', subject: 'Calculus, Physics', avatarHint: 'student avatar' },
              { name: 'Maria Garcia', subject: 'History, Literature', avatarHint: 'learner portrait' },
              { name: 'Sam Chen', subject: 'Biology, Chemistry', avatarHint: 'user icon' },
            ].map((user, i) => (
                 <Card key={i} className="p-4 flex flex-col items-center space-y-2 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ease-in-out">
                    <Image 
                      src={`https://placehold.co/80x80.png`} 
                      alt={`${user.name} Avatar`} 
                      width={80} 
                      height={80} 
                      className="rounded-full" 
                      data-ai-hint={user.avatarHint} 
                    />
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground text-center">Studying: {user.subject}</p>
                    <Button size="sm" variant="outline" disabled>View Profile (Soon)</Button>
                 </Card>
            ))}
          </div>
          <p className="text-sm text-center text-muted-foreground">
            User profiles and advanced search functionality are currently under development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
