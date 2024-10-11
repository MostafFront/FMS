import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function DashBoardGraphSectionGraph() {
  const [chartData, setChartData] = useState({
    sales: [30, 40, 45, 50, 49, 60, 70, 91],
    transaction: [20, 30, 40, 45, 60, 70, 80, 100],
    value: [10, 15, 20, 25, 30, 40, 50, 60],
    compression: [5, 10, 15, 20, 25, 30, 35, 40],
  });

  const [selectedCategory, setSelectedCategory] = useState("sales");

  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false, // Disable the toolbar
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  };

  const series = [
    {
      name: selectedCategory,
      data: chartData[selectedCategory],
    },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='flex flex-col p-5 w-full bg-[#FFFFFF] rounded-md gap-x-10'>
      <div className='flex items-center justify-between w-full border-b-2 border-[#E0E7F1] pb-2'>
        <p className='text-[#3D5161] font-medium text-sm uppercase'>stations activates overview</p>
        <div className='flex gap-5'>
          <button
            className={`font-medium text-sm uppercase ${selectedCategory === 'sales' ? 'text-[#FF7F5C]' : 'text-[#3D5161]'}`}
            onClick={() => handleCategoryChange('sales')}
          >
            sales
          </button>
          <button
            className={`font-medium text-sm uppercase ${selectedCategory === 'transaction' ? 'text-[#FF7F5C]' : 'text-[#3D5161]'}`}
            onClick={() => handleCategoryChange('transaction')}
          >
            transaction
          </button>
          <button
            className={`font-medium text-sm uppercase ${selectedCategory === 'value' ? 'text-[#FF7F5C]' : 'text-[#3D5161]'}`}
            onClick={() => handleCategoryChange('value')}
          >
            value
          </button>
          <button
            className={`font-medium text-sm uppercase ${selectedCategory === 'compression' ? 'text-[#FF7F5C]' : 'text-[#3D5161]'}`}
            onClick={() => handleCategoryChange('compression')}
          >
            compression
          </button>
        </div>
      </div>
      <div className="row w-full">
        <div className="mixed-chart w-full">
          <Chart options={options} series={series} type="bar" width="100%" height='200%' />
        </div>
      </div>
    </div>
  );
}
