// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import DataMahasiswa from './components/DataMahasiswa';
import AdminPage from './components/AdminPage';
import { useState } from 'react';

function App() {
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [isAdmin] = useState(true); // sementara true, bisa diatur dengan login nanti

  // Fungsi hapus data mahasiswa
  const handleDelete = (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus data ini?");
    if (konfirmasi) {
      setMahasiswaList(mahasiswaList.filter((mhs) => mhs.id !== id));
    }
  };

  // Fungsi edit data (sementara alert)
  const handleEdit = (item) => {
    alert(`Edit data: ${item.nama} (fitur belum dibuat)`);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route 
            path="/" 
            element={
              <Register 
                mahasiswaList={mahasiswaList} 
                setMahasiswaList={setMahasiswaList} 
              />
            } 
          />
          <Route 
            path="/DataMahasiswa" 
            element={<DataMahasiswa data={mahasiswaList} />} 
          />
          <Route 
            path="/admin" 
            element={
              <AdminPage 
                isAdmin={isAdmin} 
                data={mahasiswaList}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
