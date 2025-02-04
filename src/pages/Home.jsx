import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;
const Logo = styled.a`
  text-decoration: none;
  color: black;
  background-color: lightgray;
  padding: 10px;
  width: 70px;

  p {
    cursor: pointer;
  }
`;
const InputContainer = styled.div``;
const DashboardContainer = styled.div``;
const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    width: 300px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
`;
const FilterMenuContainer = styled.div``;
const DisplayContainer = styled.div``;
const TopContainer = styled.form``;
const BottomContainer = styled.div`
  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      gap: 10px;
    }
  }
`;

const DoneItem = styled.li`
  background-color: yellow;
  width: 100px;
  cursor: pointer;
`;

const BacklogItem = styled.li`
  background-color: lightgreen;
  width: 100px;
  cursor: pointer;
`;

function Home() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedIdList, setSelectedIdList] = useState([]);

  // Type Logics
  const typeTodo = (e) => {
    setTodo(e.target.value);
  };

  const removeTodo = () => {
    setTodo("");
  };

  // Main Logics
  const addNewTodo = (e) => {
    e.preventDefault();
    if (todo.replace(/\s/g, "").length > 0) {
      const newTodo = {
        id: uuid(),
        content: todo,
        status: "BACKLOG",
        isEditing: false,
      };
      const updatedTodoList = [...todoList, newTodo];
      setTodoList(updatedTodoList);
      setTodo("");
      console.log("todoList:", todoList);
    } else {
      setTodo("");
    }
  };

  const handleCheckbox = (selectedId) => {
    const isFound = selectedIdList.find((item) => item === selectedId);
    if (isFound) {
      const remainedList = selectedIdList?.filter(
        (item) => item !== selectedId
      );
      setSelectedIdList(remainedList);
    } else {
      setSelectedIdList([...selectedIdList, selectedId]);
    }
  };

  const changeTodoStatus = (selectedId) => {
    const updatedTodoList = todoList?.map((todo) => {
      if (todo.id === selectedId) {
        return {
          ...todo,
          status: todo.status === "BACKLOG" ? "DONE" : "BACKLOG",
        };
      }
      return todo;
    });

    setTodoList(updatedTodoList);
  };

  console.log("selectedIdList", selectedIdList);

  return (
    <HomeContainer>
      <Logo href="/">
        <p>Todo</p>
      </Logo>
      <InputContainer>
        <InputForm onClick={addNewTodo}>
          <h2>Todo</h2>
          <input
            onChange={typeTodo}
            value={todo}
            placeholder="write your todos.."
          />
          <ButtonContainer>
            <button type="submit">Save</button>
            <button onClick={removeTodo}>Cancel</button>
          </ButtonContainer>
        </InputForm>
      </InputContainer>
      <DashboardContainer>
        <FilterMenuContainer>
          <div>
            <button>All</button>
          </div>
        </FilterMenuContainer>
        <DisplayContainer>
          <TopContainer>
            <h3>All</h3>
            <input placeholder="search your todos.." />
            <button type="submit">Delete</button>
          </TopContainer>
          <BottomContainer>
            {todoList?.length > 0 ? (
              <ul>
                {todoList?.map((todo) => {
                  return (
                    <li key={todo.id}>
                      {todo.status === "DONE" ? (
                        <DoneItem onClick={() => changeTodoStatus(todo.id)}>
                          {todo.content}
                        </DoneItem>
                      ) : (
                        <BacklogItem onClick={() => changeTodoStatus(todo.id)}>
                          {todo.content}
                        </BacklogItem>
                      )}

                      <p>{todo.status}</p>
                      <input
                        value={selectedId}
                        onChange={() => handleCheckbox(todo.id)}
                        type="checkbox"
                        checked={selectedIdList?.includes(todo.id)}
                      />
                      {/* onChange and then checked */}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>add your todos..</p>
            )}
          </BottomContainer>
        </DisplayContainer>
      </DashboardContainer>
    </HomeContainer>
  );
}

export default Home;
