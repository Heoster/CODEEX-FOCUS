import type { LucideProps } from 'lucide-react';
import { BrainCircuit } from 'lucide-react';

export const Icons = {
  Logo: (props: LucideProps) => (
    <BrainCircuit {...props} />
  ),
};

export function FocusForgeLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icons.Logo className="h-7 w-7 text-primary" />
      <span className="text-xl font-semibold text-foreground">FocusForge</span>
    </div>
  );
}
