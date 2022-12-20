import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { BsCheckLg, BsPencil, BsTrash } from "react-icons/bs";

function List() {
  let navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const todosCollectionRef = collection(db, "todos");

  useEffect(() => {
    // check isLogin
    if (!localStorage.getItem("isLogin")) {
      navigate("/login");
    }

    const getTodos = async () => {
      const data = await getDocs(todosCollectionRef);
      setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };

    getTodos();
  }, []);

  const finished = async (id) => {
    const todoDoc = doc(db, "todos", id);
    const newFields = { status: true };
    await updateDoc(todoDoc, newFields);
    // Update Todos
    const data = await getDocs(todosCollectionRef);
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    setTodos(todos.filter((todo) => todo.id !== id));
    await deleteDoc(todoDoc);
  };

  const handleLogout = async () => {
    await localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container">
      <center>
        <h2 className="mt-3">Todo List App</h2>
      </center>

      <Link to={"/create"} className="btn btn-primary m-3">
        Create
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Todo</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <center>
                  <h4>Loading ...</h4>
                </center>
              </td>
            </tr>
          ) : null}

          {todos.map((todo, index) => (
            <tr
              className={todo.status ? "table-success" : "table-light"}
              key={todo.id}
            >
              <td>{index + 1}</td>
              <td>{todo.item}</td>
              <td>{todo.status ? "Finished" : "In Progress"}</td>
              <td>
                {!todo.status ? (
                  <button
                    className="btn btn-sm btn-success m-1"
                    onClick={() => {
                      finished(todo.id);
                    }}
                  >
                    <BsCheckLg />
                  </button>
                ) : null}
                <Link
                  to={`/edit/${todo.id}`}
                  className="btn btn-sm btn-primary m-31"
                >
                  <BsPencil />
                </Link>
                <button
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                  className="btn btn-sm btn-danger m-1"
                >
                  <BsTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <center>
        <button
          onClick={() => {
            handleLogout();
          }}
          className="btn btn-sm btn-danger m-1"
        >
          Logout
        </button>
      </center>
    </div>
  );
}

export default List;
