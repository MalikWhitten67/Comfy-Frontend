import { Switch, Match, useState } from "vaderjs"

export default function ({ formData, setFormData }) {
   let [showAdd, setShowAdd] = useState(false)
   let [address, setAddress] = useState({})
   let [showEdit, setShowEdit] = useState(false)
   function submitAddress(e) {
      e.preventDefault()
      setFormData({ ...formData, addresses: [...formData.addresses, address] })
      setShowEdit(false)
   }
   return (
      <main className="flex-1 p-8">
         <h2 className="text-2xl font-semibold mb-8">Delivery Address</h2>
         <div>
            <Switch>
               <Match when={showEdit}>
                  <form className="max-w-2xl space-y-8" onSubmit={submitAddress} action="">
                     <div className="space-y-6">
                        <div>
                           <label className="block text-sm mb-2">Address*</label>
                           <input
                              type="text"
                              placeholder="123 Main St"
                              required
                              onChange={(e) => setAddress({ ...address, street: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                           />
                        </div>

                        <div>
                           <label className="block text-sm mb-2">City*</label>
                           <input
                              type="text"
                              required
                              placeholder="Los Angeles"
                              onChange={(e) => setAddress({ ...address, city: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                           />
                        </div>

                        <div>
                           <label className="block text-sm mb-2">State*</label>
                           <select required onChange={(e) => setAddress({ ...address, state: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200">
                              <option value="CA">California</option>
                              <option value="NY">New York</option>
                              <option value="TX">Texas</option>
                              <option value="FL">
                                 Florida
                              </option>
                              <option value="PA">Pennsylvania</option>
                              <option value="IL">Illinois</option>
                              <option value="OH">Ohio</option>
                              <option value="GA">Georgia</option>
                              <option value="WA">Washington</option>
                              <option value="MA">Massachusetts</option>
                              <option value="TN">Tennessee</option>
                              <option value="IN">Indiana</option>
                              <option value="MO">Missouri</option>
                           </select>

                        </div>

                        <div>
                           <label className="block text-sm mb-2">Zip Code*</label>
                           <input
                              type="text"
                              required
                              placeholder="90001"
                              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                           />
                        </div>

                        <div>
                           <label className="block text-sm mb-2">Country*</label>
                           <select required onChange={(e) => setAddress({ ...address, country: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200">
                              <option value="US">United States</option>
                           </select>
                        </div>

                        <div>

                           <button
                              type="submit"
                              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                           >
                              Add
                           </button>
                        </div>
                     </div>
                  </form>
               </Match>
            </Switch>
         </div>

         <Switch>
            <Match when={formData.addresses.length === 0 && showEdit == false}>
               <p className="text-center">No Address Added</p>

            </Match>
            <Match when={formData.addresses.length > 0 && showEdit == false}>
               <div className="grid grid-cols-1 gap-4">
                  {formData.addresses.map((address, index) => (
                     <div key={index} className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold">{address.street}</h3>
                        <p>{address.city}, {address.state}, {address.zip}</p>
                        <p>{address.country}</p>
                     </div>
                  ))}
               </div>
            </Match>
         </Switch>
         <Switch>
            <Match when={showEdit == false}>
               <button onClick={() => setShowEdit(true)} className="xl:px-4 mt-5 xl:py-2 btn w-full text-sm border rounded-lg hover:bg-gray-50">Add Address</button>
            </Match>
         </Switch>

      </main>
   )
}