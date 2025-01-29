interface HelpArticle {
    id: number
    title: string
    content: string
    category: string
    action: string
  }
  
export const helpArticles: HelpArticle[] = [
    {
      id: 1,
      title: "How do I return my Comfy order?",
      content: "Learn about our easy return process and policy...",
      category: "Returns",
      action:"return order"
    },
    {
      id: 2,
      title: "What is comfy's Return Policy",
      content: "Learn about our easy return process and policy...",
      category: "Returns",
      action:"return policy"
    },
    {
      id: 3,
      title: "Where is my refund",
      content: "Learn about our easy return process and policy...",
      category: "Returns",
      action:"refund"
    },
    {
      id: 4,
      title: "What are Comfy's shipping options?",
      content: "Find out about our shipping methods and delivery times...",
      category: "Shipping",
      action:'shipping options'
    },
    {
      id: 5,
      title:'How to change my shipping address',
      content:"Change your shipping address",
      category:"Personal",
      action:"change shipping address"
    },
    {
      id: 6,
      title: "Where is my Comfy order?",
      content: "Track your order and get delivery updates...",
      category: "Orders",
      action:'tracking order'
    },
    // Add more help articles as needed
  ]
  
  export const categories = [
    {
      title: "Returns",
      items: [helpArticles[0], helpArticles[1], "Where is my refund?"],
    },
    {
      title: "Shipping & Delivery",
      items: ["What are the shipping options?", helpArticles[4], helpArticles[5]],
    },
    {
      title: "Orders & Payment",
      items: ["Where is my order?", "Can I cancel my order?", "What payment methods do you accept?"],
    },
  ]
  
  
