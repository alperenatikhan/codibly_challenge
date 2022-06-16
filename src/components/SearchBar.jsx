import {Typography,Grid, Container,Card, Button, OutlinedInput, InputAdornment} from '@mui/material/';
import {Search} from '@mui/icons-material/';


export default function SearchBar({tableData, searchId, setSearchId, setDigitWarning, digitWarning, pageWarning}) {

    const handleInputChange=(el)=>{

        if(el.target.value.match(/\D/)){
            setDigitWarning(true)
        }else{
          setDigitWarning(false)
        }
  
        const searchValue = el.target.value.replace(/\D/, "");
          setSearchId(searchValue);
      
      }


    return (
    <Container>
      <Card className='inputWrapper' display='flex' flexDirection='column' elevation={1} align='center' justifyItems='space-around' style={{borderRadius:"14px"}}>

     
     <OutlinedInput color='secondary' className='searchBox' placeholder="Please search with id*" value={searchId} onChange={handleInputChange}  endAdornment={
              <InputAdornment position="end"><Search/></InputAdornment> }  />

            { digitWarning && <Typography variant="body2" color='secondary'> *Only numbers are accepted</Typography>}
           
     </Card>
    </Container>
    )
}


