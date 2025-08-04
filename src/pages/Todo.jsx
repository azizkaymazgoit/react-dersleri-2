import { useEffect, useState } from "react";
import css from "./Todo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../redux/todoSlice";

const Todo = () => {
  const todoList = useSelector((state) => state.todos.data);

  const [text, setText] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const handleAddTodo = () => {
    dispatch(addTodo(text));
  };

  const handleUpdateTodo = (id) => {
    dispatch(updateTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <div className={css.todoContainer}>
        <h2>Yapılacaklar Listesi</h2>
        <div className={css.inputGroup}>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Bir şeyler yaz..."
            className={css.input}
          />
          <button onClick={handleAddTodo} className={css.addButton}>
            Ekle
          </button>
        </div>

        <ul className={css.todoList}>
          {todoList.map((todo) => (
            <li
              key={todo.id}
              className={`${css.todo} ${todo.tamamlandi ? css.completed : ""}`}
            >
              <span>{todo.text}</span>
              <div className={css.buttons}>
                <button
                  onClick={() => {
                    handleUpdateTodo(todo.id);
                  }}
                >
                  {todo.tamamlandi ? "Geri Al" : "Tamamla"}
                </button>
                <button
                  onClick={() => {
                    handleDeleteTodo(todo.id);
                  }}
                  className={css.silBtn}
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
