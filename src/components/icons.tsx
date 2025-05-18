import Image from 'next/image';

export function CodeexFocusLogo({ className }: { className?: string }) {
  // User action: 
  // 1. Place your desired application logo image (e.g., the mountain image you provided,
  //    ideally optimized for web) as 'app-logo.png' (or .svg, .jpg) in the 'public' directory.
  // 2. Adjust the src, width, height, and alt text below if your filename or desired size differs.
  // 3. For the browser tab icon (favicon), create a 'favicon.ico' file and place it in 'public/'.
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/app-logo.png" 
        alt="CODEEX-FOCUS App Logo"
        width={28} // Based on previous icon size (h-7/w-7), adjust if your logo needs different dimensions
        height={28} // Based on previous icon size (h-7/w-7), adjust if your logo needs different dimensions
        priority // Optional: Add if logo is critical for LCP (Largest Contentful Paint)
      />
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
