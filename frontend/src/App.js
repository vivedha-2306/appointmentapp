import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddEvent from './pages/AddEvent';      // ← new page
import EventDetail from './components/EventDetail'; // your detail page

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Header */}
        <header className="bg-blue-700 text-white py-5 shadow">
          <div className="max-w-6xl mx-auto px-4">
            <h1> </h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddEvent />} />
            <Route path="/event/:id" element={<EventDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;