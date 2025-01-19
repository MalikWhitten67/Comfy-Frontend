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
                <div className="flex items-center justify-center min-h-screen bg-white">
                    <h1 className="text-2xl">Payment Successful</h1>
                </div>

            </body>
        </html>
    )
}