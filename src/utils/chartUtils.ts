export const getChartLabels = (period: 'today' | 'yesterday' | 'week' | 'month') => {
  switch (period) {
    case 'today':
    case 'yesterday':
      return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
    case 'week':
      return ['월', '화', '수', '목', '금', '토', '일'];
    case 'month':
      return Array.from({ length: 30 }, (_, i) => `${i + 1}일`);
    default:
      return [];
  }
};

export const getChartData = (period: 'today' | 'yesterday' | 'week' | 'month', type: 'users' | 'betting') => {
  switch (period) {
    case 'today':
      return type === 'users' 
        ? [65, 59, 80, 81, 56, 55, 40]
        : [12000000, 19000000, 15000000, 25000000, 22000000, 30000000, 28000000];
    case 'yesterday':
      return type === 'users'
        ? [45, 49, 60, 71, 46, 45, 30]
        : [10000000, 15000000, 13000000, 20000000, 18000000, 25000000, 22000000];
    case 'week':
      return type === 'users'
        ? [120, 150, 180, 140, 160, 170, 190]
        : [25000000, 28000000, 30000000, 27000000, 29000000, 31000000, 32000000];
    case 'month':
      return type === 'users'
        ? Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50)
        : Array.from({ length: 30 }, () => Math.floor(Math.random() * 50000000) + 10000000);
    default:
      return [];
  }
}; 