import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mainpage from './pages/Mainpage';
import Login from './pages/Login';
import Signup from './pages/Singup';
import Mypage from './pages/Mypage';
import Navigation from './components/layout/Navigation/Navigation';
import Curation from './pages/Curation';
import Overlay from './components/layout/Overlay/Overlay';
import { useContext } from 'react';
import OverlayContext from './context/overlay-context';

const Router = () => {
  const overlayCtx = useContext(OverlayContext);

  return (
    <>
      <BrowserRouter>
        {overlayCtx.clicked ? <Overlay /> : ''}
        <Navigation />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/curation" element={<Curation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
