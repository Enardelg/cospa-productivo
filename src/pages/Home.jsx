import React, { useState } from 'react';
import {
  Container,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import Layout from '../components/Layout';
import PatientForm from '../components/PatientForm';
import ExportToExcel from '../components/ExportToExcel';
import PatientList from '../components/PatientList';

const Home = ({ mode, toggleColorMode }) => {
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('patients');
    return saved ? JSON.parse(saved) : [];
  });

  const [editing, setEditing] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deletingPatient, setDeletingPatient] = useState(null);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAdd = (data) => {
    let updated;
    if (editing) {
      updated = patients.map((p) => (p.id === editing.id ? { ...p, ...data } : p));
      showSnackbar('Ficha editada con éxito');
    } else {
      updated = [...patients, { id: Date.now(), ...data }];
      showSnackbar('Ficha registrada con éxito');
    }
    setPatients(updated);
    localStorage.setItem('patients', JSON.stringify(updated));
    setEditing(null);
  };

  const confirmDelete = (id) => {
    const patient = patients.find((p) => p.id === id);
    setDeletingPatient(patient);
  };

  const handleDeleteConfirmed = () => {
    const updated = patients.filter((p) => p.id !== deletingPatient.id);
    setPatients(updated);
    localStorage.setItem('patients', JSON.stringify(updated));
    showSnackbar('Ficha eliminada con éxito');
    setDeletingPatient(null);
  };

  return (
    <Layout mode={mode} toggleColorMode={toggleColorMode}>
      <Container maxWidth="md">
        <PatientForm onSubmit={handleAdd} initialData={editing} />
        <PatientList data={patients} onEdit={setEditing} onDelete={confirmDelete} />

        <ExportToExcel data={patients} />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>

        <Dialog open={!!deletingPatient} onClose={() => setDeletingPatient(null)}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro que deseas eliminar la ficha de{' '}
              <strong>{deletingPatient?.nombre}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeletingPatient(null)}>Cancelar</Button>
            <Button onClick={handleDeleteConfirmed} color="error">Eliminar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default Home;