export default function({setFormData, formData}) {
    return (
        <main className="flex-1  xl:p-8">
        <h2 className="text-2xl font-semibold mb-8">Account Details</h2>

        <form className="max-w-2xl space-y-8">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm mb-2">Email*</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-2">Password</label>
                    <div className="flex gap-2">
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        <button
                            type="button"
                            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                        >
                            Edit
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-2">Phone Number</label>
                    <div className="flex gap-2">
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        <button
                            type="button"
                            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-2">Date of Birth*</label>
                    <div className="relative">
                        <input
                            type="date"
                            value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : '' }
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
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

            <div className="space-y-6">
                <h2 className="text-lg font-medium">Location</h2>

                <div>
                    <label className="block text-sm mb-2">Country/Region*</label>
                    <div className="relative">
                        <select
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none"
                        >
                            <option value="United States">United States</option> 
                        </select>
                        <svg
                            className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-2">State*</label>
                    <div className="relative">
                        <select
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none"
                        >
                            <option value="">Select state</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                            <option value="IL">Illinois</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="OH">Ohio</option>
                            <option value="GA">Georgia</option>
                            <option value="NC">North Carolina</option>
                            <option value="MI">Michigan</option>
                            <option value="NJ">New Jersey</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="AZ">Arizona</option>
                            <option value="MA">Massachusetts</option>
                            <option value="TN">Tennessee</option>
                            <option value="IN">Indiana</option>
                            <option value="MO">Missouri</option>
                            <option value="MD">Maryland</option>
                            <option value="WI">Wisconsin</option>
                            <option value="CO">Colorado</option>
                            <option value="MN">Minnesota</option>
                            <option value="SC">South Carolina</option>
                            <option value="AL">Alabama</option>
                            <option value="LA">Louisiana</option>
                            <option value="KY">Kentucky</option>
                            <option value="OR">Oregon</option>
                            <option value="OK">Oklahoma</option>
                            <option value="CT">Connecticut</option>
                            <option value="IA">Iowa</option>
                            <option value="MS">Mississippi</option>
                            <option value="AR">Arkansas</option>
                            <option value="UT">Utah</option>
                            <option value="NV">Nevada</option>
                            <option value="KS">Kansas</option>
                            <option value="NM">New Mexico</option>
                            <option value="NE">Nebraska</option>
                            <option value="ID">Idaho</option>
                            <option value="WV">West Virginia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ME">Maine</option>
                            <option value="NH">New Hampshire</option>
                            <option value="MT">Montana</option>
                            <option value="RI">Rhode Island</option>
                            <option value="DE">Delaware</option>
                            <option value="SD">South Dakota</option>
                            <option value="ND">North Dakota</option>
                            <option value="AK">Alaska</option>
                        </select>
                        <svg
                            className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-2">City*</label>
                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>
            </div>
        </form>
    </main>
    )
}