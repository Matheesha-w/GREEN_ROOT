import React from 'react';
import SidebarResearcher from '../components/SidebarResearcher';
import CropChartR from '../components/CropChartR';

export default function MyStats() {
  return (
    <div className="min-h-screen bg-gray-200 flex">
      {/* Sidebar fixed width */}
      <div className="w-[250px]">
        <SidebarResearcher />
      </div>

      {/* Main content area, respects remaining space */}
      <div className="flex-1 p-6 overflow-auto ">
        <div className='mt-10'>
        <CropChartR />
        </div>
      </div>
    </div>
  );
}
