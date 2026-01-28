import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <div>
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Nasze bestsellery</h1>
        <p style={{ color: '#666' }}>Wybierz zapach idealny dla siebie</p>
      </div>
      
      <ProductList />
    </div>
  );
}