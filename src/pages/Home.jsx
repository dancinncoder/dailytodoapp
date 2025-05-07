import React, { useState } from "react";
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

function Home() {
  const [todo, setTodo] = useState("");
  const [modifiedTodo, setModifiedTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

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
    setTodoList([...todoList, newTodo]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    const updatedList = todoList?.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(updatedList);
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
        <ul>
          {todoList?.map((todo) => {
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

                <input onChange={() => changeStatus(id)} type="checkbox" />
              </List>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Home;
