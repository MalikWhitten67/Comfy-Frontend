import { createSignal } from "solid-js";
import api from "../api";

export default function ReviewModal(props) {
  const product = props.product;

  const [rating, setRating] = createSignal(0);
  const [reviewTitle, setReviewTitle] = createSignal("");
  const [reviewText, setReviewText] = createSignal("");
  const [productFit, setProductFit] = createSignal("");
  const [comfort, setComfort] = createSignal("");
  const [recommend, setRecommend] = createSignal("");
  const [productSize, setProductSize] = createSignal("");
  const [termsAccepted, setTermsAccepted] = createSignal(false);

  async function subMitReview() {
    try {
      const alreadyReviewed = await api
        .collection("Reviews")
        .getFirstListItem(
          `author="${api.authStore.record.id}" && product="${product.id}"`
        );

      if (alreadyReviewed?.items?.length > 0) {
        alert("You have already reviewed this product");
        return;
      }

      const review = {
        title: reviewTitle(),
        description: reviewText(),
        how_does_it_fit: productFit(),
        overal_rating: rating(),
        product: product.id,
        would_you_recommend: recommend(),
        author: api.authStore.record.id,
        size_you_normally_wear: productSize(),
      };

      const res = await api.collection("Reviews").create(review);
      console.log(res);
      alert("Review submitted successfully");
      closeModal();
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review");
    }
  }

  function resetForm() {
    setRating(0);
    setReviewTitle("");
    setReviewText("");
    setProductFit("");
    setComfort("");
    setRecommend("");
    setProductSize("");
    setTermsAccepted(false);
  }

  function closeModal() {
    resetForm();
    const dialog = document.getElementById("reviewProduct");
    if (dialog) dialog.close();
  }

  return (
    <dialog id="reviewProduct" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box max-w-2xl">
        {/* Close Button */}
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>

        {/* Header */}
        <div class="text-center mb-6">
          <h3 class="font-semibold text-lg">Write a Review</h3>
          <p class="text-sm text-gray-500">
            Share your thoughts with the community
          </p>
        </div>

        {/* Product Info */}
        <div class="flex items-center gap-4 mb-6">
          <img
            src={product.mainImage}
            alt="Product"
            class="w-16 h-16 object-cover rounded"
          />
          <div>
            <h4 class="font-medium">{product.name}</h4>
          </div>
        </div>

        {/* Rating */}
        <div class="mb-6">
          <label class="block text-sm mb-2">Overall rating *</label>
          <div class="rating rating-lg">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                type="radio"
                name="rating"
                class="mask mask-star-2 bg-yellow-300"
                checked={rating() === star}
                onChange={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        {/* Review Title */}
        <div class="mb-6">
          <label class="block text-sm mb-2">Review title *</label>
          <input
            type="text"
            class="input input-bordered w-full"
            value={reviewTitle()}
            onInput={(e) => setReviewTitle(e.currentTarget.value)}
          />
        </div>

        {/* Review Text */}
        <div class="mb-6">
          <label class="block text-sm mb-2">Your Review *</label>
          <textarea
            class="textarea textarea-bordered w-full h-32"
            value={reviewText()}
            onInput={(e) => setReviewText(e.currentTarget.value)}
            placeholder="What did you like or dislike? What did you use this product for?"
          ></textarea>
        </div>

        {/* Product Fit */}
        <div class="mb-6">
          <label class="block text-sm mb-2">
            How did this product fit? *
          </label>
          <div class="flex lg:flex-row flex-col gap-4">
            {["Runs Small", "True to Size", "Runs Big"].map((fit) => (
              <label class="flex items-center gap-2">
                <input
                  type="radio"
                  name="fit"
                  class="radio"
                  checked={productFit() === fit}
                  onChange={() => setProductFit(fit)}
                />
                <span>{fit}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Comfort Level */}
        <div class="mb-6">
          <label class="block text-sm mb-2">
            How comfortable was this product? *
          </label>
          <div class="flex lg:flex-row flex-col gap-4">
            {["Uncomfortable", "Average", "Very Comfortable"].map((level) => (
              <label class="flex items-center gap-2">
                <input
                  type="radio"
                  name="comfort"
                  class="radio"
                  checked={comfort() === level}
                  onChange={() => setComfort(level)}
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div class="mb-6">
          <label class="block text-sm mb-2">
            Would you recommend this product? *
          </label>
          <div class="flex gap-4">
            {["Yes", "No"].map((option) => (
              <label class="flex items-center gap-2">
                <input
                  type="radio"
                  name="recommend"
                  class="radio"
                  checked={recommend() === option}
                  onChange={() => setRecommend(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Extra Details */}
        <div class="mb-6">
          <h4 class="font-medium mb-4">Share a few more details</h4>
          <p class="text-xs text-gray-500 mb-4">
            This can help others find relevant reviews.
          </p>

          <div class="grid gap-4">
            <div>
              <label class="block text-sm mb-2">Size you normally wear</label>
              <select
                class="select select-bordered w-full"
                value={productSize()}
                onChange={(e) => setProductSize(e.currentTarget.value)}
              >
                <option disabled selected>
                  Select one
                </option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div class="mb-6">
          <label class="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              class="checkbox mt-1"
              checked={termsAccepted()}
              onChange={(e) => setTermsAccepted(e.currentTarget.checked)}
            />
            <span class="text-xs">
              By submitting a review, you agree to our{" "}
              <a href="#" class="text-blue-600">
                Terms & Conditions
              </a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          class="btn btn-primary w-full"
          onClick={subMitReview}
          disabled={!termsAccepted()}
        >
          Submit Review
        </button>
      </div>

      <div class="modal-backdrop bg-black/60" onClick={closeModal}></div>
    </dialog>
  );
}
