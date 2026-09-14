'use client';

import { Activity } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { CHART_COLORS } from '../constants';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AttendanceTrendChartProps {
    data: any[];
}

export function AttendanceTrendChart({ data }: AttendanceTrendChartProps) {
    const series = [{
        name: 'نسبة الحضور',
        data: data.map(item => item.rate)
    }];

    const options: ApexOptions = {
        chart: {
            type: 'line',
            fontFamily: 'inherit',
            toolbar: { show: false },
            zoom: { enabled: false },
            dropShadow: {
                enabled: true,
                top: 4,
                left: 0,
                blur: 3,
                opacity: 0.1,
                color: CHART_COLORS[7]
            }
        },
        colors: [CHART_COLORS[7]],
        dataLabels: { enabled: false },
        stroke: { 
            curve: 'stepline', // 'stepline' matches the previous 'stepAfter' look
            width: 3 
        },
        markers: {
            size: 4,
            colors: ['#fff'],
            strokeColors: CHART_COLORS[7],
            strokeWidth: 2,
            hover: { size: 6 }
        },
        xaxis: {
            categories: data.map(item => item.date),
            labels: {
                style: { colors: '#9ca3af', fontFamily: 'inherit', fontWeight: 500 }
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
            tooltip: { enabled: false }
        },
        yaxis: {
            labels: {
                style: { colors: '#9ca3af', fontFamily: 'inherit', fontWeight: 500 },
                formatter: (value) => `${value}%`
            },
            min: 0,
            max: 100,
            tickAmount: 5
        },
        grid: {
            borderColor: '#f3f4f6',
            strokeDashArray: 4,
            yaxis: { lines: { show: true } },
            xaxis: { lines: { show: false } },
            padding: { top: 0, right: 0, bottom: 0, left: 10 }
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: (val) => `${val}%`
            },
            style: { fontFamily: 'inherit' }
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 overflow-hidden hover:shadow-md transition-all duration-300">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                    مستويات الحضور
                </div>
                <span className="text-xs font-normal text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">آخر 8 حصص</span>
            </h3>
            <div className="h-[280px] w-full" dir="ltr">
                <ReactApexChart options={options} series={series} type="line" height="100%" />
            </div>
        </div>
    );
}
