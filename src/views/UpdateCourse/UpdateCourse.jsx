import React from 'react'
import { useParams } from 'react-router';


const UpdateCourse = () => {
    const { courseId } = useParams();
    console.log(courseId);
    return (
        <div>UpdateCourse</div>
    )
}

export default UpdateCourse