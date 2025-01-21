import Products from "../../src/Products/index.json"
import { A, Match, Switch, useState } from "vaderjs";
import Nav from "../../src/Components/nav";
import Cart from "../../src/Sdk";
import ItemAdded from "../../src/Components/ItemAdded";
import SharedComponent from "../../src/Components/SharedComponent";
import api from "../../src/api";
import ReviewModal from "../../src/Components/ReviewProduct";
export default function () {
    if (isServer) return <div></div>
    const cart = new Cart()
    let [product, setProduct] = useState(Products.items.find((product) => product.id === params.id) ? {
        id: params.id,
        reviews: [],
        images: Products.items.find((product) => product.id === params.id).images,
        name: Products.items.find((product) => product.id === params.id).name,
        price: Products.items.find((product) => product.id === params.id).price,
        mainImage: Products.items.find((product) => product.id === params.id).mainImage,
        images: Products.items.find((product) => product.id === params.id).images,
        description: Products.items.find((product)=> product.id === params.id).description,
        sizes: [],
        stock:[], 
        colors: [],
        quantity: 1,
        isForSale: false
    } : {
        id: 0, images: [], name: '', price: 0, sizes: [], stock: [], colors: [], quantity: 1
    })
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    let [favorite, setFavorite] = useState((cart.favorites.find((item) => item.id === params.id) ? true : false))

    const [error, setError] = useState(null)
    const [loader, setLoader] = useState(true)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)


    const sizes = [
        'XS',
        'S',
        'M',
        'L',
        'XL',
    ]

    function isOutofStock() {   
        if(product.stock.length < 1) return true; 
        return  product.stock.every((stock)=> stock.quantity === 0)
    }
 
    useEffect(() => {
        if (isServer) return 
        api.collection("products").getOne(params.id, {
            expand:'reviews',
            headers:{
                // cache for 20 minutes
                'Cache-Control': 'max-age=1200'
            }
        }).then((data) => { 
            api.collection("reviews").getFullList({
                batch: Number.MAX_SAFE_INTEGER,
                expand: 'author',
                headers:{
                    // cache for 20 minutes
                    'Cache-Control': 'max-age=1200'
                }
            }).then((d)=>{ 
                setProduct({ ...product, sizes: data.sizes, stock: data.stock , colors: data.colors, reviews: d, isForSale: data.isForSale})
            })
             
            
        }).finally(()=>{
            setLoader(false)
        })
    }, [])

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
        <SharedComponent title="Comfy - Product">
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
                                                    setSelectedSize(size)
                                                }}
                                                className={`rounded-full   px-6 py-4 ${error && error === 'size' ? 'border border-red-500' : selectedSize === size ? 'border-black border' : 'hover:border-black border border-gray-300'
                                                    }
                                                    
                                                    }
                                                    `}
                                            >
                                                {size}
                                            </button>
                                        ))

                                    }
                                </div>
                            </div>


                            {/* choose color */}
                            <div>
                                <h2 className="mb-4 text-lg font-semibold">Choose Color</h2>
                                <div className="flex gap-5">
                                { 
                                    loader ? <div>Loading...</div> : product.colors.map((stock) => (
                                         
                                        <span className="w-12 h-12 cursor-pointer rounded-full inline-block" style={{ backgroundColor: stock.hex ,  border: selectedColor === stock.color  && error && error === 'color' ? '2px solid red' : selectedColor === stock.color ? '4px solid white' : '2px solid transparent'
                                         }}
                                        onClick={() => { 
                                            setSelectedColor(stock.color)
                                            console.log(stock.color)
                                        }}
                                        ></span>
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

                                        if(!product.isForSale){
                                            return;
                                        }
                                        switch (true) {
                                            case !product.sizes:
                                                setError('size')
                                                setTimeout(() => setError(null), 2000)
                                                return
                                            case !product.colors:
                                                setError('color')
                                                setTimeout(() => setError(null), 2000)
                                                return
                                        } 
                                        cart.addItem({ ...product, size: selectedSize, color: selectedColor,  isPreOrder: isOutofStock() })
                                       
                                        document.getElementById('item-added').showModal()
                                    }}
                                >
                                    {
                                        loader ? 'Loading....' : product.isForSale === false ? 'Coming Soon' : isOutofStock() ? 'Pre Order' : 'Add to Bag'
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

                            <div className="pt-6">
                             <h3 className="mb-2 font-semibold">Description</h3>
                             <p className="text-sm text-gray-600">
                                {product.description}
                             </p>
                            </div>

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
                                    <div className="flex flex-col gap-2 mb-2">
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
                                        {
                                        loader ? 'Loading...' : product.reviews.map((review) => (
                                            <div key={review.id} className="border-b py-4">
                                                <h4 className="font-semibold">{""}- <span
                                                className="text-yellow-500"
                                                > {new Array(review.overal_rating).fill('★').join('')}</span></h4>
                                                <p className="text-sm text-gray-600">{review.description}</p> 
                                                <p className="text-sm text-gray-600">Size: {review.size_you_normally_wear}</p>
                                            </div>
                                        ))
                                     }
                                    </div>

                                     
                                </Match>
                            </Switch>
                        </div>

                            {/* Shipping Info */}
                            <div className="border-t pt-6">
                                <h3 className="mb-2 font-semibold">Shipping</h3>
                                <p>
                                    Please allow 1-2 weeks for shipping.
                                </p>
                                <p className="text-sm text-gray-600">
                                    You&apos;ll see our shipping options at checkout.
                                </p>
                            </div>



                            {/* Store Pickup */}
                            <div className="border-t pt-6">
                                <h3 className="mb-2 font-semibold">Free Pickup</h3>
                                <button className="text-sm underline">Schedule Times</button>
                            </div>


                        </div>
                    </div>
                </div>
                <ItemAdded />
                <ReviewModal product={product}  setProduct={setProduct} />
        </SharedComponent>

    )
}
