import { useEffect, useState } from "react";
import { Box, Grid, Typography, IconButton, Paper } from "@mui/material";
import { Helmet } from "react-helmet";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import AddIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';

import Welcome from "./components/Welcome/index";
import AddEdit from "./components/AddEdit/index";
import DataTable from "./components/Table";
import GenericChart from "./components/Charts";
import DeleteConfirmation from "./components/DeleteConfirmation";
import OutApp from "./components/OutApp";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [addData, setAddData] = useState([]);
  const [show, setShow] = useState(false);
  const [indexDelete, setIndexDelete] = useState("");
  const [isEdit, setIsEdit] = useState(false)
  const [info, setInfo] = useState({})
  const [indexInfo, setIndexInfo] = useState("")
  const [allGraphic, setAllGraphic] = useState([])
  const [openOut, setOpenOut] = useState(false)
  const [serieId, setSerieId] = useState("")

  useEffect(() => {
    getDataStorage()
    setTimeout(() => {
      setOpen(false);
    }, 6000);
  }, []);

  const getDataStorage = () => {
    let hasData = localStorage.getItem("saveData");
    
    if(hasData){
      let data = JSON.parse(hasData)|| {};
      setAllGraphic(data.data);
      setShow(true)
    }else {
      setAllGraphic([])
      setAddData([])
      setShow(false)
    }
  }

  const addComponent = (config) => {
    setAllGraphic(config)
    saveData(config)
    setShow(true)
  }

  const editComponent = (config) => {
    let newArr = [...allGraphic]
    newArr[indexInfo] = config
    setAllGraphic(newArr)
    setShow(true)
    saveData(newArr)
  }

  const deleteComponent = () => {
    let newArray = [...allGraphic]
    newArray.splice(indexDelete, 1)
    setAllGraphic(newArray)
    saveData(newArray)
  }

  const handleOpenDelete = (index, id) => {
    setIndexDelete(index);
    setSerieId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpen = (info, index) => {
    setIsEdit(false)
    setInfo({})
    setIndexInfo("")
    setOpenAdd(true);
  };

  const handleOpenEdit = (info, index) => {
    setIsEdit(true)
    setInfo(info)
    setIndexInfo(index)
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenAdd(false);
    setIsEdit(false)
  };

  const preguntarAntesDeSalir = () => {
    setOpenOut(true)
  }

  const saveData = (data) => {
    localStorage.setItem("saveData", JSON.stringify({ data: data }));
  }

  const reorder = (list,startIndex, endIndex) => {
    let newArray = [...list]
    const [removed] = newArray.splice(startIndex, 1)
    newArray.splice(endIndex, 0, removed);
    saveData(newArray)
    return newArray;

  }

  return (
    <div className="App">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <Typography variant="h3">Mi dashboard</Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <IconButton size="large" onClick={handleOpen}>
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>

      <DragDropContext onDragEnd={(result)=>{
        const {source, destination} = result;
        if(!destination) {return}
        
        if(source.index === destination.index && source.droppableId === destination.droppableId) {return}

        setAllGraphic((prevGrap)=>
        reorder(prevGrap, source.index, destination.index)
        )
      }} >
      <Grid container spacing={2} >

        <Droppable droppableId="tasks" direction="horizontal" >
        { (droppableProvided)=>(
          show &&
          allGraphic.length > 0 && allGraphic.map((config, index) => (
            config.type == 1 ?


              <Grid item md={4} xs={12}
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              key={index}
              
              >
                <Draggable key={config.idSerie} draggableId={config.idSerie} index={index} >
               {(draggableProvided)=>
               <Box p={2} mt={2} component={Paper} elevation={4} height={400}
               {...draggableProvided.draggableProps}
               ref={draggableProvided.innerRef}
               {...draggableProvided.dragHandleProps}
               >
                  <Box display="flex" justifyContent="flex-end">
                    <IconButton onClick={() => handleOpenDelete(index, config.idSerie)} >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenEdit(config, index)} >
                      <EditIcon />
                    </IconButton>
                  </Box>

                  <DataTable config={config} />
                </Box>}
                </Draggable>
                {droppableProvided.placeholder}
              </Grid>

              :

              <Grid item md={4} xs={12}
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              
              >
                 <Draggable key={config.idSerie} draggableId={config.idSerie} index={index} >
               {(draggableProvided)=>
               <Box p={2} mt={2} component={Paper} elevation={4} height={400}
               {...draggableProvided.draggableProps}
               ref={draggableProvided.innerRef}
               {...draggableProvided.dragHandleProps}
               >
                  <Box display="flex" justifyContent="flex-end">
                    <IconButton onClick={() => handleOpenDelete(index, config.idSerie)} >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenEdit(config, index)} >
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <GenericChart config={config} />
                </Box>}
                </Draggable>
                {droppableProvided.placeholder}
              </Grid>

          ))

        )}
        </Droppable>
      </Grid>
      </DragDropContext>
      <AddEdit open={openAdd} onClose={handleClose} addComponent={addComponent} editComponent={editComponent} isEdit={isEdit} info={info} index={indexInfo} />
      <DeleteConfirmation open={openDelete} onClose={handleCloseDelete} deleteComponent={deleteComponent} serieId={serieId} />
      <OutApp open={openOut}  />
      <Welcome open={open} />
    </div>
  );
};

export default Dashboard;
