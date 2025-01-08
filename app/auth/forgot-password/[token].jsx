import { useEffect, useState } from "vaderjs"
import api from "../../../src/api"

function debounce(func, wait) {
    let timeout
    return function (...args) {
        const context = this
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeout = null
            func.apply(context, args)
        }, wait)
    }
}

export default function(){
    let [newFormData, setNewFormData] = useState({
        password: '',
        passwordConfirm: ''
    })
    function submitForm(e) {
        e.preventDefault() 
        if(newFormData.password !== newFormData.passwordConfirm){
            alert('Passwords do not match')
            return
        }
        api.collection("users").confirmPasswordReset(params.token, newFormData.password, newFormData.passwordConfirm)
        .then(() => {
            alert('Password Reset Successful')
            window.location.href = '/auth/login'
        })
    } 
    return (
        <main className="flex-1  xl:p-8">
        <h2 className="text-2xl font-semibold mb-8">Forgot Password</h2>
        <form className="max-w-2xl space-y-8" onSubmit={submitForm}>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm mb-2">New Password</label>
                    <input
                        type="password"
                        required
                        onChange={(e) => setNewFormData({ ...newFormData, password: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-2">Confirm Password</label>
                    <input
                        type="password"
                        required
                        onChange={(e) => setNewFormData({ ...newFormData, passwordConfirm: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>

            </div>
            <button
                type="submit" 
                className="w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-gray-800 "
            >
                Reset Password
            </button>
        </form>
    </main>
    )
}