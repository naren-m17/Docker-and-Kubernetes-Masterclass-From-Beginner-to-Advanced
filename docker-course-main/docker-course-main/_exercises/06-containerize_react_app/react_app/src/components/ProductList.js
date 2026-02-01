function ProductList({ products, onSelectProduct, selectedKey }) {
  return (
    <div className="left">
      <h2>Products</h2>

      {Object.entries(products).map(([key, value]) => (
        <div
          key={key}
          className={`product-card ${
            selectedKey === key ? "selected" : ""
          }`}
          onClick={() => onSelectProduct(key)}
        >
          <table className="product-table">
            <tbody>
              <tr>
                <td colSpan="3" className="product-key">
                  {key}
                </td>
              </tr>
              <tr className="product-details">
                <td>{value.details}</td>
                <td>₹{value.price}</td>
                <td>Stock: {value.inventory}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
