
export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse mb-8" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-4">
          <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse" />
          <div className="h-10 w-full bg-slate-50 rounded-xl animate-pulse" />
        </div>
      ))}
    </div>
  );
}