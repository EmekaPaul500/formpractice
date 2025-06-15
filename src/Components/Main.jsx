import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Todo from "./Todo";
import axios from "axios";

const Main = () => {
  const location = useLocation();
  const { user_name, user_id } = location.state;

  const [todos, setTodos] = useState({ user_id: user_id, Tasks: [] });
  const [inputData, setInputData] = useState("");
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const saveTask = async (e) => {
    // e.preventDefault();
    if (inputData === "") {
      return;
    }
    if (inputData.trim() === "") return;

    // Axios
    try {
      const payload = {
        user_id,
        Tasks: [{ todo: inputData }],
      };

      const response = await axios.post(
        "https://practice-vdup.onrender.com/Task/add_task",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Task saved:", response.data);

      setInputData(""); // Clear input field

      // Re-fetch tasks from backend to refresh UI
      const res = await axios.get(
        `https://practice-vdup.onrender.com/Task/${user_id}`
      );
      setUserTasks(res.data);
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save task. Please check your internet connection.");
    }
  };

  const editTask = async (taskId, oldContent) => {
    const newContent = prompt("Edit your task:", oldContent);

    if (!newContent || newContent.trim() === "") return;

    try {
      await axios.put(
        `https://practice-vdup.onrender.com/Task/update_task/${taskId}`,
        { user_id, todo: newContent } // Update this if your backend expects a different key
      );

      // Re-fetch tasks after successful update
      const res = await axios.get(
        `https://practice-vdup.onrender.com/Task/${user_id}`
      );
      setUserTasks(res.data);

      console.log("Task updated successfully");
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `https://practice-vdup.onrender.com/Task/delete_task/${taskId}?user_id=${user_id}`
      );

      // Re-fetch tasks after deletion
      const res = await axios.get(
        `https://practice-vdup.onrender.com/Task/${user_id}`
      );
      setUserTasks(res.data);

      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  useEffect(() => {
    if (!user_id) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `https://practice-vdup.onrender.com/Task/${user_id}`
        );
        setUserTasks(res.data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user_id]);

  let displayUserTasks = userTasks.tasks || [];

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>Welcome {user_name}</h1>
      {/* <form action=""> */}
      <input
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      {/* <input type="button" value="Save Task" /> */}
      {/* </form> */}
      <button onClick={saveTask}>Add Task</button>

      <div className="todos_div">
        {displayUserTasks.length === 0 ? (
          <p>No tasks added yet</p>
        ) : (
          displayUserTasks.map((task) => {
            return (
              <Todo
                key={task.id}
                todo={task.Content}
                editTask={() => editTask(task.id, task.Content)}
                deleteTask={() => deleteTask(task.id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Main;
