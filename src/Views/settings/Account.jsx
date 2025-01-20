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
                        value={api.authStore.record?.email || ''}
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