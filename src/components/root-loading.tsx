import React from 'react';

export const RootLoading: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
        <p className="text-sm text-slate-400">Loading Characters...</p>
      </div>
    </div>
  );
};
