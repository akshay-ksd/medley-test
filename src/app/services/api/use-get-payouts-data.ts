import { useEffect, useLayoutEffect, useState } from "react";
import Instance from "../instance";
import { get_payouts, search_payouts } from "../endpoints";
import axios from "axios";
import { BaseUrl } from "../../../../staging";

// Define types for your data
type ErrorType = string | null;

const useGetPayoutsData = () => {
    const [error, setError] = useState<ErrorType>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [payouts, setPayouts] = useState<payoutDataType[]>([]);
    const [metaData, setMetaData] = useState<metaDataType>({} as metaDataType);
    const [noData, setNoData] = useState(false)

    const getPayoutData = (page: number) => {
        setLoading(true)
        setNoData(false)
        try {
            Instance.get(get_payouts, {
                params: {
                    page: page, // Set the page number you want to retrieve
                    limit: 10, // Set the number of payouts per page
                }
            }).then((res: any) => {
                setMetaData(res?.data?.metadata);
                setPayouts(res?.data?.data);
                setLoading(false);
            });
        } catch (err) {
            setError("An error occurred while fetching payout data.");
            setLoading(false);
            alert("Check Your Internet Connection")
        }
    };

    const searchPayouts = (query: string) => {
        if (query||query.length) {
            setNoData(false)
            setLoading(true)
            try {
                Instance.get(search_payouts, {
                    params: {
                        query: query, // Set the page number you want to retrieve
                    }
                }).then((res: any) => {
                    if (res?.data?.length) {
                        setPayouts(res.data)
                        setLoading(false);
                    } else {
                        setLoading(false)
                        setNoData(true)
                    }
                });
            } catch (err) {
                setError("An error occurred while fetching payout data.");
                setLoading(false);
                alert("Check Your Internet Connection")
            }
        }else{
            setNoData(false)
            getPayoutData(1)
        }
    }

    return [error, loading, payouts, metaData, getPayoutData, searchPayouts, noData] as const;
};

export default useGetPayoutsData;
