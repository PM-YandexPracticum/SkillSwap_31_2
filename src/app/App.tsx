import { Routes, Route, useLocation } from 'react-router-dom';

import { Favorites, Home, Profile, Skill } from '@app/pages';
import { ButtonUI } from '@app/shared/ui/button';

export const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  return (
   
    <div className="app" data-cy="app">
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skill:id" element={<Skill />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/skill:id" element={<Skill />} />
        </Routes>
      )}
    </div>
  );
};
