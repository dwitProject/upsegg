<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        scales: {},
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: this.chartData.options.title.text,
          position: "top",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
 
