import Products from "../../src/Products/index.json"
import { A, useState } from "vaderjs";
import Nav from "../../src/Components/nav";
import Cart from "../../src/Sdk";
import ItemAdded from "../../src/Components/ItemAdded";
export default function () {  
    const cart = new Cart()
    let [product, setProduct] = useState(Products.shirts.find((product) => product.id === parseInt(params.id)) || Products.shirts[0]) 
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    let [favorite, setFavorite] = useState(cart.favorites.includes(product.id))
    const [error, setError] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null) 
    const images = [
        '/public/Products/shirts/comfy_V1.jpeg',
        '/placeholder.svg?height=600&width=600',
        '/placeholder.svg?height=600&width=600',
    ]

    const sizes = [
        'XS',
        'S',
        'M',
        'L',
        'XL',
    ]

    const thumbnails = product.images.map((src, index) => (
        <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative h-16 w-16 overflow-hidden rounded border-2 ${currentImageIndex === index ? 'border-black' : 'border-transparent'
                }`}
        >
            <img
                src={src}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
            />
        </button>
    ))
    return (
        <html>
            <head>
                <title>Comfy</title>
                <meta name="description" content="Comfy - One of One" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <Nav />
                <div className="mx-auto max-w-7xl px-4 py-8">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Product Images */}
                        <div className="relative">
                            <div className="sticky top-0 flex gap-4">
                                {/* Thumbnails */}
                                <div className="flex flex-col gap-4">{thumbnails}</div>

                                {/* Main Image */}
                                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                                    <img
                                        src={product.images[currentImageIndex]}
                                        alt="Product"
                                        className="object-cover"
                                    />
                                    {/* Navigation Arrows */}
                                    <div className="absolute inset-0 flex items-center justify-between p-4">
                                        <button
                                            onClick={() =>  setCurrentImageIndex(currentImageIndex - 1 < 0 ? images.length - 1 : currentImageIndex - 1)}
                                            className="rounded-full bg-white p-2 shadow-lg"
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={() => setCurrentImageIndex(currentImageIndex + 1 === images.length ? 0 : currentImageIndex + 1)}
                                            className="rounded-full bg-white p-2 shadow-lg"
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col gap-6">
                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs">
                                        ★ Highly Rated
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold">{product.name}</h1>
                                <p className="text-xl text-gray-500">${product.price}</p>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <h2 className="mb-4 text-lg font-semibold">Select Size</h2>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                    {sizes.map((size) => ( 
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`rounded-full   px-6 py-4 ${
                                                error && error === 'size' ?  'border border-red-500' :  selectedSize === size ? 'border-black border' : 'hover:border-black border border-gray-300'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Bag & Favorite */}
                            <div className="flex flex-col gap-4">
                                <button className="w-full rounded-full bg-black px-6 py-4 text-white hover:bg-gray-800"
                                onClick={() => {
                                    if (!selectedSize) {
                                        setError('size')
                                        setTimeout(() => setError(null), 2000)
                                        return
                                    }
                                    cart.addItem({ ...product, size: selectedSize })
                                    document.getElementById('item-added').showModal()
                                }}
                                >
                                    Add to Bag
                                </button>
                                <button 
                                onClick={() => {
                                    cart.toggleFavoriteItem(product.id)
                                    setFavorite(!favorite)
                                }}
                                className="w-full rounded-full border border-gray-300 px-6 py-4 hover:border-black">
                                    {cart.favorites.includes(product.id) ? 'Remove from Favorites' : ' Favorite ♡'}
                                </button>
                            </div>

                            {/* Shipping Info */}
                            <div className="border-t pt-6">
                                <h3 className="mb-2 font-semibold">Shipping</h3>
                                <p className="text-sm text-gray-600">
                                    You&apos;ll see our shipping options at checkout.
                                </p>
                            </div>

                            {/* Store Pickup */}
                            <div className="border-t pt-6">
                                <h3 className="mb-2 font-semibold">Free Pickup</h3>
                                <button className="text-sm underline">Find a Store</button>
                            </div>

                            
                        </div>
                    </div>
                </div>
                <ItemAdded />
            </body>
        </html>

    )
}
