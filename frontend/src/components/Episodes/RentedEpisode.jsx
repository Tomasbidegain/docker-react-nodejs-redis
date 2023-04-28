import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

const RentedEpisode = ({open, handleClose}) => {

  const [numberEpisode, setNumberEpisode] = useState('')
  const [priceEpisode, setPriceEpisode] = useState(0)

  const SendData = async () => {
    try {
      if (numberEpisode === ''){
        alert('El campo número de episodio no puede estar vacio.')
        return;
      }
      const resolve = await fetch('http://localhost:3001/confirmPayment',{
        method: 'POST',
        body: JSON.stringify({ number_episode: numberEpisode, price: priceEpisode }),
        headers: { "Content-Type": "application/json"},
      });
      const data = await resolve.json()
      console.log(data)
      alert(data.msg)
      setNumberEpisode('')
      handleClose();
    } catch (error) {
      alert('Ha ocurrido un error.')
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ingrese el numero de episodio a alquilar</DialogTitle>
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
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Precio"
            type="number"
            fullWidth
            variant="standard"
            required
            value={priceEpisode}
            onChange={(e) => setPriceEpisode(e.target.value) }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type='submit' onClick={(e) => SendData(e)}>Alquilar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 
export default RentedEpisode;