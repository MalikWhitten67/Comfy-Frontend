export default function Footer() {
    const footerSections = [
      {
        title: "Resources",
        links: [
          { label: "Promo Codes", href: "#" },
          { label: "Stock Updates", href: "#" },
          { label: "Membership", href: "#" }, 
          { label: "Site Feedback", href: "#" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "Get Help", href: "#" },
          { label: "Order Status", href: "#" },
          { label: "Shipping and Delivery", href: "#" },
          { label: "Returns", href: "#" },
          { label: "Order Cancellation", href: "#" },
          { label: "Payment Options", href: "#" }, 
          { label: "Contact Us", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Comfy", href: "/about" },
          { label: "Drops", href: "#" }, 
          { label: "Purpose", href: "#" },
          { label: "Sustainability", href: "#" },
        ],
      },
      {
        title: "Promotions & Discounts",
        links: [ 
          { label: "Birthday", href: "#" },
        ],
      },
    ]
  
    const legalLinks = [
      { label: "Guides", href: "#", hasChevron: true },
      { label: "Terms of Sale", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Comfy Privacy Policy", href: "#" },
      { label: "Your Privacy Choices", href: "#", hasPrivacyIcon: true }, 
    ]
  
    return (
      <footer className="bg-white pt-10 mt-16">
        {/* Main footer content */}
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-medium text-gray-900">{section.title}</h3>
                <ul className="mt-6 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-gray-500 hover:text-gray-600">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
  
        {/* Secondary footer */}
        <div className="mt-12 border-t border-gray-100 py-8">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
              <div className="flex items-center gap-x-4">
                <p className="text-xs text-gray-500">© {new Date().getFullYear()} Comfy, Inc. All Rights Reserved</p>
                <div className="flex items-center gap-x-4">
                  {legalLinks.map((link) => (
                    <div key={link.label} className="flex items-center">
                      <a href={link.href} className="text-xs text-gray-500 hover:text-gray-600">
                        {link.label}
                        {link.hasChevron && (
                          <svg className="ml-1 inline-block h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                        {link.hasPrivacyIcon && (
                          <svg className="ml-1 inline-block h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                        )}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="text-sm text-gray-500">United States</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  