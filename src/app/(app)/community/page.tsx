
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Added import for Input
import { MessageSquare, Users, Edit3, Search, BookOpen, Brain } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center space-y-3">
        <Users className="h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground">CODEEX-FOCUS Community Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Connect with fellow learners, share insights, ask questions, and grow together on your academic journey.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              Discussion Forums
            </CardTitle>
            <CardDescription>Engage in subject-specific discussions or general study talks.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Dive into topics, get help with challenging concepts, or share your study strategies.
            </p>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/community/forums">Browse Forums</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Study Groups
            </CardTitle>
            <CardDescription>Form or join study groups for collaborative learning.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Collaborate with peers on specific subjects or projects. (Feature in active development)
            </p>
            <Button asChild className="w-full" variant="outline" disabled>
              <Link href="/community/groups">Find Groups (Coming Soon)</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Shared Notes & Resources
            </CardTitle>
            <CardDescription>Access and contribute to a library of community-curated study materials.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Discover helpful notes, summaries, and resources shared by other users. (Feature in active development)
            </p>
            <Button asChild className="w-full" variant="outline" disabled>
              <Link href="/community/resources">Explore Resources (Coming Soon)</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            Find Members
          </CardTitle>
          <CardDescription>Connect with other CODEEX-FOCUS users. (Profiles & advanced search coming soon)</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="search" placeholder="Search for users by name or interest..." className="mb-4" />
          {/* Placeholder for member list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Alex Lee', subject: 'Calculus, Physics', avatarHint: 'student avatar' },
              { name: 'Maria Garcia', subject: 'History, Literature', avatarHint: 'learner portrait' },
              { name: 'Sam Chen', subject: 'Biology, Chemistry', avatarHint: 'user icon' },
            ].map((user, i) => (
                 <Card key={i} className="p-4 flex flex-col items-center space-y-2 shadow-md hover:shadow-lg transition-shadow">
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
          <p className="mt-6 text-sm text-center text-muted-foreground">
            User profiles and advanced search functionality are currently under development.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

    