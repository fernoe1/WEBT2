import './styles/main.css';
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogsView from './views/BlogsView';
import CRUD from './views/CRUD';
import { route } from './constants';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path={route.BLOGS} element={<BlogsView />}/>
          <Route path={route.CRUD} element={<CRUD />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
