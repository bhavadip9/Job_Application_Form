import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Application from './Aplication';
import SummaryPage from './SummaryPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Application></Application>} />
        <Route path="/summary" element={<SummaryPage></SummaryPage>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
