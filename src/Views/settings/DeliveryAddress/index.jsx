import { createSignal, Show, For } from "solid-js";
import api from "../../../api";
export default function AddressForm(props) {
  const [showEdit, setShowEdit] = createSignal(false);
  const [address, setAddress] = createSignal({});
  const [isUpdate, setIsUpdate] = createSignal(false);

  const userAddresses = () => api.authStore.record?.addresses || [];

  const states = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  };

  function submitAddress(e) {
    e.preventDefault();
    if (isUpdate()) {
      props.setFormData({
        ...props.formData,
        addresses: props.formData.addresses.map((item) =>
          item.street === address().street ? address() : item
        ),
      });
    } else {
      props.setFormData({
        ...props.formData,
        addresses: [...(props.formData.addresses || []), address()],
      });
    }

    setShowEdit(false);
    setAddress({});
    setIsUpdate(false);
  }

  return (
    <main class="flex-1 p-4 sm:p-6 xl:p-8">
      <h2 class="text-2xl font-semibold mb-8">Delivery Address</h2>

      {/* Address Form */}
      <Show when={showEdit()}>
        <form class="max-w-2xl space-y-8" onSubmit={submitAddress}>
          <div class="space-y-6">
            {/* Address */}
            <div>
              <label class="block text-sm mb-2">Address*</label>
              <input
                type="text"
                placeholder="123 Main St"
                required
                value={address().street || ""}
                onInput={(e) =>
                  setAddress({ ...address(), street: e.currentTarget.value })
                }
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* City */}
            <div>
              <label class="block text-sm mb-2">City*</label>
              <input
                type="text"
                required
                value={address().city || ""}
                placeholder="Los Angeles"
                onInput={(e) =>
                  setAddress({ ...address(), city: e.currentTarget.value })
                }
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* State */}
            <div>
              <label class="block text-sm mb-2">State*</label>
              <select
                required
                value={address().state || ""}
                onInput={(e) =>
                  setAddress({ ...address(), state: e.currentTarget.value })
                }
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="" disabled>
                  Select state
                </option>
                <For each={Object.entries(states)}>
                  {([abbr, name]) => (
                    <option value={abbr}>{name}</option>
                  )}
                </For>
              </select>
            </div>

            {/* Zip Code */}
            <div>
              <label class="block text-sm mb-2">Zip Code*</label>
              <input
                type="text"
                required
                placeholder="90001"
                value={address().zip || ""}
                onInput={(e) =>
                  setAddress({ ...address(), zip: e.currentTarget.value })
                }
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Country */}
            <div>
              <label class="block text-sm mb-2">Country*</label>
              <select
                required
                value={address().country || "US"}
                onInput={(e) =>
                  setAddress({ ...address(), country: e.currentTarget.value })
                }
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="US">United States</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                class="btn w-full text-sm border rounded-lg hover:bg-gray-50 py-2"
              >
                {isUpdate() ? "Update Address" : "Add Address"}
              </button>
            </div>
          </div>
        </form>
      </Show>

      {/* Existing Addresses */}
      <Show when={!showEdit()}>
        <Show
          when={userAddresses().length > 0}
          fallback={<p class="text-center">No Address Added</p>}
        >
          <div class="grid grid-cols-1 gap-4">
            <For each={userAddresses()}>
              {(addr) => (
                <div
                  class="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => {
                    setIsUpdate(true);
                    setAddress(addr);
                    setShowEdit(true);
                  }}
                >
                  <h3 class="text-lg font-semibold">{addr.street}</h3>
                  <p>
                    {addr.city}, {addr.state}, {addr.zip}
                  </p>
                  <p>{addr.country}</p>
                </div>
              )}
            </For>
          </div>
        </Show>

        <button
          onClick={() => setShowEdit(true)}
          class="btn w-full mt-5 text-sm border rounded-lg hover:bg-gray-50 py-2"
        >
          Add Address
        </button>
      </Show>
    </main>
  );
}
