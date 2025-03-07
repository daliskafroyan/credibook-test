import { Provider } from 'react-redux';
import { store } from './store/store';
import { ProductList } from './components/ProductList';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <ProductList />
      </div>
    </Provider>
  );
}

export default App;
