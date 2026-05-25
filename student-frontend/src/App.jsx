import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
  });

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/students";

  // Fetch students
  const getStudents = async () => {
    try {
      const res = await axios.get(API);
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(API, formData);
      }

      setFormData({
        name: "",
        age: "",
        course: "",
      });

      getStudents();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getStudents();
    } catch (err) {
      console.log(err);
    }
  };

  // Edit student
  const editStudent = (student) => {
    setFormData({
      name: student.name,
      age: student.age,
      course: student.course,
    });

    setEditId(student._id);
  };

  return (
    <div className="container">
      <h1>Student CRUD App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <div className="student-list">
        {students.map((student) => (
          <div className="card" key={student._id}>
            <h3>{student.name}</h3>
            <p>Age: {student.age}</p>
            <p>Course: {student.course}</p>

            <div className="btns">
              <button onClick={() => editStudent(student)}>
                Edit
              </button>

              <button
                className="delete"
                onClick={() => deleteStudent(student._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;