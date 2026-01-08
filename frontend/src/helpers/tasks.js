import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api", 
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
