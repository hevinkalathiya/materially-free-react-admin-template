import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const CourseTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend.internative.in/course/');
        const modifiedData = response.data.data.map((item) => ({
          ...item,
          key: item._id,
          numberofuser: '10'
        }));
        setData(modifiedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Number Of User',
      dataIndex: 'numberofuser',
      key: 'numberofuser'
    },
    {
      title: 'Tagline',
      dataIndex: 'tagline',
      key: 'tagline'
    },
    {
      title: 'Is Short',
      dataIndex: 'isShort',
      key: 'isShort'
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (text, record) => (
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(record.key)}>
          Edit <EditIcon />
        </Button>
      )
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (text, record) => (
        <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(record.key)}>
          Delete <DeleteIcon />
        </Button>
      )
    }
  ];

  const handleEdit = (key) => {
    console.log(`Edit button clicked for key: ${key}`);
    navigate(`/course-form/${key}`)
  };

  const handleDelete = (key) => {
    console.log(`Delete button clicked for key: ${key}`);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table loading={loading} dataSource={data.map((item) => ({ ...item, key: item._id }))} columns={columns} />
    </div>
  );
};

export default CourseTable;
