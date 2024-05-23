import Chart from 'react-apexcharts'
import { orderingApi } from '../../../apis/ordering.api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import AdminDropdown from '../Input/AdminDropdown';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { TopProduct } from '../../../types/Models/Ordering/TopProduct.type';

const TopProductCharts = () => {

  const { data: topProductData, isLoading: isLoadingTopProductData } = useQuery({
    queryKey: ['topProduct'],
    queryFn: () => {
      return orderingApi.getTopTenProduct()
    }
  });


  const [first, setFirst] = useState(true);

  const [series, setSeries] = useState();

  useEffect(() => {
    if (first && !isLoadingTopProductData && topProductData) {
      setFirst(false);
      const data = topProductData?.data;
      setSeries([
        {
          name: "Number of item bought",
          data: data.map(p => ({ x: p.title, y: p.totalQuantityBought }))
        }
      ])
    }
  }, [first, isLoadingTopProductData, topProductData])

  const exportChartToPDF = () => {

    const chartElement = document.querySelector('#chart2');
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
      <div className="flex justify-between pb-4 mb-4">
        <div className="flex items-center">
          
        </div>
        <div>
            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">Top ten books bought of all time</h5>
          </div>
        <div>
        </div>
      </div>
      {series !== undefined && <Chart id='chart2' class='w-full' options={{
        title: {
          text: '',
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'Inter',
            color: '#27c263'
          },
        },
        colors: ["#27c263", "#FDBA8C"],
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
            show: true,
            color: '#e8e4ec'

          },
          axisTicks: {
            show: true,
          },
        },
        yaxis: {
          show: true,
          tickAmount: 1,
          axisBorder: {
            show: true,
            color: '#e8e4ec'
          }
        },
        fill: {
          opacity: 1,
        },
      }} type="bar" series={series} height={400} />}
      <div className="grid grid-cols-1 items-end border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex flex-1 ml-auto items-end pt-5">
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

export default TopProductCharts 