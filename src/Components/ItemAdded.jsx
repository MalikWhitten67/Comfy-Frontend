import Cart from "../Sdk"
import { useState } from "vaderjs"
import Products from "../Products/index.json"
export default function () {
    let [product, setProduct] = useState({})
    const c = new Cart()
    let [newItemAdded, setNewItemAdded] = useState(false)
    useEffect(() => {
     c.onEvent('itemAdded', (data, list) => {
        setNewItemAdded(true)
        console.log(data)
        setProduct(data)
        setTimeout(() => setNewItemAdded(false), 2000)
     })
    }, [])
    return (
        <dialog  
        id="item-added"
        className="modal modal-bottom sm:modal-middle backdrop:bg-black/60"
      >
        <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
          {/* Close button */}
          <button 
            onClick={() => {
                document.getElementById('item-added').close()
            }}
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
            aria-label="Close modal"
          >
            X
          </button>
  
          {/* Success message */}
          <div className="mb-6 flex items-center gap-2 text-green-600">
            <svg
                xmlns="http://www.w3.org/2000/svg"  
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>

            <span className="font-medium">Added to Cart</span>
          </div>
  
          {/* Item details */}
          <div className="mb-6 flex gap-4">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">Quantity: {c.items.filter(i => i.id === product.id).length}</p>
              <p className="mt-1 text-sm">Size: {product.size}</p>
              <p className="mt-1 font-medium">${product.price}</p>
            </div>
          </div>
  
          {/* Action buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button 
                onClick={() => { 
                   document.getElementById('item-added').close()
                }}
              className="w-full rounded-full border border-gray-300 px-6 py-3 text-sm font-medium hover:border-black sm:w-auto"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => { 
                window.location.href = "/cart"
              }}
              className="w-full rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 sm:w-auto"
            >
              View Cart ({c.items.length})
            </button>
          </div>
        </div>
      </dialog>
    )
}