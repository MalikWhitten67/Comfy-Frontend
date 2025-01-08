'use client'

import { Match, Switch, useState, useEffect } from 'vaderjs'
import api from '../api'

export default function CheckoutForm({ loading, amount }) { 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit()
    }

    function fetchCheckoutData() {

    }
    function submitForm() {

    }
    useEffect(() => {
        if (api.authStore.isValid) {
            setFormData({
                name: api.authStore.record.name,
                email: api.authStore.record.email,
                address: api.authStore.record.address,
            })
            console.log(formData)
        }


    }, [])
    return (
        <div className="max-w-md mx-auto p-6 bg-white">
            <div className="flex items-center mb-6">
                <button className="text-gray-600 hover:text-gray-900">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <span className="ml-4 text-sm text-gray-600">Back</span>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Pay</h2>
                <div className="text-3xl font-bold">
                    <Switch>
                        <Match when={loading}>
                            <span>Loading...</span>
                        </Match>
                        <Match when={!loading}>
                           ${amount.toFixed(2)}
                        </Match>
                    </Switch>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {
                    api.authStore.isValid == false && (
                        <div>
                            <h3 className="text-sm font-medium mb-4">Contact Information</h3>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-3 border rounded-lg mb-3"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <input
                                type="email"
                                placeholder="example@poof.io"
                                className="w-full p-3 border rounded-lg"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    )
                }
                <Switch>
                    <Match when={api.authStore.isValid && !api.authStore.record.address}>
                        <div>
                            <h3 className="text-sm font-medium mb-4">Address/Shipping Information</h3>
                            <input
                                type="text"
                                placeholder="Address"
                                className="w-full p-3 border rounded-lg"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                required
                            />
                            <div className="mt-2">
                                <label className="inline-flex items-center text-sm text-gray-600">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="ml-2">Check autofilled address</span>
                                </label>
                            </div>
                        </div>
                    </Match>
                    <Match when={api.authStore.isValid && api.authStore.record.address}>
                        <div>
                            <h3 className="text-sm font-medium mb-4">Address/Shipping Information</h3>
                            <input
                                type="text"
                                placeholder="Address"
                                className="w-full p-3 border rounded-lg"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                required
                            />
                            <div className="mt-2">
                                <label className="inline-flex items-center text-sm text-gray-600">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="ml-2">Check autofilled address</span>
                                </label>
                            </div>
                        </div>
                    </Match>
                </Switch>

                <div> 
                    <p className="mt-2 text-sm text-gray-600">
                        Secure payment with CashApp. A invoice will be sent to your email once completed!
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Pay  <span className="font-semibold">${amount.toFixed(2)}</span>
                </button>
            </form>
        </div>
    )
}

