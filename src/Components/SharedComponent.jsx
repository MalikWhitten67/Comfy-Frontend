import Footer from "./Footer";
import Navbar from "./nav";

export default function({title, description, children}){
    return (
        <html>
            <head>
                <title>{title || 'Comfy'}</title>
                <link rel="preload" href="/public/Comfy_logo_V2.png"  as="image" type="image/png" crossorigin />
                <link rel="preload" href="/public/models/rev1_acid/model1.webp" as="image" type="image/webp" crossorigin />
                <link rel="preload" href="/public/models/rev1_acid/model2.webp" as="image" type="image/webp" crossorigin />
                <link rel="preload" href="/public/models/rev1_acid/model3.webp" as="image" type="image/webp" crossorigin />
                <link rel="preload" href="/public/models/rev1_acid/model4.webp" as="image" type="image/webp" crossorigin />
                <link rel="preload" href="/public/Products/shirts/comfy_v1.jpeg"  as="image" type="image/jpeg" crossorigin />
                <link rel="preload" href="/public/Products/shirts/comfy_v2_back.jpeg"  as="image" type="image/jpeg" crossorigin />
                <link rel="preload" href="/public/Products/shirts/comfy_v2.png"  as="image" type="image/png" crossorigin />
                <link rel="preload" href="/public/Products/shirts/shirt.webp"  as="image" type="image/webp" crossorigin />

                <meta name="description" content="Comfy - One of One" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                <link rel="shortcut icon" href="/public/Comfy_logo_V2.png" type="image/x-icon" />
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
