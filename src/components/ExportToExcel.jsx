
import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';

const ExportToExcel = ({ data }) => {
  const exportToExcel = () => {
    const worksheetData = data.map((item) => ({
      Nombre: item.nombre,
      DNI: item.dni,
      "Fecha de nacimiento": item.fechaNacimiento,
      Edad: item.edad,
      Teléfono: item.telefono,
      Email: item.email,
      "¿Cómo nos conociste?": item.conociste,
      "Enfermedad crónica": item.enfermedad ? 'Sí' : 'No',
      "Detalle enfermedad": item.enfermedadDetalle,
      "Bajo tratamiento médico": item.tratamiento ? 'Sí' : 'No',
      "Detalle tratamiento": item.tratamientoDetalle,
      "Toma medicación": item.medicacion ? 'Sí' : 'No',
      "Detalle medicación": item.medicacionDetalle,
      "Cirugías o lesiones": item.cirugias ? 'Sí' : 'No',
      "Detalle cirugías": item.cirugiasDetalle,
      "Alergias": item.alergias ? 'Sí' : 'No',
      "Detalle alergias": item.alergiasDetalle,
      "Problemas circulatorios": item.circulatorio ? 'Sí' : 'No',
      "Detalle circulatorio": item.circulatorioDetalle,
      "Problemas cardíacos": item.cardiaco ? 'Sí' : 'No',
      "Detalle cardíaco": item.cardiacoDetalle,
      "Molestias musculares": item.musculares ? 'Sí' : 'No',
      "Detalle musculares": item.muscularesDetalle,
      "Está embarazada": item.embarazada ? 'Sí' : 'No',
      "Detalle embarazo": item.embarazadaDetalle,
      Observaciones: item.observaciones,
      Firma: item.firma,
      Fecha: item.fecha,
      "Términos aceptados": item.terminos ? 'Sí' : 'No'
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pacientes');

    XLSX.writeFile(workbook, 'fichas_clinicas_cospa.xlsx');
  };

  return (
    <Button
      onClick={exportToExcel}
      variant="contained"
      sx={{
        backgroundColor: '#2e7d32',       
        color: '#fff',                               
        '&:hover': {
          backgroundColor: '#1b5e20'      
        },
      mt: 2 
     }}
    
     >
  Exportar a Excel
</Button>
  );
};

export default ExportToExcel;
