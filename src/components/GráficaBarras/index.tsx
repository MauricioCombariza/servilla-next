import {Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Dataset {
    data: (number | [number, number] | null)[];
    label: string;
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }
  
  export interface ChartData {
    labels: string[];
    datasets: Dataset[];
  }

const ChartBar = ({ charData}: { charData: ChartData }) => {
    return(
        <>
            <Bar
                data={charData}
                 options={{
                    plugins: {
                        title: {
                        display: true,
                        text: 'Ventas mensuales',
                        font: {
                            size: 20,
                        },
                        },
                        legend: {
                        display: true,
                        position: 'right',
                        },
                    },
                    }}
            />
        </>
    );
};

export {ChartBar}