import { Switch, Match, useState } from "vaderjs"

export default function({formData, setFormData}){
    let [showAdd, setShowAdd] = useState(false)
 return (
    <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-8">Delivery Address</h2>

         <Switch>
            <Match when={formData.addresses.length === 0}>
                <p className="text-base text-gray-600">You have no saved addresses</p>
            </Match>
            <Match when={formData.addresses.length > 0}>
            </Match>
         </Switch>
    </main>
 )
}