import { Match, Switch } from "vaderjs";
import SharedComponent from "../../src/Components/SharedComponent"; 
import Cart from "../../src/Sdk";

export default function (){
    const cartItems = new Cart() 
    let [refresh, setRefresh] = useState(false)
    if(isServer) return <div></div>

    useEffect(() => {
        cartItems.onEvent('itemUnfavorited', () => {
            setRefresh(!refresh)
        })
    }, [])
    return(
        <SharedComponent title={'Favorites'}>
             <Switch>
                <Match when={cartItems.favorites.length === 0}>
                    <div className="flex flex-col items-center justify-center h-96">
                        <h1 className="text-2xl font-bold">No favorites yet</h1>
                        <p className="text-gray-500">You have not added any items to your favorites yet</p>
                    </div>
                </Match>
                <Match when={cartItems.favorites.length > 0}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:p-12 lg:grid-cols-3 gap-6">
            {cartItems.favorites.map((item) => (
              <div key={item.id} className="group relative bg-card rounded-lg p-4 border">
                <div className="relative aspect-square mb-4 cursor-pointer">
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    onclick={() => window.location.href = `/products/${item.id}`}
                    className="w-full h-full object-cover rounded-md z-0"
                  />
                  <button
                    onClick={() => cartItems.removeFavorite(item.id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-background/80
                    z-10
                    backdrop-blur-sm hover:bg-background/90 transition-colors"
                  > 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12
                  bg-[#eeeeee] text-black rounded-full p-2 fill-black 
                  ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
 
                    <span className="sr-only">Remove from favorites</span>
                  </button>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                    <select placeholder="Select Size" className="w-[140px]">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
                     
                </Match>
             </Switch>
        </SharedComponent>
    )
}