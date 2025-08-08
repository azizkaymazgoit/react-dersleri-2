import { useDispatch, useSelector } from "react-redux";
import { selectFilter, setFilter } from "../redux/filterSlice";
import { selectTodosCount } from "../redux/todoSlice";

const TodoFilters = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectFilter);

  const todosCount = useSelector(selectTodosCount);

  return (
    <div>
      <h4>Seçilen: {filter}</h4>
      <select
        value={filter}
        onChange={(e) => {
          dispatch(setFilter(e.target.value));
        }}
        style={{ marginBottom: "20px" }}
      >
        <option value="all">Tümü</option>
        <option value="completed">Tamamlananlar</option>
        <option value="active">Devam Edenler</option>
      </select>
      <div>
        <h5>Tümü: {todosCount.allCount}</h5>
        <h5>Tamamlananlar: {todosCount.completedCount}</h5>
        <h5>Aktif Olanlar: {todosCount.activeCount}</h5>
      </div>
    </div>
  );
};

export default TodoFilters;
