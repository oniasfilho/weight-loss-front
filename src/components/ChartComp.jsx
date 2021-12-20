import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'
import axios from 'axios'

const ChartComp = () => {

    const [dados, setDados] = useState([]);
    const [datas,setDatas] = useState();


    const getData = async () =>{
        // const receivedData = await axios.get('/historico')        
        // setDados(receivedData.data)
        // setDatas(dados.map(dado => dado.historico.map(historico => historico.data)))
        // setDatas(old => Array.from(new Set(...old)))

        await axios.get('/historico')
        .then(res => {
            setDados(res.data)
            setDatas(res.data.map(dado => dado.historico.map(historico => historico.data)))
            setDatas(old => Array.from(new Set(...old)))
        })
    }


    useEffect(() => {
        getData();      
    },[])

    const basicData = {
        labels: datas,
        datasets: [
            {
                label: 'Onias da Rocha Filho',
                data: [107.3, 109.5, 109.3, 110.8],
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
