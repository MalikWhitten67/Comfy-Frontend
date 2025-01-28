import api from "../../../src/api"
export default function () {
    let { checkoutID } = params
 
    return (
        <html>
            <head>
                <title>Comfy - Payment Cancelled</title>
                <meta name="description" content="Comfy - Payment Cancelled" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <div className="flex flex-col items-center justify-center mx-auto min-h-screen bg-white">
                    <h1 className="text-2xl">Order Cancelled Successful</h1>
                    <p>AWW. Sad to see you go - your order has been cancelled!</p>
                    <p>
                        <a href="/">Go Back Home</a>
                    </p>
                </div>

            </body>
        </html>
    )
}
