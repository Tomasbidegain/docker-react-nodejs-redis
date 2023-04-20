import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCharacter({ open, handleClose, del }) {

  const [name, setName] = useState("")
  const [episode, setEpisode] = useState("")
  
  const SendData = async () => {
    try {
      if(name === '' || episode === ''){
        alert('Complete los campos.')
        return;
      }
      if(del){
        await fetch('http://localhost:3001/delete-character',{
          method: 'DELETE',
          body: JSON.stringify({number_episode: episode, name_character: name}),
          headers: { "Content-Type": "application/json"},
        })
        alert('Personaje creado con éxito.')
        setName('')
        setEpisode('')
        handleClose();
        return;
      }
      else{
        await fetch('http://localhost:3001/add-character',{
          method: 'POST',
          body: JSON.stringify({number_episode: episode, name_character: name}),
          headers: { "Content-Type": "application/json"},
        });
        alert('Personaje creado con éxito.')
        setName('')
        setEpisode('')
        handleClose();
        return;
      }
    } catch (error) {
      alert('Ha ocurrido un error.')
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{!del ? 'Crear personaje':'Eliminar personaje'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            required
            value={name}
            onChange={(e) => setName(e.target.value) }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Episodio"
            type="text"
            fullWidth
            variant="standard"
            required
            value={episode}
            onChange={(e) => setEpisode(e.target.value) }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' onClick={() => SendData()}>{!del ? 'Crear':'Eliminar'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}