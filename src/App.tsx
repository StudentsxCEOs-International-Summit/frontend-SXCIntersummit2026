import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '@/routes'
import { AuthProvider } from '@/context/AuthContext'
import SupportButton from '@/components/SupportButton'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <SupportButton />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
