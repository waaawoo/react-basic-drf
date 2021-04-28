import logo from './logo.svg';
import './App.css';
import DrfApiFetch from './components/DrfApiFetch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {/* 使用するファイルの読み込み */}
        <DrfApiFetch />

      </header>
    </div>
  );
}

export default App;
