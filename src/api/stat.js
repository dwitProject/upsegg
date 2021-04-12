import axios from 'axios';

export default {
  getAnalysisCart: () => axios.get(`${process.env.VUE_APP_STAT_BASE}/cart/search`),
  getAnalysisCartStock: () => axios.get(`${process.env.VUE_APP_STAT_BASE}/cart/top10/stock`),
  getAnalysisCartQuantity: () => axios.get(`${process.env.VUE_APP_STAT_BASE}/cart/top10/quantity`),

  getAnalysisProductDate: (fromDate, toDate) => axios.get(`${process.env.VUE_APP_STAT_BASE}/product/search/${fromDate}/${toDate}`),
  getAnalysisProductSalesQuantity: (fromDate, toDate) => axios.get(`${process.env.VUE_APP_STAT_BASE}/product/top10/quantity/${fromDate}/${toDate}`),
  getAnalysisProductTotalSales: (fromDate, toDate) => axios.get(`${process.env.VUE_APP_STAT_BASE}/product/top10/sales/${fromDate}/${toDate}`),
  
  getAnalysisSalesDate: (fromDate, toDate) => axios.get(`${process.env.VUE_APP_STAT_BASE}/sales/search/${fromDate}/${toDate}`),


};
