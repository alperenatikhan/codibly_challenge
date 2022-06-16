import SearchBar from './components/SearchBar'
import DataTable from './components/DataTable'
import PageController from './components/PageController'
import {Container, LinearProgress, Typography,Button, Grid} from '@mui/material/'
import {DesktopAccessDisabled, ContentCopy}from '@mui/icons-material/'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useState,useEffect, useMemo} from 'react'
import './App.css'






export default function App() {

    // pageParam =>currentPage  idParam => searchId
    //Router is defined in indexjs

let {idParam, pageParam}= useParams()


   


    useEffect(()=>{setTimeout(() => fetchData(), 2000)},[] )

const [tableData,setTableData ]= useState('loading')
const fetchData = () => axios.get('https://reqres.in/api/products').then((results) => results.data).then(item=> item.data).then(item=> setTableData(item)).catch(() => setTableData('error'))
const pageCount=(obj)=> (obj==='loading' || obj==='error' || obj== null)? null: Math.ceil(obj.length/5)
const [searchId,setSearchId]= useState(parseInt(idParam) ? parseInt(idParam): null)
const [digitWarning,setDigitWarning]= useState(false)
const [currentPage, setCurrentPage] = useState(1)
const [urlLink,setUrlLink] = useState('localhost:3000/')
const [modalOpen, setModalOpen] = useState(false)
const [copySuccess, setCopySuccess]= useState(false)

function generateLink(searchId,currentPage){
    
    let pageLink= `https://codibly-challenge.vercel.app/`
    
    if (searchId){
    pageLink = `${pageLink}/id/${searchId}`
    }else if(currentPage){
    pageLink = `${pageLink}/page/${currentPage}`
    } 


    
    return pageLink

}

useEffect(()=>{

    setUrlLink(()=>generateLink(searchId,currentPage))
    
    } ,[searchId, currentPage])


//If user wants to go to a page-number which does not exist, this function prevents it by resetting the page to the biggest or lowest existing page-number.
//Also generates an error message displayed under navbar 
function handlePageParam(pageParam){

    if(parseInt(pageParam) > pageCount(tableData)){ 
        setCurrentPage(pageCount(tableData))
       
    }else if(parseInt(pageParam) <= 0){
        setCurrentPage(1)
       

    }else if(parseInt(pageParam) <= pageCount(tableData)){
        setCurrentPage(parseInt(pageParam))
       
    
    }else {
        setCurrentPage(1)
        
    }
}





useEffect (() => {
    
   handlePageParam(pageParam)
        
    }, [pageParam,tableData])

const handleCopy=()=> {
setTimeout(()=>setModalOpen(false),1000)
setCopySuccess(true)
setTimeout(()=> setCopySuccess(false), 3000)
}
    


const pageData = useMemo(() =>tableData.slice(5 *(currentPage-1) , 5 * currentPage),[tableData,currentPage] )
const filterSearch = (keyword) => (tableData!='error' && tableData!='loading') && tableData.filter(item=> item.id== keyword) 
const searchResults= useMemo(()=>filterSearch(searchId),[searchId,tableData] )


    return (
<main>
<SearchBar tableData={tableData} searchId={searchId} setSearchId={setSearchId} setDigitWarning={setDigitWarning} digitWarning={digitWarning}/>


<article>
<Container className='resultsWrapper' align='center'>
    <Grid container align='center' justifyContent='center'>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
{
(tableData != 'loading' && tableData!='error' && searchId && searchResults.length==0 )?<Typography variant="body"> <span> <DesktopAccessDisabled/> </span> Unfortunately, no results can be found  </Typography>:
(tableData != 'loading' && tableData!='error' && searchId && searchResults.length> 0 )? <DataTable tableData={searchResults} pageCount={pageCount(searchResults)} currentPage={currentPage} isSearched={true} searchResults={searchResults} />: 
(tableData != 'loading' && tableData!='error')? <DataTable tableData={pageData} pageCount={pageCount(tableData)} currentPage={currentPage} />

: tableData=='error'? <> An error occured</>: <> <LinearProgress className='progressBar'/> </>}

{ 
(searchId && searchResults.length==0)? null:
(tableData != 'loading' && tableData!='error') && <PageController modalOpen={modalOpen} setModalOpen={setModalOpen} urlLink={urlLink} currentPage={currentPage} setCurrentPage= {setCurrentPage} pageCount={pageCount(tableData)} searchResults={searchResults} searchId={searchId}/>}

</Grid>
</Grid>

</Container>

{modalOpen && <Container display='flex' flexDirection='row' justifyContent= 'space-between' align='center'> <CopyToClipboard text={urlLink} onCopy={handleCopy}>

<Button startIcon={<ContentCopy/> }/></CopyToClipboard> <Typography variant='body'sx={{marginLeft:'0.5em', padding:'0.5em',backgroundColor:'azure'}} >{urlLink}</Typography> </Container> }
{copySuccess && <Container align='center'> <Typography variant='body' color='primary'> Copied Successfully </Typography> </Container>}
</article>
</main>
)
}
 