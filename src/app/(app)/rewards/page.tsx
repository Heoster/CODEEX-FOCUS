
import { BadgesDisplay } from '@/components/rewards/BadgesDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, TrendingUp, Zap, Users, Star } from 'lucide-react';
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
        <p className="text-lg text-muted-foreground">Track your progress, earn badges, and stay motivated!</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <OverviewCard title="Total Points" value={userPoints} icon={Award} />
        <OverviewCard title="Weekly Streak" value={`${weeklyStreak} Days`} icon={Zap} />
        <OverviewCard title="Leaderboard Position" value={leaderboardRankMessage} icon={TrendingUp} />
      </div>

      <BadgesDisplay />

      <Card className="shadow-xl hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl"><Users className="h-7 w-7 text-primary"/>Leaderboard</CardTitle>
          <CardDescription className="text-base">See how you rank among other CODEEX-FOCUS users. Climb the ranks by earning points!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'AlphaLearner', points: 12500, avatarHint: 'top learner' },
              { rank: 2, name: 'StudyPro', points: 11800, avatarHint: 'student studying' },
              { rank: 3, name: 'FocusMaster', points: 10500, avatarHint: 'focused student' },
              { rank: '...', name: '...', points: '...' },
              { rank: 42, name: 'You!', points: userPoints, highlight: true, avatarHint: 'user profile' },
            ].map((entry, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${entry.highlight ? 'bg-primary/10 border border-primary' : 'bg-card border'}`}>
                <div className="flex items-center gap-3">
                  <span className={`font-bold w-8 text-center text-lg ${entry.highlight ? 'text-primary' : 'text-foreground'}`}>{entry.rank}</span>
                  <span className={`font-semibold ${entry.highlight ? 'text-primary' : 'text-foreground'}`}>{entry.name}</span>
                </div>
                <span className={`font-semibold text-lg ${entry.highlight ? 'text-primary' : 'text-foreground'}`}>{typeof entry.points === 'number' ? entry.points.toLocaleString() : entry.points} pts</span>
              </div>
            ))}
          </div>
           <div className="mt-6 text-center">
            <Button variant="outline" asChild className="text-base py-2.5 px-6">
              <Link href="/community/leaderboard">View Full Leaderboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

       <Card className="shadow-xl hover:shadow-2xl hover:scale-[1.005] transition-all duration-300 ease-in-out">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl"><Star className="h-7 w-7 text-accent"/>Quote of the Day</CardTitle>
          <CardDescription className="text-base">A little inspiration to keep you going.</CardDescription>
        </CardHeader>
        <CardContent>
           <blockquote className="border-l-4 border-primary pl-4 py-2 italic text-muted-foreground text-lg">
            "Success is not final, failure is not fatal: It is the courage to continue that counts." - Winston Churchill
          </blockquote>
        </CardContent>
      </Card>
    </div>
  );
}
