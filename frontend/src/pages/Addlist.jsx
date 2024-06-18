import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';

import b1 from '../Image/mb2.jpg';

const styles = {
    backgroundImage: `url(${b1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh', // Adjusted to cover the full viewport height
};

export default function Addlist() {
    const { currentUser } = useSelector((state) => state.user);
    const { email } = useParams();
    const [formData, setFormData] = useState({ email: currentUser.email, work: '', date: '', time: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const combinedDateTime = new Date(`${formData.date}T${formData.time}:00`);

            const res = await fetch('/backend/list/createList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, time: combinedDateTime }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setError(null);
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles} className="flex  justify-center">
            <div className=" w-96 m-32">
                <h1 className="text-3xl text-center font-bold my-5 text-yellow-500">ADD NOTES</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <textarea
                        onChange={(e) => setFormData({ ...formData, work: e.target.value })}
                        value={formData.work}
                        id="work"
                        className="border p-3 rounded-lg w-full bg-slate-900 text-white"
                        placeholder="Enter your work here..."
                    ></textarea>

                    <input
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        type="date"
                        id="date"
                        className="border p-3 rounded-lg w-full bg-slate-900 text-white"
                    />

                    <input
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        type="time"
                        id="time"
                        className="border p-3 rounded-lg w-full bg-slate-900 text-white"
                    />

                    {error && <p className="text-red-500">{error}</p>}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-3 uppercase text-xl font-bold hover:opacity-90 disabled:opacity-80 w-full"
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
