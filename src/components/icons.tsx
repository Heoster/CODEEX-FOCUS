import type { LucideProps } from 'lucide-react';
import { Target } from 'lucide-react'; // Changed from BrainCircuit to Target

export const Icons = {
  Logo: (props: LucideProps) => (
    <Target {...props} /> // Changed from BrainCircuit to Target
  ),
};

export function CodeexFocusLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icons.Logo className="h-7 w-7 text-primary" />
      <span className="text-xl font-semibold text-foreground">CODEEX-FOCUS</span>
    </div>
  );
}
