import Footer from "./Footer";
import Navbar from "./nav";

export default function({title, children}){
    return (
        <html>
            <head>
                <title>Comfy - Favorites</title>
                <meta name="description" content="Comfy - One of One" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}