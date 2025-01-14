import Products from "../../src/Products/index.json"
import { A, Match, Switch, useState } from "vaderjs";
import Nav from "../../src/Components/nav";
import Cart from "../../src/Sdk";
import ItemAdded from "../../src/Components/ItemAdded";
import SharedComponent from "../../src/Components/SharedComponent";
import api from "../../src/api";
import ReviewProduct from "../../src/Components/ReviewProduct";
export default function () {
    if (isServer) return <div></div>
    const cart = new Cart()
    let [loading, setLoading] = useState(true)
    let [product, setProduct] = useState(Products.items.find((product) => product.id === params.id) ? {
        id: params.id,
        images: Products.items.find((product) => product.id === params.id).images,
        name: Products.items.find((product) => product.id === params.id).name,
        price: Products.items.find((product) => product.id === params.id).price,
        mainImage: Products.items.find((product) => product.id === params.id).mainImage,
        images: Products.items.find((product) => product.id === params.id).images,
        description: Products.items.find((product) => product.id === params.id).description,
        sizes: [],
        stock: [],
        quantity: 1,
        reviews: [],
    } : {
        id: 0, images: [], name: '', price: 0, sizes: [], stock: [],
        reviews: [],
        description: '',
        quantity: 1
    })
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [favorite, setFavorite] = useState((cart.favorites.find((item) => item.id === params.id) ? true : false))
    const [error, setError] = useState(null)
    const [loader, setLoader] = useState(true)
    const [selectedSize, setSelectedSize] = useState(null)


    const sizes = [
        'XS',
        'S',
        'M',
        'L',
        'XL',
    ]

    function isOutofStock() {
        return product.stock.every((stock) => stock.quantity === 0)
    }

    useEffect(() => {
        if (isServer) return 
        api.collection("products").getOne(params.id, {
            expand: 'reviews'
        }).then((data) => {
            console.log(data)
            setProduct({ ...product, sizes: data.sizes, stock: data.stock })
            setLoader(false)
        })
    }, [])

    console.log("loading", loader)  

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
        <SharedComponent title={`${product.name} - ${product.price}`} description={product.description}>
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
                                <Switch>
                                    <Match when={product.images.length > 1}>
                                        <div className="absolute inset-0 flex items-center justify-between p-4">
                                            <button
                                                onClick={() => setCurrentImageIndex(currentImageIndex - 1 < 0 ? product.images.length - 1 : currentImageIndex - 1)}
                                                className="rounded-full bg-white p-2 shadow-lg"
                                            >
                                                ←
                                            </button>
                                            <button
                                                onClick={() => setCurrentImageIndex(currentImageIndex + 1 === product.images.length ? 0 : currentImageIndex + 1)}
                                                className="rounded-full bg-white p-2 shadow-lg"
                                            >
                                                →
                                            </button>
                                        </div>
                                    </Match>
                                </Switch>
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
                                {
                                    loader ? <div>Loading...</div> : product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => {
                                                if (product.stock.find((stock) => stock.size.toLowerCase() === size.toLowerCase())?.quantity === 0) return
                                                setSelectedSize(size)
                                            }}
                                            className={`rounded-full   px-6 py-4 ${error && error === 'size' ? 'border border-red-500' : selectedSize === size ? 'border-black border' : 'hover:border-black border border-gray-300'
                                                }
                                                    ${product.stock.find((stock) => stock.size.toLowerCase() === size.toLowerCase())?.quantity === 0 && 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                }
                                                    `}
                                        >
                                            {size}
                                        </button>
                                    ))

                                }
                            </div>
                        </div>

                        {/* Add to Bag & Favorite */}
                        <div className="flex flex-col gap-4">
                            <button className="w-full rounded-full bg-black px-6 py-4 text-white hover:bg-gray-800"
                                onClick={() => {
                                    if (product.canBuyMultiple == false && cart.items.find((item) => item.id === product.id)) {
                                        alert('You can only buy one of this product')
                                        return
                                    }
                                    if (isOutofStock()) {
                                        return
                                    }
                                    if (!selectedSize) {
                                        setError('size')
                                        setTimeout(() => setError(null), 2000)
                                        return
                                    }
                                    cart.addItem({ ...product, size: selectedSize })
                                    console.log(cart.items)
                                    document.getElementById('item-added').showModal()
                                }}
                            >
                                {
                                     loader ? 'Loading...' : isOutofStock() ? 'Out of Stock' : 'Add to Bag'
                                }
                            </button>
                            <button
                                onClick={() => {
                                    cart.toggleFavoriteItem(product)
                                    setFavorite(!favorite)
                                    document.getElementById('item-added').showModal()
                                }}
                                className="w-full rounded-full border border-gray-300 px-6 py-4 hover:border-black">
                                {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                        </div>

                        <div>
                            <h2 className="mb-4 text-lg font-semibold">Details</h2>
                            <p className="text-sm text-gray-600">
                                {product.description}
                            </p>
                        </div>

                        {/* Shipping Info */}
                        <div className="border-t pt-6">
                            <h3 className="mb-2 font-semibold">Shipping</h3>
                            <p className="text-sm text-gray-600">
                                You&apos;ll see our shipping options at checkout.
                            </p>
                        </div>

                        {/* REVIEWS DROPDOWN */}

                        <div className="border-t pt-6">
                            <h3 className="mb-2 font-semibold">Reviews</h3>
                            <Switch>
                                <Match when={product.reviews.length === 0}>
                                    <p className="text-sm text-gray-600">No reviews yet.</p>
                                    <button className="text-sm text-gray-600 underline" onClick={() => document.getElementById('reviewProduct').showModal()}>
                                        Be the first to review
                                    </button>
                                </Match>
                                <Match when={product.reviews.length > 0}>
                                    <div className="flex items-center gap-2">
                                        <button className="text-sm text-gray-600 underline" onClick={() => document.getElementById('reviewProduct').showModal()}>
                                            Write a review
                                        </button>
                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs">
                                            ★★★★★
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            {product.reviews.length} reviews
                                        </span>
                                    </div>
                                    <button className="text-sm text-gray-600 underline">
                                        Read all reviews
                                    </button>
                                </Match>
                            </Switch>
                        </div>
                        
                    </div>
                </div>
            </div>
            <ItemAdded />
            <ReviewProduct  product={product} />
        </SharedComponent>

    )
}
