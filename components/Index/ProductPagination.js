import { useRouter } from 'next/router'
import {container, Pagination, Container} from 'semantic-ui-react'


function ProductPagination({totalPages}) {
  const router = useRouter()
  return(
    <Container textAlign="center" style={{ margin: '23m'}}>
      <Pagination
      defaultActivePage={1}
      totalPages={totalPages}
      onPageChange={(event, data)=>{
        data.activePage === 1 

        ? router.push ('/')
        : router.push(`/?page=${data.activePage}`)

        
      }}
      />

    </Container>

  )
}

export default ProductPagination;
