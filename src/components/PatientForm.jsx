import React, { useEffect, useState, useRef } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Paper,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';

const initialState = {
  nombre: '',
  dni: '',
  fechaNacimiento: '',
  edad: '',
  telefono: '',
  email: '',
  conociste: '',
  otroConocisteDetalle: '',
  enfermedad: false,
  enfermedadDetalle: '',
  tratamiento: false,
  tratamientoDetalle: '',
  medicacion: false,
  medicacionDetalle: '',
  cirugias: false,
  cirugiasDetalle: '',
  alergias: false,
  alergiasDetalle: '',
  circulatorio: false,
  circulatorioDetalle: '',
  cardiaco: false,
  cardiacoDetalle: '',
  musculares: false,
  muscularesDetalle: '',
  embarazada: false,
  embarazadaDetalle: '',
  observaciones: '',
  firma: '',
  fecha: '',
  terminos: false,
  firmaDibujo: ''
};

const PatientForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [firmaGuardada, setFirmaGuardada] = useState(false);
  const sigCanvasRef = useRef();

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
    if (sigCanvasRef.current.isEmpty()) {
      alert('La firma está vacía');
      return;
    }
    const dataURL = sigCanvasRef.current.getTrimmedCanvas().toDataURL('image/png');
    setForm((prev) => ({ ...prev, firmaDibujo: dataURL }));
    setFirmaGuardada(true);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'Nombre requerido';
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(form.nombre)) newErrors.nombre = 'Solo letras permitidas';

    if (!form.dni.trim()) newErrors.dni = 'DNI requerido';
    if (!/^[0-9]+$/.test(form.dni)) newErrors.dni = 'DNI inválido';

    if (!form.fechaNacimiento.trim()) newErrors.fechaNacimiento = 'Fecha de nacimiento requerida';

    if (!form.edad.trim()) newErrors.edad = 'Edad requerida';
    if (!/^[0-9]+$/.test(form.edad)) newErrors.edad = 'Solo números permitidos';

    if (!/^[0-9]+$/.test(form.telefono)) newErrors.telefono = 'Número de contacto requerido';

    if (!form.email.trim()) newErrors.email = 'Email requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email inválido';

    if (!form.fecha.trim()) newErrors.fecha = 'Fecha requerida';
    if (!form.firma.trim()) newErrors.firma = 'Firma requerida';
    if (!form.terminos) newErrors.terminos = 'Debe aceptar los términos para continuar';

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
          <Typography variant="h6" gutterBottom>
            📑 Datos del Paciente
          </Typography>

          {/* Primera sección de datos */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre y Apellido" name="nombre" fullWidth value={form.nombre} onChange={handleChange} error={!!errors.nombre} helperText={errors.nombre} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="DNI" name="dni" fullWidth value={form.dni} onChange={handleChange} error={!!errors.dni} helperText={errors.dni} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fecha de nacimiento" name="fechaNacimiento" type="date" fullWidth InputLabelProps={{ shrink: true }} value={form.fechaNacimiento} onChange={handleChange} error={!!errors.fechaNacimiento}
                helperText={errors.fechaNacimiento} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Edad" name="edad" fullWidth value={form.edad} onChange={handleChange} error={!!errors.edad} helperText={errors.edad} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Teléfono" name="telefono" fullWidth value={form.telefono} onChange={handleChange} error={!!errors.telefono}
                helperText={errors.telefono} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" name="email" fullWidth value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                ¿Cómo nos conociste?
              </Typography>
              <TextField
                name="conociste"
                select
                fullWidth
                value={form.conociste}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="Redes">Redes</MenuItem>
                <MenuItem value="Recomendación">Recomendación</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </TextField>
            </Grid>

            {form.conociste === 'Otro' && (
              <Grid item xs={12} sx={{ mt: 3.8 }}>
                <TextField
                  label="¿Cómo nos conociste?"
                  name="otroConocisteDetalle"
                  fullWidth
                  value={form.otroConocisteDetalle}
                  onChange={handleChange}
                />
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              🧬 Salud Actual, si marcás alguna opción debes detallarla.
            </Typography>
          </Grid>

          {[
            { label: '¿Padece alguna enfermedad crónica?', name: 'enfermedad', detalle: 'enfermedadDetalle' },
            { label: '¿Está bajo tratamiento médico?', name: 'tratamiento', detalle: 'tratamientoDetalle' },
            { label: '¿Toma medicación actualmente?', name: 'medicacion', detalle: 'medicacionDetalle' },
            { label: '¿Ha tenido cirugías o lesiones importantes?', name: 'cirugias', detalle: 'cirugiasDetalle' },
            { label: '¿Tiene alergias a medicamentos, aceites o cremas?', name: 'alergias', detalle: 'alergiasDetalle' },
            { label: '¿Problemas circulatorios (varices, trombosis)?', name: 'circulatorio', detalle: 'circulatorioDetalle' },
            { label: '¿Hipertensión o problemas cardíacos?', name: 'cardiaco', detalle: 'cardiacoDetalle' },
            { label: '¿Molestias musculares o contracturas actuales?', name: 'musculares', detalle: 'muscularesDetalle' },
            { label: '¿Está embarazada?', name: 'embarazada', detalle: 'embarazadaDetalle' }
          ].map(({ label, name, detalle }) => (
            <Grid item xs={12} key={name}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                <FormControlLabel
                  control={<Checkbox name={name} checked={form[name]} onChange={handleChange} />}
                  label={label}
                />
                {form[name] && (
                  <TextField
                    label="Especificar"
                    name={detalle}
                    fullWidth
                    value={form[detalle]}
                    onChange={handleChange}
                  />
                )}
              </Box>
            </Grid>
          ))}


          {/* Observaciones */}
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                ¿Observaciones previas al tratamiento?
              </Typography>
              <Paper elevation={2} sx={{ backgroundColor: '#fafafa', p: 2, borderRadius: 2 }}>
                <TextField
                  name="observaciones"
                  multiline
                  rows={6}
                  fullWidth
                  variant="outlined"
                  placeholder="Especificar si hay algo relevante que debamos saber antes del masaje 🤗"
                  value={form.observaciones}
                  onChange={handleChange}
                  InputProps={{
                    sx: {
                      '& .MuiInputBase-input::placeholder': {
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#cccccc' : '#888888',
                        opacity: 1, // asegura visibilidad
                      },
                    },
                  }}
                />

              </Paper>
            </Grid>
          </Grid>

          {/* Firma escrita y fecha */}
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6}>
              <TextField label="Aclaración de Firma" name="firma" fullWidth value={form.firma} onChange={handleChange} error={!!errors.firma} helperText={errors.firma} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fecha" name="fecha" type="date" fullWidth InputLabelProps={{ shrink: true }} value={form.fecha} onChange={handleChange} error={!!errors.fecha} helperText={errors.fecha} />
            </Grid>
          </Grid>

          {/* Firma digital */}
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Firma digital del paciente:
            </Typography>
            <Paper elevation={3} sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#fefefe' }}>
              <SignatureCanvas
                ref={sigCanvasRef}
                penColor="black"
                canvasProps={{ width: 480, height: 160, className: 'sigCanvas' }}
              />
            </Paper>
            <Box sx={{ mt: 1 }}>
              <Button variant="outlined" onClick={() => sigCanvasRef.current.clear()} sx={{ mr: 1 }}>
                Limpiar Firma
              </Button>
              <Button variant="contained" onClick={guardarFirmaDibujo}>
                Guardar Firma
              </Button>
            </Box>
          </Grid>

          {/* Términos y botón */}
          <Grid item xs={12} sx={{ mt: 4 }}>
            <FormControlLabel
              control={<Checkbox name="terminos" checked={form.terminos} onChange={handleChange} />}
              label="Acepto los términos y condiciones del servicio, confirmo que los datos ingresados son verídicos y autorizo al personal de CoSpa Masajes a realizar el tratamiento correspondiente."
            />
            {errors.terminos && (
              <Typography variant="caption" color="error">
                {errors.terminos}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              {initialData ? 'Actualizar Ficha' : 'Registrar Ficha'}
            </Button>
          </Grid>
        </form>
      </Paper>

      {/* Confirmación de firma */}
      <Snackbar
        open={firmaGuardada}
        autoHideDuration={3000}
        onClose={() => setFirmaGuardada(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Firma guardada correctamente
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PatientForm;
