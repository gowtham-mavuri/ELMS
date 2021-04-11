import React from 'react';
import { Doughnut } from 'react-chartjs-2'
function ChartDoughnut(props) {
    console.log(props.data.colors)
    const data = {
        labels: props.data.labels,
        datasets: [
          {
            label: '# of Employees',
            data: props.data.dataOfEmp,
            backgroundColor: props.data.colors,
            borderWidth: 1,
          },
        ],
      }
  return (
    <div>
        <h2>No.Of Employees in each branch</h2>
      <Doughnut data={data} 
                  width={400}
                  height={150}
                  options={{ maintainAspectRatio: false }}
        />
    </div>
  );
}
 
export default ChartDoughnut;