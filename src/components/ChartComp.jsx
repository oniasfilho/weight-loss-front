import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'
import axios from 'axios'

const ChartComp = () => {

    const [dados, setDados] = useState([]);
    const [datas,setDatas] = useState();
    const borderColors = ['#42A5F5','#FFA726']
    const [dataSet, setDataSet] = useState([{
        label: '',
        data: [],
        fill: false,
        borderColor: '',
        tension: .4
    }])

    const getData = async () =>{
        await axios.get('/historico')
        .then(res => {
            setDados(res.data)
            setDatas(res.data.map(dado => dado.historico.map(historico => historico.data)))
            setDatas(old => Array.from(new Set(...old)))
            setDataSet(
                dados.map(dado => {
                    return {
                        label: dado.nome,
                        data: dado.historico.map(i => i.peso),
                        fill: false,
                        borderColor: [borderColors.pop()],
                        tension: .4
                    }
                })
            )
        })
    }

    useEffect(() => {
        getData();      
    },[])

    const basicData = {
        labels: datas,
        datasets: dataSet
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
