// ✅ PatientForm.jsx con firma digital validada y previsualizada + PDF exporta firmaDibujo
import React, { useEffect, useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Paper,
  Box
} from '@mui/material';

const initialState = {
  nombre: '', dni: '', fechaNacimiento: '', edad: '', telefono: '', email: '', conociste: '',
  enfermedad: false, enfermedadDetalle: '', tratamiento: false, tratamientoDetalle: '',
  medicacion: false, medicacionDetalle: '', cirugias: false, cirugiasDetalle: '',
  alergias: false, alergiasDetalle: '', circulatorio: false, circulatorioDetalle: '',
  cardiaco: false, cardiacoDetalle: '', musculares: false, muscularesDetalle: '',
  embarazada: false, embarazadaDetalle: '', observaciones: '', firma: '', fecha: '',
  terminos: false, firmaDibujo: ''
};

const PatientForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const sigCanvas = useRef();

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const guardarFirmaDibujo = () => {
    if (sigCanvas.current.isEmpty()) {
      setErrors((prev) => ({ ...prev, firmaDibujo: 'La firma no puede estar vacía' }));
      return;
    }
    const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setForm((prev) => ({ ...prev, firmaDibujo: dataUrl }));
    setErrors((prev) => ({ ...prev, firmaDibujo: null }));
  };

  const borrarFirma = () => {
    sigCanvas.current.clear();
    setForm((prev) => ({ ...prev, firmaDibujo: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'Nombre requerido';
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(form.nombre)) newErrors.nombre = 'Solo letras permitidas';
    if (!form.dni.trim()) newErrors.dni = 'DNI requerido';
    if (!/^[0-9]+$/.test(form.dni)) newErrors.dni = 'DNI inválido';
    if (!form.edad.trim()) newErrors.edad = 'Edad requerida';
    if (!/^[0-9]+$/.test(form.edad)) newErrors.edad = 'Solo números permitidos';
    if (!form.email.trim()) newErrors.email = 'Email requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.fecha.trim()) newErrors.fecha = 'Fecha requerida';
    if (!form.firma.trim() && !form.firmaDibujo) newErrors.firma = 'Firma requerida';
    if (!form.terminos) newErrors.terminos = 'Debe aceptar los términos';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', my: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>📑 Datos del Paciente</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField label="Nombre y Apellido" name="nombre" fullWidth value={form.nombre} onChange={handleChange} error={!!errors.nombre} helperText={errors.nombre} /></Grid>
            <Grid item xs={12} sm={6}><TextField label="DNI" name="dni" fullWidth value={form.dni} onChange={handleChange} error={!!errors.dni} helperText={errors.dni} /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Fecha de nacimiento" name="fechaNacimiento" type="date" fullWidth InputLabelProps={{ shrink: true }} value={form.fechaNacimiento} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Edad" name="edad" fullWidth value={form.edad} onChange={handleChange} error={!!errors.edad} helperText={errors.edad} /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Teléfono" name="telefono" fullWidth value={form.telefono} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Email" name="email" fullWidth value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} /></Grid>
            <Grid item xs={12}><TextField label="¿Cómo nos conociste?" name="conociste" select fullWidth value={form.conociste} onChange={handleChange}>
              <MenuItem value="Redes">Redes</MenuItem><MenuItem value="Recomendación">Recomendación</MenuItem><MenuItem value="Otro">Otro</MenuItem></TextField></Grid>

            <Grid item xs={12}><Typography variant="h6" gutterBottom>🧬 Salud Actual</Typography></Grid>
            {[{ label: '¿Padece alguna enfermedad crónica?', name: 'enfermedad', detalle: 'enfermedadDetalle' },
              { label: '¿Está bajo tratamiento médico?', name: 'tratamiento', detalle: 'tratamientoDetalle' },
              { label: '¿Toma medicación actualmente?', name: 'medicacion', detalle: 'medicacionDetalle' },
              { label: '¿Ha tenido cirugías o lesiones importantes?', name: 'cirugias', detalle: 'cirugiasDetalle' },
              { label: '¿Tiene alergias a medicamentos, aceites o cremas?', name: 'alergias', detalle: 'alergiasDetalle' },
              { label: '¿Problemas circulatorios (varices, trombosis)?', name: 'circulatorio', detalle: 'circulatorioDetalle' },
              { label: '¿Hipertensión o problemas cardíacos?', name: 'cardiaco', detalle: 'cardiacoDetalle' },
              { label: '¿Molestias musculares o contracturas actuales?', name: 'musculares', detalle: 'muscularesDetalle' },
              { label: '¿Está embarazada?', name: 'embarazada', detalle: 'embarazadaDetalle' }].map(({ label, name, detalle }) => (
              <React.Fragment key={name}>
                <Grid item xs={12}><FormControlLabel control={<Checkbox name={name} checked={form[name]} onChange={handleChange} />} label={label} /></Grid>
                {form[name] && <Grid item xs={12}><TextField label="Especificar" name={detalle} fullWidth value={form[detalle]} onChange={handleChange} /></Grid>}
              </React.Fragment>
            ))}

            <Grid item xs={12}><TextField name="observaciones" label="¿Hay algo que debamos saber antes del masaje?" multiline rows={4} fullWidth value={form.observaciones} onChange={handleChange} /></Grid>

            <Grid item xs={12} sm={6}>
              <TextField label="Firma del paciente (nombre)" name="firma" fullWidth value={form.firma} onChange={handleChange} error={!!errors.firma} helperText={errors.firma} />
              <Typography sx={{ mt: 2, mb: 1 }}>✍️ O firmá con el dedo:</Typography>
              <Box sx={{ border: '1px solid #ccc', width: 300, height: 120 }}>
                <SignatureCanvas ref={sigCanvas} penColor="black" canvasProps={{ width: 300, height: 120, className: 'sigCanvas' }} />
              </Box>
              {form.firmaDibujo && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption">Firma guardada:</Typography>
                  <Box component="img" src={form.firmaDibujo} alt="Firma previsualizada" sx={{ width: 150, mt: 1, border: '1px solid #ccc' }} />
                </Box>
              )}
              {errors.firmaDibujo && <Typography variant="caption" color="error">{errors.firmaDibujo}</Typography>}
              <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                <Button variant="outlined" size="small" onClick={guardarFirmaDibujo}>Guardar firma</Button>
                <Button variant="text" size="small" onClick={borrarFirma}>Borrar</Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}><TextField label="Fecha" name="fecha" type="date" fullWidth InputLabelProps={{ shrink: true }} value={form.fecha} onChange={handleChange} error={!!errors.fecha} helperText={errors.fecha} /></Grid>

            <Grid item xs={12}><FormControlLabel control={<Checkbox name="terminos" checked={form.terminos} onChange={handleChange} />} label="Acepto los términos y condiciones del servicio." />
              {errors.terminos && <Typography variant="caption" color="error">{errors.terminos}</Typography>}</Grid>

            <Grid item xs={12}><Button type="submit" variant="contained" fullWidth>{initialData ? 'Actualizar Ficha' : 'Registrar Ficha'}</Button></Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default PatientForm;
