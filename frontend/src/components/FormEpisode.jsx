import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import ViewCharacters from "./ViewCharacters";

export default function FormEpisode({ open, handleClose }) {

  const [episode, setEpisode] = useState("")

  const [characters, setCharacters] = useState()

  const [openView, setOpenView] = useState(false);

  const handleClickOpenView = () => {
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };
  
  const SendData = async () => {
    try {
      if (episode === ''){
        alert('El campo episodio no puede estar vacio.')
        return;
      }
      const response = await fetch('http://localhost:3001/get-all-characters-by-number',{
        method: 'POST',
        body: JSON.stringify({ number_episode: episode }),
        headers: { "Content-Type": "application/json"},
      });
      const data = await response.json();
      
      setCharacters(data)
      handleClickOpenView();
      setEpisode('')
      handleClose();
    } catch (error) {
      alert('Ha ocurrido un error.')
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ingrese el episodio</DialogTitle>
        <DialogContent>
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
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type='submit' onClick={() => SendData()}>Buscar</Button>
        </DialogActions>
      </Dialog>
      <ViewCharacters open={openView} handleClose={handleCloseView} characters={characters}/>
    </div>
  );
}