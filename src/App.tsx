import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Layout>
      <Dashboard />
      <Toaster position="bottom-right" />
    </Layout>
  );
}

export default App;
