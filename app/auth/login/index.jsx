import { createSignal, createEffect, onMount } from "solid-js";
import api from "../../../src/api";
export default function AuthFlow() {
  const [step, setStep] = createSignal("email");
  const [forgotPassword, setForgotPassword] = createSignal(false);
  const [userData, setUserData] = createSignal({
    emailVisibility: true,
    addresses: [],
  });
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  let passwordInputRef;

  // Check if user exists
  const checkUserExists = async (email) => {
    setLoading(true);
    try {
      const u = await api.collection("users").getList(1, 1, {
        filter: `email="${email}"`,
      });
      setLoading(false);
      return u.items.length > 0;
    } catch (err) {
      console.log(err);
      setLoading(false);
      return false;
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (forgotPassword()) {
      try {
        await api.collection("users").requestPasswordReset(userData().email);
        setStep("reset");
      } catch (err) {
        alert("Error resetting password:", err);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const exists = await checkUserExists(userData().email);
        setStep(exists ? "login" : "signup");
      } catch (err) {
        console.error("Error checking user:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.collection("users").authWithPassword(
        userData().email,
        userData().password
      );
      window.location.href = "/";
    } catch (err) {
      setError("Password is incorrect");
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.collection("users").create(userData());
      await api
        .collection("users")
        .authWithPassword(userData().email, userData().password);
      window.location.href = "/";
    } catch (err) {
      alert("Error signing up:", err);
      setLoading(false);
    }
  };

  // Handle refocus on error
  createEffect(() => {
    if (error()) {
      setTimeout(() => {
        setError("");
        passwordInputRef?.focus();
      }, 3000);
    }
  });

  return (
    <div class="min-h-screen bg-white">
      <div class="mx-auto max-w-md px-4 py-8">
        {/* Logo */}
        <div class="mb-8 flex justify-center gap-2 shrikhand-regular text-xl">
          Comfy
        </div>

        <div class="space-y-6">
          <div class="text-center">
            <h1 class="text-2xl font-medium">
              {forgotPassword()
                ? "Enter your email to reset your password"
                : step() === "email" || step() === "login"
                ? "Welcome back! Enter your email to continue."
                : "Create an account"}
            </h1>
          </div>

          {/* Country Selector */}
          {!forgotPassword() && (
            <div class="flex items-center justify-between">
              <span>Country</span>
              <select
                class="text-gray-500"
                onChange={(e) =>
                  setUserData({ ...userData(), country: e.target.value })
                }
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          )}

          {step() === "reset" && (
            <p class="text-center text-sm text-gray-500">
              We have sent you an email with instructions to reset your
              password. The link was sent to {userData().email}.
            </p>
          )}

          {/* Step: Email */}
          {step() === "email" && (
            <form onSubmit={handleEmailSubmit} class="space-y-4">
              <div>
                <label for="email" class="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autocomplete="email"
                  required
                  placeholder="Email"
                  value={userData().email || ""}
                  onInput={(e) =>
                    setUserData({ ...userData(), email: e.target.value })
                  }
                  class="w-full border-b border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
              <button
                type="submit"
                class="w-full rounded-full bg-black py-3 text-white hover:bg-gray-800 transition-colors"
              >
                {loading() && !forgotPassword()
                  ? "Checking..."
                  : forgotPassword() && loading()
                  ? "Sending email..."
                  : "Continue"}
              </button>
            </form>
          )}

          {/* Step: Login */}
          {step() === "login" && (
            <form onSubmit={handleLoginSubmit} class="space-y-4">
              <div>
                <label for="password">
                  {error().length > 0 ? error() : "Password"}
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  ref={passwordInputRef}
                  autocomplete="current-password"
                  placeholder="Password"
                  value={userData().password || ""}
                  onInput={(e) =>
                    setUserData({ ...userData(), password: e.target.value })
                  }
                  class={
                    "w-full border-b border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0" +
                    (error().length > 0 ? " border-red-500" : "")
                  }
                />
              </div>
              <button
                type="submit"
                class="w-full rounded-full bg-black py-3 text-white hover:bg-gray-800"
              >
                {loading() ? "Logging in..." : "Log In"}
              </button>
            </form>
          )}

          {/* Step: Signup */}
          {step() === "signup" && (
            <form onSubmit={handleSignupSubmit} class="space-y-4">
              <div>
                <input
                  type="text"
                  id="username"
                  required
                  placeholder="Username"
                  value={userData().username || ""}
                  onInput={(e) =>
                    setUserData({ ...userData(), username: e.target.value })
                  }
                  class="w-full border-b border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>

              <div>
                <input
                  type="date"
                  id="dob"
                  required
                  value={userData().dob || ""}
                  onInput={(e) =>
                    setUserData({ ...userData(), dob: e.target.value })
                  }
                  class="w-full border-b border-gray-300 px-0 py-2 text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>

              <div>
                <input
                  type="password"
                  id="signup-password"
                  required
                  placeholder="Password"
                  value={userData().password || ""}
                  onInput={(e) =>
                    setUserData({ ...userData(), password: e.target.value })
                  }
                  class="w-full border-b border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>

              <div>
                <input
                  type="password"
                  id="confirm-password"
                  required
                  placeholder="Confirm Password"
                  value={userData().passwordConfirm || ""}
                  onInput={(e) =>
                    setUserData({
                      ...userData(),
                      passwordConfirm: e.target.value,
                    })
                  }
                  class="w-full border-b border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>

              <button
                type="submit"
                class="w-full rounded-full bg-black py-3 text-white hover:bg-gray-800"
              >
                Sign Up
              </button>
            </form>
          )}

          <div className="justify-between flex gap-5">
             {!forgotPassword() && (
            <button
              class="text-center text-sm text-gray-500 hover:underline"
              onClick={() => {
                setStep("email");
                setForgotPassword(!forgotPassword());
              }}
            >
              Forgot your password?
            </button>
          )}
          
          <a href="/auth/register" class="text-center text-sm text-gray-500 hover:underline">
            Don't have an account? Sign Up
          </a> 

          </div>

          <p class="text-center text-sm text-gray-500">
            By continuing, I agree to Comfy’s{" "}
            <button class="underline">Privacy Policy</button> and{" "}
            <button class="underline">Terms of Use</button>.
          </p>
        </div>
      </div>
    </div>
  );
}
