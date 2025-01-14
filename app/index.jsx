import Navbar from "../src/Components/nav"
import { ProductCard } from "../src/Components/product-card"
import SharedComponent from "../src/Components/SharedComponent"
import products from "../src/Products" 
export default function Page() { 
  if(isServer) return <div></div>
  return (
     <SharedComponent title={"Comfy - Home"}> 
        <div className="min-h-screen bg-background">
           
          <main className="container mx-auto px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-bold">New Arrivals</h1>
              <p className="text-sm text-muted-foreground">
                Showing {products.items.length} items
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.items.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </main>
        </div>
     </SharedComponent>
  )
}

