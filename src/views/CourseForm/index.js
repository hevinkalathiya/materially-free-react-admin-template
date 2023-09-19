import React, { useState } from 'react';
import { TextField, IconButton, Button, Box } from '@mui/material';
import { KeyboardArrowDown, Close, Delete } from '@mui/icons-material';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'tailwindcss/tailwind.css';
import { DropzoneArea } from 'material-ui-dropzone';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

const SimpleForm = () => {
  const [boxes, setBoxes] = useState([
    {
      mainTextFieldValue: '',
      dropdownTextFields: ['']
    }
  ]);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      answer: ''
    }
  ]);

  const [courseThumbnail, setCourseThumbnail] = useState([]);
  const [careerPathFile, setCareerPathFile] = useState([]);
  const [techStackFile, setTechStackFile] = useState([]);
  const [describeCourse, setDescribeCourse] = useState('');
  const [description, setDescription] = useState('');
  const [courseLength, setCourseLength] = useState('');

  const handleCourseLengthChange = (event) => {
    setCourseLength(event.target.value);
  };

  const removeQuestion = (id) => {
    const filteredQuestions = questions.filter((question) => question.id !== id);
    const updatedQuestions = filteredQuestions.map((question, index) => {
      return { ...question, id: index + 1 };
    });
    console.log(updatedQuestions);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer = value;
    setQuestions(updatedQuestions);
  };

  const addNewQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: '',
      options: ['', '', '', ''],
      answer: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  // Function to toggle the dropdown for a specific module
  const toggleDropdown = (index) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index].isDropdownOpen = !updatedBoxes[index].isDropdownOpen;
    setBoxes(updatedBoxes);
  };

  // Function to handle changes in the main text field of a module
  const handleMainTextFieldChange = (event, index) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index].mainTextFieldValue = event.target.value;
    setBoxes(updatedBoxes);
  };

  // Function to add a new text field to a specific module's dropdown
  const addNewTextField = (index) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index].dropdownTextFields.push('');
    setBoxes(updatedBoxes);
  };

  // Function to remove a text field from a specific module's dropdown
  const removeTextField = (boxIndex, textFieldIndex) => {
    const updatedBoxes = [...boxes];
    if (updatedBoxes[boxIndex].dropdownTextFields.length > 1) {
      updatedBoxes[boxIndex].dropdownTextFields.splice(textFieldIndex, 1);
      setBoxes(updatedBoxes);
    }
  };

  // Function to handle changes in the text fields of a module's dropdown
  const handleDropdownTextFieldChange = (boxIndex, textFieldIndex, value) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[boxIndex].dropdownTextFields[textFieldIndex] = value;
    setBoxes(updatedBoxes);
  };

  // Function to add a new module box
  const addNewBox = () => {
    const newBox = {
      mainTextFieldValue: '',
      dropdownTextFields: ['']
    };
    setBoxes([...boxes, newBox]);
  };

  // Function to delete a module box
  const deleteBox = (index) => {
    const updatedBoxes = [...boxes];
    updatedBoxes.splice(index, 1);
    setBoxes(updatedBoxes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      // Append each field from your object to the formData object
      formData.append('title', event.target.title.value);
      formData.append('tagline1', event.target.tagline1.value);
      formData.append('tagline2', event.target.tagline2.value);
      formData.append('duration', event.target.duration.value);
      formData.append('isShort', courseLength === "short");
      formData.append('modules', JSON.stringify(boxes)); 
      formData.append('questions', JSON.stringify(questions)); 
      courseThumbnail.map((file) => {
        formData.append('thumbnail', file);
      });
      careerPathFile.map((file) => {
        formData.append('careerPathImage', file);
      });
      techStackFile.map((file) => {
        formData.append('technologies', file);
      });
      formData.append('description', description);
      formData.append('roadMap', describeCourse);

      console.log();

      // Make the Axios POST request
      const response = await axios.post('https://backend.internative.in/course/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
      // Handle the response data or perform other actions here
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
    }
  };
  // console.log(`${process.env.BASEURL}/course/`);

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-3xl mx-auto p-2 md:p-5 shadow-lg my-10">
        <h1 className="text-blue text-4xl text-center Gray-400 mt-3 mb-6 font-bold uppercase">Course Details</h1>
        <div className="">
          <h6 className="text-blue Gray-400 text-sm mt-3 mb-6 font-bold uppercase">Course Title</h6>
          <TextField name="title" className="w-full bg-gray-100" label="Title" variant="outlined" />
          <hr className="mt-6 mb-6 border-b-1 border-blueGray-300" />
        </div>
        <div className="">
          <h6 className="text-blue Gray-400 text-sm mt-3 mb-6 font-bold uppercase">Tagline</h6>
          <TextField name="tagline1" className="w-full bg-gray-100" label="Tagline-1" variant="outlined" />
          <TextField name="tagline2" className="w-full bg-gray-100 mt-2" label="Tagline-2" variant="outlined" />
          <hr className="mt-6 mb-6 border-b-1 border-blueGray-300" />
        </div>
        <div className="">
          <h6 className="text-blue Gray-400 text-sm mt-3 mb-6 font-bold uppercase">Course Duration</h6>
          <input
            type="number"
            name="duration"
            className="border border-gray-400 rounded-lg outline-none p-3 bg-gray-100"
            min={0}
            placeholder="Enter The Duration"
          />
          <hr className="mt-6 mb-6 border-b-1 border-blueGray-300" />
        </div>
        <div className="">
          <h6 className="text-blue Gray-400 text-sm mt-3 mb-6 font-bold uppercase">Course Short</h6>
          <RadioGroup aria-label="course-length" name="course-length">
            <FormControlLabel value="short" control={<Radio />} label="Short" onChange={handleCourseLengthChange} />
            <FormControlLabel value="not-short" control={<Radio />} label="Long" />
          </RadioGroup>

          <hr className="mt-6 mb-6 border-b-1 border-blueGray-300" />
        </div>
        <h6 className="text-blue Gray-400 text-sm mt-3 mb-6 font-bold uppercase">Course CURRICULAM</h6>
        <div className="flex flex-col  items-center mt-5 ">
          {boxes.map((box, index) => (
            <div key={index} className="relative w-full mb-3">
              <div className="border p-4 flex items-center justify-between">
                <IconButton onClick={() => toggleDropdown(index)}>
                  <KeyboardArrowDown />
                </IconButton>
                <TextField
                  label="Module"
                  variant="outlined"
                  value={box.mainTextFieldValue}
                  onChange={(event) => handleMainTextFieldChange(event, index)}
                  fullWidth
                  style={{ backgroundColor: '#f0f0f0' }}
                />
                {boxes.length > 1 && (
                  <IconButton onClick={() => deleteBox(index)} color="error">
                    <Delete />
                  </IconButton>
                )}
              </div>
              {box.isDropdownOpen && (
                <div className="border p-2 bg-white w-full" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {box.dropdownTextFields.map((text, textFieldIndex) => (
                    <Box key={textFieldIndex} className="flex items-center space-x-2 mt-2 mb-2">
                      <TextField
                        label="Sub Module"
                        variant="outlined"
                        value={text}
                        onChange={(event) => handleDropdownTextFieldChange(index, textFieldIndex, event.target.value)}
                        fullWidth
                        style={{ backgroundColor: '#f0f0f0', marginTop: 5 }}
                      />
                      {box.dropdownTextFields.length > 1 && (
                        <IconButton onClick={() => removeTextField(index, textFieldIndex)} color="error">
                          <Close style={{ color: 'red' }} />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                  <Button
                    onClick={() => addNewTextField(index)}
                    className="bg-[#282D48] text-white font-bold hover:bg-[#1b1e30]"
                    variant="outlined"
                    color="primary"
                  >
                    Add New SubModule
                  </Button>
                </div>
              )}
            </div>
          ))}
          <div className="mt-3 flex justify-start">
            <Button onClick={addNewBox} variant="outlined" className="ml-2 bg-[#282D48] text-white font-bold hover:bg-[#1b1e30]">
              Add New Module
            </Button>
          </div>
        </div>

        <hr className="mt-6 border-b-1 border-blueGray-300" />

        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Course Description</h6>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-Gray-600 text-sm font-bold mb-2" htmlFor="grid-password">
                Describe Course
              </label>
              <ReactQuill
                className="bg-white"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
                placeholder="Describe Course"
                value={description}
                onChange={setDescription}
              />
            </div>
          </div>
        </div>
        <hr className="mt-20 sm:mt-12 mb-6 border-b-1 border-blueGray-300" />

        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-sm text-blueGray-600  font-bold mb-2" htmlFor="grid-password">
                Course Thumbnail
              </label>
              <DropzoneArea
                dropzoneText={'Drag and drop an image here or click'}
                onChange={(files) => setCourseThumbnail(files)}
                filesLimit={1}
              />
            </div>
          </div>
        </div>
        <hr className="mt-6 mb-6 border-b-1 text-sm border-blueGray-300" />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-sm font-bold mb-2" htmlFor="grid-career">
                career path
              </label>
              <DropzoneArea
                dropzoneText={'Drag and drop an image here or click'}
                onChange={(files) => setCareerPathFile(files)}
                filesLimit={30}
              />
            </div>
          </div>
        </div>
        <hr className="mt-6 mb-6 border-b-1  border-blueGray-300" />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-sm text-blueGray-600  font-bold mb-2" htmlFor="grid-tech">
                tech stack
              </label>
              <DropzoneArea
                dropzoneText={'Drag and drop an image here or click'}
                onChange={(files) => setTechStackFile(files)}
                filesLimit={30}
              />
            </div>
          </div>
        </div>
        <hr className="mb-6 border-b-1 border-blueGray-300" />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12 px-4">
            <div className="relative w-full mb-3">
              <label className="block uppercase text-blueGray-600 text-sm font-bold mb-2" htmlFor="grid-password">
                Course Curriculam
              </label>
              <ReactQuill
                className="bg-white"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
                value={describeCourse}
                placeholder="Enter Course Curriculam"
                onChange={setDescribeCourse}
              />
            </div>
          </div>
        </div>
        <hr className="mt-20 sm:mt-12 border-b-1 border-blueGray-300" />

        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Course Quiz</h6>
        <div>
          <div>
            {questions.map((question, index) => (
              <div key={index} className="mx-auto mb-6 p-6 rounded-md ">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                        Question {index + 1}
                      </label>
                      <input
                        type="text"
                        id={`question-${index}`}
                        name={`question-${index}`}
                        value={question.question}
                        onChange={(event) => handleQuestionChange(index, event.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                      />
                    </div>
                  </div>
                </div>

                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mb-4 flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <label
                        htmlFor={`option-${index}-${optionIndex}`}
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      >
                        Option {optionIndex + 1}
                      </label>
                      <input
                        type="text"
                        id={`option-${index}-${optionIndex}`}
                        name={`option-${index}-${optionIndex}`}
                        value={option}
                        onChange={(event) => handleOptionChange(index, optionIndex, event.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                      />
                    </div>
                  </div>
                ))}

                <div className="mb-4 flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <label htmlFor={`answer-${index}`} className="block text-gray-700 font-bold mb-2">
                      Answer
                    </label>
                    <select
                      id={`answer-${index}`}
                      name={`answer-${index}`}
                      value={question.answer}
                      onChange={(event) => handleAnswerChange(index, event.target.value)}
                      className="border border-gray-400 bg-gray-100 p-2 w-full rounded-md"
                      required
                    >
                      <option value="">Select the correct answer</option>
                      {question.options.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addNewQuestion}
                  className="bg-[#282D48] text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  Add New Question
                </button>

                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    className="bg-[#282D48] text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  >
                    Remove Question
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <Button
            type="submit"
            className="bg-[#282D48] text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:bg-[#1b1e30]"
            variant="outlined"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </div>
      <Toaster />
    </form>
  );
};

export default SimpleForm;
