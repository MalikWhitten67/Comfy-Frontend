import { createSignal, createEffect, For, Show } from "solid-js";
import Cart from "../../src/Sdk/index.js";
import api from "../../src/api";
import Navbar from "../../src/nav.js";

const urls = {
  dev: "http://localhost:3000",
  prod: "https://comfy-backend-vert.vercel.app",
};

export default function Checkout() {
  const cart = new Cart();

  const [cartItems, setCartItems] = createSignal([...cart.items]);
  const [shippingPremium, setShippingPremium] = createSignal(false);
  const [localPickup, setLocalPickup] = createSignal(false);
  const [shippingCost, setShippingCost] = createSignal(5.99);
  const [estimatedDelivery, setEstimatedDelivery] = createSignal("7–10 Business Days");
  const [promoCode, setPromoCode] = createSignal("");
  const [promoDiscount, setPromoDiscount] = createSignal(0);
  const [total, setTotal] = createSignal(0);
  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    const subtotal = cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(subtotal + shippingCost() - promoDiscount());
  });

  function updateCart() {
    setCartItems([...cart.items]);
  }

  function handleShippingChange(option) {
    if (option === "local") {
      setLocalPickup(true);
      setShippingCost(0);
      setEstimatedDelivery("Ready in 1–2 Business Days");
    } else {
      setLocalPickup(false);
      setShippingPremium(option === "premium");
      const newCost = option === "premium" ? 10.99 : 5.99;
      setShippingCost(newCost);
      setEstimatedDelivery(option === "premium" ? "5–7 Business Days" : "7–10 Business Days");
    }
  }

  async function applyPromo() {
    if (!promoCode()) return;
    try {
      const res = await fetch(`${urls.prod}/validate-promo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode() }),
      });
      const data = await res.json();
      if (data.valid) {
        setPromoDiscount(data.amount);
        alert(`✅ Promo applied! You saved $${data.amount.toFixed(2)}`);
      } else {
        alert("❌ Invalid promo code.");
      }
    } catch (err) {
      console.error("Promo error:", err);
    }
  }

  async function createOrder() {
    if (!api.authStore.isValid) {
      window.location.href = "/auth/login";
      return;
    }

    setLoading(true);

    const { total: validatedTotal } = await fetch(`${urls.prod}/calculate-order-amount`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems() }),
    }).then((res) => res.json());

    if (!validatedTotal) return setLoading(false);
    setTotal(validatedTotal);

    const formattedItems = cartItems().map((item) => ({
      id: item.id,
      quantity: item.quantity,
      size: item.size,
      price: item.price,
      isPreOrder: item.isPreOrder,
      name: item.name,
      mainImage: item.mainImage,
      category: item.category,
      color: item.color,
    }));

    const order = {
      products: formattedItems,
      subtotal: 0,
      total: validatedTotal,
      shippingPremium: shippingPremium(),
      localPickup: localPickup(),
      shippingCost: shippingCost(),
      promoCode: promoCode(),
      promoDiscount: promoDiscount(),
      estimatedDelivery: estimatedDelivery(),
      owner: api.authStore.record.id,
      isPreOrder: formattedItems.some((item) => item.isPreOrder),
    };

    const { orderID } = await fetch(`${urls.prod}/createOrder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).then((res) => res.json());

    if (!orderID) return setLoading(false);

    const { checkoutID } = await fetch(`${urls.prod}/createCheckout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID }),
    }).then((res) => res.json());

    if (!checkoutID) return setLoading(false);

    await fetch(`${urls.prod}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: formattedItems,
        amount: validatedTotal,
        checkoutID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.url;
        cart.clear();
        updateCart();
      })
      .catch(console.error);

    setLoading(false);
  }

  function removeFromCart(itemId) {
    cart.removeItem(itemId);
    updateCart();
  }

  return (
    <div>
      <Navbar />
      <div class="p-6 max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Checkout</h1>

        {/* Cart Summary */}
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 class="font-semibold mb-2">Order Summary</h2>
          <Show when={cartItems().length > 0} fallback={<p>Your cart is empty.</p>}>
            <For each={cartItems()}>
              {(item) => (
                <div class="flex justify-between items-center border-b py-3">
                  <div class="flex items-center gap-3">
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      class="w-14 h-14 rounded object-cover"
                    />
                    <div class="flex flex-col">
                      <span class="font-medium">{item.name}</span>
                      <span class="text-sm text-gray-500">${item.price.toFixed(2)}</span>

                      {/* Color & Size */}
                      <div class="text-xs text-gray-600 mt-1">
                        <Show when={item.color}>
                          <span class="capitalize">Color: {item.color}</span>
                        </Show>
                        <Show when={item.size}>
                          <span class="ml-2 capitalize">Size: {item.size}</span>
                        </Show>
                      </div>
                    </div>
                  </div>

                  <button
                    class="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </For>

            <div class="flex justify-between mt-4">
              <span>Shipping:</span>
              <span>${shippingCost().toFixed(2)}</span>
            </div>

            <div class="flex justify-between mt-2 font-semibold text-lg">
              <span>Total:</span>
              <span>${total().toFixed(2)}</span>
            </div>
          </Show>
        </div>

        {/* Promo Code */}
        <div class="mb-6">
          <h2 class="font-semibold mb-3">Promo Code</h2>
          <div class="flex gap-2">
            <input
              type="text"
              value={promoCode()}
              onInput={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              class="border rounded-lg px-3 py-2 w-full"
            />
            <button class="bg-gray-900 text-white rounded-lg px-4 py-2" onClick={applyPromo}>
              Apply
            </button>
          </div>
        </div>

        {/* Shipping Options */}
        <div class="mb-6">
          <h2 class="font-semibold mb-3">Choose Shipping Method</h2>

          <label class="flex items-start gap-2 mb-2 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              checked={!shippingPremium() && !localPickup()}
              onChange={() => handleShippingChange("standard")}
            />
            <div>
              <span class="font-medium">Standard Shipping — $5.99</span>
              <p class="text-sm text-gray-500">Estimated: 7–10 Business Days</p>
            </div>
          </label>

          <label class="flex items-start gap-2 mb-2 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              checked={shippingPremium()}
              onChange={() => handleShippingChange("premium")}
            />
            <div>
              <span class="font-medium">Priority Shipping — $10.99</span>
              <p class="text-sm text-gray-500">Estimated: 5–7 Business Days</p>
            </div>
          </label>

          <label class="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              checked={localPickup()}
              onChange={() => handleShippingChange("local")}
            />
            <div>
              <span class="font-medium">Local Pickup — Free</span>
              <p class="text-sm text-gray-500">Estimated: 1–2 Business Days</p>
            </div>
          </label>
        </div>

        <div class="text-sm text-gray-700 mb-6">
          Estimated Delivery: <strong>{estimatedDelivery()}</strong>
        </div>

        <button
          onClick={createOrder}
          disabled={cartItems().length === 0 || loading()}
          class="w-full rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
        >
          {loading() ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
