import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaUser, FaIdCard, FaEnvelope, FaPhone } from 'react-icons/fa';
import supabase from '../supabaseClient.js';

const Register = ({ mahasiswaList, setMahasiswaList }) => {
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    email: '',
    phone: '',
    angkatan: '',
  });

  const [nimError, setNimError] = useState('');
  const [namaError, setNamaError] = useState('');
  const [emailError, setEmailError] = useState('');

  const forbiddenWords = ['anjing', 'babi', 'goblok', 'tolol', 'bangsat', 'kontol', 'asu'];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nim') {
      setNimError(value && !value.startsWith('41037006') ? 'NIM harus diawali dengan 41037006' : '');
    }

    if (name === 'nama') {
      const found = forbiddenWords.find(word => value.toLowerCase().includes(word));
      setNamaError(found ? `Kata "${found}" tidak diperbolehkan!` : '');
    }

    if (name === 'email') {
      const found = forbiddenWords.find(word => value.toLowerCase().includes(word));
      setEmailError(found ? `Kata "${found}" tidak diperbolehkan di email!` : '');
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nimError || namaError || emailError) {
      toast.error('Data tidak valid, periksa kembali!');
      return;
    }

    try {
      const { error } = await supabase.from('PesertaIccList').insert([{
        nama: formData.nama,
        nim: formData.nim,
        email: formData.email,
        phone: formData.phone,
        angkatan: formData.angkatan,
      }]);

      if (error) {
        toast.error('Gagal menyimpan data ke database.');
        console.error('Supabase error:', error);
        return;
      }

      const newData = {
        ...formData,
        id: Date.now(),
      };

      setMahasiswaList([...mahasiswaList, newData]);

      toast.success('Pendaftaran Berhasil!');

      setFormData({
        nama: '',
        nim: '',
        email: '',
        phone: '',
        angkatan: '',
      });
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('Terjadi kesalahan sistem.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-8 flex items-center justify-center"
      style={{ backgroundImage: 'url(/bg.jpg)' }}
    >
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-slate-800 bg-opacity-50 backdrop-blur-lg border border-slate-500 rounded-xl p-6 shadow-2xl">
        <Toaster position="top-center" />
        <h1 className="text-3xl font-bold text-white text-center mb-6">Daftar ICC Season IV</h1>

        <form onSubmit={handleSubmit}>
          {[
            { name: 'nama', label: 'Nama Mahasiswa', icon: <FaUser />, type: 'text' },
            { name: 'nim', label: 'Masukkan NIM', icon: <FaIdCard />, type: 'text' },
            { name: 'email', label: 'Masukkan Email', icon: <FaEnvelope />, type: 'email' },
            { name: 'phone', label: 'Masukkan No HP', icon: <FaPhone />, type: 'tel' }
          ].map(({ name, label, icon, type }) => (
            <div className="relative mb-6" key={name}>
              <div className="absolute left-2 top-3 text-gray-400">
                {icon}
              </div>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="peer w-full py-2 pt-5 pl-10 pr-3 text-white bg-transparent border-b-2 border-gray-500 placeholder-transparent focus:outline-none focus:border-blue-500"
                placeholder={label}
                required
              />
              <label
                htmlFor={name}
                className="absolute left-10 top-2 text-sm text-gray-400 transition-all duration-200
                  peer-placeholder-shown:top-3.5
                  peer-placeholder-shown:text-base
                  peer-placeholder-shown:text-gray-500
                  peer-focus:top-2
                  peer-focus:text-sm
                  peer-focus:text-blue-400"
              >
                {label}
              </label>
              {name === 'nim' && nimError && <p className="text-red-500 text-sm mt-1">{nimError}</p>}
              {name === 'nama' && namaError && <p className="text-red-500 text-sm mt-1">{namaError}</p>}
              {name === 'email' && emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
          ))}

          <div className="mb-4">
            <label className="text-white block mb-1">Angkatan</label>
            <select
              name="angkatan"
              value={formData.angkatan}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-700 bg-opacity-60 text-white border border-gray-500 focus:border-blue-500"
              required
            >
              <option value="">Pilih Angkatan</option>
              {[2021, 2022, 2023, 2024].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded mt-4 transition-colors"
          >
            Daftar Sekarang
          </button>

          <p className="text-center text-gray-200 mt-4">
            Sudah daftar?{' '}
            <Link to="/list" className="text-blue-400 hover:underline">
              Lihat Daftar Peserta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
