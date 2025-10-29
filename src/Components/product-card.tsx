interface ProductCardProps {
  id: string
  name: string
  price: number
  category: string
  colors: [],
  mainImage: string
  images: string[]
}

export function ProductCard({ id, name, price, category, colors, mainImage }: ProductCardProps) {
  return (
    // 'group' allows us to create hover effects on child elements
    <a href={`/products/${id}`} className="group block overflow-hidden">
      
      {/* --- IMAGE CONTAINER --- */}
      <div className="aspect-square overflow-hidden rounded-md bg-muted"> {/* Added rounded corners */}
        <img
          src={mainImage}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105" // Added hover effect
        />
      </div>

      {/* --- TEXT CONTENT --- */}
      <div className="mt-3"> {/* Creates clean space between image and text */}
        
        {/* Primary Info: Name and Price */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">
            {name}
          </h3>
          <p className="text-base font-medium text-foreground">
            ${price}
          </p>
        </div>

        {/* Secondary Info: Category & Colors combined */}
        <p className="mt-1 text-sm text-muted-foreground">
          {category} &bull; {colors.length} Colors
        </p>

      </div>
    </a>
  )
}

