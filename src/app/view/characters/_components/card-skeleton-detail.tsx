'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const CharacterDetailSkeleton = () => {
  return (
    <div className="">
      <Card className="mx-auto w-full max-w-xl border-slate-800 bg-slate-900/70 shadow-xl">
        <CardHeader className="flex flex-col items-center gap-4 pt-6">
          {/* Avatar Skeleton */}
          <Skeleton className="h-24 w-24 rounded-full" />

          {/* Name Skeleton */}
          <Skeleton className="h-6 w-40" />

          {/* Badge Skeletons */}
          <div className="flex flex-wrap justify-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-6 pt-2">
          {/* Info rows */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pb-6">
          <Skeleton className="h-10 w-28 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  );
};
