import Navbar from "../src/Components/nav"
import { ProductCard } from "../src/Components/product-card"

const products = [
  {
    id: "1",
    name: "Comfy Rev 1 Acid Tee",
    price: 45,
    category: "Tshirts",
    image: "/public/Products/shirts/comfy_V1.jpeg",
    colors: 1,
  },
   
]

export default function Page() {
  return (
    <html>
      <head>
        <meta name="description" content="Comfy - One of One" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-bold">New Arrivals</h1>
              <p className="text-sm text-muted-foreground">
                Showing {products.length} items
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}

