import logo from './logo.svg';
import './App.css';
import TodoTemplate from './component/todo/TodoTemplate';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';

function App() {
  return (
    <>
      <Header />
      <TodoTemplate />
      <Footer />
    </>
  );
}

export default App;
