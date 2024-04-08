import className from "classnames/bind";
import styles from "./RevenueTours.module.scss";
const cx = className.bind(styles);

import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
function RevenueTours() {
  const data = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      {
        label: "Doanh thu tổng tất cả tour theo tháng",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [10000, 15000, 20000, 18000, 22000, 25000],
      },
    ],
  };
  return (
    <div className={cx("wrapper")}>
      <div>RevenueTours</div>
      <div>
        <Bar
          data={data}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}

export default RevenueTours;
