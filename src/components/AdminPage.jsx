import React from 'react';
import { Navigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaFilePdf, FaFileExcel, FaFileWord } from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { utils, writeFile } from 'xlsx';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun } from 'docx';
import { Pagination, Stack } from '@mui/material';


const AdminPage = ({ isAdmin, data, handleDelete, handleEdit }) => {
  if (!isAdmin) return <Navigate to="/" replace />;

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Data Mahasiswa Terdaftar", 14, 10);
    autoTable(doc, {
      head: [['No', 'Nama', 'NIM', 'Email', 'No HP', 'Angkatan', 'Status']],
      body: data.map((item, i) => [
        i + 1,
        item.nama,
        item.nim,
        item.email,
        item.phone,
        item.angkatan,
        item.status || 'Belum DP',
      ]),
    });
    doc.save('Data Mahasiswa Pendaftaran Icc.pdf');
  };

  const exportExcel = () => {
    const worksheet = utils.json_to_sheet(
      data.map((item, i) => ({
        No: i + 1,
        Nama: item.nama,
        NIM: item.nim,
        Email: item.email,
        'No HP': item.phone,
        Angkatan: item.angkatan,
        Status: item.status || 'Belum DP',
      }))
    );
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Mahasiswa');
    writeFile(workbook, 'Data Mahasiswa Pendaftaran Icc.xlsx');
  };

  const exportWord = async () => {
    const tableRows = data.map((item, i) =>
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(String(i + 1))] }),
          new TableCell({ children: [new Paragraph(item.nama)] }),
          new TableCell({ children: [new Paragraph(item.nim)] }),
          new TableCell({ children: [new Paragraph(item.email)] }),
          new TableCell({ children: [new Paragraph(item.phone)] }),
          new TableCell({ children: [new Paragraph(item.angkatan)] }),
          new TableCell({ children: [new Paragraph(item.status || 'Belum DP')] }),
        ],
      })
    );

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ children: [new TextRun({ text: 'Data Mahasiswa Terdaftar', bold: true })] }),
            new Table({
              rows: [
                new TableRow({
                  children: ['No', 'Nama', 'NIM', 'Email', 'No HP', 'Angkatan', 'Status'].map(
                    (text) => new TableCell({ children: [new Paragraph(text)] })
                  ),
                }),
                ...tableRows,
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'Data Mahasiswa Pendaftaran Icc.docx');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Data Pendaftar</h2>

      <div className="overflow-x-auto backdrop-blur-md bg-slate-800/60 rounded-lg">
        <table className="min-w-full text-sm text-left border border-gray-700">
          <thead className="bg-slate-700 text-gray-300">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">NIM</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">No HP</th>
              <th className="px-4 py-2 border">Angkatan</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Bukti</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">Belum ada data.</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{item.nama}</td>
                  <td className="px-4 py-2 border">{item.nim}</td>
                  <td className="px-4 py-2 border">{item.email}</td>
                  <td className="px-4 py-2 border">{item.phone}</td>
                  <td className="px-4 py-2 border">{item.angkatan}</td>
                  <td className="px-4 py-2 border">{item.status || 'Belum DP'}</td>
                  <td className="px-4 py-2 border">
                    {item.file && item.file.type?.startsWith('image/') ? (
                      <img
                        src={item.filePreview}
                        alt="Bukti"
                        className="w-16 h-16 object-cover rounded border border-gray-500"
                      />
                    ) : (
                      <span className="text-gray-300">📄 {item.fileName}</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-yellow-400 hover:text-yellow-300 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
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

      {/* Tombol Export  */}
      <div className="flex gap-4 mt-6 justify-end">
        <button onClick={exportPDF} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
          <FaFilePdf /> PDF
        </button>
        <button onClick={exportExcel} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          <FaFileExcel /> Excel
        </button>
        <button onClick={exportWord} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          <FaFileWord /> Word
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
