import { getRequests } from '@/lib/db';
import { changeStatus } from './actions';
import LeaveForm from './leaveform';

const STATUS_STYLES = {
  Pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  Approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Rejected: 'bg-rose-50 text-rose-700 ring-rose-200',
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const allRequests = getRequests();
  const params = await searchParams;
  const filter = params.filter || 'All';

  const filteredRequests =
    filter === 'All'
      ? allRequests
      : allRequests.filter((req) => req.status === filter);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Mini Leave Request System
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Submit and manage employee leave requests.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <LeaveForm />
        </div>

        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-slate-900">All Leave Requests</h2>
            <div className="inline-flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
              {['All', 'Pending', 'Approved', 'Rejected'].map((f) => (
                <a
                  key={f}
                  href={`/?filter=${f}`}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    filter === f
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {f}
                </a>
              ))}
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="text-center py-16 text-sm text-slate-400 border border-dashed border-slate-200 rounded-2xl">
              No leave requests yet.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-slate-900">{req.name}</h3>
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full ring-1 ring-inset ${STATUS_STYLES[req.status]}`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {formatDate(req.start_date)} — {formatDate(req.end_date)}
                    </p>
                    <p className="text-sm text-slate-700 mt-2 bg-slate-50 px-3 py-2 rounded-lg">
                      {req.reason}
                    </p>
                  </div>

                  {req.status === 'Pending' && (
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <form action={changeStatus.bind(null, req.id, 'Approved')}>
                        <button
                          type="submit"
                          className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-lg ring-1 ring-inset ring-emerald-200 transition"
                        >
                          Approve
                        </button>
                      </form>
                      <form action={changeStatus.bind(null, req.id, 'Rejected')}>
                        <button
                          type="submit"
                          className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold px-4 py-1.5 rounded-lg ring-1 ring-inset ring-rose-200 transition"
                        >
                          Reject
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
