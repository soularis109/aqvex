export function ProductCardSkeleton() {
  return (
    <article className="flex h-full flex-col rounded-[32px] bg-aqxBlueLight/10 p-6 shadow-card animate-pulse">
      <div className="mb-4 flex flex-1 flex-col">
        <div className="mb-4 flex justify-center">
          <div className="h-44 w-32 rounded-[28px] bg-white shadow-md" />
        </div>

        <div className="mb-2 flex items-baseline gap-2 text-sm">
          <div className="h-3 w-16 rounded-full bg-slate-100" />
          <div className="h-4 w-24 rounded-full bg-slate-100" />
          <div className="h-5 w-10 rounded-full bg-slate-100" />
        </div>

        <div className="mb-2 space-y-2">
          <div className="h-3 w-full rounded-full bg-slate-100" />
          <div className="h-3 w-5/6 rounded-full bg-slate-100" />
          <div className="h-3 w-4/6 rounded-full bg-slate-100" />
        </div>

        <div className="mb-3 h-3 w-24 rounded-full bg-slate-100" />

        <div className="mt-3 flex items-center gap-2">
          <div className="h-5 w-24 rounded-full bg-slate-100" />
          <div className="h-5 w-24 rounded-full bg-slate-100" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-full bg-white p-1">
        <div className="h-10 w-32 rounded-full bg-slate-100" />
        <div className="h-10 flex-1 rounded-full bg-slate-100" />
      </div>
    </article>
  )
}
