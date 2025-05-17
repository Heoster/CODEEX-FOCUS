
import { BadgesDisplay } from '@/components/rewards/BadgesDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, TrendingUp, Zap, Users } from 'lucide-react';
import { OverviewCard } from '@/components/dashboard/OverviewCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RewardsPage() {
  // Mock data reset for new user
  const userPoints = 0;
  const weeklyStreak = 0; // days
  const leaderboardRankMessage = "No rank yet. Get started!";

  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Motivation &amp; Rewards</h1>
        <p className="text-muted-foreground">Track your progress, earn badges, and stay motivated!</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <OverviewCard title="Total Points" value={userPoints} icon={Award} />
        <OverviewCard title="Weekly Streak" value={`${weeklyStreak} Days`} icon={Zap} />
        <OverviewCard title="Leaderboard Position" value={leaderboardRankMessage} icon={TrendingUp} />
      </div>

      <BadgesDisplay />

      <Card className="shadow-xl hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="h-6 w-6 text-primary"/>Leaderboard</CardTitle>
          <CardDescription>See how you rank among other CODEEX-FOCUS users. Climb the ranks by earning points!</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for Leaderboard content */}
          <div className="space-y-3">
            {[
              { rank: 1, name: 'AlphaLearner', points: 12500 },
              { rank: 2, name: 'StudyPro', points: 11800 },
              { rank: 3, name: 'FocusMaster', points: 10500 },
              { rank: '...', name: '...', points: '...' },
              { rank: 42, name: 'You!', points: userPoints, highlight: true },
            ].map((entry, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-md ${entry.highlight ? 'bg-primary/10 border border-primary' : 'bg-muted/50'}`}>
                <div className="flex items-center gap-3">
                  <span className={`font-bold w-6 text-center ${entry.highlight ? 'text-primary' : 'text-foreground'}`}>{entry.rank}</span>
                  <span className={entry.highlight ? 'text-primary font-semibold' : 'text-foreground'}>{entry.name}</span>
                </div>
                <span className={`font-semibold ${entry.highlight ? 'text-primary' : 'text-foreground'}`}>{entry.points.toLocaleString()} pts</span>
              </div>
            ))}
          </div>
           <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link href="/community/leaderboard">View Full Leaderboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

       <Card className="shadow-xl hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle>Quote of the Day</CardTitle>
          <CardDescription>A little inspiration to keep you going.</CardDescription>
        </CardHeader>
        <CardContent>
           <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
            "Success is not final, failure is not fatal: It is the courage to continue that counts." - Winston Churchill
          </blockquote>
        </CardContent>
      </Card>
    </div>
  );
}
