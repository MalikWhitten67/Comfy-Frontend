 
import { ProductCard } from "../src/Components/product-card"
import SharedComponent from "../src/Components/SharedComponent.tsx"
import products from "../src/Products"  
export default function Page() { 
  return (
     <SharedComponent title={"Comfy - Home"} description={"Comfy - One of One - uniquely distinct cannot be replicated"}>
        <div className="min-h-screen bg-background">
           
              <img src="/models/back.jpg" alt="Comfy Logo" className="w-full h-[120px] xl:h-[400px] object-cover" />
          <main className="container mx-auto px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
               
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

