import { BadgesDisplay } from '@/components/rewards/BadgesDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, TrendingUp, Zap } from 'lucide-react';
import { OverviewCard } from '@/components/dashboard/OverviewCard';

export default function RewardsPage() {
  // Mock data
  const userPoints = 1250;
  const weeklyStreak = 3; // days
  const leaderboardRank = 12;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Motivation & Rewards</h1>
        <p className="text-muted-foreground">Track your progress, earn badges, and stay motivated!</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <OverviewCard title="Total Points" value={userPoints} icon={Award} className="shadow-lg" />
        <OverviewCard title="Weekly Streak" value={`${weeklyStreak} Days`} icon={Zap} className="shadow-lg" />
        <OverviewCard title="Leaderboard Rank" value={`#${leaderboardRank}`} icon={TrendingUp} className="shadow-lg" />
      </div>

      <BadgesDisplay />

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Leaderboard (Coming Soon)</CardTitle>
          <CardDescription>See how you rank among other FocusForge users.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            The leaderboard feature is under development. Stay tuned!
          </p>
        </CardContent>
      </Card>

       <Card className="shadow-xl">
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
