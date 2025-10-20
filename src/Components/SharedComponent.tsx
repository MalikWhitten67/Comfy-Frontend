import { onMount } from "solid-js";
import Footer from "../Footer";
import Navbar from "../nav";

export default function({children, title, description}: {children: any, title: string, description: string}) {
    onMount(() => {
        document.title = title;
        const metaDesc = document.querySelector("meta[name='description']");
        if (metaDesc) {
            metaDesc.setAttribute("content", description);
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = description;
            document.head.appendChild(meta);
        }
    });
    return (
         <div>
             <Navbar />
                <main>
                    {children}
                </main> 
                <Footer />
         </div>
    )
}
