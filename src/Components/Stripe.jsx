import { useState } from "vaderjs"

class Stripe{
    constructor(key, host){
        this.key = key
        this.host = host
    }
    // custom stripe integration

    // create a payment intent

    async createPaymentIntent(items){
        const response = await fetch(`${this.host}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        return data
    }


}
function CardPaymentForm({stripeKey}){
    let [loading, setLoading] = useState(false)
    let [CardDetails, setCardDetails] = useState({
        name: '',
        email: '',
        address: '',
    })
    useEffect(() => { 

    }, [])


}