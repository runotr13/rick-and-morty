'use client';

import React, { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { RootLoading } from '@/components/root-loading';
import { queryClient } from '@/lib/query-client';

interface RootProvidersProps {
  children: React.ReactNode;
}

export const RootProviders: React.FC<RootProvidersProps> = ({ children }) => {
  return (
    <Suspense fallback={<RootLoading />}>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  );
};
