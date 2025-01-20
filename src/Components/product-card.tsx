import { A } from "vaderjs"

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
    <A href={`/products/${id}`} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="aspect-square">
        <img
          src={mainImage}
          alt={name}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body p-4">
        <div className="flex justify-between gap-5 items-center">
          <h3 className="card-title text-lg">{name}</h3>
          <p className="text-lg font-semibold">${price}</p>
        </div>
        <p className="text-sm text-base-content/70">{category}</p>
        <p className="text-sm text-base-content/70">{colors.length} Colors</p>
      </div>
    </A>
  )
}

