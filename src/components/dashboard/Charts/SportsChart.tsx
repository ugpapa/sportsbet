import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface SportsChartProps {
  sportsBetting: {
    soccer: number;
    baseball: number;
    volleyball: number;
    basketball: number;
    others: number;
  };
}

export default function SportsChart({ sportsBetting }: SportsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['축구', '야구', '배구', '농구', '기타'],
        datasets: [{
          label: '배팅 금액',
          data: [
            sportsBetting.soccer,
            sportsBetting.baseball,
            sportsBetting.volleyball,
            sportsBetting.basketball,
            sportsBetting.others
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '스포츠별 배팅 금액'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '₩' + value.toLocaleString('ko-KR');
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [sportsBetting]);

  return (
    <div className="bg-white rounded-lg shadow p-3">
      <h2 className="text-base font-semibold mb-3">스포츠별 배팅 금액</h2>
      <div className="relative h-[400px] w-full">
        <canvas ref={chartRef} className="max-w-full"></canvas>
      </div>
    </div>
  );
} 