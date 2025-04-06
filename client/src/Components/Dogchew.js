import ProductList from "./ProductList";

const DogChew = () => {
  return <ProductList apiEndpoint="http://localhost:5000/api/products" title="Dog Chew Products" />;
};

export default DogChew;