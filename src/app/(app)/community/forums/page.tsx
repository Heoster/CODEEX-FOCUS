
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, PlusCircle, Search, Users, FileText, Brain } from 'lucide-react';
import Link from 'next/link';

const forumCategories = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'Talk about anything related to studying, productivity, or student life.',
    icon: MessageSquare,
    topics: 125,
    posts: 876,
    lastPost: 'Yesterday by AlexL',
  },
  {
    id: 'math-help',
    name: 'Subject Help: Mathematics',
    description: 'Ask questions and share solutions for Calculus, Algebra, Geometry, etc.',
    icon: Brain, // Or a more math-specific icon if available
    topics: 78,
    posts: 450,
    lastPost: '2 hours ago by MathWhiz',
  },
  {
    id: 'science-corner',
    name: 'Subject Help: Sciences',
    description: 'Discuss Physics, Chemistry, Biology, and other scientific disciplines.',
    icon: Users, // Placeholder, consider FlaskConical or similar
    topics: 92,
    posts: 603,
    lastPost: 'Today by BioNerd',
  },
  {
    id: 'study-strategies',
    name: 'Study Tips & Strategies',
    description: 'Share your best study techniques, time management hacks, and exam prep advice.',
    icon: FileText,
    topics: 64,
    posts: 320,
    lastPost: '3 days ago by FocusMaster',
  },
  {
    id: 'tech-tools',
    name: 'Tech & Tools for Students',
    description: 'Discuss apps, software, and gadgets that help you study smarter.',
    icon: Users, // Placeholder, consider Laptop or similar
    topics: 45,
    posts: 210,
    lastPost: '5 hours ago by GadgetGeek',
  },
];

export default function ForumsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Discussion Forums</h1>
          <p className="text-muted-foreground">
            Connect with peers, ask questions, and share your knowledge.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" disabled>
          <PlusCircle className="mr-2 h-5 w-5" /> Start New Discussion (Coming Soon)
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
            type="search"
            placeholder="Search forums..."
            className="max-w-xs"
          />
        {/* Future: Add sort/filter options here */}
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-6">
        {forumCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">
                    <Link href={`/community/forums/${category.id}`} className="hover:underline">
                      {category.name}
                    </Link>
                  </CardTitle>
                </div>
                <CardDescription className="pt-1">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{category.topics} Topics</span>
                  <span>{category.posts} Posts</span>
                  {/* <span className="hidden sm:block">Last post: {category.lastPost}</span> */}
                </div>
                 <Button variant="link" asChild className="p-0 h-auto mt-2 text-primary">
                    <Link href={`/community/forums/${category.id}`}>
                        View Category &rarr;
                    </Link>
                 </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <p className="text-center text-sm text-muted-foreground mt-8">
        Forum posting and individual category views are currently under development.
      </p>
    </div>
  );
}

    