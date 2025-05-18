import type { LucideProps } from 'lucide-react';
import { BrainCircuit } from 'lucide-react'; // Changed back to BrainCircuit

export const Icons = {
  Logo: (props: LucideProps) => (
    <BrainCircuit {...props} /> // Changed back to BrainCircuit
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
