'use client';

import { useState } from 'react';
import ToyPageSkeleton from './ToyPageSkeleton';

export default function SkeletonDemo() {
  const [showSkeleton, setShowSkeleton] = useState(false);

  if (showSkeleton) {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowSkeleton(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Hide Skeleton
          </button>
        </div>
        <ToyPageSkeleton cardCount={8} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <button
        onClick={() => setShowSkeleton(true)}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg"
      >
        Show Skeleton Loading Demo
      </button>
    </div>
  );
}