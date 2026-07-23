import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export function AIButton({ onClick, loading }: { onClick: () => void, loading: boolean }) {
  return (
    <button
      onClick={(e) => { e.preventDefault(); onClick(); }}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
      AI Magic
    </button>
  );
}
