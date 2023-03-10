import { useEffect, useState, Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Autocomplete,
  Stack,
  Chip,
  Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  MenuItem,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import { withStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify';
import moment from 'moment'

import Progress from '../Progress'


import { getSeries, getDataSeries } from '../../utils/services'

const BtnSuccess = withStyles((theme) => ({
  root: {
    borderRadius: '8px',
    backgroundColor: '#5ca0f1',
    textTransform: 'none',
    padding: '5px 10px',
    color: '#ffffff',
    fontWeight: 400,
    boxShadow: 'inset 0 0 6px #00000012, 0 2px 6px #00000021',
    '&:hover': {
      background: '#5ca0f1',
    },
    '&:disabled': {
      opacity: 0.9,
      backgroundColor: '#5ca0f1',
    },
  },
  label: {
    fontSize: 12,
  }
}))(Button);

const BtnCancel = withStyles((theme) => ({
  root: {
    borderRadius: '8px',
    backgroundColor: '#f15c5c',
    textTransform: 'none',
    padding: '5px 10px',
    color: '#ffffff',
    fontWeight: 400,
    boxShadow: 'inset 0 0 6px #00000012, 0 2px 6px #00000021',
    '&:hover': {
      background: '#f15c5c',
    },
    '&:disabled': {
      opacity: 0.9,
      backgroundColor: '#f15c5c',
    },
  },
  label: {
    fontSize: 12,
  }
}))(Button);

const AddEdit = (props) => {

  const { open, onClose, addComponent, editComponent, isEdit, info, handleEdit } = props;
  const [data, setData] = useState([]);
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10000);
  const [type, setType] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [decimals, setDecimals] = useState("");
  const [title, setTitle] = useState("");
  const [locale, setLocale] = useState("es");
  const [arraySeries, setArraySeries] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);
  const [graphicType, setGraphicType] = useState("");
  const [addData, setAddData] = useState([])
  const [loading, setLoading] = useState(false)

  const [errorTitle, setErrorTitle] = useState(false)
  const [errorDecimals, setErrorDecimals] = useState(false)
  const [errorType, setErrorType] = useState(false)
  const [errorGraphicType, setErrorGraphicType] = useState(false)
  const [errorSeries, setErrorSeries] = useState(false)


  const dateFormats = [
    { id: 0, label: "01/03/2000", format: "L" },
    { id: 1, label: "Mar 1, 2000", format: "LL" },
    { id: 2, label: "Wed, Mar 1, 2023 9:08 AM", format: "llll" },
    { id: 3, label: "sábado, 4 de marzo de 2023 18:23", format: "LLLL" },
  ];
  const options = [
    { id: 1, name: "Tabla" },
    { id: 2, name: "Gráfica" },
  ];
  const graphicTypes = [
    { id: 1, label: "Línea", type: "line" },
    { id: 2, label: "Barras", type: "bar" },
    { id: 3, label: "Área", type: "area" },
    { id: 4, label: "Puntos", type: "scatter" },
  ];
  const locales = [
    { id: 0, name: "Español", value: "es" },
    { id: 1, name: "Engles", value: "en" },
  ];

  const [dateFormat, setDateFormat] = useState(dateFormats[0].format)

  const close = () => {
    onClose();
    resetValues();
  }

  useEffect(() => {
    getSeriesArray();
    getDataStorage();
  }, [])

  useEffect(() => {
    if(isEdit && JSON.stringify(info) != '{}'){
        setType(info.type);
        setStartDate(info.startDate);
        setEndDate(info.endDate);
        setDecimals(info.decimals);
        setTitle(info.title)
        setGraphicType(info.graphicType)
        setArraySeries([info.idSerie])
        setDateFormat(info.dateFormat)
        setSeries(info.series)
    }
}, [isEdit && JSON.stringify(info) != '{}'])


const getDataStorage = () => {
  let hasData = localStorage.getItem("saveData");
  
  if(hasData){
    let data = JSON.parse(hasData) || {};
    setAddData(data.data);
  }else {
    setAddData([])
  }
}

  const getSeriesArray = async () => {
    setLoading(true)
    try {
      let params = {
        page: page,
        pageSize: pageSize,
        q: ""
      }

      const resp = await getSeries(params)
      const { status, data } = resp
      if (status === 200) {
        setData(data.data)
      } else {
        toast.error('Error al realizar la consulta')
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () =>{
    let error = false
    if(title==="") {
      setErrorTitle(true)
       error = true
    }
    if(!type){
       setErrorType(true)
      error = true}

    if(!isEdit && !arraySeries[0]) {
      setErrorSeries(true)
      error = true
    }

    if(type === 1 && !decimals){
        setErrorDecimals(true)
         error = true
    }
    if(type === 2 && graphicType==="" ) {
        setErrorGraphicType(true)
         error = true
    }
console.log('00000000000000000000',error)
    if(!error){
      getDataSeriesArray()
    }else {
      toast.error("Campos obligatorios faltantes")
    }
  }

  const getDataSeriesArray = async () => {
    setLoading(true)
    try {
      let params = {
        series: arraySeries.join(),
        fechaIni: startDate || "",
        fechaFin: endDate || "",
        locale: locale
      }

      const resp = await getDataSeries(params)
      const { status, data } = resp
      if (status === 200) {

        setDataSeries(data)
        data.map(e => {
          e.datos && e.datos.map(a => {
            a.fecha = moment(a.fecha, 'DD/MM/YYYY').format(dateFormat)
            a.dato = parseFloat(a.dato).toFixed(decimals)
          })

          e.title= title
          e.graphicType= graphicType
          e.startDate= startDate
          e.endDate=endDate
          e.decimals= decimals
          e.type= type
          e.dateFormat= dateFormat 
          e.series = series

            series && series.map(b=>{
            if(e.idSerie == b.variable){
                e.color = b.color
                
            }
          })

        isEdit ? editComponent(e) : addData.push(e)

        })

        setAddData(addData)

        !isEdit && addComponent(addData)
        close()
      } else {
        toast.error('Error al realizar la consulta')
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    } finally { 
      setLoading(false)
    }
  }


  const addColor = (color, index) => {
    let newArray = [...series];
    newArray[index].color = color
    setSeries(newArray)
  }


  const resetValues = () => {
    setSeries([])
    setArraySeries([])
    setType(null)
    setStartDate("")
    setEndDate("")
    setDecimals("")
    setTitle("")
    setGraphicType("")
    setDateFormat(dateFormats[0].format)
    setErrorTitle(false)
    setErrorDecimals(false)
    setErrorType(false)
    setErrorGraphicType(false)
    setErrorSeries(false)
  }


  return (
    <Dialog open={open} maxWidth={"md"} fullWidth={true}>
      <DialogTitle>{isEdit ? "Editar" : "Agregar"}</DialogTitle>
      <DialogContent style={{paddingTop: 10}} >
        <Grid container spacing={2} >
          <Progress loading={loading} />
        {!isEdit ?  <Grid item md={12} xs={12}>
            <Stack spacing={2} >
              <Autocomplete
                multiple
                size="small"
                options={data}
                getOptionLabel={(option) => option.variable}
                onChange={(event, valor) => {
                  let newArr = []
                  valor.map(e => {
                    newArr.push(e.variable)
                  })
                  setArraySeries(newArr)
                  setSeries(valor)
                  setErrorSeries(false)
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.variable}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Series"
                    error={errorSeries}
                  />
                )}
              />
            </Stack>
          </Grid>:
          <Grid item md={12} xs={12}>
          <Typography variant="h6" >{info.idSerie}</Typography>
          </Grid>
          }
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth={true}
              size="small"
              label="Tipo de visualización"
              select
              value={type}
              onChange={(e) => (setType(e.target.value), setErrorType(false))}
              error={errorType}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth={true}
              size="small"
              type="date"
              label="Fecha inicial:"
              value={startDate}
              onChange={e => (setStartDate(moment(e.target.value).format("YYYY-MM-DD")))}
              InputLabelProps={{
                shrink: true,
              }}
            >
            </TextField>
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField
              fullWidth={true}
              size="small"
              type="date"
              label="Fecha inicial:"
              value={endDate}
              onChange={e => (setEndDate(moment(e.target.value).format("YYYY-MM-DD")))}
              InputLabelProps={{
                shrink: true,
              }}
            >
            </TextField>
          </Grid>

          {type !== null &&
            <>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth={true}
                  size="small"
                  type="text"
                  label="Título"
                  value={title}
                  onChange={e => (setTitle(e.target.value), setErrorTitle(false))}
                  error={errorTitle}
                >
                </TextField>
              </Grid>
              {/* <Grid item md={6} xs={12}>
                <TextField
                  fullWidth={true}
                  size="small"
                  label="Idioma"
                  select
                  value={locale}
                  onChange={(e) => setLocale(e.target.value)}
                >
                  {locales.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */}
            </>
          }

          {type === 1 && <>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth={true}
                size="small"
                type="text"
                label="Núm. decimales"
                value={decimals}
                onChange={e => (setDecimals(Number(e.target.value)), setErrorDecimals(false))}
                error={errorDecimals}
              >
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth={true}
                size="small"
                label="Formatos para fecha"
                select
                defaultValue={[dateFormats[0].format]}
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
              >
                {dateFormats.map((option) => (
                  <MenuItem key={option.id} value={option.format}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </>
          }
          {type === 2 && <>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth={true}
                size="small"
                label="Tipo de gráfica"
                select
                defaultValue={[dateFormats[0].format]}
                value={graphicType}
                onChange={(e) => (setGraphicType(e.target.value), setErrorGraphicType(false))}
                error={errorGraphicType}
              >
                {graphicTypes.map((option) => (
                  <MenuItem key={option.id} value={option.type}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item md={6} xs={12}>
              <List >
                {series.length > 0 && series.map((serie, i) => (<>
                  <ListItem
                    secondaryAction={
                      <TextField
                        fullWidth={true}
                        style={{ width: 50 }}
                        size="small"
                        type="color"
                        label="Color"
                        value={serie.color}
                        onChange={e => addColor(e.target.value, i)}
                      >
                      </TextField>
                    }
                  >
                    <ListItemText
                      primary={serie.variable || serie.idSerie }
                    />
                  </ListItem>
                  <Divider />
                </>
                ))}
              </List>
            </Grid>
          </>
          }

        </Grid>
      </DialogContent>
      <DialogActions>
        <BtnCancel onClick={close} variant="contained" color="secondary" >Cancelar</BtnCancel>
        <BtnSuccess onClick={validateForm} variant="contained" color="primary">Generar</BtnSuccess>
      </DialogActions>
    </Dialog>
  );
};

export default AddEdit;
