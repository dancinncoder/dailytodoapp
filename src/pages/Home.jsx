import React, { useState } from "react";
import { styled } from "styled-components";
import { v4 as uuidv4 } from "uuid";

const List = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
`;

const ListContent = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border: 1px solid red;
  width: 300px;
  padding: 12px 16px;
  margin: 6px 0;
  transition: background-color 0.3s ease-in-out;
  text-decoration: ${({ $isDone }) => ($isDone ? "line-through" : "none")};

  &:hover {
    background-color: #b0b4b8;
  }
`;

const EditInput = styled.input`
  padding: 12px 16px;
  margin: 6px 0;
  width: 300px;
`;

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

  const addTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      id: uuidv4(),
      content: todo,
      isDone: false,
      isEditing: false,
    };

    setTodoList([...todoList, newTodo]);
    setTodo("");
  };

  const changeStatus = (selectedId) => {
    const updatedTodoList = todoList?.map((todo) => {
      if (todo.id === selectedId) {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }
      // 조건에 맞지 않는 아이템은 그대로 return
      return todo;
    });

    setTodoList(updatedTodoList);
  };

  const deleteTodo = (id) => {
    const updatedTodoList = todoList?.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(updatedTodoList);
  };

  const changeEditingStatus = (id) => {
    const selectedTodo = todoList?.find((todo) => {
      return todo.id === id;
    });
    setModifiedTodo(selectedTodo.content);

    const updatedTodoList = todoList?.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isEditing: !todo.isEditing,
        };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const updateTodo = (id) => {
    const updatedTodoList = todoList?.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isEditing: false,
          content: modifiedTodo,
        };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input value={todo} name="todo" onChange={(e) => typeTodo(e)} />
        <button type="submit">Add</button>
        <button type="button" onClick={resetTodo}>
          Reset
        </button>
      </form>
      <List>
        {todoList?.map((todo) => {
          return (
            <ListItem key={todo.id}>
              {todo.isEditing ? (
                <>
                  <EditInput
                    name={modifiedTodo}
                    value={modifiedTodo}
                    onChange={(e) => typeModifiedTodo(e)}
                  />
                  <button onClick={() => changeEditingStatus(todo.id)}>
                    Back
                  </button>
                  <button type="submit" onClick={() => updateTodo(todo.id)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <ListContent
                    $isDone={todo.isDone}
                    onClick={() => changeStatus(todo.id)}
                  >
                    {todo.content}{" "}
                    {todo.isDone ? <span> DONE</span> : <span> BACKLOG</span>}
                  </ListContent>
                  <button onClick={() => changeEditingStatus(todo.id)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    // onClick={(e) => {
                    //   // 부모인 ListItem의 onClick이 먼저 반응하여 이벤트 버블링발생. 이를 중단하기 위해 e.stopPropagation() 사용.
                    //   e.stopPropagation();
                    //   deleteTodo(todo.id);
                    // }}
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default Home;
