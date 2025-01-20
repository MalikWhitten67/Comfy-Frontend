import api from "../../../src/api"
export default function () {
    let { checkoutID } = params
 
    return (
        <html>
            <head>
                <title>Comfy - Payment Success</title>
                <meta name="description" content="Comfy - Payment Success" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <div className="flex flex-col items-center justify-center mx-auto min-h-screen bg-white">
                    <h1 className="text-2xl">Payment Successful</h1>
                    <p>Thank you for your purchase. A confirmation email will be sent out soon!</p>
                    <p>
                        <a href="/member/orders">View Orders</a>
                    </p>
                </div>

            </body>
        </html>
    )
}
