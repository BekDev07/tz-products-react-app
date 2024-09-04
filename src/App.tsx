import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
