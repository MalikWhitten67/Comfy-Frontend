import Products from '../Products'

import { useState, useEffect } from 'vaderjs'

export default function AnimatedSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  let [categories, setCategories] = useState([])

  // Simulate search results
  useEffect(() => {
    if (searchTerm) { 
        let results = Products.items.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())) 
        setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])
 

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main search input */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${isFocused 
          ? 'fixed top-0 left-0 w-full h-screen bg-white z-50' 
          : 'relative'
        }
      `}>
        <div className={`
          relative mx-auto
          ${isFocused 
            ? 'max-w-2xl px-4 pt-4' 
            : ''
          }
        `}>
          <div className="relative lg:mx-0 mx-5">
            <input
              type="text"
              value={searchTerm}
              onInput={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search"
              className="w-full  pl-10 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-gray-200"
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            {isFocused && (
              <button
                onClick={() => {
                  setIsFocused(false)
                  setSearchTerm('')
                }}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Search results */}
          {isFocused && (
            <div className="mt-4">
              <div className="text-sm text-gray-500 px-2">Popular Search Terms</div>
              <div className="mt-2 flex flex-wrap gap-2 px-2">
                {['Rev v1 one of one t', 'Revision 2 one of one acid t'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
              
              {searchResults.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm text-gray-500 px-2">Results</div>
                  <div className="mt-2">
                    {searchResults.map((result, index) => (
                      <div key={index} className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setIsFocused(false)
                        setSearchTerm('')
                        window.location.href = `/products/${result.id}`
                      }}
                      >
                        <img src={result.mainImage} alt={result.name} className="w-10 h-10 object-cover rounded-lg" />
                        <div>
                          <div className="text-sm font-semibold">{result.name}</div>
                          <div className="text-xs text-gray-500">{result.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {
                searchResults.length === 0 && searchTerm.length > 0 && (
                  <div className="mt-4 text-center text-gray-500">No results found</div>
                )
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

