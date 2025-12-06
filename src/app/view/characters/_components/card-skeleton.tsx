'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const CharacterCardSkeleton = () => {
  return (
    <Card className="border-slate-800 bg-slate-900/70">
      <div className="relative h-44 w-full overflow-hidden rounded-t-xl">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <CardContent className="space-y-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
};
