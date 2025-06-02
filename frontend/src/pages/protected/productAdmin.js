import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ProductAdmin from '../../features/productAdmin'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Produk"}))
      }, [])


    return(
        <ProductAdmin />
    )
}

export default InternalPage