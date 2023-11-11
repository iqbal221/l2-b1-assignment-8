<!--  Auth -->

api/v1/auth/signup (POST)
api/v1/auth/signin (POST)

<!-- Users -->

api/v1/users (GET)
api/v1/users/:id (GET)
api/v1/users/:id (PATCH)
api/v1/users/:id (DELETE)
api/v1/profile (GET)

<!-- Category -->

api/v1/categories/create-category (POST)
api/v1/categories (GET)
api/v1/categories/:id (GET)
api/v1/categories/:id (PATCH)
api/v1/categories/:id (DELETE)

<!-- Books -->

api/v1/books/create-book (POST)
api/v1/books (GET)
api/v1/books/:categoryId/category (GET)
api/v1/books/:id (GET)
api/v1/books/:id (PATCH)
api/v1/books/:id (DELETE)

<!-- Orders -->

api/v1/orders/create-order (POST)
api/v1/orders (GET)
api/v1/orders/:id (GET)

<!-- Bonus -->

api/v1/orders/:orderId (GET)
api/v1/profile (GET)
