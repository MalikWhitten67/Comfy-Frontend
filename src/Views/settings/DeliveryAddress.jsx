import { Switch, Match, useState } from "vaderjs"
import api from "../../api"

export default function ({ formData, setFormData }) {
   let [showAdd, setShowAdd] = useState(false)
   let [address, setAddress] = useState({})
   let [showEdit, setShowEdit] = useState(false)
   let [isUpdate, setIsUpdate] = useState(false)
   function submitAddress(e) {
      e.preventDefault()
      if (isUpdate) {
        setFormData({ ...formData, addresses: formData.addresses.map((item) => item.street === address.street ? address : item) })
      }else{
         setFormData({ ...formData, addresses: [...formData.addresses, address] })
      }
      setShowEdit(false)
      setAddress({})
      setIsUpdate(false)
   }
   const states = {
      'AL': 'Alabama',
      'AK': 'Alaska',
      'AZ': 'Arizona',
      'AR': 'Arkansas',
      'CA': 'California',
      'CO': 'Colorado',
      'CT': 'Connecticut',
      'DE': 'Delaware',
      'FL': 'Florida',
      'GA': 'Georgia',
      'HI': 'Hawaii',
      'ID': 'Idaho',
      'IL': 'Illinois',
      'IN': 'Indiana',
      'IA': 'Iowa',
      'KS': 'Kansas',
      'KY': 'Kentucky',
      'LA': 'Louisiana',
      'ME': 'Maine',
      'MD': 'Maryland',
      'MA': 'Massachusetts',
      'MI': 'Michigan',
      'MN': 'Minnesota',
      'MS': 'Mississippi',
      'MO': 'Missouri',
      'MT': 'Montana',
      'NE': 'Nebraska',
      'NV': 'Nevada',
      'NH': 'New Hampshire',
      'NJ': 'New Jersey',
      'NM': 'New Mexico',
      'NY': 'New York',
      'NC': 'North Carolina',
      'ND': 'North Dakota',
      'OH': 'Ohio',
      'OK': 'Oklahoma',
      'OR': 'Oregon',
      'PA': 'Pennsylvania',
      'RI': 'Rhode Island',
      'SC': 'South Carolina',
      'SD': 'South Dakota',
      'TN': 'Tennessee',
      'TX': 'Texas',
      'UT': 'Utah',
      'VT': 'Vermont',
      'VA': 'Virginia',
      'WA': 'Washington',
      'WV': 'West Virginia',
      'WI': 'Wisconsin',
      'WY': 'Wyoming'
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
                              value={address.street || ''}
                              onChange={(e) => setAddress({ ...address, street: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                           />
                        </div>

                        <div>
                           <label className="block text-sm mb-2">City*</label>
                           <input
                              type="text"
                              required
                              value={address.city || ''}
                              placeholder="Los Angeles"
                              onChange={(e) => setAddress({ ...address, city: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                           />
                        </div>

                        <div>
                           <label className="block text-sm mb-2">State*</label>
                           <select required
                           value={address.state || ''}
                           onChange={(e) => setAddress({ ...address, state: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200">
                               {
                                 new Array(50).fill(0).map((_, index) => (
                                    <option key={index} value={Object.keys(states)[index]} selected={address.state === Object.keys(states)[index]}>{Object.values(states)[index]}</option>
                                 ))
                               }
                           </select>

                        </div>

                        <div>
                           <label className="block text-sm mb-2">Zip Code*</label>
                           <input
                              type="text"
                              required
                              placeholder="90001"
                              value={address.zip || ''} 
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
                              className="btn xl:px-4 xl:py-2 w-full text-sm border rounded-lg hover:bg-gray-50"
                           >
                             {address.street ? 'Update Address' : 'Add Address'}
                           </button>
                        </div>
                     </div>
                  </form>
               </Match>
            </Switch>
         </div>

         <Switch>
            <Match when={api.authStore.record?.addresses.length === 0 && showEdit == false}>
               <p className="text-center">No Address Added</p>

            </Match>
            <Match when={api.authStore.record?.addresses.length > 0 && showEdit == false}>
               <div className="grid grid-cols-1 gap-4">
                  {api.authStore.record?.addresses.map((address, index) => (
                     <div key={index} className="p-4 border rounded-lg"
                     onClick={() => {
                        setIsUpdate(true)
                        setAddress(address)
                        setShowEdit(true)
                     }}
                     >
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