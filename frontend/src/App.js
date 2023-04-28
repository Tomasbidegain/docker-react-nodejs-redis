import { Box, Typography } from '@mui/material';
import Characters from './components/Characters/Characters';
import Episodes from './components/Episodes/Episodes';

function App() {
  return (
    <Box sx={{height: '100vh', width: '100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor:'#555' }}>
      <Typography variant='h4' sx={{mt:'20px', color:'#fff', fontWeight:'bold'}}>Trabajo practico N° 2</Typography>
      <Box sx={{height: '100%', width: '100%', display:'flex', justifyContent:'space-around', alignItems:'center' }}>
        <Characters/>
        <Episodes/>
      </Box>  
    </Box>
  );
}

export default App;
