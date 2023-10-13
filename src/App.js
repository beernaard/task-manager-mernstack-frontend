import React, { useEffect, useState } from 'react'
import './App.css'
import { AddInputTaskField,InputTask,TaskList,Header } from './components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const App = () => {
  const [APItask, setAPITask] = useState([])
  const [taskList, setTaskList] = useState({
    taskName:"",
    completed:false
  })
  const {taskName}=taskList
  const [addInputField, setAddInputField] = useState(false)
  const toggleBool = ()=>{
    setAddInputField((prevstate)=>!prevstate)
  }
  const inputtaskFunction = (e)=>{
    const {value} =e.target
    console.log(value)
    setTaskList({...taskList,taskName:value})
  }

  const createTask = async (e)=>{
    e.preventDefault()
    if(taskList.taskName===""){
      console.log(`hello`)
      return toast.error('Input field cannot be empty', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}`,{
        task:taskList.taskName
      })
      toast.success("Added Successfully", {
        position: toast.POSITION.TOP_RIGHT
    });
      setTaskList({...taskList, taskName:""})
      toggleBool()
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  }

  const getTask = async()=>{
    await axios.get(`${process.env.REACT_APP_API_URL}`)
    .then((res)=>{
      console.log(res.data);
      setAPITask(res.data.task)
    })
    .catch((err)=>{
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
    });
    })
  }

  const deleteTask = async(id)=>{
    await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`)
    .then((res)=>{
      console.log(res.data);
      getTask()
      toast.success("Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT
    });
    })
    .catch((err)=>{
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
    });
    })
  }

  const patchTask = async(id, newTask)=>{
    await axios.patch(`${process.env.REACT_APP_API_URL}/${id}`,{task:newTask})
    .then((res)=>{
      console.log(res.data);
      getTask()
      toast.success("Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT
    });
    })
    .catch((err)=>{
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
    });
    })
  }

  const patchTaskCompleted = async(id, bool)=>{
    await axios.patch(`${process.env.REACT_APP_API_URL}/${id}`,{completed:!bool})
    .then((res)=>{
      console.log(res.data);
      getTask()
      toast.success("Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT
    });
    })
    .catch((err)=>{
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
    });
    })
  }

  useEffect(()=>{
    getTask()
  },[taskList])
  return (
    <>
    <ToastContainer/>
    <div className='main-container'>
      <Header/>
      <div className='main-container-content'>
        {addInputField && <InputTask className='main-container-inputtask' toggleBool={toggleBool} createTask={createTask} taskName={taskName} inputtaskFunction={inputtaskFunction}/>}
        <TaskList className='main-container-taskfield' patchTask={patchTask} deleteTask={deleteTask} APItask={APItask} patchTaskCompleted={patchTaskCompleted}/>
      </div>
      <AddInputTaskField toggleBool={toggleBool}/>
    </div>
    </>
    
  )
}

export default App