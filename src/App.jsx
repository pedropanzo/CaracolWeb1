import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/routes/AppRoutes.jsx'

import './assets/css/bootstrap.min.css';
import './assets/font-awesome/css/font-awesome.css'
import './assets/css/animate.css'
import './assets/css/style.css'
//Scripts
import './assets/js/jquery-3.7.1.min.js'
import './assets/js/bootstrap.min.js'
import './assets/js/plugins/metisMenu/jquery.metisMenu.js'
import './assets/js/plugins/slimscroll/jquery.slimscroll.min.js'

//Custom
import './assets/js/inspinia.js'
import './assets/js/plugins/pace/pace.min.js'

import { PrintPanelProvider } from './context/PrintPanelContext';

function App() {
  return (

    <BrowserRouter>
      <PrintPanelProvider>
        <AppRoutes />
      </PrintPanelProvider>
    </BrowserRouter>

  )
}

export default App
