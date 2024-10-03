// components/ProductionControl.js

import { useState } from 'react';

const ProductionControl = ({ castingData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., fetch data based on selectedDate)
  };

  return (
    <div className="container mx-auto mt-5 mb-5">
      <h3 className="text-center text-white text-2xl font-bold mb-5">
        Control Production Line, C,M,K & Packing Component IMC
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/4 mt-5">
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              className="form-control w-full p-2 text-lg rounded"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/6 mt-5">
            <button type="submit" className="btn btn-primary w-full p-2 text-lg rounded bg-blue-500 hover:bg-blue-700 text-white">
              Tampilkan Data
            </button>
          </div>
          <div className="w-full md:w-1/6 mt-5">
            <a href="/" className="btn btn-secondary w-full p-2 text-lg rounded bg-gray-500 hover:bg-gray-700 text-white text-center">
              Form Input
            </a>
          </div>
        </div>
      </form>

      <table className="table-auto border border-gray-300 w-full text-center">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th colSpan="4">Day Shift</th>
            <th>Planning Prod.</th>
            <th>Actual Prod.</th>
            <th>Balance.</th>
          </tr>
        </thead>
        <tbody>
          {castingData.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-white">Tidak ada data untuk tanggal yang dipilih.</td>
            </tr>
          ) : (
            castingData.map((key1, index) => {
              if (key1.tanggal === selectedDate) {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td rowSpan="5" className="bg-gray-600 text-white">CASTING</td>
                      <td colSpan="2" className="bg-gray-500 text-white">LP</td>
                      <td>{key1.LP_planning}</td>
                      <td>{key1.LP_actual}</td>
                      <td>{key1.LP_planning - key1.LP_actual}</td>
                    </tr>
                    {/* Additional rows as per your original table structure */}
                    <tr>
                      <td rowSpan="3" className="bg-gray-600 text-white">DC</td>
                      <td>Conv</td>
                      <td>{key1.DC_conv_planning}</td>
                      <td>{key1.DC_conv_actual}</td>
                      <td>{key1.DC_conv_planning - key1.DC_conv_actual}</td>
                    </tr>
                    <tr>
                      <td>HEV</td>
                      <td>{key1.DC_hev_planning}</td>
                      <td>{key1.DC_hev_actual}</td>
                      <td>{key1.DC_hev_planning - key1.DC_hev_actual}</td>
                    </tr>
                    {/* More rows here */}
                  </React.Fragment>
                );
              }
              return null;
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionControl;
