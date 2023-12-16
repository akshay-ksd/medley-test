import React, { FC, useEffect, useState } from 'react'
import { ChevronBackOutline, ChevronForwardOutline } from 'react-ionicons'
interface paginationBarType {
    activePageNumber:(page:number)=>void;
    metaData:metaDataType
}
const PaginationBar:FC<paginationBarType> = ({activePageNumber,metaData}) => {
    // const totalPages = new Array(20).fill(0).map((value, index) => index + 1);
    const [totalPages,setTotalPage] = useState<any>([])
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(5)
    const [activePage,setActivePage] = useState(1)
    const visiblePages = totalPages.slice(start, end);

    useEffect(()=>{
        const count = Math.round(metaData?.totalCount/metaData?.limit)
        if(count){
            const page = new Array(count).fill(0).map((value, index) => index + 1);
            setTotalPage(page)
        }
    },[metaData])
    const forward = () => {
            if (end < totalPages.length) {
                setEnd((prev) => Math.min(prev + 4, totalPages.length));
                setStart((prev) => Math.min(prev + 4, totalPages.length));
                selectPage(start+5)
            }
    };

    const backward = () => {
        // if(activePage > start){
        //     const p = activePage - 1;
        //     selectPage(p)
        // }else{
            if (start > 0) {
                setEnd((prev) => Math.max(prev - 4, 0));
                setStart((prev) => Math.max(prev - 4, 0));
                selectPage(end-4)
            }
        // }
    };

    const selectPage = (page:number) => {
        setActivePage(page)
        activePageNumber(page)
    }
    return (
        <div className='w-2/6 h-12 items-center flex justify-between   rounded-md px-3 bg-lightGray'>
            <button className={`w-10 h-10 rounded-full flex items-center justify-center bg-primary shadow-md`} >
                <ChevronBackOutline
                    color={'white'}
                    height="25px"
                    width="25px"
                    onClick={backward}
                />
            </button>
            {
                visiblePages.map((item: number, index: number) => (
                    <button className={`w-10 h-10 rounded-md ${activePage == item?"bg-primary":"bg-white"}   shadow-md flex items-center justify-center`}onClick={()=>selectPage(item)}>
                        <p className={`text-base md:text-xm lg:text-sm xl:text-md font-poppins ${activePage == item?"text-white":"text-textColor"}`}>{item}</p>
                    </button>
                ))
            }


            <button className={`w-10 h-10 rounded-full flex items-center justify-center bg-primary shadow-md`}>
                <ChevronForwardOutline
                    color={'white'}
                    height="25px"
                    width="25px"
                    onClick={forward}
                />
            </button>


        </div>
    )
}

export default PaginationBar