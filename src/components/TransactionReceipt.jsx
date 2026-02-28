import React from 'react'
import toWords from 'number-to-words'
import { QRCodeSVG } from 'qrcode.react'
import DebutronLogo from './DebutronLogo'

export default function TransactionReceipt({ transaction }) {
  if (!transaction) return null
  const amountInWords = toWords.toWords(Number(transaction.amountPaid)).toUpperCase()

  return (
    <section className="max-w-3xl mx-auto p-12 bg-white text-slate-900 border border-gray-200 print:border-none print:p-6 print:text-black print:max-w-none print:mx-0 [print-color-adjust:exact] [-webkit-print-color-adjust:exact] font-sans">
      <div className="flex items-center gap-4">
        <DebutronLogo className="w-16 h-16" />
        <p className="text-sm text-slate-600 print:text-black">Ibadan, Nigaria.</p>
      </div>

      <hr className="border-t-2 border-slate-900 my-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 print:text-black mb-2">Billed To</p>
          <p className="font-bold text-lg text-slate-900 print:text-black">{transaction.studentName}</p>
          <p className="text-sm text-slate-700 print:text-black mt-1">Student ID: {transaction.studentId}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 print:text-black mb-2">Payment Details</p>
          <p className="text-sm text-slate-700 print:text-black">Payment Method: {transaction.method}</p>
          <p className="text-sm text-slate-700 print:text-black mt-1">Currency: {transaction.currency}</p>
        </div>
      </div>

      <div className="mt-8 print:mt-6 border-y border-slate-300 print:border-black">
        <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 bg-slate-50 print:bg-white text-sm font-semibold text-slate-700 print:text-black">
          <span>Description</span>
          <span>Amount</span>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-4 text-sm text-slate-800 print:text-black">
          <span>{transaction.description}</span>
          <span>
            {transaction.currency} {Number(transaction.amountPaid).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-6 text-right space-y-2">
        <p className="text-slate-700 print:text-black">
          Amount Paid:{' '}
          <span className="font-bold text-xl text-slate-900 print:text-black">
            {transaction.currency} {Number(transaction.amountPaid).toLocaleString()}
          </span>
        </p>
        <p className="text-slate-700 print:text-black">
          Remaining Balance: {transaction.currency} {Number(transaction.balance).toLocaleString()}
        </p>
      </div>

      <div className="bg-slate-50 print:bg-white p-4 mt-6 italic text-slate-700 print:text-black border border-transparent print:border-black">
        Amount in words: {amountInWords} ONLY.
      </div>

      <footer className="flex justify-between mt-16 print:mt-10 items-end gap-8 print:gap-6">
        <div className="w-56">
          <img src="/signature.png" alt="Authorized signature" className="h-12 object-contain mb-2" />
          <div className="border-t border-slate-800 print:border-black pt-2 text-sm text-slate-700 print:text-black">Authorized Signatory</div>
        </div>

        <div className="flex flex-col items-center text-center">
          <QRCodeSVG
            value={`https://www.google.com/search?q=https://debutron.org/verify/${transaction.id}`}
            size={80}
          />
          <p className="text-xs text-slate-500 print:text-black mt-2">Scan to verify authenticity.</p>
        </div>
      </footer>
    </section>
  )
}
