import { Match, Switch, useEffect, useState } from "vaderjs"
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

export default function () {
    let [newFormData, setNewFormData] = useState({
        password: '',
        passwordConfirm: ''
    })
    let [error, setError] = useState('') 
    let [Successful, setSuccessful] = useState(false)
    function submitForm(e) {
        e.preventDefault()
        if (newFormData.password !== newFormData.passwordConfirm) {
            setError('Passwords do not match')
            return
        } 
        api.collection("users").confirmPasswordReset(params.token, newFormData.password, newFormData.passwordConfirm)
            .then(() => { 
                setSuccessful(true)
                setTimeout(() => {
                    window.location.href = '/auth/login'
                }, 3000)
            }).catch((error) => {
                console.error('Error resetting password:', error)
                setError('Error resetting password')
            })
    }
     
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    }, [error])

    useEffect(() => {
       if(params.token === undefined){
           window.location.href = '/auth/login'
       }
    }, [])
    return (
        <html>
            <head>
                <title>Confy - Title</title>
                <meta name="description" content="Comfy - One of One" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <div className="min-h-screen bg-white">
                    <div className="mx-auto max-w-md justify-center mx-auto flex flex-col px-4 py-8 ">
                        {/* Logo */}
                        <div className="mb-8 flex justify-center gap-2 shrikhand-regular text-xl">
                            Comfy
                        </div>

                        <Switch>
                            <Match when={error}>
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Error!</strong>
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            </Match>
                            <Match when={Successful}>
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Success!</strong>
                                    <span className="block sm:inline">Password reset successfully</span>
                                </div>
                            </Match>
                        </Switch>

                        <div className="space-y-6">
                            <form onSubmit={submitForm} className="space-y-6">


                                <div>
                                    <label htmlFor="signup-password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="signup-password"
                                        required
                                        placeholder="New Password"
                                        onChange={(e) => setNewFormData({ ...newFormData, password: e.target.value })}
                                        className="w-full rounded-none border-x-0 border-t-0 border-b border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="sr-only">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        required
                                        placeholder="Confirm Password"
                                        onChange={(e) => setNewFormData({ ...newFormData, passwordConfirm: e.target.value })}
                                        className="w-full rounded-none border-x-0 border-t-0 border-b border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-gray-800"
                                >
                                     {Successful ? 'Password Reset Successfully' : 'Reset Password'}
                                </button>
                            </form>

                             


                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}