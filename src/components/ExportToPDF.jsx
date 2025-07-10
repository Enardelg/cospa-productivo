import React from 'react';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';
import Logo from '../assets/logoNavBarPDF.png'; // Asegúrate que la ruta sea correcta

const ExportToPDF = ({ form }) => {
  if (!form) return null;

  const ajustarTexto = (doc, text, x, y, maxWidth, align = 'left') => {
    const fontSize = doc.getFontSize();
    const textWidth = doc.getTextWidth(text);
    if (textWidth > maxWidth) {
      const scale = maxWidth / textWidth;
      doc.setFontSize(fontSize * scale);
    }
    doc.text(text, x, y, { align });
    doc.setFontSize(fontSize); // Restablece el tamaño original
  };

  const generarPDF = () => {
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const azul = '#1565c0';
      const gris = '#666666';

      // Sello de agua "FIRMA DIGITAL"
      doc.setTextColor(200);
      doc.setFontSize(50);
      doc.text('CoSpa DIGITAL', 105, 150, {
        align: 'center',
        angle: 45,
        opacity: 0.1
      });

      // Logo más pequeño y título centrado
      if (Logo) {
        doc.addImage(Logo, 'PNG', 50, 5, 100, 50);
      }

      doc.setFontSize(18);
      doc.setTextColor(azul);
      ajustarTexto(doc, 'Ficha Clínica', 112, 40, 150, 'center');
      doc.setDrawColor(azul);
      doc.line(30, 45, 180, 45);

      let y = 50; // Reducimos margen inicial aún más

      // Datos personales
      const datosPersonales = [
        ['Nombre y Apellido:', form.nombre || 'No definido'],
        ['DNI:', form.dni || 'No definido'],
        ['Fecha de Nacimiento:', form.fechaNacimiento || 'No definido'],
        ['Edad:', form.edad || 'No definido'],
        ['Teléfono:', form.telefono || 'No definido'],
        ['Email:', form.email || 'No definido'],
        ['¿Cómo nos conociste?:',
          form.conociste === 'Otro'
            ? `Otro: ${form.otroConocisteDetalle || 'Sin especificar'}`
            : form.conociste || 'No definido']
      ];

      doc.setFontSize(12);
      datosPersonales.forEach(([label, value]) => {
        doc.setTextColor(azul);
        ajustarTexto(doc, label, 35, y, 60);
        doc.setTextColor(0, 0, 0);
        ajustarTexto(doc, value, 100, y, 80);
        y += 6;
      });

      doc.setDrawColor(azul);
      doc.line(30, y + 2, 180, y + 2);
      y += 6;

      // Salud Actual con detalles
      doc.setTextColor(azul);
      doc.setFontSize(13);
      ajustarTexto(doc, 'Salud Actual', 105, y, 150, 'center');
      y += 6;

      const saludActual = [
        ['Enfermedad crónica:', form.enfermedad ? 'Sí' : 'No', form.enfermedadDetalle],
        ['Tratamiento médico:', form.tratamiento ? 'Sí' : 'No', form.tratamientoDetalle],
        ['Toma medicación:', form.medicacion ? 'Sí' : 'No', form.medicacionDetalle],
        ['Cirugías o lesiones:', form.cirugias ? 'Sí' : 'No', form.cirugiasDetalle],
        ['Alergias medicamentos/aceites/cremas:', form.alergias ? 'Sí' : 'No', form.alergiasDetalle],
        ['Problemas circulatorios:', form.circulatorio ? 'Sí' : 'No', form.circulatorioDetalle],
        ['Hipertensión o cardíacos:', form.cardiaco ? 'Sí' : 'No', form.cardiacoDetalle],
        ['Molestias musculares:', form.musculares ? 'Sí' : 'No', form.muscularesDetalle],
        ['Embarazada:', form.embarazada ? 'Sí' : 'No', form.embarazadaDetalle]
      ];

      saludActual.forEach(([label, value, detalle]) => {
        doc.setTextColor(azul);
        ajustarTexto(doc, label, 35, y, 60);
        doc.setTextColor(0, 0, 0);
        ajustarTexto(doc, value, 110, y, 80);
        y += 6;

        if (value === 'Sí' && detalle && detalle.trim() !== '') {
          doc.setTextColor(gris);
          const detalleSplit = doc.splitTextToSize(`• ${detalle}`, 130);
          detalleSplit.forEach(line => {
            doc.text(line, 40, y);
            y += 5;
          });
        }
      });

      // Observaciones en bloque para evitar superposición
      y += 4;
      doc.setTextColor(azul);
      ajustarTexto(doc, 'Observaciones:', 35, y, 60);
      y += 5;
      doc.setTextColor(0, 0, 0);
      const splitText = doc.splitTextToSize(form.observaciones || 'Sin observaciones', 130);
      splitText.forEach(line => {
        doc.text(line, 35, y);
        y += 5;
      });

      // Firma digital compacta y sin margen superior
      if (form.firmaDibujo) {
        y += 4;
        doc.setTextColor(azul);
        ajustarTexto(doc, 'Firma digital:', 35, y, 60);
        doc.setDrawColor(gris);
        doc.rect(35, y + 1, 80, 18);
        doc.addImage(form.firmaDibujo, 'PNG', 36, y + 2, 78, 16);
        y += 22;

        doc.setTextColor(azul);
        ajustarTexto(doc, 'Aclaración de firma:', 35, y, 60);
        doc.setTextColor(0, 0, 0);
        ajustarTexto(doc, form.firma || 'No definido', 85, y, 80);
        y += 6;
      }

      // Fecha
      doc.setTextColor(azul);
      ajustarTexto(doc, 'Fecha:', 35, y, 40);
      doc.setTextColor(0, 0, 0);
      ajustarTexto(doc, form.fecha || 'No definido', 55, y, 80);

      y += 4;

      // Pie de página
      doc.setDrawColor(gris);
      doc.line(30, 280, 180, 280);
      doc.setFontSize(10);
      doc.setTextColor(gris);
      ajustarTexto(doc, 'CoSpa Masajes - Tu tiempo de relajación.', 105, 285, 150, 'center');
      ajustarTexto(doc, 'Documento generado y validado con firma digital.', 105, 291, 160, 'center');

      doc.save(`ficha_clinica_${form.nombre || 'paciente'}.pdf`);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  return (
    <Button
      onClick={generarPDF}
      variant="contained"
      sx={{
        backgroundColor: '#c62828',
        '&:hover': { backgroundColor: '#b71c1c' },
        mt: 2
      }}
    >
      Exportar a PDF
    </Button>
  );
};

export default ExportToPDF;