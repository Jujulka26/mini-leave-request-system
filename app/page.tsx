import { getRequests } from '@/lib/db';
import { changeStatus } from './actions';
import LeaveForm from './leaveform';

export default function Home({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const allRequests = getRequests();
  const filter = searchParams.filter || 'All';

  const filteredRequests =
    filter === 'All'
      ? allRequests
      : allRequests.filter((req) => req.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          NaiBnB Mini Leave Request System
        </h1>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <LeaveForm />
        </div>

        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-gray-800">All Leave Requests</h2>
            <div className="flex gap-2">
              {['All', 'Pending', 'Approved', 'Rejected'].map((f) => (
                <a
                  key={f}
                  href={`/?filter=${f}`}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    filter === f
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {f}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900">{req.name}</h3>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        req.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : req.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    📅 {req.startDate} to {req.endDate}
                  </p>
                  <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">
                    {req.reason}
                  </p>
                </div>

                {req.status === 'Pending' && (
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <form action={changeStatus.bind(null, req.id, 'Approved')}>
                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-1.5 rounded transition"
                      >
                        Approve
                      </button>
                    </form>
                    <form action={changeStatus.bind(null, req.id, 'Rejected')}>
                      <button
                        type="submit"
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-1.5 rounded transition"
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}