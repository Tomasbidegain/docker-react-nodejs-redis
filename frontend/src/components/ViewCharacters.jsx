import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ViewCharacters = ( {characters, open, handleClose} ) => {

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Personajes</DialogTitle>
        <DialogContent>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>Nombre</TableCell>
            <TableCell align="right" sx={{fontWeight:'bold'}}>Episodio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters ? characters.map((character) => {
            return(
            <TableRow
              // key={character[1]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {character[1]}
              </TableCell>
              <TableCell align="right">{character[0]}</TableCell>
            </TableRow>)
          }):(<></>)}
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

 
export default ViewCharacters;