import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

import Header from './Components/Header/Header';
import MainContent from './Components/MainContent/MainContent';
import { useUserLoginMutation } from './Redux/Services/UserApi';

function App() {

  const [loginApi, { data: dataLogin }] = useUserLoginMutation({
    fixedCacheKey: "login"
  });

  useEffect(() => {
    try {

      const storage = localStorage.getItem('user')
      const dataToLogin = JSON.parse(`${storage}`)

      if (!dataLogin?.login && Boolean(dataToLogin)) {
        loginApi(dataToLogin)
      }

    } catch (error) {
      console.warn(error)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        <MainContent />
      </Router>
    </div>
  );
}

export default App;
