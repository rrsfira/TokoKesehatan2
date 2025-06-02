import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import TransactionAdmin from '../../features/transactionAdmin'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Transaksi"}))
      }, [])


    return(
        <TransactionAdmin />
    )
}

export default InternalPage