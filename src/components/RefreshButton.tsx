'use client';

import { refreshData } from '@/app/actions';

export function RefreshButton() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await refreshData();
  }

  return (
    <form onSubmit={handleSubmit}>
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Refresh Data
      </button>
    </form>
  );
}
