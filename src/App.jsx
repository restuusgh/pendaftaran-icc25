// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import DataMahasiswa from './components/DataMahasiswa';
import supabase from './supabaseClient';

const App = () => {
  const [mahasiswaList, setMahasiswaList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching PesertaIccList...");
      const { data, error } = await supabase
        .from('PesertaIccList')
        .select('*');

      if (error) {
        console.error("Supabase fetch error:", error.message);
      } else {
        console.log("Fetched:", data);
        setMahasiswaList(data);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
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
          path="/list"
          element={<DataMahasiswa data={mahasiswaList} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
