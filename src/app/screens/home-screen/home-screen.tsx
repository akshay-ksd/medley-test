import React, { useRef } from 'react'
import Header from '@/app/components/molecules/header/header'
import PayoutHistory from '@/app/components/template/payout-history/payout-history'
const HomeScreen = () => {
    const listRef = useRef<any>()
    const searchValue =(query:string) =>{
        listRef?.current?.searchedQuery(query)
    }
    return (
        <div className="min-h-screen flex flex-col">
            <Header searchValue={searchValue}/>
            <PayoutHistory ref={listRef}/>
        </div>
    )
}

export default HomeScreen