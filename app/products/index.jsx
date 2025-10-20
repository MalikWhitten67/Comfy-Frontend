import { useParams } from "@solidjs/router";
import { createSignal, createEffect, onMount, Show, Switch, Match } from "solid-js";
import Products from "../../src/Products/index.json"; 
import Cart from "../../src/Sdk";
import ItemAdded from "../../src/Components/ItemAdded.jsx";
import SharedComponent from "../../src/Components/SharedComponent";
import api from "../../src/api";
import ReviewModal from "../../src/Components/ReviewProduct";

export default function ProductPage() {
  if (typeof window === "undefined") return <div></div>;

  const params = useParams(); 
  const cart = new Cart();

    const found = Products.items.find((p) => p.id === params.id); 
    console.log("Found product:", found);
  const [product, setProduct] = createSignal( found
      ?  {
          id: params.id,
          reviews: [],
          images: found.images,
          name: found.name,
          price: found.price,
          mainImage: found.mainImage,
          description: found.description,
          sizes: [],
          stock: [],
          colors: [],
          quantity: 1,
          isForSale: false,
          color: null,
        }
        : {});

  const [currentImageIndex, setCurrentImageIndex] = createSignal(0);
  const [favorite, setFavorite] = createSignal(cart.favorites.find((item) => item.id === params.id) ? true : false);
  const [error, setError] = createSignal(null);
  const [loader, setLoader] = createSignal(true);
  const [selectedSize, setSelectedSize] = createSignal(null);
  const [selectedColor, setSelectedColor] = createSignal(
    {name: null, hex: null}
  );

  function isOutOfStock() {
    const p = product();
    if (p.stock.length < 1) return true;
    return p.stock.every((stock) => stock.quantity === 0);
  }

  onMount(async () => {
    try {
      const data = await api.collection("products").getOne(params.id, {
        expand: "reviews",
        headers: { "Cache-Control": "max-age=1200" },
      });

      const reviews = await api.collection("reviews").getFullList({
        batch: Number.MAX_SAFE_INTEGER,
        expand: "author",
        filter: `product="${params.id}"`,
        headers: { "Cache-Control": "max-age=1200" },
      });

      setProduct((p) => ({
        ...p,
        sizes: data.sizes,
        stock: data.stock,
        colors: data.colors,
        reviews,
        isForSale: data.isForSale,
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoader(false);
    }
  });

  console.log("Product data:", product());
  const thumbnails = () =>
    product().images.map((src, index) => (
      <button
        class={`relative h-16 w-16 cursor-pointer overflow-hidden rounded border-2 ${
          currentImageIndex() === index ? "border-black" : "border-transparent"
        }`}
        onClick={() => setCurrentImageIndex(index)}
      >
        <img src={src} alt={`Product thumbnail ${index + 1}`} class="object-cover" />
      </button>
    ));

  return (
    <SharedComponent
      title={`Comfy - ${product().name}`}
      description={product().description}
      image={product().images[0]}
      url={`https://comfy.vercel.app/products/${product().id}`}
    >
      <div class="mx-auto max-w-7xl px-4 py-8">
        <div class="grid gap-8 md:grid-cols-2">
          {/* Product Images */}
          <div class="relative">
            <div class="sticky top-0 flex gap-4">
              <div class="flex flex-col gap-4">{thumbnails()}</div>

              <div class="relative aspect-square w-full overflow-hidden rounded-lg">
                <img src={product().images[currentImageIndex()]} alt="Product" class="object-cover" />

                <Show when={product().images.length > 1}>
                  <div class="absolute  inset-0 flex items-center justify-between p-4">
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          currentImageIndex() - 1 < 0 ? product().images.length - 1 : currentImageIndex() - 1
                        )
                      }
                      class="rounded-full cursor-pointer  bg-white p-2 shadow-lg"
                    >
                      ←
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          currentImageIndex() + 1 === product().images.length ? 0 : currentImageIndex() + 1
                        )
                      }
                      class="rounded-full cursor-pointer  bg-white p-2 shadow-lg"
                    >
                      →
                    </button>
                  </div>
                </Show>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div class="flex flex-col gap-6">
            <div>
              <div class="mb-2 flex items-center gap-2">
                <Show
                  when={
                    product().reviews.length > 0 &&
                    product().reviews.reduce((acc, r) => acc + r.overal_rating, 0) / product().reviews.length > 0
                  }
                >
                  <span class="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs">★ Highly Rated</span>
                </Show>
              </div>
              <h1 class="text-3xl font-bold">{product().name}</h1>
              <p class="text-xl text-gray-500">${product().price}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h2 class="mb-4 text-lg font-semibold">Select Size</h2>
              <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Show
                  when={!loader()}
                  fallback={<div>Loading...</div>}
                >
                  {product().sizes.map((size) => (
                    <button
                      class={`rounded-full cursor-pointer px-6 py-4 ${
                        error() === "size"
                          ? "border border-red-500"
                          : selectedSize() === size
                          ? "border-black border"
                          : product().isForSale
                          ? "hover:border-black border border-gray-300"
                          : ""
                      } ${!product().isForSale ? "bg-gray-200" : ""}`}
                      onClick={() => product().isForSale && setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </Show>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h2 class="mb-4 text-lg font-semibold">Choose Color</h2>
              <div class="flex gap-5">
                <Show when={!loader()} fallback={<div>Loading...</div>}>
                  {product().colors.map((stock) => (
                    <span
                      class="w-12 h-12 cursor-pointer rounded-full inline-block"
                      style={{
                        "background-color": stock.hex,
                        border:
                          selectedColor()?.hex === stock.hex && error() === "color"
                            ? "2px solid red"
                            : selectedColor().hex === stock.hex
                            ? "4px solid white"
                            : "2px solid transparent",
                      }}
                      onClick={() => setSelectedColor({name: stock.color, hex: stock.hex})}
                    ></span>
                  ))}
                </Show>
              </div>
            </div>

            {/* Add to Cart & Favorite */}
            <div class="flex flex-col gap-4">
              <button
                class="w-full cursor-pointer rounded-full bg-black px-6 py-4 text-white hover:bg-gray-800"
                onClick={() => {
                  const p = product();

                  if (p.canBuyMultiple === false && cart.items.find((item) => item.id === p.id)) {
                    alert("You can only buy one of this product");
                    return;
                  }

                  if (!p.isForSale) return;

                  if (!selectedSize()) {
                    setError("size");
                    setTimeout(() => setError(null), 2000);
                    return;
                  }

                  if (!selectedColor()) {
                    setError("color");
                    setTimeout(() => setError(null), 2000);
                    return;
                  }

                  cart.addItem({ ...p, size: selectedSize(), color: selectedColor().name, hex: selectedColor().hex, isPreOrder: isOutOfStock() });
                  document.getElementById("item-added").showModal();
                }}
              >
                {loader() ? "Loading..." : product().isForSale === false ? "Coming Soon" :  "Add to Bag"}
              </button>

              <button
                class="w-full rounded-full cursor-pointer border border-gray-300 px-6 py-4 hover:border-black"
                onClick={() => {
                  cart.toggleFavoriteItem(product());
                  setFavorite(!favorite());
                  document.getElementById("item-added").showModal();
                }}
              >
                {favorite() ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>

            {/* Description */}
            <div class="pt-6">
              <h3 class="mb-2 font-semibold">Description</h3>
              <p class="text-sm text-gray-600">{product().description}</p>
            </div>

            {/* Reviews */}
            <div class="border-t pt-6">
              <h3 class="mb-2 font-semibold">Reviews</h3>
              <Switch>
                <Match when={product().reviews.length === 0}>
                  <p class="text-sm text-gray-600">No reviews yet.</p>
                  <button
                    class="text-sm text-gray-600 underline"
                    onClick={() => {
                      if (!api.authStore.isValid) return alert("Please login to write a review");
                      document.getElementById("reviewProduct").showModal();
                    }}
                  >
                    Be the first to review
                  </button>
                </Match>

                <Match when={product().reviews.length > 0}>
                  <div class="flex flex-col gap-2 mb-2">
                    <div class="flex items-center gap-2">
                      <button
                        class="text-sm text-gray-600 underline"
                        onClick={() => {
                          if (!api.authStore.isValid) return alert("Please login to write a review");
                          document.getElementById("reviewProduct").showModal();
                        }}
                      >
                        Write a review
                      </button>
                      <span class="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs">★★★★★</span>
                      <span class="text-sm text-gray-600">{product().reviews.length} reviews</span>
                    </div>

                    <Show when={!loader()} fallback={"Loading..."}>
                      {product().reviews.map((review) => (
                        <div class="border-b py-4">
                          <h4 class="font-semibold">
                            {""}- <span class="text-yellow-500">{new Array(review.overal_rating).fill("★").join("")}</span>
                          </h4>
                          <p class="text-sm text-gray-600">{review.description}</p>
                          <p class="text-sm text-gray-600">Size: {review.size_you_normally_wear}</p>
                        </div>
                      ))}
                    </Show>
                  </div>
                </Match>
              </Switch>
            </div>

            {/* Shipping Info */}
            <div class="border-t pt-6">
              <h3 class="mb-2 font-semibold">Shipping</h3>
              <p>Please allow 1-2 weeks for shipping.</p>
              <p class="text-sm text-gray-600">You'll see our shipping options at checkout.</p>
            </div>

            {/* Store Pickup */}
            <div class="border-t pt-6">
              <h3 class="mb-2 font-semibold">Free Pickup</h3>
              <button class="text-sm underline">Mon-Thurs 5pm to 9pm or Sat-Sunday 10am to 6pm</button>
              <div>
                Select local pickup at checkout to pick up your order at our store
              </div>
            </div>
          </div>
        </div>
      </div>
      <ItemAdded />
      <ReviewModal product={product()} setProduct={setProduct} />
    </SharedComponent>
  );
}
