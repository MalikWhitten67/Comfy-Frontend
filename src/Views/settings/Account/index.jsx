import { createSignal, onMount } from "solid-js";
import api from "../../../api";

export default function AccountDetails(props) {
  const [newFormData, setNewFormData] = createSignal({});
  const [user, setUser] = createSignal({});

  onMount(() => {
    // Load user info from API auth store once
    setUser(api.authStore.record || {});
  });

  function submitForm(e) {
    e.preventDefault();
    props.setFormData({ ...props.formData, ...newFormData() });
  }

  return (
    <main class="flex-1 p-4 sm:p-6 xl:p-8">
      <h2 class="text-2xl font-semibold mb-8">Account Details</h2>

      <form class="max-w-2xl space-y-8" onSubmit={submitForm}>
        <div class="space-y-6">
          {/* Email */}
          <div>
            <label class="block text-sm mb-2">Email*</label>
            <input
              type="email"
              value={user().email || ""}
              onInput={(e) =>
                setNewFormData({ ...newFormData(), email: e.currentTarget.value })
              }
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Passwords */}
          <div>
            <label class="block text-sm mb-2">Password</label>
            <div class="flex flex-col gap-2">
              <input
                type="password"
                placeholder="Old Password"
                onInput={(e) =>
                  setNewFormData({
                    ...newFormData(),
                    oldPassword: e.currentTarget.value,
                  })
                }
                class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <input
                type="password"
                placeholder="New Password"
                onInput={(e) =>
                  setNewFormData({
                    ...newFormData(),
                    password: e.currentTarget.value,
                  })
                }
                class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label class="block text-sm mb-2">Phone Number</label>
            <input
              type="tel"
              value={user().phone || ""}
              onInput={(e) =>
                setNewFormData({
                  ...newFormData(),
                  phone: e.currentTarget.value,
                })
              }
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label class="block text-sm mb-2">Date of Birth*</label>
            <input
              type="date"
              value={
                props.formData.dateOfBirth
                  ? new Date(props.formData.dateOfBirth)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onInput={(e) =>
                setNewFormData({
                  ...newFormData(),
                  dateOfBirth: e.currentTarget.value,
                })
              }
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-3 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
