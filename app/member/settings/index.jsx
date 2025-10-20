import { createSignal, createEffect, onMount, Switch, Match } from "solid-js";
import SharedComponent from "../../../src/Components/SharedComponent";
import Account from "../../../src/Views/settings/Account";
import DeliveryAddress from "../../../src/Views/settings/DeliveryAddress";
import api from "../../../src/api";

function Modal(props) {
  let dialogRef;

  const closeModal = () => dialogRef?.close();

  onMount(() => {
    // ✅ Only show modal automatically on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) dialogRef?.showModal();
  });

  return (
    <dialog
      ref={dialogRef}
      id="showModal"
      class="modal modal-bottom sm:modal-middle backdrop:bg-black/60 z-[999]"
    >
      <div class="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={closeModal}
          class="absolute right-4 top-4 rounded-full text-1xl p-1 hover:bg-gray-100 cursor-pointer"
          aria-label="Close modal"
        >
          ×
        </button>
        {props.children}
      </div>
    </dialog>
  );
}

export default function SettingsPage() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const [activeTab, setActiveTab] = createSignal(isMobile ? "" : "account");
  const [formData, setFormData] = createSignal({
    phone: api.authStore.record?.phone || "",
    dateOfBirth: api.authStore.record?.dob || null,
    addresses: api.authStore.record?.addresses || [],
  });

  onMount(() => {
    if (!api.authStore.isValid) {
      window.location.href = "/auth/login";
    }
  });

  // Debounced updates
  let timeout;
  createEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      await api.collection("users").update(api.authStore.record.id, formData());
      await api.collection("users").authRefresh();
      const modal = document.getElementById("showModal");
      modal?.close();
      setActiveTab("");
    }, 1000);
  }, [formData]);

  const sidebarItems = [
    { id: "account", label: "Account Details", icon: "👤" },
    { id: "addresses", label: "Delivery Addresses", icon: "📍" },
    { id: "payment", label: "Payment Methods", icon: "💳" },
    { id: "preferences", label: "Shop Preferences", icon: "🛍️" },
    { id: "communication", label: "Communication Preferences", icon: "💬" },
    { id: "visibility", label: "Profile Visibility", icon: "👀" },
    { id: "linked", label: "Linked Accounts", icon: "🔗" },
  ];

  return (
    <SharedComponent title="Settings">
      <div class="flex min-h-screen xl:p-12 lg:p-12 p-2 bg-white relative z-10">
        {/* Sidebar */}
        <div class="xl:w-[25rem] lg:w-[25rem] w-full border-r min-h-screen xl:p-6">
          <h1 class="text-xl font-semibold mb-6">Settings</h1>
          <nav class="space-y-1 mr-2">
            {sidebarItems.map((item) => (
              <button
                type="button"
                class={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  activeTab() === item.id ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span>{item.icon}</span>
                <span class="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Desktop View */}
        <div class="xl:block lg:block lg:mx-12 hidden w-full">
          <Switch>
            <Match when={activeTab() === "account" && !isMobile}>
              <Account formData={formData()} setFormData={setFormData} />
            </Match>
            <Match when={activeTab() === "addresses" && !isMobile}>
              <DeliveryAddress formData={formData()} setFormData={setFormData} />
            </Match>
          </Switch>
        </div>
      </div>

      {/* Mobile View */}
      <div class="xl:hidden lg:hidden block w-full">
        <Switch>
          <Match when={activeTab() === "account"}>
            <Modal>
              <Account formData={formData()} setFormData={setFormData} />
            </Modal>
          </Match>
          <Match when={activeTab() === "addresses"}>
            <Modal>
              <DeliveryAddress formData={formData()} setFormData={setFormData} />
            </Modal>
          </Match>
        </Switch>
      </div>
    </SharedComponent>
  );
}
