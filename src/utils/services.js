import axios from 'axios';

export const getSeries = async (data) => {
    const { page, pageSize, q } = data

    try {
        const res = await axios.get(
            "https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/",
            {
                params: {
                    page: page,
                    pageSize: pageSize,
                    q: q
                },
                headers: {
                    'Authorization': '01f04831044f073702d9244604d41c055e7c14bb96218e169926482fb5699788',
                }
            }
        );

        const response = {
            status: res.status,
            data: res.data
        }
        return response
    } catch (error) {
        console.log('[getSeries] Error:', error)
        return error
    }
}

export const getDataSeries = async (data) => {
    const { series, fechaIni, fechaFin, locale } = data
    try {
        const res = await axios.get(
            `https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/${series}/${fechaIni}/${fechaFin}`,
            {
                 params:{
                     "locale": locale
                 },
                headers: {
                    'Authorization': '01f04831044f073702d9244604d41c055e7c14bb96218e169926482fb5699788',
                    'Bmx-Token': '5dabbba99fd8a133f8da748783e279ac8c775a43572a2b86a0004155ecbf0949',
                }
            }
        );
        console.log('resp', res);
        const response = {
            status: res.status,
            data: res.data.bmx.series
        }
        return response
    } catch (error) {
        console.log('[getDataSeries] Error:', error)
        return error
    }
}
