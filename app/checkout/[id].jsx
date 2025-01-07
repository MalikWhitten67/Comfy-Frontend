'use client'

import { useState } from 'vaderjs'
import CheckoutForm from '../../src/Components/checkout-form'
import CashAppPayment from '../../src/Components/cash-app-payment'

export default function CheckoutPage() {
  const [showCashApp, setShowCashApp] = useState(false)
  let [loading, setLoading] = useState(false)
  const [checkoutData, setCheckoutData] = useState({ 
    checkoutID: '',
    username: '',
    address: '',
    expand:{
      order:{
        products: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        expand:{
          for:{
            username: '',
          }
        }
      }
    }
  })
  const amount = parseInt(params.amount) || 0

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch(`https://comfy-backend-vert.vercel.app/checkout/${params.id}`)
      const data = await response.json()
      setCheckoutData(data)
      setLoading(false)
    }  
    
    fetchData()
  }, [])
  console.log(checkoutData)
  return (
    <html>
      <head>
        <title>Comfy - Checkout</title>
        <meta name="description" content="Comfy - One of One" /> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="min-h-screen bg-gray-50 py-8">
          {!showCashApp ? (
            <CheckoutForm
              loading={loading}
              amount={checkoutData.expand.order.total}
              onSubmit={() => setShowCashApp(true)}
            />
          ) : (
            <CashAppPayment
              amount={checkoutData.expand.order.total}
              loading={loading}
              paymentCode={checkoutData.id}
              username={checkoutData.expand.order.expand.for.username}
              onCancel={() => setShowCashApp(false)}
            />
          )}
        </div>
      </body>
    </html>
  )
}

