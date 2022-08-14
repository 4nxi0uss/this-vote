import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';

import Header from './Components/Header/Header';
import MainContent from './Components/MainContent/MainContent';

import { useUserLoginMutation } from './Redux/Services/UserApi';


const App = () => {

  const [loginApi] = useUserLoginMutation({
    fixedCacheKey: "login"
  });

  useEffect(() => {
    try {

      const userData = localStorage.getItem('user')

      if (userData === null) {
        return
      }

      const dataForLogin = JSON.parse(String(userData))

      if (Boolean(dataForLogin)) {
        loginApi(dataForLogin).unwrap().catch(() => { alert('something went wrong, try again'); localStorage.clear() })
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
