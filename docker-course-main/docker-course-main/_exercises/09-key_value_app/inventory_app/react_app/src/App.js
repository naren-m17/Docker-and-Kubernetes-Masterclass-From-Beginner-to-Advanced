import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import { getProduct, createProduct } from "./api/Products.api";

function App() {
  const [products, setProducts] = useState({});
  const [selectedKey, setSelectedKey] = useState(null);

  const addOrUpdateProduct = (key, product) => {
    createProduct( key, product );
    setProducts((prev) => ({
      ...prev,
      [key]: product,
  }));
    setSelectedKey(null); // reset after save
  };

  const clearSelection = () => {
    setSelectedKey(null);
  };
  
  useEffect(()=>{
    getProduct().then ( response => {
      setProducts(response.productMap);
      console.log( response );
    })
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        <ProductList
          products={products}
          onSelectProduct={setSelectedKey}
          selectedKey={selectedKey}
        />

        <AddProduct
          onAddProduct={addOrUpdateProduct}
          selectedKey={selectedKey}
          selectedProduct={selectedKey ? products[selectedKey] : null}
          onReset={clearSelection}
        />
      </div>

      <Footer />
    </>
  );
}

export default App;
