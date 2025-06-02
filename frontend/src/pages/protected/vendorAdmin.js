import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Vendors from '../../features/vendors'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Vendor"}))
      }, [])


    return(
        <Vendors />
    )
}

export default InternalPage