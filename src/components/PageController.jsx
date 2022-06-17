import {ButtonGroup,Button} from '@mui/material'
import {ChevronLeft, ChevronRight,Share} from '@mui/icons-material'

export default function PageController({modalOpen, setModalOpen, urlLink, currentPage,setCurrentPage,pageCount, searchId, searchResults}) {
    
    
    
    return (

            <>
            <ButtonGroup size='medium' sx={{ margin: '1rem'}} >
                <Button classname= 'pageButton' startIcon={<ChevronLeft/>} onClick={()=> currentPage >1 && setCurrentPage(currentPage-1)} disabled={ currentPage==1 || (searchId && searchResults.length==1)}>Previous </Button>
                <Button startIcon={<Share/>} onClick={() => setModalOpen(!modalOpen)}> Share</Button>
                <Button endIcon={<ChevronRight/>} onClick={()=> pageCount > currentPage && setCurrentPage(currentPage+1)} disabled={currentPage==pageCount || (searchId && searchResults.length==1)} > Next </Button>
            </ButtonGroup>


            </>
        

    )
}

