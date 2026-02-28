import React, { useState } from 'react'

export default function StudentTuition() {
  const totalTuition = 500000
  const amountPaid = 150000
  const balanceDue = totalTuition - amountPaid

  const [paymentAmount, setPaymentAmount] = useState(balanceDue)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoMessage, setPromoMessage] = useState('')

  const finalPayment = Math.max(0, Number(paymentAmount) - Number(discount))

  function handleApplyPromo() {
    const code = promoCode.trim()
    if (!code) {
      setPromoMessage('Enter a voucher code')
      return
    }

    // Mock promo: apply 10% discount of the current payment amount
    const newDiscount = Math.round(Number(paymentAmount) * 0.1)
    setDiscount(newDiscount)
    setPromoMessage(`Voucher applied — ₦${newDiscount.toLocaleString() } discount`)
  }

  function handleProceed() {
    alert(`Proceeding to Flutterwave — amount: ₦${finalPayment.toLocaleString()}`)
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-6">
        <h1 className="font-serif text-3xl text-debutron-navy">Tuition &amp; Financial Aid</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500">Total Program Fee</div>
          <div className="mt-2 text-2xl font-bold">₦{totalTuition.toLocaleString()}</div>
        </div>

        <div className="bg-white p-6 border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500">Amount Paid</div>
          <div className="mt-2 text-2xl font-bold">₦{amountPaid.toLocaleString()}</div>
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

          <button onClick={handleProceed} className="bg-debutron-navy text-white px-8 py-3 w-full rounded-sm">Proceed to Secure Payment (Flutterwave)</button>
        </div>
      </div>
    </div>
  )
}
