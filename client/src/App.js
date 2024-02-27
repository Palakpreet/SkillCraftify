// import { Button} from 'antd';
import './stylesheets/theme.css';
import './stylesheets/alignments.css';
import './stylesheets/textElements.css';
import './stylesheets/customComponents.css';
import './stylesheets/form-elements.css';
import './stylesheets/layout.css';


import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/common/login';
import Register from './pages/common/register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/common/home/index.js';
import Exams from './pages/admin/Exams';
import AddEditExam from './pages/admin/Exams/AddEditExam';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      //common routes
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      //user-routes
      <Route path="/" element={<ProtectedRoute>
       <Home/>
      </ProtectedRoute>}/>

      //admin routes
      <Route path="/admin/exams" element={<ProtectedRoute>
       <Exams/>
      </ProtectedRoute>}/>

      <Route path="/admin/exams/add" element={<ProtectedRoute>
       <AddEditExam/>
      </ProtectedRoute>}/>

      <Route path="/admin/exams/edit/:id" element={<ProtectedRoute>
       <AddEditExam/>
      </ProtectedRoute>}/>


    </Routes>
    </BrowserRouter>
  );
}

export default App;
