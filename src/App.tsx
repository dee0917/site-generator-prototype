import { BrowserRouter } from 'react-router-dom';
import { DynamicRendererProvider } from './context/DynamicRendererContext';
import { CartProvider } from './context/CartContext';
import { GeneratorLayout } from './components/GeneratorLayout';

function App() {
  return (
    <BrowserRouter>
      <DynamicRendererProvider>
        <CartProvider>
          <GeneratorLayout />
        </CartProvider>
      </DynamicRendererProvider>
    </BrowserRouter>
  );
}

export default App;
