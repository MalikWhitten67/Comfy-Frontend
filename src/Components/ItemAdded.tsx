import { createSignal, onMount, Show, Switch, Match } from "solid-js";
import Cart from "../Sdk";
import Products from "../Products/index.json";

export default function ItemAddedModal() {
  const c = new Cart();

  const [product, setProduct] = createSignal({});
  const [newItemAdded, setNewItemAdded] = createSignal(false);
  const [isFavorite, setIsFavorite] = createSignal(false);

  onMount(() => {
    c.onEvent("itemAdded", (data, list) => {
      setProduct(data);
      setIsFavorite(false);
      setNewItemAdded(true);
      console.log(data);
      setTimeout(() => setNewItemAdded(false), 2000);
      const dialog = document.getElementById("item-added");
      if (dialog) dialog.showModal();
    });

    c.onEvent("itemFavorited", (data, list) => {
      setProduct(data);
      setIsFavorite(true);
      setNewItemAdded(true);
      console.log(data);
      setTimeout(() => setNewItemAdded(false), 2000);
      const dialog = document.getElementById("item-added");
      if (dialog) dialog.showModal();
    });
  });

  const closeModal = () => {
    const dialog = document.getElementById("item-added");
    if (dialog) dialog.close();
  };

  return (
    <dialog
      id="item-added"
      class="modal modal-bottom sm:modal-middle backdrop:bg-black/60"
    >
      <div class="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={closeModal}
          class="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Success message */}
        <div class="mb-6 flex items-center gap-2 text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span class="font-medium">
            {isFavorite() ? "Added to favorites" : "Added to cart"}
          </span>
        </div>

        {/* Item details */}
        <div class="mb-6 flex gap-4">
          <div class="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
            <Show when={product().mainImage}>
              <img
                src={product().mainImage}
                alt={product().name}
                class="h-full w-full object-cover"
              />
            </Show>
          </div>

          <div>
            <Switch>
              <Match when={isFavorite()}>
                <h3 class="text-lg font-semibold">{product().name}</h3>
              </Match>
              <Match when={!isFavorite()}>
                <h3 class="font-medium">{product().name}</h3>
                 
                <p class="mt-1 text-sm">Size: {product().size}</p>
                <p class="mt-1 font-medium">${product().price}</p>
                <p class="mt-1 text-sm flex items-center gap-2">
                  Color{" "}
                  <span
                    class="h-4 w-4 rounded-full inline-block"
                    style={{ "background-color": product().hex }}
                  ></span>
                </p>
              </Match>
            </Switch>
          </div>
        </div>

        {/* Action buttons */}
        <div class="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={closeModal}
            class="w-full rounded-full border border-gray-300 px-6 py-3 text-sm font-medium hover:border-black sm:w-auto"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => {
              if (isFavorite()) {
                window.location.href = "/favorites";
              } else {
                window.location.href = "/cart";
              }
            }}
            class="w-full cursor-pointer rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 sm:w-auto"
          > View {isFavorite() ? "Favorites" : "Cart"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
