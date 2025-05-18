
import { BrainCircuit } from 'lucide-react';

export function CodeexFocusLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <BrainCircuit className="h-7 w-7 text-primary" />
      <span className="text-xl font-semibold text-foreground">CODEEX-FOCUS</span>
    </div>
  );
}

// If you previously had an 'Icons' object with other Lucide icons for export,
// you can re-add that here if needed for other parts of your application.
// For example:
// import { SomeOtherIcon } from 'lucide-react';
// export const Icons = {
//   AnotherIcon: SomeOtherIcon,
// };
