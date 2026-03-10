import { useNavigate } from 'react-router-dom'
import { DebutronLogoInverted } from '@debutron/ui/sec'

function StaffLogin() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      <aside className="hidden lg:flex w-1/2 bg-slate-950 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(148, 163, 184, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.16) 1px, transparent 1px), radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.22), transparent 40%), radial-gradient(circle at 80% 80%, rgba(148, 163, 184, 0.14), transparent 35%)',
            backgroundSize: '36px 36px, 36px 36px, 100% 100%, 100% 100%',
          }}
        />

        <div className="relative z-10">
          <DebutronLogoInverted />
        </div>

        <div className="relative z-10 max-w-md space-y-4">
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight">Staff &amp; Administrator Portal.</h1>
          <p className="text-lg text-slate-300">
            Manage student records, track academic progress, and oversee the Innovation Lab.
          </p>
        </div>

        <div className="relative z-10" />
      </aside>

      <main className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Secure Access</h2>
          <p className="text-slate-500 mb-8">Enter your Staff ID and credentials to authenticate.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="staff-identifier" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Staff ID or Corporate Email
              </label>
              <input
                id="staff-identifier"
                type="text"
                autoComplete="username"
                required
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="e.g. ST-2048 or your.name@debutron.org"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Reset access?
                </a>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors mt-6"
            >
              Authenticate
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="#" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600">
              IT Helpdesk Support
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StaffLogin
