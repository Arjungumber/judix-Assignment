import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});


export const getTasks = (token) => API.get("/tasks", {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const createTask = (taskData,token) => API.post("/tasks", taskData, { 
    headers :{
        Authorization: `Bearer ${token}`,
    },
});

export const updateTask = (id, updatedData,token) =>
    API.put(`/tasks/${id}`, updatedData, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
});

export const deleteTask = (id,token) => API.delete(`/tasks/${id}`,{
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
