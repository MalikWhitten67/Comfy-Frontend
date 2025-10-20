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
    <a href={`/products/${id}`} class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure class="aspect-square">
        <img
          src={mainImage}
          alt={name}
          class="object-cover w-full h-full"
        />
      </figure>
      <div class="card-body p-4">
        <div class="flex justify-between gap-5 items-center">
          <h3 class="card-title text-lg">{name}</h3>
          <p class="text-lg font-semibold">${price}</p>
        </div>
        <p class="text-sm text-base-content/70">{category}</p>
        <p class="text-sm text-base-content/70">{colors.length} Colors</p>
      </div>
    </a>
  )
}

