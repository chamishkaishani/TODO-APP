import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@nextui-org/react';

export default function Updatelist() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    work: '',
    date: '',
    time: '',
    complete: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5173/backend/list/onetask/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((error) => {
        console.log(error);
        setError('Error fetching data');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.put(`http://localhost:5173/backend/list/updatetask/${id}`, formData)
      .then((res) => {
        setLoading(false);
        navigate('/'); // Redirect to the list page after successful update
      })
      .catch((error) => {
        console.log(error);
        setError('Error updating data');
        setLoading(false);
      });
  };

  return (
    <div>
      <div className='mx-auto'>
        <h1 className='text-3xl text-center font-bold my-5 text-yellow-500'>UPDATE NOTES</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5'>
          <textarea
            onChange={(e) => setFormData({ ...formData, work: e.target.value })}
            value={formData.work}
            id='work'
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            placeholder='Enter your work here...'
          ></textarea>
          <input
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            type='date'
            placeholder='Date'
            id='date'
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            value={formData.date}
          />
          <input
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            type='time'
            id='time'
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            value={formData.time}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            type='submit'
            disabled={loading}
            className='bg-gradient-to-r from-purple-600 to-blue-600 text-white border-black rounded-lg p-6 uppercase text-xl font-bold hover:opacity-90 disabled:opacity-80 w-96'
          >
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </form>
      </div>
    </div>
  );
}
