'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const WORK_DURATION = 25 * 60; // 25 minutes
const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
const LONG_BREAK_DURATION = 15 * 60; // 15 minutes

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  const getDuration = useCallback(() => {
    if (mode === 'work') return WORK_DURATION;
    if (mode === 'shortBreak') return SHORT_BREAK_DURATION;
    return LONG_BREAK_DURATION;
  }, [mode]);

  useEffect(() => {
    setTimeLeft(getDuration());
  }, [mode, getDuration]);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      // TODO: Add notification sound
      if (mode === 'work') {
        setPomodorosCompleted((prev) => prev + 1);
        if ((pomodorosCompleted + 1) % 4 === 0) {
          setMode('longBreak');
        } else {
          setMode('shortBreak');
        }
      } else {
        setMode('work');
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, pomodorosCompleted]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getDuration());
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false); // Stop timer on mode switch
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((getDuration() - timeLeft) / getDuration()) * 100;

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="items-center">
        <CardTitle className="text-2xl flex items-center gap-2">
          {mode === 'work' ? <Brain className="h-7 w-7 text-primary" /> : <Coffee className="h-7 w-7 text-accent" />}
          Pomodoro Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="flex space-x-2">
          <Button variant={mode === 'work' ? 'default' : 'outline'} onClick={() => switchMode('work')}>
            Focus
          </Button>
          <Button variant={mode === 'shortBreak' ? 'default' : 'outline'} onClick={() => switchMode('shortBreak')}>
            Short Break
          </Button>
          <Button variant={mode === 'longBreak' ? 'default' : 'outline'} onClick={() => switchMode('longBreak')}>
            Long Break
          </Button>
        </div>
        <div className="my-8 text-7xl font-bold text-foreground tabular-nums">
          {formatTime(timeLeft)}
        </div>
        <Progress value={progressPercentage} className="w-full h-3" />
        <div className="flex w-full justify-center space-x-4">
          <Button onClick={toggleTimer} size="lg" className="w-32 bg-primary hover:bg-primary/90">
            {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg" className="w-32">
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Pomodoros completed: {pomodorosCompleted}</p>
      </CardContent>
    </Card>
  );
}
