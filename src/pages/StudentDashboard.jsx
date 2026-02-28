import {
  FiCalendar,
  FiCreditCard,
  FiGrid,
  FiUser,
} from "react-icons/fi";

const sidebarLinks = [
  { label: "Dashboard", icon: FiGrid, href: "#" },
  { label: "Calendar", icon: FiCalendar, href: "#" },
  { label: "My Profile", icon: FiUser, href: "#" },
  { label: "Tuition & Finance", icon: FiCreditCard, href: "#" },
];

function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-debutron-navy text-white min-h-screen p-6">
        <h2 className="mb-8 font-serif text-2xl font-bold">Student Portal</h2>

        <nav className="space-y-2">
          {sidebarLinks.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <header>
          <h1 className="mb-2 font-serif text-4xl font-bold text-debutron-navy">
            Welcome back, Muyiwa.
          </h1>
          <p className="mb-8 font-sans text-gray-600">
            Tech Innovation Track - Applied Data Science | Cohort Alpha
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
          <article className="border-t-4 border-blue-500 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-xl font-semibold text-debutron-navy">
              Academic Progress
            </h3>
            <p className="mb-2 text-sm text-gray-600">Module Completion</p>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: "68%" }}
                role="progressbar"
                aria-valuenow={68}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Module completion"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">68% complete</p>
          </article>

          <article className="border-t-4 border-purple-500 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-xl font-semibold text-debutron-navy">
              AI Learning Profile
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Primary Style: Visual-Spatial</li>
              <li>Pacing: Accelerated</li>
              <li>Zodiac Synergy: High Focus</li>
            </ul>
          </article>

          <article className="border-t-4 border-amber-500 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-xl font-semibold text-debutron-navy">
              Next Assessment
            </h3>
            <p className="text-sm text-gray-700">Statistical Methods Quiz</p>
            <p className="mt-2 text-sm font-medium text-amber-700">Happening in 3 days</p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;
