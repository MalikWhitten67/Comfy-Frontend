'use client'

interface CashAppPaymentProps {
  amount: number
  paymentCode: string
  username: string
  onCancel: () => void
}

export default function CashAppPayment({ amount, paymentCode, username, onCancel }: CashAppPaymentProps) {
  function CancelCheckout() {
    fetch('https://comfy-backend-vert.vercel.app/cancelCheckout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checkoutID: paymentCode })
    })
    .then(res => res.json())
    .then(data => {
      window.location.href = '/'
    })
  }
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">Pay with Cash App</h2>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg" onClick={() => {
            window.open('https://cash.app/$maliky2k?qr=1', '_blank')
          }}>
            <img
              src="/public/cashapp_qr.png"
              alt="QR Code"
              className="w-48 h-48"
            />
          </div>
          
        </div>
        <span className="flex justify-center mx-auto text-center text-gray-600 text-xl">$maliky2k</span>

        <div className="text-center">
          <h3 className="text-2xl font-medium">{username}</h3>
          <p className="mt-4 text-gray-600">
            Include <span className="font-mono text-xl font-medium">{paymentCode}</span> in your note for the payment to be tracked.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Code</label>
            <div className="flex">
              <input
                type="text"
                value={paymentCode}
                readOnly
                className="flex-1 p-3 border rounded-l-lg bg-gray-50"
              />
              <button
                onClick={() => navigator.clipboard.writeText(paymentCode)}
                className="px-4 bg-gray-100 border border-l-0 rounded-r-lg hover:bg-gray-200"
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount to send</label>
            <div className="flex">
              <div className="flex-1 p-3 border rounded-lg bg-gray-50">
                $ {amount.toFixed(2)} <span className="float-right">USD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600">
          Page will redirect upon payment...
        </div>
      </div>

      <div className="border-t p-4 flex justify-between items-center">
        <span className="text-gray-600">Pay with Cash App</span>
        <button
          onClick={CancelCheckout}
          className="text-gray-600 hover:underline"
        >
          Cancel Checkout
        </button>
      </div>
    </div>
  )
}

