import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { v4 as uuid } from "uuid";

const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
`;

const ListContent = styled.p`
  text-decoration: ${({ $isDone }) =>
    $isDone === true ? "line-through" : "none"};
`;

const EditingListContent = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModifiedInput = styled.input``;

const FilterBtn = styled.button`
  background-color: ${({ $isActivatedButton }) =>
    $isActivatedButton === true ? "yellow" : "transparent"};
`;

function Home() {
  const [todo, setTodo] = useState("");
  const [modifiedTodo, setModifiedTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [filteredTodoList, setFilteredTodoList] = useState(todoList);
  const [activatedFilter, setActivatedFilter] = useState("ALL");
  const [filters, setFilters] = useState([
    { id: 1, title: "ALL" },
    { id: 2, title: "BACKLOG" },
    { id: 3, title: "DONE" },
  ]);

  useEffect(() => {
    const storedTodoListData = localStorage.getItem("todoList");
    setTodoList(storedTodoListData ? JSON.parse(storedTodoListData) : []);
  }, []);

  useEffect(() => {
    // filtering default setup
    let result = todoList;
    if (activatedFilter !== "ALL") {
      result = todoList?.filter((todo) => {
        const convertedStatus = todo.isDone ? "DONE" : "BACKLOG";
        return convertedStatus === activatedFilter;
      });
    }
    setFilteredTodoList(result);
    console.log("acti fi:", activatedFilter);
  }, [todoList, activatedFilter]);

  const typeTodo = (e) => {
    setTodo(e.target.value);
  };

  const typeModifiedTodo = (e) => {
    setModifiedTodo(e.target.value);
  };

  const resetTodo = () => {
    setTodo("");
  };

  const addNewTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uuid(),
      content: todo,
      isDone: false,
      isEditing: false,
    };
    const updatedList = [...todoList, newTodo];
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    setTodo("");
  };

  const deleteTodo = (id) => {
    const updatedList = todoList?.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  const changeStatus = (id) => {
    const updatedList = todoList?.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }
      return todo;
    });
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  const changeEditingMode = (id) => {
    const selectedTodo = todoList?.find((todo) => {
      return todo.id === id;
    });
    setModifiedTodo(selectedTodo.content);

    const updatedList = todoList?.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isEditing: !todo.isEditing,
        };
      }
      return todo;
    });
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  const updateTodo = (id) => {
    const updatedList = todoList?.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          content: modifiedTodo,
          isEditing: false,
        };
      }
      return todo;
    });
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  const changeActivatedFilter = (title) => {
    setActivatedFilter(title);
  };

  return (
    <div>
      <form onSubmit={addNewTodo}>
        <input value={todo} type="text" onChange={(e) => typeTodo(e)} />
        <button type="button" onClick={resetTodo}>
          reset
        </button>
        <button type="submit">add</button>
      </form>
      <div>
        current activated filter : {activatedFilter.title}
        <div>
          {filters?.map((filter) => {
            const { id, title } = filter;
            return (
              <FilterBtn
                onClick={() => changeActivatedFilter(title)}
                key={id}
                $isActivatedButton={title === activatedFilter}
              >
                {title}
              </FilterBtn>
            );
          })}
        </div>
      </div>
      <div>
        <ul>
          {filteredTodoList?.map((todo) => {
            const { content, id, isDone, isEditing } = todo;
            return (
              <List key={id}>
                {isEditing ? (
                  <EditingListContent>
                    <ModifiedInput
                      value={modifiedTodo}
                      type="text"
                      onChange={(e) => typeModifiedTodo(e)}
                    />
                    <button onClick={() => changeEditingMode(id)}>back</button>
                    <button onClick={() => updateTodo(id)}>save</button>
                  </EditingListContent>
                ) : (
                  <>
                    <ListContent $isDone={isDone}>
                      {" "}
                      <span>{content}</span>{" "}
                      {isDone ? <span> DONE</span> : <span> BACKLOG</span>}
                    </ListContent>
                    <button type="button" onClick={() => changeEditingMode(id)}>
                      edit
                    </button>
                    <button onClick={() => deleteTodo(id)}>delete</button>
                  </>
                )}

                <input
                  onChange={() => changeStatus(id)}
                  type="checkbox"
                  checked={isDone === true}
                />
              </List>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Home;
