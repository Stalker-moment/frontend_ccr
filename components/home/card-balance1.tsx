// pages/index.tsx

import { useState } from "react";

interface FormData {
  tanggal: string;
  LP_planning: number;
  LP_actual: number;
  DC_conv_planning: number;
  DC_conv_actual: number;
  DC_hev_planning: number;
  DC_hev_actual: number;
  CB_conv_planning: number;
  CB_conv_actual: number;
  CB_hev_planning: number;
  CB_hev_actual: number;
  CH_conv_planning: number;
  CH_conv_actual: number;
  CH_hev_planning: number;
  CH_hev_actual: number;
  CA_IN_conv_planning: number;
  CA_IN_conv_actual: number;
  CA_IN_hev_planning: number;
  CA_IN_hev_actual: number;
  CA_EX_conv_planning: number;
  CA_EX_conv_actual: number;
  CA_EX_hev_planning: number;
  CA_EX_hev_actual: number;
  CR_1NR_planning: number;
  CR_1NR_actual: number;
  CR_2NR_planning: number;
  CR_2NR_actual: number;
  elbow_1NR_planning: number;
  elbow_1NR_actual: number;
  ball_1NR_planning: number;
  ball_1NR_actual: number;
  hev_1NR_planning: number;
  hev_1NR_actual: number;
  elbow_2NR_planning: number;
  elbow_2NR_actual: number;
  ball_2NR_planning: number;
  ball_2NR_actual: number;
  hev_2NR_planning: number;
  hev_2NR_actual: number;
  planning_1NR: number;
  actual_1NR: number;
  planning_2NR: number;
  actual_2NR: number;
}

export const CardBalance1: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    tanggal: new Date().toISOString().split("T")[0],
    LP_planning: 0,
    LP_actual: 0,
    DC_conv_planning: 0,
    DC_conv_actual: 0,
    DC_hev_planning: 0,
    DC_hev_actual: 0,
    CB_conv_planning: 0,
    CB_conv_actual: 0,
    CB_hev_planning: 0,
    CB_hev_actual: 0,
    CH_conv_planning: 0,
    CH_conv_actual: 0,
    CH_hev_planning: 0,
    CH_hev_actual: 0,
    CA_IN_conv_planning: 0,
    CA_IN_conv_actual: 0,
    CA_IN_hev_planning: 0,
    CA_IN_hev_actual: 0,
    CA_EX_conv_planning: 0,
    CA_EX_conv_actual: 0,
    CA_EX_hev_planning: 0,
    CA_EX_hev_actual: 0,
    CR_1NR_planning: 0,
    CR_1NR_actual: 0,
    CR_2NR_planning: 0,
    CR_2NR_actual: 0,
    elbow_1NR_planning: 0,
    elbow_1NR_actual: 0,
    ball_1NR_planning: 0,
    ball_1NR_actual: 0,
    hev_1NR_planning: 0,
    hev_1NR_actual: 0,
    elbow_2NR_planning: 0,
    elbow_2NR_actual: 0,
    ball_2NR_planning: 0,
    ball_2NR_actual: 0,
    hev_2NR_planning: 0,
    hev_2NR_actual: 0,
    planning_1NR: 0,
    actual_1NR: 0,
    planning_2NR: 0,
    actual_2NR: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleTanggalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      tanggal: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Logika pengiriman data ke backend bisa ditambahkan di sini

    // Contoh pengiriman data ke API
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Data berhasil dikirim!');
        // Reset form atau tindakan lainnya
      } else {
        alert('Gagal mengirim data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengirim data.');
    }
  };

  return (
    <div className="container mx-auto mt-10 mb-10 px-4">
      <h3 className="text-center text-2xl font-bold mb-6 text-white">
        Control Production Line, C, M, K & Packing Component IMC
      </h3>
      <div className="mb-4 text-center">
        <a
          href="/sistem/control_production"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Lihat Data
        </a>
      </div>
      <form onSubmit={handleSubmit} id="productionForm" className="w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white border border-gray-600 table-fixed">
            <colgroup>
              <col className="w-1/12" /> {/* Section */}
              <col className="w-2/12" /> {/* Subsection */}
              <col className="w-2/12" /> {/* Category */}
              <col className="w-2/12" /> {/* Type */}
              <col className="w-2/12" /> {/* Planning Prod. */}
              <col className="w-2/12" /> {/* Actual Prod. */}
              <col className="w-1/12" /> {/* Balance */}
            </colgroup>
            <thead>
              {/* Header Tanggal */}
              <tr className="border-b border-gray-600">
                <th colSpan={7} className="text-left p-4">
                  <label htmlFor="tanggal" className="block mb-2">
                    Production Date:
                  </label>
                  <input
                    type="date"
                    id="tanggal"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleTanggalChange}
                    className="w-full max-w-xs p-2 border border-gray-400 rounded-md"
                  />
                </th>
              </tr>
              {/* Header Kolom */}
              <tr className="bg-gray-700 text-center">
                <th className="p-2 border border-gray-600">Section</th>
                <th className="p-2 border border-gray-600">Subsection</th>
                <th className="p-2 border border-gray-600">Category</th>
                <th className="p-2 border border-gray-600">Type</th>
                <th className="p-2 border border-gray-600">Planning Prod.</th>
                <th className="p-2 border border-gray-600">Actual Prod.</th>
                <th className="p-2 border border-gray-600">Balance</th>
              </tr>
            </thead>
            <tbody>
              {/* CASTING Section */}
              <tr className="border-b border-gray-600">
                <td rowSpan={3} className="text-center p-2 bg-gray-700">
                  CASTING
                </td>
                <td className="text-center p-2 bg-gray-700">LP</td>
                <td className="text-center p-2">LP</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="LP_planning"
                    value={formData.LP_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="LP_actual"
                    value={formData.LP_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.LP_planning - formData.LP_actual}
                </td>
              </tr>

              {/* DC Subsection */}
              <tr className="border-b border-gray-600">
                <td className="text-center p-2 bg-gray-700">DC</td>
                <td className="text-center p-2 bg-gray-700">Conv</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="DC_conv_planning"
                    value={formData.DC_conv_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="DC_conv_actual"
                    value={formData.DC_conv_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.DC_conv_planning - formData.DC_conv_actual}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                {/* DC HEV */}
                <td className="text-center p-2 bg-gray-700">HEV</td>
                <td className="text-center p-2 bg-gray-700">HEV</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="DC_hev_planning"
                    value={formData.DC_hev_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="DC_hev_actual"
                    value={formData.DC_hev_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.DC_hev_planning - formData.DC_hev_actual}
                </td>
              </tr>

              {/* MACHINING Section */}
              <tr className="border-b border-gray-600">
                <td rowSpan={8} className="text-center p-2 bg-gray-700">
                  MACHINING
                </td>
                {/* CB Subsection */}
                <td rowSpan={2} className="text-center p-2 bg-gray-700">
                  CB
                </td>
                <td className="text-center p-2 bg-gray-700">Conv</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CB_conv_planning"
                    value={formData.CB_conv_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CB_conv_actual"
                    value={formData.CB_conv_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.CB_conv_planning - formData.CB_conv_actual}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                {/* CB HEV */}
                <td className="text-center p-2 bg-gray-700">HEV</td>
                <td className="text-center p-2 bg-gray-700">HEV</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CB_hev_planning"
                    value={formData.CB_hev_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CB_hev_actual"
                    value={formData.CB_hev_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.CB_hev_planning - formData.CB_hev_actual}
                </td>
              </tr>

              {/* CH Subsection */}
              <tr className="border-b border-gray-600">
                <td rowSpan={2} className="text-center p-2 bg-gray-700">
                  CH
                </td>
                <td className="text-center p-2 bg-gray-700">Conv</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CH_conv_planning"
                    value={formData.CH_conv_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CH_conv_actual"
                    value={formData.CH_conv_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.CH_conv_planning - formData.CH_conv_actual}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                {/* CH HEV */}
                <td className="text-center p-2 bg-gray-700">HEV</td>
                <td className="text-center p-2 bg-gray-700">HEV</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CH_hev_planning"
                    value={formData.CH_hev_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CH_hev_actual"
                    value={formData.CH_hev_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.CH_hev_planning - formData.CH_hev_actual}
                </td>
              </tr>

              {/* CA Subsection */}
              <tr className="border-b border-gray-600">
                <td rowSpan={6} className="text-center p-2 bg-gray-700">
                  CA
                </td>
                {/* CA IN Subsection */}
                <td rowSpan={2} className="text-center p-2 bg-gray-700">
                  IN
                </td>
                <td className="text-center p-2 bg-gray-700">Conv</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CA_IN_conv_planning"
                    value={formData.CA_IN_conv_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CA_IN_conv_actual"
                    value={formData.CA_IN_conv_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.CA_IN_conv_planning - formData.CA_IN_conv_actual}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                {/* CA IN HEV */}
                <td className="text-center p-2 bg-gray-700">HEV</td>
                <td className="text-center p-2 bg-gray-700">HEV</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CA_IN_hev_planning"
                    value={formData.CA_IN_hev_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CA_IN_hev_actual"
                    value={formData.CA_IN_hev_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.CA_IN_hev_planning - formData.CA_IN_hev_actual}
                </td>
              </tr>

              {/* CA EX Subsection */}
              <tr className="border-b border-gray-600">
                <td rowSpan={2} className="text-center p-2 bg-gray-700">
                  EX
                </td>
                <td className="text-center p-2 bg-gray-700">Conv</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CA_EX_conv_planning"
                    value={formData.CA_EX_conv_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CA_EX_conv_actual"
                    value={formData.CA_EX_conv_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.CA_EX_conv_planning - formData.CA_EX_conv_actual}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                {/* CA EX HEV */}
                <td className="text-center p-2 bg-gray-700">HEV</td>
                <td className="text-center p-2 bg-gray-700">HEV</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CA_EX_hev_planning"
                    value={formData.CA_EX_hev_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CA_EX_hev_actual"
                    value={formData.CA_EX_hev_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.CA_EX_hev_planning - formData.CA_EX_hev_actual}
                </td>
              </tr>

              {/* CR Subsection */}
              <tr className="border-b border-gray-600">
                <td rowSpan={2} className="text-center p-2 bg-gray-700">
                  CR
                </td>
                <td className="text-center p-2 bg-gray-700">1NR</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CR_1NR_planning"
                    value={formData.CR_1NR_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CR_1NR_actual"
                    value={formData.CR_1NR_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.CR_1NR_planning - formData.CR_1NR_actual}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                {/* CR 2NR */}
                <td className="text-center p-2 bg-gray-700">2NR</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CR_2NR_planning"
                    value={formData.CR_2NR_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="CR_2NR_actual"
                    value={formData.CR_2NR_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.CR_2NR_planning - formData.CR_2NR_actual}
                </td>
              </tr>

              {/* ASSY LINE Subsection */}
              <tr className="border-b border-gray-600">
                <td rowSpan={9} className="text-center p-2 bg-gray-700">
                  ASSY LINE
                </td>
                {/* 1NR Subsection */}
                <td rowSpan={3} className="text-center p-2 bg-gray-700">
                  1NR
                </td>
                <td className="text-center p-2 bg-gray-700">Elbow</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="elbow_1NR_planning"
                    value={formData.elbow_1NR_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="elbow_1NR_actual"
                    value={formData.elbow_1NR_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.elbow_1NR_planning - formData.elbow_1NR_actual}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                {/* 1NR Ball */}
                <td className="text-center p-2 bg-gray-700">Ball</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="ball_1NR_planning"
                    value={formData.ball_1NR_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="ball_1NR_actual"
                    value={formData.ball_1NR_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.ball_1NR_planning - formData.ball_1NR_actual}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                {/* 1NR Hev */}
                <td className="text-center p-2 bg-gray-700">Hev</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="hev_1NR_planning"
                    value={formData.hev_1NR_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="hev_1NR_actual"
                    value={formData.hev_1NR_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.hev_1NR_planning - formData.hev_1NR_actual}
                </td>
              </tr>

              {/* 2NR Subsection */}
              <tr className="border-b border-gray-600">
                <td rowSpan={3} className="text-center p-2 bg-gray-700">
                  2NR
                </td>
                <td className="text-center p-2 bg-gray-700">Elbow</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="elbow_2NR_planning"
                    value={formData.elbow_2NR_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="elbow_2NR_actual"
                    value={formData.elbow_2NR_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.elbow_2NR_planning - formData.elbow_2NR_actual}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                {/* 2NR Ball */}
                <td className="text-center p-2 bg-gray-700">Ball</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="ball_2NR_planning"
                    value={formData.ball_2NR_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="ball_2NR_actual"
                    value={formData.ball_2NR_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.ball_2NR_planning - formData.ball_2NR_actual}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                {/* 2NR Hev */}
                <td className="text-center p-2 bg-gray-700">Hev</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="hev_2NR_planning"
                    value={formData.hev_2NR_planning}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="hev_2NR_actual"
                    value={formData.hev_2NR_actual}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.hev_2NR_planning - formData.hev_2NR_actual}
                </td>
              </tr>

              {/* PACKING COMPONENT Subsection */}
              <tr className="border-b border-gray-600">
                <td rowSpan={2} className="text-center p-2 bg-gray-700">
                  PACKING COMPONENT
                </td>
                <td className="text-center p-2 bg-gray-700">1NR</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="planning_1NR"
                    value={formData.planning_1NR}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="actual_1NR"
                    value={formData.actual_1NR}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.planning_1NR - formData.actual_1NR}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                {/* PACKING COMPONENT 2NR */}
                <td className="text-center p-2 bg-gray-700">2NR</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="planning_2NR"
                    value={formData.planning_2NR}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    name="actual_2NR"
                    value={formData.actual_2NR}
                    onChange={handleChange}
                    className="w-full p-2 text-black rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  {formData.planning_2NR - formData.actual_2NR}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};