import { Button, Card, Typography } from "@mui/material";
import AllEpisodes from "./AllEpisodes";
import RentedEpisode from "./RentedEpisode";
import ReservedEpisode from "./ReservedEpisode";
import { useState } from "react";

const Episodes = () => {
  const [openEpisodes, setOpenEpisodes] = useState(false);
  const [openReserved, setOpenReserved] = useState(false);
  const [openRented, setOpenRented] = useState(false);

  const OpenEpisodes = () => {
    setOpenEpisodes(true);
  };

  const CloseEpisodes = () => {
    setOpenEpisodes(false);
  };

  const OpenReserved = () => {
    setOpenReserved(true);
  };

  const CloseReserved = () => {
    setOpenReserved(false);
  };

  const OpenRented = () => {
    setOpenRented(true);
  };

  const CloseRented = () => {
    setOpenRented(false);
  };

  return ( 
    <Card sx={{width:'450px', padding:'20px', height:'300px', display:'flex',  flexDirection:'column', justifyContent:'space-between ',alignItems:'center', backgroundColor: '#eaeaea' }}>
      <Typography variant='h1' sx={{fontSize:'30px', mb:'60px'}} align='center'>Episodios de Mandalorian</Typography>
      <Button variant='outlined' sx={{minWidth:'300px'}} onClick={OpenEpisodes}>Ver todos los episodios</Button>
      <Button variant='outlined' sx={{minWidth:'300px'}} onClick={OpenReserved}>Reservar un episodio</Button>
      <Button variant='outlined' sx={{minWidth:'300px'}} onClick={OpenRented}>Alquilar un episodio</Button>
      <AllEpisodes open={openEpisodes} handleClose={CloseEpisodes}/>
      <ReservedEpisode open={openReserved} handleClose={CloseReserved}/>
      <RentedEpisode open={openRented} handleClose={CloseRented}/>
    </Card>
   );
}
 
export default Episodes;