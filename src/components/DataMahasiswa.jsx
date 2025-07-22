// src/components/DataMahasiswa.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { FaInstagram, FaGithub, FaWhatsapp, FaRegCopy } from 'react-icons/fa';
import { Pagination, Stack } from '@mui/material';

const DataMahasiswa = ({ data = [] }) => {
  const [page, setPage] = useState(1);
  const [copiedText, setCopiedText] = useState('');
  const itemsPerPage = 10;

  const handleChangePage = (_, value) => setPage(value);
  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 text-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Mahasiswa Terdaftar</h2>
      
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-200 mb-6 backdrop-blur-md bg-white/10"
      >
        <HiArrowNarrowLeft className="w-5 h-5" />
        Kembali ke Form
      </Link>

      <div className="overflow-auto rounded-lg shadow bg-slate-800/90 backdrop-blur-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10">
            <tr>
              {['No', 'Nama', 'NIM', 'Email', 'No HP', 'Angkatan'].map((col, idx) => (
                <th key={idx} className="px-4 py-2 border border-white/10">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">Belum ada data yang terdaftar.</td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-white/10 border-t border-white/10">
                  <td className="px-4 py-2 border border-white/10">{(page - 1) * itemsPerPage + idx + 1}</td>
                  <td className="px-4 py-2 border border-white/10">{item.nama}</td>
                  <td className="px-4 py-2 border border-white/10">{item.nim}</td>
                  <td className="px-4 py-2 border border-white/10">{item.email}</td>
                  <td className="px-4 py-2 border border-white/10">{item.phone}</td>
                  <td className="px-4 py-2 border border-white/10">{item.angkatan}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-end">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#fff',
                  borderColor: '#444',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
                '& .Mui-selected': {
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                },
              }}
            />
          </Stack>
        </div>
      )}

      <div className="mt-10 text-center space-y-6">
        <a
          href="https://chat.whatsapp.com/KwxMRzG23Ag3yxMN1HWaga?mode=ac_t"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded"
        >
          <FaWhatsapp size={20} /> Join WhatsApp
        </a>

        <div className="bg-slate-700 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg text-left max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-2">💳 Metode Pembayaran</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li className="flex items-center justify-between gap-2 bg-white/10 px-3 py-2 rounded-md">
              <span>BCA Digital: 0019-3699-6296 a.n. Feni Pebriani</span>
              <button
                onClick={() => copyToClipboard('001936996296')}
                className="text-white hover:text-blue-400"
                title="Salin nomor rekening"
              >
                <FaRegCopy />
              </button>
            </li>
            {copiedText === '001936996296' && (
              <p className="text-xs text-green-400 text-center">Nomor BCA disalin!</p>
            )}
            <li className="flex items-center justify-between gap-2 bg-white/10 px-3 py-2 rounded-md">
              <span>DANA: 0896-8832-9098 a.n. Feni Pebriani</span>
              <button
                onClick={() => copyToClipboard('089688329098')}
                className="text-white hover:text-blue-400"
                title="Salin nomor DANA"
              >
                <FaRegCopy />
              </button>
            </li>
            {copiedText === '089688329098' && (
              <p className="text-xs text-green-400 text-center">Nomor DANA disalin!</p>
            )}
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">📞 Kontak Person</h3>
          <ul className="space-y-1 text-sm text-gray-200">
            <li>
              <strong>Akmal</strong> – Ketua (
              <a href="https://wa.me/6285221907166" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">WA</a>
              )
            </li>
            <li>
              <strong>Feni Pebriani</strong> – Bendahara (
              <a href="https://wa.me/6289688329098" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">WA</a>
              )
            </li>
            <li>
              <strong>Galih</strong> – Ketua Pelaksana (
              <a href="https://wa.me/628817810056" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">WA</a>
              )
            </li>
          </ul>
        </div>
      </div>

      <footer className="mt-10 flex justify-center gap-6 text-white/90">
        <a href="https://www.instagram.com/himatifuninus" target="_blank" rel="noreferrer">
          <FaInstagram size={28} className="hover:text-pink-500" />
        </a>
        <a href="https://github.com/your_username" target="_blank" rel="noreferrer">
          <FaGithub size={28} className="hover:text-gray-200" />
        </a>
      </footer>
    </div>
  );
};

export default DataMahasiswa;
