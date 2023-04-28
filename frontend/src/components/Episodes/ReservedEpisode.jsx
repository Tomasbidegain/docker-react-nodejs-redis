import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

const ReservedEpisode = ({open, handleClose}) => {

  const [numberEpisode, setNumberEpisode] = useState('')

  const SendData = async () => {
    try {
      if (numberEpisode === ''){
        alert('El campo número de episodio no puede estar vacio.')
        return;
      }
     await fetch('http://localhost:3001/update-episodes',{
        method: 'POST',
        body: JSON.stringify({ number_episode: numberEpisode }),
        headers: { "Content-Type": "application/json"},
      });
      alert('El episodio se reservo por 4 minutos, si no confirma el pago dentro de este tiempo ya no estara reservado.')
      setNumberEpisode('')
      handleClose();
    } catch (error) {
      alert('Ha ocurrido un error.')
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ingrese el numero de episodio a reservar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Número de episodio"
            type="text"
            fullWidth
            variant="standard"
            required
            value={numberEpisode}
            onChange={(e) => setNumberEpisode(e.target.value) }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type='submit' onClick={(e) => SendData(e)}>Reservar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 
export default ReservedEpisode;