import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"

const AllEpisodes = ( {open, handleClose }) => {

  const [ episodes, setEpisodes ] = useState([])

  const getAllEpisodes = async () => {
    try {
      const result = await fetch('http://localhost:3001/get-all-episodes', {
        method: 'GET'
      })
      const data = await result.json()
      setEpisodes(data)
    } catch (error) {
      
    }
    }

    useEffect(() => {
      getAllEpisodes()
    })

  return ( 
    <div>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Episodios</DialogTitle>
      <DialogContent>
      <TableContainer
       component={Paper}>
    <Table sx={{ minWidth: 400 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell sx={{fontWeight:'bold'}}>Número</TableCell>
          <TableCell align="right" sx={{fontWeight:'bold'}}>Nombre</TableCell>
          <TableCell align="right" sx={{fontWeight:'bold'}}>Estado</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {episodes ? episodes.map((episode) => {
          return(
          <TableRow
            // key={episode[1]}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">{episode[0]}</TableCell>
            <TableCell align="right">{episode[1]}</TableCell>
            <TableCell align="right" sx={{color: episode[2]==='available' ? 'green' : episode[2] === 'reserved' ? 'yellow' : 'red'}}>{episode[2]}</TableCell>
          </TableRow>)
        }):(<>No hay episodios</>)}
      </TableBody>
    </Table>
  </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  </div>
  );
}
 
export default AllEpisodes;