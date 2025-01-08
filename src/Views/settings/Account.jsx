import api from "../../api";
import { useState } from "vaderjs";
export default function({setFormData, formData}) {
    let [newFormData, setNewFormData] = useState({})
    function submitForm(e) {
        e.preventDefault()
        setFormData({ ...formData, ...newFormData })
    }
    return (
        <main className="flex-1  xl:p-8">
        <h2 className="text-2xl font-semibold mb-8">Account Details</h2>

        <form className="max-w-2xl space-y-8" onSubmit={submitForm}>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm mb-2">Email*</label>
                    <input
                        type="email"
                        value={api.authStore.record?.email}
                        onChange={(e) => setNewFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Password</label>
                    <div className="flex flex-col gap-2">
                        <input
                            type="password" 
                            placeholder="Old Password"
                            onChange={(e) => setNewFormData(prev => ({ ...prev, oldPassword: e.target.value }))}
                            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        <input
                            type="password" 
                            placeholder="New Password"
                            onChange={(e) => setNewFormData(prev => ({ ...prev, password: e.target.value }))}
                            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                        /> 
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-2">Phone Number</label>
                    <div className="flex gap-2">
                        <input
                            type="tel"
                            value={api.authStore.record?.phone || ''}
                            onChange={(e) => {
                                setNewFormData({ ...newFormData, phone: e.target.value }) 
                            }}
                            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                        /> 
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-2">Date of Birth*</label>
                    <div className="relative">
                        <input
                            type="date"
                            value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : '' }
                            onChange={(e) => setNewFormData({ ...formData, dateOfBirth: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        <svg
                            className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </div>
                </div>
            </div>

            <button 
            type="submit"
            className="w-full py-3 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800">
                Save Changes
            </button>
        </form>
    </main>
    )
}