import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventosContribuyenteList = ({ codContrib }) => {
  const [eventos, setEventos] = useState([]);
  const [totalITBIS, setTotalITBIS] = useState(0);

  // Función para cargar los eventos del contribuyente
  const cargarEventos = async () => {
    try {
      const response = await axios.get(`https://localhost:7024/api/ComprobantesList/CodContrib/${codContrib}`);
      setEventos(response.data);
    } catch (error) {
      console.error('Error al cargar los eventos del contribuyente:', error);
    }
  };

  // Calcular el total de ITBIS al cargar los eventos
  useEffect(() => {
    cargarEventos();
  }, [codContrib]);

  useEffect(() => {
    let total = 0;
    eventos.forEach((evento) => {
      total += evento.itbis;
    });
    setTotalITBIS(total);
  }, [eventos]);

  return (
    <div>
      <h2>Eventos del Contribuyente</h2>
      <table>
        <thead>
          <tr>
            <th>NCF Usado</th>
            <th>Monto Neto</th>
            <th>ITBIS</th>
            <th>Porcentaje ITBIS</th>
            <th>Fecha de Carga</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.ncfUsado}>
              <td>{evento.ncfUsado}</td>
              <td>{evento.montoNeto}</td>
              <td>{evento.itbis}</td>
              <td>{evento.porItbis}</td>
              <td>{evento.fecCarga}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2"></td>
            <td><strong>Total ITBIS:</strong></td>
            <td>{totalITBIS}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventosContribuyenteList;