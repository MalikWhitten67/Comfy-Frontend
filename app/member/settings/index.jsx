'use client'

import { useState, e, Switch, Match, useEffect } from 'vaderjs'
import Navbar from '../../../src/Components/nav'
import Account from '../../../src/Views/settings/Account'
import api from '../../../src/api'
import SharedComponent from '../../../src/Components/SharedComponent'
import DeliveryAddress from '../../../src/Views/settings/DeliveryAddress'

function Modal({children}){
    return (
        <dialog  
        id="showModal"
        className="modal  modal-bottom sm:modal-middle backdrop:bg-black/60"
      >
        <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
          {/* Close button */}
          <button 
            onClick={() => { 
                document.getElementById('showModal').close()
            }}
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
            aria-label="Close modal"
          >
            X
          </button>
  
           {children}
        </div>
      </dialog>
    )
}

export default function SettingsPage() {
    
    useEffect(() => {
        if (!api.authStore.isValid) {
            window.location.href = '/auth/login'
        }
    }, []) 
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const [activeTab, setActiveTab] = useState(isMobile === false  ? 'account' : '', false)
    const [formData, setFormData] = useState({
        email: api.authStore.record?.email || '',
        password: '••••••••••••',
        phone: api.authStore.record?.phone || '',
        dateOfBirth:  api.authStore.record?.dob || null, 
        addresses: api.authStore.record?.addresses || [], 
    }, false)

    const debounce = (func, wait) => {
        let timeout
        return function (...args) {
            const context = this
            console
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
                timeout = null
                func.apply(context, args)
            }, wait)
        }
    }

    useEffect(() => {
        console.log(formData)
        debounce(() => { 
            delete formData.password
            delete formData.email
            api.collection('users').update(api.authStore.record.id, formData)
            .then(() => {
                api.collection("users").authRefresh()
            })  
        }, 1000)()
    }, [formData])

    useEffect(() => {
        if(isMobile){
            document.getElementById('showModal').showModal()
        }
    }, [activeTab])

    const sidebarItems = [
        {
            id: 'account',
            label: 'Account Details',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            )
        },
        {
            id: 'payment',
            label: 'Payment Methods',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
            )
        },
        {
            id: 'addresses',
            label: 'Delivery Addresses',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            )
        },
        {
            id: 'preferences',
            label: 'Shop Preferences',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            )
        },
        {
            id: 'communication',
            label: 'Communication Preferences',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            )
        },
        {
            id: 'visibility',
            label: 'Profile Visibility',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
            )
        },
        {
            id: 'linked',
            label: 'Linked Accounts',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
            )
        }
    ]

    return (
         <SharedComponent title="Settings">
             <div className="flex min-h-screen xl:p-12 p-2 bg-white"> 
                    <div className="xl:w-64 w-full border-r min-h-screen xl:p-6
                     
                    ">
                        <h1 className="text-xl font-semibold mb-6">Settings</h1>
                        <nav className="space-y-1">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${activeTab === item.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {item.icon}
                                    <span className="text-sm font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div> 
                    <div className="xl:block hidden w-full">
                    <Switch>
                        <Match when={activeTab === 'account' && isMobile === false}>
                           <Account formData={formData} setFormData={setFormData} />
                        </Match>
                        <Match when={activeTab === 'addresses' && isMobile === false}>
                            <DeliveryAddress formData={formData} setFormData={setFormData} />
                        </Match>

                    </Switch>
                    </div>
                    
                </div>
                <div className="xl:hidden block w-full">
                        <Switch>
                            <Match when={activeTab === 'account'}>
                              <Modal>
                                <Account formData={formData} setFormData={setFormData} />
                              </Modal>
                            </Match>
                            <Match when={activeTab === 'addresses'}>
                                <Modal>
                                    <DeliveryAddress formData={formData} setFormData={setFormData} />
                                </Modal>
                            </Match>
                            <Match when={activeTab === ''}>

                            </Match>
                        </Switch>
                    </div>
         </SharedComponent>
    )
}

