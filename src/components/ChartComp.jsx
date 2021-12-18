import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'
import axios from 'axios'

const ChartComp = () => {

    const [dadosOnias, setDadosOnias] = useState([]);

    const getUser = async () =>{
        const response = await axios.get('/historico/1')
        setDadosOnias(response.data)        
    }

    useEffect(() => {
       getUser()
    },[])

    const basicData = {
        labels: dadosOnias.map(singular => singular.data),
        datasets: [
            {
                label: dadosOnias[0].nome,
                data: dadosOnias.map(singular => singular.peso),
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
            },
            {
                label: 'Gabriel Vitor Santos',
                data: [107.3, 109.5, 109.3, 110.8],
                fill: false,
                borderColor: '#FFA726',
                tension: .4
            }
        ]
    }

    
    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
        return {
            basicOptions
        }
    }

    const { basicOptions, multiAxisOptions } = getLightTheme();

    

    return (
        <div>
            <div className="card">
                <Chart type="line" data={basicData} options={basicOptions} />
            </div>
        </div>
    )
}

export default ChartComp
