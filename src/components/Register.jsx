import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaUser, FaIdCard, FaEnvelope, FaPhone, FaUniversity, FaUpload } from 'react-icons/fa';

const Register = ({ mahasiswaList, setMahasiswaList }) => {
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    email: '',
    phone: '',
    angkatan: '',
    file: null,
    fileName: '',
    filePreview: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const preview = file ? URL.createObjectURL(file) : '';

    setFormData({
      ...formData,
      file,
      fileName: file?.name,
      filePreview: preview,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      ...formData,
      id: Date.now(),
    };

    setMahasiswaList([...mahasiswaList, newData]);

    setFormData({
      nama: '',
      nim: '',
      email: '',
      phone: '',
      angkatan: '',
      file: null,
      fileName: '',
      filePreview: '',
    });

    toast.success('Pendaftaran Berhasil!', {
      duration: 5000,
      className: 'bg-green-600 text-white px-4 py-2 rounded shadow-lg animate__animated animate__fadeInDown',
    });
  };

  return (
    <div className='min-h-screen w-screen flex justify-center items-center bg-gray-900 px-4'>
      <div className='w-full max-w-md mx-auto bg-slate-800 border border-slate-600 rounded-md p-6 sm:p-8 shadow-lg backdrop-blur-lg bg-opacity-30'>
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-6'>Daftar ICC Season IV</h1>

        <form onSubmit={handleSubmit}>
          {[{
            name: 'nama',
            label: 'Nama Mahasiswa',
            icon: <FaUser className='absolute right-2 top-3 text-gray-400 peer-focus:text-blue-500' />,
            type: 'text'
          }, {
            name: 'nim',
            label: 'Masukkan NIM',
            icon: <FaIdCard className='absolute right-2 top-3 text-gray-400 peer-focus:text-blue-500' />,
            type: 'text'
          }, {
            name: 'email',
            label: 'Masukkan Email',
            icon: <FaEnvelope className='absolute right-2 top-3 text-gray-400 peer-focus:text-blue-500' />,
            type: 'email'
          }, {
            name: 'phone',
            label: 'Masukkan No HP',
            icon: <FaPhone className='absolute right-2 top-3 text-gray-400 peer-focus:text-blue-500' />,
            type: 'tel'
          }].map(({ name, label, icon, type }) => (
            <div className='relative my-4' key={name}>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className='peer block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0'
                placeholder=" "
                required
                pattern={name === 'phone' ? '^(+62|62|0)[0-9]{9,13}$' : undefined}
                title={name === 'phone' ? 'Format: 08xxxxxxxxxx, 62xxxxxxxxxx, atau +62xxxxxxxxxx' : undefined}
              />
              <label
                className='absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                {label}
              </label>
              {icon}
            </div>
          ))}

          <div className='my-4'>
            <label htmlFor="angkatan" className='text-white block mb-1 flex items-center gap-2'>
              <FaUniversity /> Angkatan
            </label>
            <select
              name="angkatan"
              value={formData.angkatan}
              onChange={handleChange}
              className='w-full p-2 rounded bg-slate-700 text-white border border-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none'
              required
            >
              <option value="">Pilih Angkatan</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div className="my-4 border border-gray-600 rounded-lg p-4">
            <label htmlFor="bukti" className="block mb-2 text-white font-medium flex items-center gap-2">
              <FaUpload /> Bukti Pembayaran
            </label>

            <label className="inline-flex items-center cursor-pointer">
              <span className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 mr-2">
                Pilih File
                <input
                  id="bukti"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </span>
            </label>

            <div className="mt-3">
              {formData.filePreview && (
                formData.file.type.startsWith("image/") ? (
                  <img
                    src={formData.filePreview}
                    alt="Preview Bukti"
                    className="w-full max-h-64 object-contain border border-gray-500 rounded mt-2"
                  />
                ) : (
                  <p className="text-gray-300">📄 File PDF terpilih: {formData.fileName}</p>
                )
              )}
              {!formData.file && (
                <p className="text-sm text-gray-400 mt-2">Belum ada file dipilih</p>
              )}
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Format yang diterima: JPG, PNG, PDF (maks. 5MB)
            </p>
          </div>

          <div className='mt-6'>
            <button
              type="submit"
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 shadow-md hover:shadow-lg'
            >
              Daftar Sekarang
            </button>
          </div>

          <div className='mt-4 text-center'>
            <Link
              to="/DataMahasiswa"
              className='text-white hover:text-blue-300 text-sm transition duration-200'>
              Lihat mahasiswa terdaftar? Lihat disini
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;