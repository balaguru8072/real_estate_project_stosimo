export default function ProgressCard({ title, percent }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{title}</span>
        <span className="text-slate-500">{percent}%</span>
      </div>

      <div className="h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-amber-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}