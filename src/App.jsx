import './assets/styles/global.scss';
//Thư viện tạo hiệu ứng 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Router from './routes/Router';
AOS.init();

function App() {
  return (
    <Router />
  );
}

export default App;
