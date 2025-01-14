'use client'
 
import { useState } from 'vaderjs' 
import api from '../api'
export default function ReviewModal({ product }) {
  const [rating, setRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [productFit, setProductFit] = useState('')
  const [comfort, setComfort] = useState('')
  const [recommend, setRecommend] = useState('')
  const [productSize, setProductSize] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false) 

  async function subMitReview() {
    

    let alreadyReviewed = await api.collection("Reviews").getFirstListItem(`author="${api.authStore.record.id}" && product="${product.id}"`)
    console.log(alreadyReviewed)
    if (alreadyReviewed.items.length > 0) {
      alert("You have already reviewed this product")
      return
    }
    let review = {
        "title":  reviewTitle,
        "description": reviewText,
        "how_does_it_fit":  productFit,
        "overal_rating":  rating,
        "product":  product.id,
        "would_you_recommend": recommend,
        "author":  api.authStore.record.id,
        "size_you_normally_wear":  productSize,
    }

    let res = await api.collection("Reviews").create(review)
    console.log(res)
    alert("Review submitted successfully")
    document.getElementById('reviewProduct').close()
   
   }

      
  return (
    <dialog id="reviewProduct" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-2xl">
        {/* Close Button */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
           X
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="font-semibold text-lg">Write a Review</h3>
          <p className="text-sm text-gray-500">Share your thoughts with the community</p>
        </div>

        {/* Product Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={product.mainImage}
            alt="Product"
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            <h4 className="font-medium">{product.name}</h4>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Overall rating *</label>
          <div className="rating rating-lg">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-yellow-300"
                checked={rating === star}
                onChange={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        {/* Review Title */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Review title *</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
        </div>

        {/* Review Text */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Your Review *</label>
          <textarea
            className="textarea textarea-bordered w-full h-32"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="What did you like or dislike? What did you use this product for?"
          ></textarea>
        </div>

        {/* Product Fit */}
        <div className="mb-6">
          <label className="block text-sm mb-2">How did this product fit? *</label>
          <div className="flex lg:flex-row flex-col gap-4">
            {['Runs Small', 'True to Size', 'Runs Big'].map((fit) => (
              <label key={fit} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fit"
                  className="radio"
                  checked={productFit === fit}
                  onChange={() => setProductFit(fit)}
                />
                <span>{fit}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Comfort Level */}
        <div className="mb-6">
          <label className="block text-sm mb-2">How comfortable was this product? *</label>
          <div className="flex lg:flex-row flex-col gap-4">
            {['Uncomfortable', 'Average', 'Very Comfortable'].map((level) => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="comfort"
                  className="radio"
                  checked={comfort === level}
                  onChange={() => setComfort(level)}
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Would you recommend this product? *</label>
          <div className="flex gap-4">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="recommend"
                  className="radio"
                  checked={recommend === option}
                  onChange={() => setRecommend(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div> 
        <div className="mb-6">
          <h4 className="font-medium mb-4">Share a few more details</h4>
          <p className="text-xs text-gray-500 mb-4">This can help others find relevant reviews.</p>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-sm mb-2">Size you normally wear</label>
              <select className="select select-bordered w-full" value={product.size} onChange={(e) => setProductSize(e.target.value)}>
                <option disabled selected>Select one</option>
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
        <div className="mb-6">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox mt-1"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span className="text-xs">
              By submitting a review, you agree to our <a href="#" className="text-blue-600">Terms & Conditions</a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary w-full" onClick={() => subMitReview()}>
            Submit Review
        </button>
      </div>
      <div className="modal-backdrop bg-black/60">
        <button>close</button>
      </div>
    </dialog>
  )
}

