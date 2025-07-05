import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { FaInstagram, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { Pagination, Stack } from '@mui/material';

const DataMahasiswa = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8 text-white flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold mb-6">Daftar Mahasiswa Terdaftar</h2>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition duration-200 mb-6 backdrop-blur-sm bg-white/10"
          >
          <HiArrowNarrowLeft className="w-5 h-5" />
            Kembali ke Form
          </Link>

        <div className="overflow-x-auto backdrop-blur-md bg-slate-800/60 rounded-lg">
          <table className="min-w-full text-sm text-left border border-gray-700 rounded-md overflow-hidden">
            <thead className="bg-slate-700 text-gray-300">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">NIM</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">No HP</th>
                <th className="px-4 py-2 border">Angkatan</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-white">
                    Belum ada data yang terdaftar.
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={idx} className="border-t border-gray-700">
                    <td className="px-4 py-2 border">{idx + 1}</td>
                    <td className="px-4 py-2 border">{item.nama}</td>
                    <td className="px-4 py-2 border">{item.nim}</td>
                    <td className="px-4 py-2 border">{item.email}</td>
                    <td className="px-4 py-2 border">{item.phone}</td>
                    <td className="px-4 py-2 border">{item.angkatan}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* pagination */}

            <div className="mt-6 flex justify-end">
            <div className="backdrop-blur-md bg-white/10 rounded-md px-6 py-3 shadow-md">
              <Stack spacing={1}>
                <Pagination
                  count={10}
                  variant="outlined"
                  shape="rounded"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.3)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(6px)',
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#3b82f6',
                      color: '#fff',
                    },
                    '& .MuiPaginationItem-root:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                />
              </Stack>
            </div>
          </div>
        

        {/* Tombol Join WhatsApp Group */}
        
        <div className="mt-12 text-center">
          <a
            href="https://chat.whatsapp.com/your_group_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md shadow-md transition duration-300"
          >
            <FaWhatsapp size={20} />
            Join WhatsApp
          </a>
        </div>

      </div>

      {/* Footer Sosial Media */}
      <footer className="mt-12 flex justify-center gap-6 text-white/90">
        <a
          href="https://www.instagram.com/himatifuninus?igsh=MWZzeHpqc2lrczBweQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition duration-200"
        >
          <FaInstagram size={30} />
        </a>
        <a
          href="https://github.com/your_username"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition duration-200"
        >
          <FaGithub size={30} />
        </a>
      </footer>
    </div>
  );
};

export default DataMahasiswa;
