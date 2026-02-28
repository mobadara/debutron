import React, { useEffect, useState } from 'react'
import { FiGlobe, FiMapPin, FiPrinter } from 'react-icons/fi'
import TransactionReceipt from '../components/TransactionReceipt'
import { initialTuitionPaymentHistory, tuitionBaseFees, tuitionStudentTrack } from '../data/portal/tuitionData'

export default function StudentTuition() {
  const [currency, setCurrency] = useState('NGN')
  const studentTrack = tuitionStudentTrack

  const totalTuition = currency === 'NGN' ? tuitionBaseFees.NGN : tuitionBaseFees.USD
  const amountPaid = currency === 'NGN' ? 150000 : 150
  const balanceDue = totalTuition - amountPaid

  const [paymentHistory, setPaymentHistory] = useState(initialTuitionPaymentHistory)

  const [paymentAmount, setPaymentAmount] = useState(balanceDue)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoMessage, setPromoMessage] = useState('')
  const [selectedReceipt, setSelectedReceipt] = useState(null)
  const [shouldAutoPrint, setShouldAutoPrint] = useState(false)

  useEffect(() => {
    setPaymentAmount(balanceDue)
    setDiscount(0)
    setPromoMessage('')
  }, [currency, balanceDue])

  useEffect(() => {
    if (!selectedReceipt || !shouldAutoPrint) return

    const timeoutId = window.setTimeout(() => {
      window.print()
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [selectedReceipt, shouldAutoPrint])

  const finalPayment = Math.max(0, Number(paymentAmount) - Number(discount))

  const generateTxnDescription = (amountBeingPaid, previousBalance, totalFee, trackName) => {
    if (amountBeingPaid === totalFee) {
      return `Full Tuition Settlement - ${trackName}`
    } else if (amountBeingPaid === previousBalance) {
      return `Final Tuition Balance Clearance - ${trackName}`
    } else {
      return `Tuition Installment Payment - ${trackName}`
    }
  }

  function handleApplyPromo() {
    const code = promoCode.trim()
    if (!code) {
      setPromoMessage('Enter a voucher code')
      return
    }

    // Mock promo: apply 10% discount of the current payment amount
    const newDiscount = Math.round(Number(paymentAmount) * 0.1)
    setDiscount(newDiscount)
    const currencySymbol = currency === 'NGN' ? '₦' : '$'
    setPromoMessage(`Voucher applied — ${currencySymbol}${newDiscount.toLocaleString()} discount`)
  }

  function handleMockPayment(e) {
    e.preventDefault()

    const currentTrack = studentTrack === 'Academic Track' ? 'Academic Track' : 'Tech Innovation Track'
    const autoDescription = generateTxnDescription(paymentAmount, balanceDue, totalTuition, currentTrack)

    const newTxn = {
      id: `TXN-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString(),
      studentName: 'Muyiwa',
      studentId: '000001',
      description: autoDescription,
      currency: currency,
      amountPaid: paymentAmount,
      balance: balanceDue - paymentAmount,
      method: 'Flutterwave',
      status: 'Successful'
    }

    setPaymentHistory((prevHistory) => [newTxn, ...prevHistory])
    setSelectedReceipt(newTxn)
    setShouldAutoPrint(false)
    alert('Payment successful! Receipt generated.')
  }

  const handlePrintReceipt = (txnId) => {
    const receipt = paymentHistory.find((txn) => txn.id === txnId)
    if (!receipt) return
    setSelectedReceipt(receipt)
    setShouldAutoPrint(true)
  }

  function handlePrintSelectedReceipt() {
    if (!selectedReceipt) return
    setShouldAutoPrint(false)
    window.print()
  }

  function handleCloseReceipt() {
    setSelectedReceipt(null)
    setShouldAutoPrint(false)
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      {selectedReceipt && (
        <style>{`
          @media print {
            .tuition-screen,
            .receipt-actions {
              display: none !important;
            }

            body * {
              visibility: hidden;
            }

            .receipt-print-area,
            .receipt-print-area * {
              visibility: visible;
            }

            .receipt-print-area {
              display: block !important;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0 !important;
              padding: 0 !important;
            }
          }
        `}</style>
      )}

      <div className={`tuition-screen ${selectedReceipt ? 'print:hidden' : ''}`}>
        <header className="mb-6">
          <h1 className="font-serif text-3xl text-debutron-navy">Tuition &amp; Financial Aid</h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500">Total Program Fee</div>
            <div className="mt-2 text-2xl font-bold">{currency === 'NGN' ? '₦' : '$'}{totalTuition.toLocaleString()}</div>
          </div>

          <div className="bg-white p-6 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500">Amount Paid</div>
            <div className="mt-2 text-2xl font-bold">{currency === 'NGN' ? '₦' : '$'}{amountPaid.toLocaleString()}</div>
          </div>

          <div className="bg-white p-6 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500">Current Balance</div>
            <div className="mt-2 text-2xl font-bold text-amber-600">{currency === 'NGN' ? '₦' : '$'}{balanceDue.toLocaleString()}</div>
          </div>
        </section>

        <div className="bg-white p-8 border-t-4 border-debutron-navy shadow-sm max-w-2xl mt-8">
          <h2 className="font-sans text-lg font-medium mb-4">Proceed with a Payment</h2>

          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => setCurrency('NGN')}
              className={`px-4 py-2 rounded-sm border flex items-center gap-2 font-semibold ${currency === 'NGN' ? 'bg-debutron-navy text-white border-debutron-navy' : 'bg-white text-slate-700 border-gray-300 hover:bg-slate-50'}`}
            >
              <FiMapPin className="h-4 w-4" /> NGN (₦)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-sm border flex items-center gap-2 font-semibold ${currency === 'USD' ? 'bg-debutron-navy text-white border-debutron-navy' : 'bg-white text-slate-700 border-gray-300 hover:bg-slate-50'}`}
            >
              <FiGlobe className="h-4 w-4" /> USD ($)
            </button>
          </div>

          <label className="block text-sm text-gray-600 mb-2">Amount to Pay ({currency === 'NGN' ? '₦' : '$'})</label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(Number(e.target.value))}
            className="w-full rounded-sm border border-gray-200 p-3 mb-4"
            min={0}
            max={balanceDue}
          />

          <div className="flex gap-2 items-start">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Voucher Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="w-full rounded-sm border border-gray-200 p-3"
                />
                <button onClick={handleApplyPromo} className="bg-debutron-navy text-white px-4 py-3 rounded-sm">Apply</button>
              </div>

              {promoMessage && <p className="mt-2 text-sm text-green-600">{promoMessage}</p>}
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">Discount</div>
              <div className="text-sm font-medium">{currency === 'NGN' ? '₦' : '$'}{discount.toLocaleString()}</div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-semibold">Total to Pay</div>
              <div className="text-xl font-bold">{currency === 'NGN' ? '₦' : '$'}{finalPayment.toLocaleString()}</div>
            </div>

            <button
              onClick={handleMockPayment}
              className="px-8 py-3 w-full rounded-sm bg-debutron-navy text-white hover:bg-slate-800"
            >
              Proceed to Secure Payment (Flutterwave)
            </button>
          </div>
        </div>

        <section>
          <h2 className="font-serif text-2xl text-slate-900 mt-12 mb-6">Payment History &amp; Receipts</h2>
          <div className="bg-white border border-slate-300 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-slate-50 text-slate-700 font-bold text-sm uppercase p-4 border-b border-slate-300 text-left">Transaction ID</th>
                  <th className="bg-slate-50 text-slate-700 font-bold text-sm uppercase p-4 border-b border-slate-300 text-left">Date</th>
                  <th className="bg-slate-50 text-slate-700 font-bold text-sm uppercase p-4 border-b border-slate-300 text-left">Student</th>
                  <th className="bg-slate-50 text-slate-700 font-bold text-sm uppercase p-4 border-b border-slate-300 text-left">Amount Paid</th>
                  <th className="bg-slate-50 text-slate-700 font-bold text-sm uppercase p-4 border-b border-slate-300 text-left">Balance</th>
                  <th className="bg-slate-50 text-slate-700 font-bold text-sm uppercase p-4 border-b border-slate-300 text-left">Method</th>
                  <th className="bg-slate-50 text-slate-700 font-bold text-sm uppercase p-4 border-b border-slate-300 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((txn) => (
                  <tr key={txn.id} className="border-b border-slate-200 last:border-b-0">
                    <td className="p-4 text-slate-800">{txn.id}</td>
                    <td className="p-4 text-slate-700">{txn.date}</td>
                    <td className="p-4 text-slate-700">{txn.studentName}</td>
                    <td className="p-4 text-slate-700">{txn.currency} {txn.amountPaid.toLocaleString()}</td>
                    <td className="p-4 text-slate-700">{txn.currency} {txn.balance.toLocaleString()}</td>
                    <td className="p-4 text-slate-700">{txn.method}</td>
                    <td className="p-4">
                      <button onClick={() => handlePrintReceipt(txn.id)} className="text-blue-700 hover:underline font-bold flex items-center gap-2">
                        <FiPrinter /> Print Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {selectedReceipt && (
        <section className="mt-10 print:mt-0 receipt-print-area">
          <div className="flex items-center justify-end gap-3 mb-4 print:hidden receipt-actions">
            <button
              type="button"
              onClick={handleCloseReceipt}
              className="px-4 py-2 border border-gray-300 rounded-sm text-slate-700 hover:bg-slate-50"
            >
              Close Receipt
            </button>
            <button
              type="button"
              onClick={handlePrintSelectedReceipt}
              className="px-4 py-2 bg-debutron-navy text-white rounded-sm hover:bg-slate-800"
            >
              Print / Save PDF
            </button>
          </div>

          <TransactionReceipt transaction={selectedReceipt} />
        </section>
      )}
    </div>
  )
}
