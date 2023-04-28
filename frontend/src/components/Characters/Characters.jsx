import { Button, Typography, Card} from "@mui/material";
import AddCharacter from "./AddCharacter";
import FormEpisode from "./FormEpisode";
import ViewCharacters from "./ViewCharacters";
import { useState } from "react";

const Characters = () => {

  const [openForm, setOpenForm] = useState(false);
  const [openFormEpisode, setOpenFormEpisode] = useState(false);
  const [openCharacters, setOpenCharacters] = useState(false);
  const [del, setDel] = useState(false);

  const [characters, setCharacters] = useState();

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleClickOpenFormEpisode = () => {
    setOpenFormEpisode(true);
  };

  const handleCloseFormEpisode = () => {
    setOpenFormEpisode(false);
  };

  const handleClickOpenCharacters = () => {
    setOpenCharacters(true);
  };

  const handleCloseCharacters = () => {
    setOpenCharacters(false);
  };

  const getAllCharacters = async () => {
    try {
      const result = await fetch('http://localhost:3001/get-all-characters', {
        method: 'GET'
      })
      const data = await result.json()
      setCharacters(data)
      handleClickOpenCharacters()
    } catch (error) {
      
    }
  }

  return ( 
    <Card sx={{ width:'450px',padding:'20px', height:'300px', display:'flex', flexDirection:'column', justifyContent:'space-between ',alignItems:'center', backgroundColor: '#eaeaea' }}>
      <Typography variant='h1' sx={{fontSize:'30px', mb:'60px'}} align='center'>Cree, liste y elimine personajes</Typography>
      <Button variant='outlined' sx={{minWidth:'300px'}} onClick={() => {setDel(false);handleClickOpenForm()}}>Crear personaje</Button>
      <Button variant='outlined' sx={{minWidth:'300px', mt: '20px'}} onClick={(() => {setDel(true); handleClickOpenForm()})}>Eliminar personaje</Button>
      <Button variant='outlined' sx={{minWidth:'300px', mt: '20px'}} onClick={getAllCharacters}>Ver todos los personajes</Button>
      <Button variant='outlined' sx={{minWidth:'300px', mt: '20px'}} onClick={handleClickOpenFormEpisode} >Ver personajes por episodio</Button>
      <AddCharacter open={openForm} handleClose={handleCloseForm} del={del}/>
      <FormEpisode open={openFormEpisode} handleClose={handleCloseFormEpisode}/>
      <ViewCharacters characters={characters} handleClose={handleCloseCharacters} open={openCharacters}/>
    </Card>
   );
}
 
export default Characters;