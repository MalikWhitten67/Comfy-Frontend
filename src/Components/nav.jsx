'use client'

import { A, Match, Switch, useEffect, useState  } from "vaderjs"
import Cart from "../Sdk"
import api from "../api"
import Search from "./Search"
export default function Navbar() {
  if (typeof window === 'undefined') {
    globalThis.window['items'] = []
  }
  const [isScrolled, setIsScrolled] = useState(false) 
  const [newItemAdded, setNewItemAdded] = useState(false)
  const cart = new Cart() 
  const [cartItems, setCartItems] = useState(cart.items.length || 0)
   
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    cart.onEvent('itemAdded', (data, list) => {
      setCartItems(list.length)
      setNewItemAdded(true)
      setTimeout(() => setNewItemAdded(false), 2000)
    })

    cart.onEvent('itemRemoved', (data, list) => {
      setCartItems(list.length)
    })
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  console.log(api.authStore.isValid)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-base-200 px-4 py-2 text-sm">
        <div className="flex items-center justify-end gap-4">
          <a href="#" className="hover:underline">Help</a>
          <span>|</span>
          {
            api.authStore.isValid ?  <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className=" m-1">My Account</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><a>Profile</a></li>
              <li><a href="/member/orders">Your Orders</a></li>
              <li><a href="/member/settings">Account Settings</a></li>
              <li><a onClick={() => {
                api.authStore.clear()
                window.location.href = '/'
              }}>Sign Out</a></li>
            </ul>
          </div> : <a href="/auth/login">Login</a>
          }
           
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`${isScrolled
        ? "mx-4 my-2 rounded-full bg-base-100/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-base-100/60"
        : "bg-base-100"
        } transition-all duration-200`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <A href="/" className="text-2xl shrikhand-regular font-bold">
              COMFY
            </A>
            <nav className="hidden md:ml-8 md:flex md:gap-4 lg:gap-6">
              <A href="#" className="text-sm font-medium hover:text-primary">
                New
              </A>
              <A href="#" className="text-sm font-medium hover:text-primary">
                Upcoming Drops
              </A>
            </nav>
          </div>

          <div className="flex items-center lg:gap-4 ">
             
            <button className="btn btn-ghost btn-circle" onClick={() => window.location.href = "/favorites"}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>

            </button>
            <div className="relative">
              <button className="btn btn-ghost btn-circle" onClick={() => window.location.href = "/cart"}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>

                <span className="absolute  -top-1 -right-0  text-xs text-black rounded-full  "> {cartItems} </span>

              </button>

            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
