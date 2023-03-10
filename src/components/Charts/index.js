import React, { useEffect, useState } from 'react' 
import ApexCharts from 'react-apexcharts'

const GenericChart = (props) => {

    const { config } = props

    const [categories, setCategories] = useState([])
    const [series, setSeries] = useState([])

    const getInformation = () => {
        let dates = [];
        let data = [];
        config.datos && config.datos.map(e=>{
            dates.push(e.fecha)
            data.push(e.dato)
        })
       
        setCategories(dates)
        setSeries([{
                name: config.idSerie,
                data: data
        }])
    }

    const options = () => {

        let options =
        {
            chart: {
                type: config.graphicType,
                fontFamily: 'Montserrat',
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
               enabled: true,
            },
            legend: {
                show: false,
            },
            title: {
                text:`${config.title} - ${config.idSerie}`,
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat',
                    color: '#263238'
                },
            },
            colors: [config.color || "#00c5ff"],
            xaxis: {
                categories: categories,
            },
        }

        // if (!config.datos) {
        //     options["noData"] = {
        //         text: 'Sin datos',
        //         align: 'center',
        //         verticalAlign: 'middle',
        //         offsetX: 0,
        //         offsetY: 0,
        //         style: {
        //             fontSize: '16px',
        //             fontFamily: 'Montserrat'
        //         }
        //     }
        // }

        return options

    }

    useEffect(()=>{
        getInformation()
    },[])

    return (
        <ApexCharts
            options={options()}
            series={series}
            type={config.graphicType}
            height={330}
        />
    )

}

export default GenericChart;