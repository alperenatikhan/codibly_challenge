import {Container} from '@mui/material/'


export default function DataTable({tableData, currentPage, pageCount, isSearched, searchResults}) {
    return (
        <table>

<thead>
  <tr>
<th id='id'> ID </th>
<th id='name'> Name </th>
<th id='year' > Year </th>
</tr>

</thead>


  <tbody>



{tableData.map(item=> <tr className='tableRow'  key={item.id}> <td id='idCell' style={{backgroundColor: `${item.color}`}}> {item.id}</td> <td colspan="3" style={{backgroundColor: `${item.color}`}}> {item.name}</td> <td colspan="2" style={{backgroundColor: `${item.color}`}}> {item.year}</td>   </tr>)  }

{<tr className="pageInfo"> <td colspan="4" > Page <strong>{(isSearched)? 1 :currentPage}</strong> of <strong>{ isSearched? Math.ceil(searchResults.length/5) : pageCount}</strong> </td></tr>}
</tbody>
</table>
            

    )
}
