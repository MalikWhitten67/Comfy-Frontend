import { createSignal, onMount, createEffect, Switch, Match, Show } from "solid-js";
import SharedComponent from "../../src/Components/SharedComponent";
import Cart from "../../src/Sdk";

export default function Favorites() {
  const cartItems = new Cart();
  const [refresh, setRefresh] = createSignal(false);

  // Ensure this runs only in the browser
  if (typeof window === "undefined") return <div></div>;

  onMount(() => {
    cartItems.onEvent("itemUnfavorited", () => {
      // Toggle signal to trigger reactivity
      setRefresh((prev) => !prev);
    });
  });

  // Re-run when refresh changes (ensures UI updates)
  createEffect(() => {
    refresh();
  });

  return (
    <SharedComponent title={"Favorites"}>
      <Switch>
        <Match when={cartItems.favorites.length === 0}>
          <div class="flex flex-col items-center justify-center h-96">
            <h1 class="text-2xl font-bold">No favorites yet</h1>
            <p class="text-gray-500">
              You have not added any items to your favorites yet
            </p>
          </div>
        </Match>

        <Match when={cartItems.favorites.length > 0}>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:p-12 lg:grid-cols-3 gap-6">
            {cartItems.favorites.map((item) => (
              <div key={item.id} class="group relative bg-card rounded-lg p-4">
                <div class="relative aspect-square mb-4 cursor-pointer">
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    onClick={() => (window.location.href = `/products/${item.id}`)}
                    class="w-full h-full object-cover rounded-md z-0"
                  />
                  <button
                    onClick={() => cartItems.removeFavorite(item.id)}
                    class="absolute top-2 right-2 p-2 rounded-full bg-background/80
                    z-10 backdrop-blur-sm hover:bg-background/90 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-12 bg-[#eeeeee] text-black rounded-full p-2 fill-black"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 
                          0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
                          3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <span class="sr-only">Remove from favorites</span>
                  </button>
                </div>

                <div class="space-y-2">
                  <h3 class="font-semibold text-lg">{item.name}</h3>
                  <p class="text-muted-foreground text-sm">{item.category}</p>
                  <div class="flex items-center justify-between">
                    <p class="font-semibold">${item.price.toFixed(2)}</p>
                    <select placeholder="Select Size" class="w-[140px]">
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
  );
}
