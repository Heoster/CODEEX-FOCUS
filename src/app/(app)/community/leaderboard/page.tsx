
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Construction, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function CommunityLeaderboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/rewards">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Rewards</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Trophy className="h-8 w-8 text-primary" /> Community Leaderboard
        </h1>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-6 w-6 text-primary" />
            Coming Soon!
          </CardTitle>
          <CardDescription>
            The full community leaderboard with detailed rankings and filters is under development.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Trophy className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground mb-2">
            This is where the full, sortable, and filterable community leaderboard will be displayed.
          </p>
          <p className="text-muted-foreground">
            You'll be able to see how you stack up against other CODEEX-FOCUS users!
          </p>
          <Button asChild className="mt-6 bg-primary hover:bg-primary/90">
            <Link href="/rewards">Back to Rewards</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
