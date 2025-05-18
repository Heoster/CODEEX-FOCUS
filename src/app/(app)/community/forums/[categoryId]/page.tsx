
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Construction } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ForumCategoryPage() {
  const params = useParams();
  const categoryId = params.categoryId as string;

  // In a real app, you would fetch category details and topics based on categoryId
  const categoryName = categoryId?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Category";

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-500 ease-out">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/community/forums">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Forums</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {categoryName}
        </h1>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-6 w-6 text-primary" />
            Under Construction
          </CardTitle>
          <CardDescription>
            This forum category view, including topics and posts, is currently under active development.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Construction className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground mb-2">
            Viewing Category: <span className="font-semibold text-foreground">{categoryName}</span>
          </p>
          <p className="text-muted-foreground">
            Please check back soon for full functionality, including topic lists and the ability to post.
          </p>
          <Button asChild className="mt-6 bg-primary hover:bg-primary/90">
            <Link href="/community/forums">Back to Forums List</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
