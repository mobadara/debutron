import React, { useEffect, useRef, useState } from 'react'
import { FiPrinter } from 'react-icons/fi'
import TransactionReceipt from '../components/TransactionReceipt'
import { initialTuitionPaymentHistory, tuitionStudentTrack } from '../data/portal/tuitionData'

const feeCategories = [
  { id: 'tuition', label: 'Tuition Fees', baseAmountNGN: 500000, amountPaidNGN: 150000 },
  { id: 'other', label: 'Other Fees (Lab, ID, etc.)', baseAmountNGN: 25000, amountPaidNGN: 0 }
]

const TUITION_STORAGE_KEY = 'debutron-student-tuition-state'
const TUITION_HISTORY_STORAGE_KEY = 'debutron-student-tuition-history'

export default function StudentTuition() {
  const studentTrack = tuitionStudentTrack
  const [activeFeeTab, setActiveFeeTab] = useState(() => {
    try {
      const raw = localStorage.getItem(TUITION_STORAGE_KEY)
      if (!raw) return feeCategories[0].id
      const parsed = JSON.parse(raw)
      const exists = feeCategories.some((fee) => fee.id === parsed.activeFeeTab)
      return exists ? parsed.activeFeeTab : feeCategories[0].id
    } catch {
      return feeCategories[0].id
    }
  })
  const currentFeeData = feeCategories.find((fee) => fee.id === activeFeeTab) || feeCategories[0]
  const balanceDue = currentFeeData.baseAmountNGN - currentFeeData.amountPaidNGN

  const [paymentHistory, setPaymentHistory] = useState(() => {
    try {
      const raw = localStorage.getItem(TUITION_HISTORY_STORAGE_KEY)
      if (!raw) return initialTuitionPaymentHistory
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : initialTuitionPaymentHistory
    } catch {
      return initialTuitionPaymentHistory
    }
  })

  const [paymentAmount, setPaymentAmount] = useState(() => {
    try {
      const raw = localStorage.getItem(TUITION_STORAGE_KEY)
      if (!raw) return feeCategories[0].baseAmountNGN - feeCategories[0].amountPaidNGN
      const parsed = JSON.parse(raw)
      return Number.isFinite(parsed.paymentAmount)
        ? parsed.paymentAmount
        : feeCategories[0].baseAmountNGN - feeCategories[0].amountPaidNGN
    } catch {
      return feeCategories[0].baseAmountNGN - feeCategories[0].amountPaidNGN
    }
  })
  const [promoCode, setPromoCode] = useState(() => {
    try {
      const raw = localStorage.getItem(TUITION_STORAGE_KEY)
      if (!raw) return ''
      const parsed = JSON.parse(raw)
      return typeof parsed.promoCode === 'string' ? parsed.promoCode : ''
    } catch {
      return ''
    }
  })
  const [discount, setDiscount] = useState(() => {
    try {
      const raw = localStorage.getItem(TUITION_STORAGE_KEY)
      if (!raw) return 0
      const parsed = JSON.parse(raw)
      return Number.isFinite(parsed.discount) ? parsed.discount : 0
    } catch {
      return 0
    }
  })
  const [promoMessage, setPromoMessage] = useState('')
  const [selectedReceipt, setSelectedReceipt] = useState(null)
  const [shouldAutoPrint, setShouldAutoPrint] = useState(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      return
    }

    setPaymentAmount(balanceDue)
    setDiscount(0)
    setPromoCode('')
    setPromoMessage('')
  }, [activeFeeTab, balanceDue])

  useEffect(() => {
    try {
      localStorage.setItem(
        TUITION_STORAGE_KEY,
        JSON.stringify({
          activeFeeTab,
          paymentAmount,
          promoCode,
          discount
        })
      )
    } catch {
      // ignore storage write failures
    }
  }, [activeFeeTab, paymentAmount, promoCode, discount])

  useEffect(() => {
    try {
      localStorage.setItem(TUITION_HISTORY_STORAGE_KEY, JSON.stringify(paymentHistory))
    } catch {
      // ignore storage write failures
    }
  }, [paymentHistory])

  useEffect(() => {
    if (!selectedReceipt || !shouldAutoPrint) return

    const timeoutId = window.setTimeout(() => {
      window.print()
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [selectedReceipt, shouldAutoPrint])

  const finalPayment = Math.max(0, Number(paymentAmount) - Number(discount))

  const generateTxnDescription = (amountBeingPaid, previousBalance, totalFee, trackName, feeLabel) => {
    if (amountBeingPaid === totalFee) {
      return `Full Payment for ${feeLabel} - ${trackName}`
    } else if (amountBeingPaid === previousBalance) {
      return `Final Balance Clearance for ${feeLabel} - ${trackName}`
    } else {
      return `Payment for ${feeLabel} - ${trackName}`
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
    setPromoMessage(`Voucher applied — ₦${newDiscount.toLocaleString()} discount`)
  }

  function handleMockPayment(e) {
    e.preventDefault()

    const currentTrack = studentTrack === 'Academic Track' ? 'Academic Track' : 'Tech Innovation Track'
    const autoDescription = generateTxnDescription(
      paymentAmount,
      balanceDue,
      currentFeeData.baseAmountNGN,
      currentTrack,
      currentFeeData.label
    )

    const newTxn = {
      id: `TXN-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString(),
      studentName: 'Muyiwa',
      studentId: '000001',
      description: autoDescription,
      currency: 'NGN',
      amountPaid: paymentAmount,
      balance: Math.max(0, balanceDue - paymentAmount),
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

        <div className="border-b border-gray-200 mb-8 flex gap-8">
          {feeCategories.map((fee) => (
            <button
              key={fee.id}
              type="button"
              onClick={() => setActiveFeeTab(fee.id)}
              className={
                activeFeeTab === fee.id
                  ? 'border-b-2 border-debutron-navy text-debutron-navy font-bold pb-2'
                  : 'text-gray-500 hover:text-slate-800 pb-2'
              }
            >
              {fee.label}
            </button>
          ))}
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500">Total Fee ({currentFeeData.label})</div>
            <div className="mt-2 text-2xl font-bold">₦{currentFeeData.baseAmountNGN.toLocaleString()}</div>
          </div>

          <div className="bg-white p-6 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500">Amount Paid</div>
            <div className="mt-2 text-2xl font-bold">₦{currentFeeData.amountPaidNGN.toLocaleString()}</div>
          </div>

          <div className="bg-white p-6 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500">Current Balance</div>
            <div className="mt-2 text-2xl font-bold text-amber-600">₦{balanceDue.toLocaleString()}</div>
          </div>
        </section>

        <div className="bg-white p-8 border-t-4 border-debutron-navy shadow-sm max-w-2xl mt-8">
          <h2 className="font-sans text-lg font-medium mb-4">Proceed with a Payment</h2>

          <label className="block text-sm text-gray-600 mb-2">Amount to Pay (₦)</label>
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
              <div className="text-sm font-medium">₦{discount.toLocaleString()}</div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="text-lg font-semibold">Total to Pay</div>
              <div className="text-xl font-bold">₦{finalPayment.toLocaleString()}</div>
            </div>

            <button
              onClick={handleMockPayment}
              className="px-8 py-3 w-full rounded-sm bg-debutron-navy text-white hover:bg-slate-800"
            >
              Pay {currentFeeData.label} via Secure Gateway
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
