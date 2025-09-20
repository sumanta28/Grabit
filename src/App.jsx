import './App.css'
import Routing from './Routing/Routing'
import Wrapper from './Layout/Wrapper/Wrapper'
import { HelmetProvider } from 'react-helmet-async'

function App() {

  return (
    <HelmetProvider>
    <Wrapper>
      <Routing />
    </Wrapper>
    </HelmetProvider>
  )
}

export default App
