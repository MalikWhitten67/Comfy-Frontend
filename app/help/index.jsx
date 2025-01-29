"use client"

import { Match, Switch, useRef, useState } from "vaderjs"
import SharedComponent from "../../src/Components/SharedComponent"
import { helpArticles, categories } from "../../src/searchdata"
import api from "../../src/api"

export default function HelpPage() {
  if (isServer) return <div></div>
  const help = new URLSearchParams(window.location.search).get("q") 
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
   if(help) {
    try { 
      var article = helpArticles.find((c)=> { 
        return   c.id == parseInt(help)
      }) 
      setSearchQuery(article.title)
      handleSearch(article.action)
    } catch (error) {
      console.log("Could not find help", error)
    }
   }
  }, [])
  const handleSearch = async (query) => {
    setLoading(true)
    setSearchQuery(query)
    setIsSearching(!!query)

    if (query.trim() === "") {
      setSearchResults([])
      return
    }

    const results = await api.collection("help").getFullList({
      batch: Number.MAX_SAFE_INTEGER,
      filter: `action~"${query}"`
    })
    setLoading(false)
    setSearchResults(results)
  }
 

  return (
    <SharedComponent title="Comfy Customer Service" description="Get help with Comfy customer service">
      <div className="mx-auto max-w-5xl w-full px-4 py-8">
        <h1 className="font-extrabold text-3xl text-center mb-8">GET HELP</h1>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            placeholder="What can we help you with?"
            className="w-full pl-10 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Search Results */}
        {isSearching ? (
          <div className="space-y-4">
            {searchQuery && (
              <h2 className="text-lg flex justify-center font-medium mb-4">
                {loading ?
                  <div role="status items-center mx-auto justify-center text-center flex">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                  : `Search results for "${searchQuery}" (${searchResults.length} results)`}
              </h2>
            )}
            {searchResults.map((result) => (
              <div key={result.id} className="bg-white shadow rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                <p className="text-gray-600" setUnsafeHtml={result.information}></p>
              </div>
            ))}

          </div>
        ) : (
          /* Quick Assists Categories */
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.title} className="bg-white shadow rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item.id || item}>
                      <button className="w-full text-left px-2 py-1.5 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => {
                          setSearchQuery(item.title || item)
                          handleSearch(item.action || item)
                        }}
                      >
                        {item.title || item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Contact Options */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <button className="flex flex-col items-center gap-2 p-6 bg-white shadow rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <div className="flex flex-col text-center">
              <span className="font-semibold">Chat with us</span>
              <span className="text-sm text-gray-600">Products & Orders: 2:30pm - 8:30pm (CT)</span>
              <span className="text-sm text-gray-600">7 days a week</span>
            </div>
          </button>

          <button className="flex flex-col items-center gap-2 p-6 bg-white shadow rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <div className="flex flex-col text-center">
              <span className="font-semibold">Call us</span>
              <span className="text-sm text-gray-600">314-847-7409</span>
              <span className="text-sm text-gray-600">2:30pm - 8:30pm (CT), 7 days a week</span>
            </div>
          </button>

          <button className="flex flex-col items-center gap-2 p-6 bg-white shadow rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="flex flex-col text-center">
              <span className="font-semibold">Find a Store</span>
              <span className="text-sm text-gray-600">Contact to schedule an inperson visit</span>
            </div>
          </button>
        </div>
      </div>
    </SharedComponent>
  )
}
