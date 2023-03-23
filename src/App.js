import './App.css';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import CreateProject from './components/CreateProject'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectDetails from './components/ProjectDetails';
import HandleRoutes from './components/HandleRoutes';


function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<MainContent />} />
          <Route exact path="/create" element={<CreateProject />} />
          <Route exact path="/projects/:id" element={<ProjectDetails />} />
          <Route path='*' element={<HandleRoutes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
