import logo from './logo.svg';
import './App.css';
import Routes from './Routes';
import { Provider } from 'react-redux';
import store from './redux/store/store';
function App() {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}

export default App;
