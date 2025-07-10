import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExportToPDF from './ExportToPDF';

const PatientList = ({ data, onEdit, onDelete }) => {
  if (data.length === 0) return (
    <Box sx={{ mt: 4 }}>
      <Typography align="center" variant="body1" color="text.secondary">
        No hay fichas clínicas registradas aún.
      </Typography>
    </Box>
  );

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {data.map((patient) => (
        <Grid item xs={12} sm={6} key={patient.id}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">{patient.nombre}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    DNI: {patient.dni} — Edad: {patient.edad}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {patient.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Teléfono: {patient.telefono}
                  </Typography>

                  {/* Mostrar firma si existe */}
                  {patient.firmaDibujo && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Firma digital:
                      </Typography>
                      <Box
                        component="img"
                        src={patient.firmaDibujo}
                        alt="Firma digital"
                        sx={{ maxWidth: '100%', height: 80, border: '1px solid #ccc', mt: 1 }}
                      />
                    </Box>
                  )}

                  <Box sx={{ mt: 2 }}>
                    <ExportToPDF form={patient} />
                  </Box>
                </Box>
                <Box>
                  <IconButton onClick={() => onEdit(patient)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(patient.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PatientList;
