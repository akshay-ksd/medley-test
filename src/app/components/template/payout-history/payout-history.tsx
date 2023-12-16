import React, { FC, forwardRef, useEffect, useImperativeHandle } from 'react';
import useGetPayoutsData from '@/app/services/api/use-get-payouts-data';
import moment from 'moment';
import PaginationBar from '../../organizer/pagination-bar/pagination-bar';
import Loader from '../../organizer/loader/loader';

const PayoutHistory:FC<any> = (props,ref) => {
  const payoutData: payoutDataType[] = [
    { userName: 'John Doe', dateTime: '2023-01-01 10:00 AM', status: 'Paid', value: '$100' },
    { userName: 'Jane Doe', dateTime: '2023-01-02 2:30 PM', status: 'Pending', value: '$50' },
    { userName: 'John Doe', dateTime: '2023-01-01 10:00 AM', status: 'Paid', value: '$100' },
    { userName: 'Jane Doe', dateTime: '2023-01-02 2:30 PM', status: 'Pending', value: '$50' },
    { userName: 'John Doe', dateTime: '2023-01-01 10:00 AM', status: 'Paid', value: '$100' },
    { userName: 'Jane Doe', dateTime: '2023-01-02 2:30 PM', status: 'Pending', value: '$50' },
    { userName: 'John Doe', dateTime: '2023-01-01 10:00 AM', status: 'Paid', value: '$100' },
    { userName: 'Jane Doe', dateTime: '2023-01-02 2:30 PM', status: 'Pending', value: '$50' },
    { userName: 'John Doe', dateTime: '2023-01-01 10:00 AM', status: 'Paid', value: '$100' },
    { userName: 'Jane Doe', dateTime: '2023-01-02 2:30 PM', status: 'Pending', value: '$50' },
    { userName: 'John Doe', dateTime: '2023-01-01 10:00 AM', status: 'Paid', value: '$100' },
    { userName: 'Jane Doe', dateTime: '2023-01-02 2:30 PM', status: 'Pending', value: '$50' },
    { userName: 'John Doe', dateTime: '2023-01-01 10:00 AM', status: 'Paid', value: '$100' },
    { userName: 'Jane Doe', dateTime: '2023-01-02 2:30 PM', status: 'Pending', value: '$50' },
    { userName: 'John Doe', dateTime: '2023-01-01 10:00 AM', status: 'Paid', value: '$100' },
    { userName: 'Jane Doe', dateTime: '2023-01-02 2:30 PM', status: 'Pending', value: '$50' },
    { userName: 'John Doe', dateTime: '2023-01-01 10:00 AM', status: 'Paid', value: '$100' },
    { userName: 'Jane Doe', dateTime: '2023-01-02 2:30 PM', status: 'Pending', value: '$50' },
    // Add more data as needed
  ];
  type ErrorType = string | null;

  //hook
  const [error, loading, payouts, metaData, getPayoutData,searchPayouts,noData]: any = useGetPayoutsData();

  useEffect(() => {
    getPayoutData(1)
  }, [])

  useImperativeHandle(ref,()=>({
    searchedQuery:(query:string)=>{
      searchPayouts(query)
    }
  }))

  const changePage = (page: number) => {

    getPayoutData(page)
  }
  return (
    <div className='w-full flex-col flex-grow p-16'>
      <div className='items-center flex w-full justify-between'>
        <div className='items-center flex'>
          <div className='h-8 w-5 bg-primary rounded-md' />
          <p className='text-base md:text-sm lg:text-md xl:text-xl text-textColor ml-5 font-poppins'>Payout History</p>
        </div>

        <PaginationBar activePageNumber={changePage} metaData={metaData} />
      </div>

      <div className='w-full h-10 flex justify-between px-8 mt-5 items-center'>
        <div className='w-3/6 flex h-full items-center'>
          <p className='text-base md:text-[12px] lg:text-[12px] xl:text-[12px] text-gray-500 font-poppins'>User Name</p>
        </div>
        <div className='w-3/6 flex h-full items-center '>
          <p className='text-base md:text-[12px] lg:text-[12px] xl:text-[12px] text-gray-500 font-poppins'>Date & Time</p>
        </div>
        <div className='w-1/2 flex h-full items-center'>
          <p className='text-base md:text-[12px] lg:text-[12px] xl:text-[12px] text-gray-500 font-poppins'>Status</p>
        </div>
        <div className='w-[200px] flex h-full items-center '>
          <p className='text-base md:text-[12px] lg:text-[12px] xl:text-[12px] text-gray-500 font-poppins'>Value</p>
        </div>
      </div>

      <div className='w-full h-[calc(80vh-176px)] overflow-y-scroll'>
        {
          loading ?
            <>
              <Loader />
              <Loader />
              <Loader />
            </>
            :
            noData?
            <div className='w-full h-full flex items-center justify-center'>
                <p className='text-xl font-medium text-black font-poppins'>No Search Found</p>
            </div>
            :
            <>
              {payouts.map((item: payoutDataType, index: number) => (
                <div
                  key={index}
                  className={`w-full h-12 flex justify-between mt-1 items-center px-8 ${index % 2 === 0 ? 'bg-lightGray' : 'bg-white'} rounded-md`}
                >
                  <div className='w-3/6 flex h-full items-center'>
                    <p className='text-base md:text-xs lg:text-sm xl:text-md text-gray-500 font-medium font-poppins'>{item?.username}</p>
                  </div>
                  <div className='w-3/6 flex h-full items-center '>
                    <p className='text-base md:text-xs lg:text-sm xl:text-md text-gray-500 font-medium font-poppins'>{moment(item?.dateAndTime).format("dddd MMM Do")}</p>
                  </div>
                  <div className='w-1/2 flex h-full items-center'>
                    <div className={`h-7 rounded-md ${item?.status === 'Pending' ? 'bg-green' : 'bg-buttonGray'} items-center justify-center flex px-2`}>
                      <p className='text-base md:text-xs lg:text-sm xl:text-md text-textColor font-medium font-poppins'>{item?.status}</p>
                    </div>
                  </div>
                  <div className='w-[200px] flex h-full items-center '>
                    <p className='text-base md:text-xs lg:text-sm xl:text-md text-textColor font-medium font-poppins'>{item?.value}</p>
                  </div>
                </div>
              ))}
            </>

        }

      </div>
    </div>
  );
};

export default forwardRef(PayoutHistory);
