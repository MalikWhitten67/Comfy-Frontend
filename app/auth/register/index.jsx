import { createSignal } from "solid-js";
import api from "../../../src/api";

export default function RegisterPage() {
  const [userData, setUserData] = createSignal({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    dob: "",
    country: "United States",
    emailVisibility: true,
    addresses: [],
  });
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  // Check if user already exists
  const checkUserExists = async (email) => {
    try {
      const users = await api.collection("users").getList(1, 1, {
        filter: `email="${email}"`,
      });
      return users.items.length > 0;
    } catch (err) {
      console.error("Error checking user:", err);
      return false;
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = userData();

    // basic validations
    if (data.password !== data.passwordConfirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const exists = await checkUserExists(data.email);
    if (exists) {
      setError("An account with this email already exists");
      setLoading(false);
      return;
    }

    try {
      await api.collection("users").create(data);
      await api.collection("users").authWithPassword(data.email, data.password);
      window.location.href = "/";
    } catch (err) {
      console.error("Error signing up:", err);
      setError("Something went wrong creating your account");
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-white">
      <div class="mx-auto max-w-md px-4 py-10">
        <div class="mb-8 flex justify-center shrikhand-regular text-2xl">
          Comfy
        </div>

        <h1 class="text-2xl font-medium mb-6 text-center">Create your account</h1>

        {error() && (
          <p class="text-center text-sm text-red-600 mb-4">{error()}</p>
        )}

        <form onSubmit={handleSignupSubmit} class="space-y-5">
          <div>
            <input
              type="text"
              required
              placeholder="Name"
              value={userData().name}
              onInput={(e) =>
                setUserData({ ...userData(), name: e.target.value })
              }
              class="w-full border-b border-gray-300 py-2 placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="email"
              required
              placeholder="Email"
              value={userData().email}
              onInput={(e) =>
                setUserData({ ...userData(), email: e.target.value })
              }
              class="w-full border-b border-gray-300 py-2 placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="date"
              required
              value={userData().dob}
              onInput={(e) =>
                setUserData({ ...userData(), dob: e.target.value })
              }
              class="w-full border-b border-gray-300 py-2 text-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              required
              placeholder="Password"
              value={userData().password}
              onInput={(e) =>
                setUserData({ ...userData(), password: e.target.value })
              }
              class="w-full border-b border-gray-300 py-2 placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={userData().passwordConfirm}
              onInput={(e) =>
                setUserData({ ...userData(), passwordConfirm: e.target.value })
              }
              class="w-full border-b border-gray-300 py-2 placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          <div class="flex items-center justify-between">
            <span>Country</span>
            <select
              class="text-gray-500 border-b border-gray-300 bg-transparent focus:outline-none"
              onChange={(e) =>
                setUserData({ ...userData(), country: e.target.value })
              }
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading()}
            class="w-full rounded-full bg-black py-3 text-white hover:bg-gray-800 transition-colors disabled:opacity-70"
          >
            {loading() ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          By continuing, I agree to Comfy’s{" "}
          <button class="underline">Privacy Policy</button> and{" "}
          <button class="underline">Terms of Use</button>.
        </p>
      </div>
    </div>
  );
}
