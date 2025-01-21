import Footer from "./Footer";
import Navbar from "./nav";

export default function({title, description, children}){
    return (
        <html>
            <head>
                <title>{title || 'Comfy'}</title>
                <meta name="description" content="Comfy - One of One" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                {description && <meta name="description" content={description} />}
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
