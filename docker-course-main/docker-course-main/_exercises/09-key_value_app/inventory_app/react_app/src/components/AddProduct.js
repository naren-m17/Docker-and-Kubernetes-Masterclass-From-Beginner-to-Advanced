import { useEffect, useState } from "react";

function AddProduct({
  onAddProduct,
  selectedKey,
  selectedProduct,
  onReset,
}) {
  const [productKey, setProductKey] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");

  useEffect(() => {
    if (selectedKey && selectedProduct) {
      setProductKey(selectedKey);
      setDetails(selectedProduct.details);
      setPrice(selectedProduct.price);
      setInventory(selectedProduct.inventory);
    } else {
      // clear form when no selection
      clearForm();
    }
  }, [selectedKey, selectedProduct]);

  const clearForm = () => {
    setProductKey("");
    setDetails("");
    setPrice("");
    setInventory("");
  };

  const handleSubmit = () => {
    if (!productKey) return alert("Product key required:");

    onAddProduct(productKey, {
      details,
      price: Number(price),
      inventory: Number(inventory),
    });

    clearForm();
  };

  const handleReset = () => {
    clearForm();
    onReset(); // tell App.js we're done editing
  };

  return (
    <div className="right">
      <h2>{selectedKey ? "Edit Product" : "Add Product"}</h2>

      <input
        placeholder="Product Key"
        value={productKey}
        disabled={!!selectedKey}
        onChange={(e) => setProductKey(e.target.value)}
      />

      <input
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Inventory"
        value={inventory}
        onChange={(e) => setInventory(e.target.value)}
      />

      <div className="form-actions">
        <button onClick={handleSubmit}>
          {selectedKey ? "Update Product" : "Add Product"}
        </button>

        {selectedKey && (
          <button
            className="secondary"
            onClick={handleReset}
          >
            New Product
          </button>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
