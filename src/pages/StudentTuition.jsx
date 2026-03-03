import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { FiCreditCard, FiCheckCircle, FiClock, FiDownloadCloud, FiPrinter, FiX } from 'react-icons/fi'
import TransactionReceipt from '../components/TransactionReceipt'

const billingProfiles = {
	utme: {
		plan: 'Installment',
		nextDueDate: '2026-04-01',
		NGN: { total: 150000, paid: 50000, currency: '₦', symbol: '₦' },
		USD: { total: 100, paid: 35, currency: '$', symbol: '$' },
	},
	'data-science': {
		plan: 'Full Payment',
		nextDueDate: null,
		NGN: { total: 500000, paid: 500000, currency: '₦', symbol: '₦' },
		USD: { total: 325, paid: 325, currency: '$', symbol: '$' },
	},
	cloud: {
		plan: 'Installment',
		nextDueDate: '2026-05-15',
		NGN: { total: 600000, paid: 300000, currency: '₦', symbol: '₦' },
		USD: { total: 390, paid: 195, currency: '$', symbol: '$' },
	},
}

function StudentTuition() {
	const { activeTrack, activeProgram, programNames, user } = useOutletContext()
	const [currency, setCurrency] = useState('NGN')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [paymentAmount, setPaymentAmount] = useState('')
	const [selectedReceipt, setSelectedReceipt] = useState(null)
	const [shouldAutoPrint, setShouldAutoPrint] = useState(false)

	const profile = billingProfiles[activeProgram] || billingProfiles.utme
	const activeFinancials = profile[currency]
	const balance = activeFinancials.total - activeFinancials.paid
	const isOverBalance = paymentAmount > balance
	const isInvalidAmount = paymentAmount <= 0 || isNaN(paymentAmount)

	const mockTransactions = [
		...(user?.enrolled_tracks?.length > 1
			? [{ date: '2026-02-15', desc: 'Application Fee Waiver (Alumni Benefit)', ref: 'WAIVER-001', amount: 0, status: 'Applied' }]
			: []),
		{
			date: '2026-02-16',
			desc: `Tuition Deposit - ${programNames?.[activeProgram] || activeProgram}`,
			ref: 'TXN-84729',
			amount: activeFinancials.paid,
			status: 'Cleared',
		},
	]

	const transactions = [...mockTransactions]

	const openReceipt = (txn) => {
		const amountPaid = Number(txn.amount || 0)
		const transactionReceiptData = {
			id: txn.ref,
			date: txn.date,
			studentName: `${user?.firstName || 'Student'} ${user?.lastName || 'Obadara'}`,
			studentId: user?.id || 'N/A',
			description: txn.desc,
			currency: activeFinancials.symbol,
			amountPaid,
			balance: Math.max(0, balance - amountPaid),
			method: 'Flutterwave',
			status: txn.status,
		}

		setSelectedReceipt(transactionReceiptData)
	}

	const handlePrintReceipt = (txn) => {
		openReceipt(txn)
		setShouldAutoPrint(true)
	}

	useEffect(() => {
		if (!selectedReceipt || !shouldAutoPrint) return

		const timeoutId = window.setTimeout(() => {
			window.print()
			setShouldAutoPrint(false)
		}, 200)

		return () => window.clearTimeout(timeoutId)
	}, [selectedReceipt, shouldAutoPrint])

	return (
		<div className="max-w-6xl mx-auto p-8">
			<header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
				<div>
					<h1 className="text-3xl font-serif font-bold text-slate-900">Financial Overview</h1>
					<p className="mt-2 text-sm text-slate-600">
						Displaying records for {programNames?.[activeProgram] || 'Unknown Program'}
					</p>
					<p className="mt-1 text-xs text-slate-500">
						Student: {user?.firstName || 'Student'} ({user?.id || 'N/A'}) • Track: {activeTrack === 'A' ? 'Academic' : 'Tech'}
					</p>
				</div>

				<div className="flex items-center gap-3">
					<div className="flex bg-slate-100 p-1 rounded-sm border border-slate-200">
						<button
							type="button"
							onClick={() => setCurrency('NGN')}
							className={`px-4 py-1 text-sm font-bold rounded-sm transition-colors ${currency === 'NGN' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
						>
							NGN
						</button>
						<button
							type="button"
							onClick={() => setCurrency('USD')}
							className={`px-4 py-1 text-sm font-bold rounded-sm transition-colors ${currency === 'USD' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
						>
							USD
						</button>
					</div>

					{profile.plan === 'Installment' ? (
						<span className="inline-flex items-center gap-2 rounded-sm bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
							<FiClock />
							Payment Plan: {profile.plan}
						</span>
					) : (
						<span className="inline-flex items-center gap-2 rounded-sm bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
							<FiCheckCircle />
							Payment Plan: {profile.plan}
						</span>
					)}
				</div>
			</header>

			<section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
				<div className="bg-white p-6 border border-slate-200 shadow-sm border-t-4 border-slate-900">
					<p className="text-sm text-slate-500 font-bold uppercase">Total Program Fee</p>
					<p className="text-3xl font-black text-slate-900 mt-2">
						{activeFinancials.currency}{activeFinancials.total.toLocaleString()}
					</p>
				</div>

				<div className="bg-white p-6 border border-slate-200 shadow-sm border-t-4 border-emerald-500">
					<p className="text-sm text-slate-500 font-bold uppercase">Total Cleared</p>
					<p className="text-3xl font-black text-emerald-600 mt-2">
						{activeFinancials.currency}{activeFinancials.paid.toLocaleString()}
					</p>
				</div>

				{balance > 0 ? (
					<div className="bg-red-50 border border-slate-200 shadow-sm border-t-4 border-red-500 p-6">
						<p className="text-sm text-slate-500 font-bold uppercase">Outstanding Balance</p>
						<p className="text-3xl font-black text-red-600 mt-2">
							{activeFinancials.currency}{balance.toLocaleString()}
						</p>
						<button
							type="button"
							onClick={() => {
								setPaymentAmount(balance)
								setIsModalOpen(true)
							}}
							className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold hover:bg-red-700"
						>
							Pay Now
						</button>
					</div>
				) : (
					<div className="bg-emerald-50 border border-slate-200 shadow-sm border-t-4 border-emerald-500 p-6">
						<p className="text-sm text-slate-500 font-bold uppercase">Outstanding Balance</p>
						<p className="text-3xl font-black text-emerald-600 mt-2">₦0</p>
						<p className="mt-4 inline-flex items-center gap-2 text-emerald-700 font-semibold">
							<FiCheckCircle />
							Fully Paid
						</p>
					</div>
				)}
			</section>

			<div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
				<FiCreditCard className="text-slate-500" />
				<span>Next Due Date: {profile.nextDueDate || 'No pending due date'}</span>
				<button type="button" className="ml-auto inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-sm">
					<FiDownloadCloud />
					Download Statement
				</button>
			</div>

			<section className="mt-12 bg-white border border-slate-200 shadow-sm overflow-hidden">
				<div className="p-6 border-b border-slate-200 flex items-center justify-between gap-4">
					<h2 className="text-lg font-bold text-slate-900">Transaction History</h2>
				</div>

				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
							<th className="px-6 py-3 font-bold">Date</th>
							<th className="px-6 py-3 font-bold">Description</th>
							<th className="px-6 py-3 font-bold">Reference</th>
							<th className="px-6 py-3 font-bold">Amount</th>
							<th className="px-6 py-3 font-bold">Status</th>
							<th className="px-6 py-3 font-bold">Action</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((txn) => {
							const isPositiveStatus = txn.status === 'Cleared' || txn.status === 'Applied'
							const amountLabel = txn.amount === 0
								? '₦0.00'
								: `${activeFinancials.currency}${Number(txn.amount).toLocaleString()}`

							return (
								<tr key={txn.ref} className="border-b border-slate-100 even:bg-slate-50">
									<td className="px-6 py-4 text-sm text-slate-700">{txn.date}</td>
									<td className="px-6 py-4 text-sm text-slate-800">{txn.desc}</td>
									<td className="px-6 py-4 text-sm font-medium text-slate-700">{txn.ref}</td>
									<td className="px-6 py-4 text-sm font-semibold text-slate-900">{amountLabel}</td>
									<td className={`px-6 py-4 text-sm font-semibold ${isPositiveStatus ? 'text-emerald-600' : 'text-amber-600'}`}>
										{txn.status}
									</td>
									<td className="px-6 py-4 text-sm">
										{txn.status === 'Cleared' || txn.status === 'Applied' ? (
											<div className="flex flex-col items-start gap-1">
												<button
													type="button"
													onClick={() => handlePrintReceipt(txn)}
													className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold"
												>
													<FiPrinter />
													Print Receipt
												</button>
											</div>
										) : (
											<span>-</span>
										)}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</section>

			{isModalOpen && (
				<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
					<div className="bg-white w-full max-w-md rounded-md shadow-xl overflow-hidden">
						<div className="bg-slate-900 text-white p-4 font-serif text-xl font-bold flex justify-between">
							<span>Make a Payment</span>
							<button
								type="button"
								onClick={() => setIsModalOpen(false)}
								className="text-white hover:text-slate-200"
								aria-label="Close payment modal"
							>
								<FiX />
							</button>
						</div>

						<div className="p-6">
							<p className="text-sm text-slate-700">
								You are paying for: <span className="font-bold">{programNames?.[activeProgram] || activeProgram}</span>
							</p>
							<p className="mt-2 text-sm text-slate-700">
								Outstanding Balance: {activeFinancials.symbol}{balance.toLocaleString()}
							</p>

							<div className="mt-5">
								<label className="block text-sm font-semibold text-slate-700 mb-2">Amount to Pay</label>
								<input
									type="number"
									value={paymentAmount}
									onChange={(e) => setPaymentAmount(Number(e.target.value))}
									className="border-2 border-slate-300 w-full p-3 text-lg font-bold"
								/>
								{isOverBalance && (
									<p className="mt-2 text-sm text-red-600">Amount cannot exceed your outstanding balance.</p>
								)}
							</div>

							<button
								type="button"
								disabled={isOverBalance || isInvalidAmount}
								onClick={() => alert(`Launching Flutterwave for ${paymentAmount}`)}
								className={`w-full mt-6 py-4 font-bold text-white transition-colors ${isOverBalance || isInvalidAmount ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
							>
								Proceed to Secure Payment -&gt;
							</button>
						</div>
					</div>
				</div>
			)}

			{selectedReceipt && (
				<div className="fixed inset-0 bg-black/60 z-50 p-4 overflow-y-auto">
					<div className="max-w-4xl mx-auto">
						<div className="mb-4 flex justify-end gap-2 print:hidden">
							<button
								type="button"
								onClick={() => window.print()}
								className="inline-flex items-center gap-2 rounded-sm bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
							>
								<FiPrinter />
								Print Receipt
							</button>
							<button
								type="button"
								onClick={() => setSelectedReceipt(null)}
								className="inline-flex items-center gap-2 rounded-sm border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
							>
								<FiX />
								Close
							</button>
						</div>

						<TransactionReceipt transaction={selectedReceipt} />
					</div>
				</div>
			)}
		</div>
	)
}

export default StudentTuition
