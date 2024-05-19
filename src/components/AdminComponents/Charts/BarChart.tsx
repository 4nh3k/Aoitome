import Chart from 'react-apexcharts'
import { orderingApi } from '../../../apis/ordering.api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import AdminDropdown from '../Input/AdminDropdown';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

const BarChart = () => {

  const [period, setPeriod] = useState<string>();
  const [label, setLabel] = useState('last 7 days');
  const [totalAmount, setTotalAmount] = useState<number>();
  const { data: weeklyData, isLoading: isLoadingWeek } = useQuery({
    queryKey: ['weekly-transaction'],
    queryFn: () => {
      return orderingApi.getTransactionByWeek()
    }
  });

  const { data: monthlyData, isLoading: isLoadingMonth } = useQuery({
    queryKey: ['monthly-transaction'],
    queryFn: () => {
      return orderingApi.getTransactionByMonth()
    }
  });

  const [first, setFirst] = useState(true);

  const [series, setSeries] = useState();

  useEffect(() => {
    if (first && !isLoadingWeek && weeklyData) {
      setFirst(false);
      setSeries([
        {
          name: "Revenue in USD",
          data: weeklyData?.data.map(row => ({ x: row.dayOfWeek, y: row.totalAmount }))
        }
      ])

      setTotalAmount(weeklyData?.data.reduce((total, row) => total + row.totalAmount, 0))

      setPeriod("week")

      console.log("Total amount: " + weeklyData?.data.reduce((total, row) => total + row.totalAmount, 0))
    }
  }, [first, isLoadingWeek, weeklyData])

  const onPeriodChange = (value: string) => {
    if (value == "Last 7 days" && !isLoadingWeek && weeklyData) {

      setSeries([
        {
          name: "Revenue in USD",
          data: weeklyData.data.map(row => ({ x: row.dayOfWeek, y: row.totalAmount }))
        }
      ])

      setLabel("last 7 days");

      setPeriod("week")

      setTotalAmount(weeklyData?.data.reduce((total, row) => total + row.totalAmount, 0))

      console.log("Period changed to week")
    }
    else if (value == "Last month" && !isLoadingMonth && monthlyData) {
      setSeries([
        {
          name: "Revenue in USD",
          data: monthlyData.data.map(row => ({ x: row.monthOfYear, y: row.totalAmount }))
        }
      ])
      
      setTotalAmount(monthlyData?.data.reduce((total, row) => total + row.totalAmount, 0))

      setLabel('Last month');

      setPeriod('month')

      console.log("Period changed to method")
    }
  }

  const exportChartToPDF = () => {

    const chartElement = document.querySelector('#chart');
    console.log(chartElement)
    if (chartElement) {
      html2canvas(chartElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        const pdfBlob = pdf.output('blob');
        saveAs(pdfBlob, 'chart.pdf');
      });
    }
  };

  return (
    <div id='chart-container' className="w-full justify-self-strech bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 overflow-hidden">
      <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
              <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
              <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
            </svg>
          </div>
          <div>
            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">{totalAmount}$</h5>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Revenues generated per {period}</p>
          </div>
        </div>
        <div>
          {/* <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
            </svg>
            42.5%
          </span> */}
        </div>
      </div>
      {series !== undefined && <Chart id='chart' class='w-full' options={{
        title: {
          text: 'Revenue chart ' + label + ' (in USD)',
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'Inter',
            color: '#263238'
          },
        },
        colors: ["#1A56DB", "#FDBA8C"],
        chart: {
          type: "bar",
          height: "320px",
          fontFamily: "Inter, sans-serif",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "20%",
            borderRadius: 8,
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          style: {
            fontFamily: "Inter, sans-serif",
          },
        },
        states: {
          hover: {
            filter: {
              type: "darken",
              value: 1,
            },
          },
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["transparent"],
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -14
          },
        },
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: false,
        },
        xaxis: {
          floating: false,
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
            }
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: true,
          },
        },
        yaxis: {
          show: true,
        },
        fill: {
          opacity: 1,
        },
      }} type="bar" series={series} height={400} />}
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <div className='w-64'>
            <AdminDropdown title={''} items={['Last 7 days', 'Last month']} onChange={onPeriodChange} />
          </div>
          <button onClick={exportChartToPDF}
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
            Leads Report
            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BarChart 