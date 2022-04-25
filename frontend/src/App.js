import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/auth.context';
import Routing from './components/general/Routing';

import './assets/css/global.css';

function App() {
  return (
    <div className="container">
      <AuthProvider>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
