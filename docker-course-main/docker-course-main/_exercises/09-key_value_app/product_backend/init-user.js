db = db.getSiblingDB("product-key-value");

db.createUser({
  user: "product_app",
  pwd: "product_secret",
  roles: [
    {
      role: "readWrite",
      db: "product-key-value"
    }
  ]
});
