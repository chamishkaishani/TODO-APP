import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaThumbsUp } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function List() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { email } = useParams();

  const [formData, setFormData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/backend/list/getAllList/${currentUser.email}`);
        const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setFormData(sortedData);
        setFilterData(sortedData); // Save the original data for reset after search
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser.email) {
      fetchUserData();
    }
  }, [currentUser.email]);

  const handleSearch = (e) => {
    const getSearch = e.target.value;

    if (getSearch.length > 0) {
      const searchdata = filterData.filter((item) =>
        new Date(item.date).toLocaleDateString().includes(getSearch)
      );
      setFormData(searchdata);
    } else {
      setFormData(filterData);
    }

    setQuery(getSearch);
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`/backend/list/deleteList/${id}`, {
        method: 'DELETE',
      });

      setFormData(formData.filter((issue) => issue._id !== id));
      alert('Successfully Deleted');
    } catch (error) {
      console.log(error.message);
    }
  };

  const markTaskComplete = async (id) => {
    try {
      await axios.post(`http://localhost:5173/backend/list/complete/${id}`);
     
      setFormData(updatedFormData);
      alert('Task marked as completed');
    } catch (error) {
      console.error('Error marking task as complete:', error);
      
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTasks = Array.from(formData);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setFormData(reorderedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-5">
      <h1 className="text-4xl font-bold text-orange-500 mb-8">Todo List</h1>
      <div className="flex mb-5">
        <input
          type="text"
          placeholder="Filter by date (MM/DD/YYYY)..."
          className="px-4 py-2 border-2 border-gray-300 rounded-l-lg text-black"
          value={query}
          onChange={(e) => handleSearch(e)}
        />
        <Link to="/add">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg h-16">
            Add
          </button>
        </Link>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              className="w-full max-w-2xl grid grid-cols-1 gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {formData.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      className="flex justify-between items-center p-4 bg-teal-600 text-white rounded-lg"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
                        <div className="font-bold text-xl">{task.work}</div>
                        <div className="text-sm text-gray-300">
                          {new Date(task.date).toLocaleDateString()} - {formatTime(task.time)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="text-green-900"
                          title="Mark task as complete"
                          onClick={() => markTaskComplete(task._id)}
                        >
                          <FaThumbsUp />
                        </button>
                        <button className="text-yellow-500" title="Edit task">
                          <Link to={`updatelist/${task._id}`}>
                            <FaEdit />
                          </Link>
                        </button>
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="text-red-700"
                          title="Delete task"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
