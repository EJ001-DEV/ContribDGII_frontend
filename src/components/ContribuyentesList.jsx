import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContribuyentesList.css'; // Ruta relativa al archivo CSS
import EventosContribuyenteList from './EventosContribuyenteList'; // Importar el nuevo componente

const ContribuyentesList = ({ onContribuyenteClick }) => {
  const [contribuyentes, setContribuyentes] = useState([]);
  const [selectedContribuyente, setSelectedContribuyente] = useState(null);

  // Función para cargar los contribuyentes
  const cargarContribuyentes = async () => {
    try {
      const response = await axios.get('https://localhost:7024/api/ContribuyentesList');
      setContribuyentes(response.data);
    } catch (error) {
      console.error('Error al cargar los contribuyentes:', error);
    }
  };

  // Cargar los contribuyentes al cargar el componente
  useEffect(() => {
    cargarContribuyentes();
  }, []);

  // Manejar clic en un contribuyente
  const handleContribuyenteClick = (contribuyente) => {
    setSelectedContribuyente(contribuyente.codContrib);
  };

  return (
    <div>
      <h2>Listado de Contribuyentes</h2>
      <table className="contribuyentes-table">
        <thead>
          <tr>
            <th>No. Contrib</th>
            <th>Primer Nombre</th>
            <th>Segundo Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Tipo Contribuyente</th>
            <th>Razón social</th>
            <th>Identificación</th>
            <th>estatus</th>
          </tr>
        </thead>
        <tbody>
          {contribuyentes.map((contribuyente) => (
            <tr key={contribuyente.codContrib} onClick={() => handleContribuyenteClick(contribuyente)}>
              <td>{contribuyente.codContrib}</td>
              <td>{contribuyente.persona.pNom}</td>
              <td>{contribuyente.persona.sNom}</td>
              <td>{contribuyente.persona.pApe}</td>
              <td>{contribuyente.persona.sApe}</td>
              <td>{contribuyente.tipoContribuyente.tipoContribuyente}</td>
              <td>{contribuyente.persona.razonSocial}</td>
              <td>{contribuyente.persona.documentoIdent}</td>
              <td>{contribuyente.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedContribuyente && <EventosContribuyenteList codContrib={selectedContribuyente} />}
    </div>
  );
};

export default ContribuyentesList;