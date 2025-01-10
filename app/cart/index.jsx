import api from "../../src/api";
import Navbar from "../../src/Components/nav"
import Cart from "../../src/Sdk"
import { useState ,useEffect, Switch, Match} from "vaderjs"
export default function (){
    const cart = new Cart()
    let [items, setItems] = useState(cart.items); 
    let [loading, setLoading] = useState(false)

    // Function to merge items with the same id
    const mergeItems = (items) => {
      const merged = [];
      const itemMap = new Map();
    
      for (const item of items) {
        if (itemMap.has(item.id)) {
          // Update quantity of the existing item
          itemMap.get(item.id).quantity += item.quantity || 1;
          itemMap.get(item.id).size += ", " + item.size;
        } else {
          // Add a new item to the map
          itemMap.set(item.id, { ...item, quantity: item.quantity || 1 });
        }
      }
    
      // Convert the map back to an array
      return Array.from(itemMap.values());
    };

    var tax = 0.07;

    const createOrder =  async () => {

      if(api.authStore.isValid === false){
        window.location.href = '/auth/login'
        return
      }
      setLoading(true)
      const order = {
        products: items,
        subtotal: subtotal,
        tax: taxAmount,
        total: total,
        owner: api.authStore.record.id
      } 

      const { orderID } = await fetch('https://comfy-backend-vert.vercel.app/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      }).then((res) => res.json())  



      const { checkoutID } = await fetch('https://comfy-backend-vert.vercel.app/createCheckout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderID }),
      }).then((res) => res.json())
     
      setLoading(false)
      window.location.href = `/checkout/${checkoutID}`
      cart.clear()
    }

    
    // Merge and set items
    useEffect(() => {
      const mergedItems = mergeItems(items);
      setItems(mergedItems);
    }, [items]);
    
      const [isPromoOpen, setIsPromoOpen] = useState(false)
    
      const subtotal = items.reduce((sum, item) => parseInt(item.price)  * item.quantity + sum, 0)
    
      console.log(items)
      var taxAmount = subtotal * tax;
      var total = subtotal + taxAmount;

      const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return
        const newItems = items.map(item => {
          if (item.id === id) {
            return { ...item, quantity: newQuantity }
          }
          return item
        })
        setItems(newItems)
      }
    
      const removeItem = (id) => {
        let index = items.findIndex(item => item.id === id)
        if (index !== -1) {
          let newItems = [...items]
          newItems.splice(index, 1)
          cart.removeItem(index)
          setItems(newItems)
        }else{
          console.log("Item not found")
        } 
      }
      var date =  new Date();

      // typically 5-7 business days

      date.setDate(date.getDate() + 7)
      date = date.toDateString()
    
      return (
       <html>
        <head>
            <title>Comfy</title>
            <meta name="description" content="Comfy - One of One" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
        <div className="min-h-screen bg-white">
          <Navbar />
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <h1 className="mb-6 text-2xl font-medium">Bag</h1>
                
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-6 border-b pb-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={item.mainImage}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>
    
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <a href={`/products/${item.id}`} className="font-medium">{item.name}</a>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                            <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                            <p className="mt-1 text-sm text-gray-500">Size {item.size}</p>
                          </div>
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                        </div>
    
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="rounded-full p-2 hover:bg-gray-100"
                            >
 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <div className="flex gap-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="rounded-full p-2 hover:bg-gray-100"
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                              </button>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="rounded-full p-2 hover:bg-gray-100"
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                              </button>
                            </div>
                          </div>
                          <button className="rounded-full p-2 hover:bg-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                          </button>
                        </div>
    
                        <div className="mt-4">
                          <p className="text-sm text-gray-600">
                            Arrives by  {date}
                            <button className="ml-2 underline">Edit Location</button>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
    
                
              </div>
    
              {/* Summary */}
              <div className="lg:sticky lg:top-8">
                <div className="rounded-lg border p-6">
                  <h2 className="text-xl font-medium">Summary</h2>
    
                  {/* Promo Code */}
                  <button
                    onClick={() => setIsPromoOpen(!isPromoOpen)}
                    className="mt-6 flex w-full items-center justify-between text-left"
                  >
                    <span>Do you have a Promo Code?</span> 
                  </button>
                  {isPromoOpen && (
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="w-full rounded-lg border px-4 py-2"
                      />
                    </div>
                  )}
    
                  {/* Cost Breakdown */}
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        Subtotal 
                      </div>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Shipping & Handling</span>
                      <span>Free</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        Estimated Tax
                         
                      </div>
                      <span>${taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
    
                  {/* Member Message */}
                  <Switch>
                    <Match when={!api.authStore.isValid}>
                      <div className="mt-6">
                        <p className="text-sm text-gray-600">
                          <a href="/auth/login" className="underline">Sign in</a> to see your exclusive offers
                        </p>
                      </div>
                    </Match>
                  </Switch>
    
                  {/* Checkout Buttons */}
                  <div className="mt-6 space-y-4">
                   <Switch>
                    <Match when={cart.items.length > 0}>
                    <button className="w-full rounded-full border py-4 hover:border-black  text-sm font-medium" onClick={() => createOrder()}>
                      {loading ? 'Processing...' : 'Checkout'}
                    </button>
                    </Match>
                   </Switch>
                  </div>
    
                   
                </div>
              </div>
            </div>
          </div>
        </div>
        </body>
       </html>
      )
}
