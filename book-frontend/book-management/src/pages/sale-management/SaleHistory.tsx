import { useState } from "react";
import FilterDropdown from "../../components/filter/FilterDropdown";
import { useGetAllSalesQuery } from "../../redux/features/book/bookApi";
import { Table } from "antd";
import { format } from "date-fns";

const SaleHistory = () => {

    interface Book {
        _id: string;
        name: string;
        price: number;
        quantity: number;
        author: string;
    }

    interface Sale {
        _id: string;
        bookId: Book;
        buyerName: string;
        quantity: number;
        saleDate: string;
        createdAt: string;
        updatedAt: string;
    }

    interface GroupedData {
        byDay: { [key: string]: Sale[] };
        byMonth: { [key: string]: Sale[] };
        byYear: { [key: string]: Sale[] };
        byWeek: { [key: string]: Sale[] };
    }

    const filterOptions = [{
        label: 'Daily',
        value: 'Daily',
    }, {
        label: 'Weekly',
        value: 'Weekly',
    },
    {
        label: 'Monthly',
        value: 'Monthly',
    },
    {
        label: 'Yearly',
        value: 'Yearly',
    },
    ]

    const columns = [
        {
            title: 'Buyer',
            dataIndex: 'buyer',
            key: 'buyer',
        },
        {
            title: 'Book Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
    ];

    const [selectedFilter, setSelectedFilter] = useState('');

    const handleFilterChange = (value:string) => {
        console.log(value);
        setSelectedFilter(value)
    }
    console.log(selectedFilter);
    const { data } = useGetAllSalesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    console.log(data?.data);
    const salesData = data?.data;

    const groupSalesData = (data: Sale[]): GroupedData => {
        const groupedData: GroupedData = {
            byDay: {},
            byMonth: {},
            byYear: {},
            byWeek: {},
        };

        data?.forEach((sale) => {
            const saleDate = new Date(sale.saleDate);

            // Check if saleDate is a valid date
            if (!isNaN(saleDate.getTime())) {
                // Group by day
                const dayKey = saleDate?.toISOString().split('T')[0];
                groupedData.byDay[dayKey] = groupedData?.byDay[dayKey] || [];
                groupedData.byDay[dayKey]?.push(sale);

                // Group by month
                const monthKey = `${saleDate.getFullYear()}-${saleDate.getMonth() + 1}`;
                groupedData.byMonth[monthKey] = groupedData?.byMonth[monthKey] || [];
                groupedData.byMonth[monthKey]?.push(sale);

                // Group by year
                const yearKey = saleDate.getFullYear().toString();
                groupedData.byYear[yearKey] = groupedData?.byYear[yearKey] || [];
                groupedData.byYear[yearKey]?.push(sale);

                // Group by ISO week using date-fns
                const isoWeekKey = format(saleDate, 'w');
                groupedData.byWeek[isoWeekKey] = groupedData?.byWeek[isoWeekKey] || [];
                groupedData.byWeek[isoWeekKey]?.push(sale);
            } else {
                console.error('Invalid saleDate:', sale.saleDate);
            }
        });

        return groupedData;
    };

    // Usage
    const groupedSalesData = groupSalesData(salesData);

    console.log('Sales by Day:', groupedSalesData.byDay);
    console.log('Sales by Month:', groupedSalesData.byMonth);
    console.log('Sales by Year:', groupedSalesData.byYear);
    console.log('Sales by Week:', groupedSalesData.byWeek);

    let filteredData:any;

    if (selectedFilter === 'Daily') {
        filteredData = groupedSalesData?.byDay;
    }
    else if (selectedFilter === 'Weekly') {
        filteredData = groupedSalesData?.byWeek;
    }
    else if (selectedFilter === 'Monthly') {
        filteredData = groupedSalesData?.byMonth;
    }
    else if (selectedFilter === 'Yearly') {
        filteredData = groupedSalesData?.byYear;
    }

    else
        filteredData = groupedSalesData?.byDay;
    console.log(Object.keys(filteredData));

    return (
        <>
            <h1 style={{ marginBottom: '10px' }}>Sale History</h1>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <FilterDropdown label='Filter' options={filterOptions} onChange={handleFilterChange} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                {

                    Object.keys(filteredData)?.map(key => {
                        console.log( filteredData[key][0]);
                        const flattenedData = filteredData[key]?.map((item:any) => ({

                            buyer: item?.buyerName,
                            // @ts-ignore
                            price: item?.cart?.map(book=> book?.price).toString(),
                            // @ts-ignore
                            quantity: item?.cart?.map(book=> book?.qty).toString(),
                            // @ts-ignore
                            name: item?.cart?.map(book=> book?.name).toString(),
                            // @ts-ignore
                            author: item?.cart?.map(book=> book?.author).toString(),

                        }));
                        let filterName;
                        if(selectedFilter === 'Daily'){
                            filterName = `Day  ${key}`
                        }
                        else if(selectedFilter === 'Weekly'){
                            filterName = `Week  ${key}`;
                        }
                        else if(selectedFilter === 'Monthly'){
                            const monthKey = key.split('-')[1]
                            let month;
                            if(monthKey === '1'){
                                month = 'January';
                            } 
                            else if(monthKey === '2'){
                                month = 'February';
                            } 
                            else if(monthKey === '3'){
                                month = 'March';
                            } 
                            else if(monthKey === '4'){
                                month = 'April';
                            } 
                            else if(monthKey === '5'){
                                month = 'May';
                            } 
                            else if(monthKey === '6'){
                                month = 'June';
                            } 
                            else if(monthKey === '7'){
                                month = 'July';
                            } 
                            else if(monthKey === '8'){
                                month = 'August';
                            } 
                            else if(monthKey === '9'){
                                month = 'September';
                            } 
                            else if(monthKey === '10'){
                                month = 'October';
                            } 
                            else if(monthKey === '11'){
                                month = 'November';
                            } 
                            else if(monthKey === '12'){
                                month = 'December';
                            } 
                            filterName = `${month}`;
                        }
                        else if(selectedFilter === 'Yearly'){
                            filterName = `Year  ${key}`;
                        }
                        else 
                            filterName = '';
                        return (
                            <div key={key}>
                                {<h3 style={{ margin: '10px' }}>{filterName}</h3>}
                                <Table columns={columns} dataSource={flattenedData} />
                            </div>
                        )
                    })
                }

            </div>
        </>
    );
};

export default SaleHistory;