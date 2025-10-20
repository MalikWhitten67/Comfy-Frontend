import { createSignal, createResource, Show, For, onMount } from "solid-js"; 
import api from "../../../src/api";
import SharedComponent from "../../../src/Components/SharedComponent";
export default function OrdersPage() {
  const [loading, setLoading] = createSignal(true);
  const [orders, setOrders] = createSignal([]);

  // ✅ Redirect unauthenticated users
  onMount(() => {
    if (!api.authStore?.isValid) {
      window.location.href = "/auth/login";
      return;
    }
  });

  // ✅ Load orders efficiently
  const fetchOrders = async () => {
    try {
      const data = await api.collection("orders").getFullList({
        batch: Number.MAX_SAFE_INTEGER,
        filter: `for="${api.authStore.record.id}"`,
      });
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  onMount(fetchOrders);

  return (
    <SharedComponent title="Comfy - Member Orders"> 
      <div class="flex flex-col items-center mx-auto mt-10 max-w-3xl px-4">
        <h1 class="text-2xl font-bold mb-6">Your Orders</h1>

        <Show when={loading()}>
          <div class="flex justify-center py-12">
            <span class="animate-spin h-8 w-8 border-4 border-gray-300 border-t-black rounded-full"></span>
          </div>
        </Show>

        <Show when={!loading() && orders().length === 0}>
          <p class="text-gray-500 text-sm">No orders found.</p>
        </Show>

        <Show when={!loading() && orders().length > 0}>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <For each={orders()}>
              {(order) => (
                <div class="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition">
                  <h2 class="font-semibold text-lg mb-2">
                    Order #{order.id}
                  </h2>
                  <p class="text-sm text-gray-600 mb-1">
                    Total: <strong>${(order.total / 100).toFixed(2)}</strong>
                  </p>
                  <p class="text-sm text-gray-600 mb-1">
                    Status:{" "}
                    <span
                      class={`${
                        order.status === "completed"
                          ? "text-green-600"
                          : order.status === "pending"
                          ? "text-yellow-600"
                          : "text-gray-500"
                      } font-medium`}
                    >
                      {order.status}
                    </span>
                  </p>

                  <Show when={order.estimatedDelivery}>
                    <p class="text-xs text-gray-500 mt-2">
                      Estimated Delivery: {order.estimatedDelivery}
                    </p>
                  </Show>

                  <Show when={order.products?.length}>
                    <div class="mt-3 border-t pt-2">
                      <p class="font-medium text-sm mb-1">Items:</p>
                      <For each={order.products.slice(0, 3)}>
                        {(item) => (
                          <div class="text-xs text-gray-600 truncate">
                            • {item.name} ({item.color || "N/A"},{" "}
                            {item.size || "N/A"})
                          </div>
                        )}
                      </For>
                      <Show when={order.products.length > 3}>
                        <span class="text-xs text-blue-500">
                          +{order.products.length - 3} more
                        </span>
                      </Show>
                    </div>
                  </Show>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </SharedComponent>
  );
}
