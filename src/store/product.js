const ProductStore = (set) => ({
  product: {}, // Initial state for product, set to null initially
  addRating: async (id, rating, review) => {
    const body = {
      rating: rating,
      review: review,
    }
    console.log(id, rating)
    const response = await fetch(
      `http://localhost:3900/api/products/${id}/rating`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(body), // Convert the body object to a JSON string
      }
    )

    const data = await response.json()
    return data
  },
  fetchProduct: async (id) => {
    try {
      const response = await fetch(`http://localhost:3900/api/products/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })

      if (!response.ok) {
        console.log(`Error fetching product. Status: ${response.status}`)
        return
      }

      const data = await response.json()
      console.log("Fetched product data:", data)

      set({
        product: data,
      })
    } catch (error) {
      console.error("Error fetching product data:", error.message)
    }
  },
})

export default ProductStore
