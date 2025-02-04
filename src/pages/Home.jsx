import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

const HomeContainer = styled.div``;
const Logo = styled.div`
  text-decoration: none;
  color: black;
`;
const InputContainer = styled.div``;
const DashBoardContainer = styled.div``;
const TodoForm = styled.form``;
const FilterContainer = styled.div`
  display: flex;
  padding-top: 10px;
`;

const MenuBtn = styled.button`
  background-color: ${({ $selectedMenu }) =>
    $selectedMenu ? "lightblue" : "lightgray"};
  border: 1px solid black;
  cursor: pointer;
`;

const DoneItem = styled.p`
  width: 150px;
  background-color: #687b82;
  cursor: pointer;
  text-decoration: line-through;

  &:hover {
    background-color: lightblue;
    transition: 0.1s ease-out;
  }
`;
const BacklogItem = styled.p`
  width: 150px;
  background-color: lightgray;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: lightblue;
    transition: 0.1s ease-out;
  }
`;
const InnerDashBoardContainer = styled.div``;
const DashBoardSearchContainer = styled.div``;
const DashBoardDisplayContainer = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      height: 30px;
    }

    form {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      input {
        height: 20px;
      }
    }
  }
`;

function Home() {
  const [todo, setTodo] = useState("");
  const [modifiedTodo, setModifiedTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [todoList, setTodoList] = useState([]);
  const [filteredTodoList, setFilteredTodoList] = useState(todoList);
  const [selectedIdList, setSelectedIdList] = useState([]);
  const filterMenuList = ["ALL", "BACKLOG", "DONE"];
  const [selectedMenu, setSelectedMenu] = useState("ALL");

  useEffect(() => {
    // Filtering todoList
    let result = todoList;
    if (selectedMenu !== "ALL") {
      result = todoList?.filter((todo) => todo.status === selectedMenu);
    }

    // Searching todoList
    result = todoList?.filter((todo) => {
      return todo.content
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(searchTerm.toLowerCase().replace(/\s/g, ""));
    });

    setFilteredTodoList(result);
  }, [todoList, selectedMenu, searchTerm]);

  // TYPING HANDLE
  const typeTodo = (e) => {
    setTodo(e.target.value);
  };

  const typeModifiedTodo = (e) => {
    setModifiedTodo(e.target.value);
  };

  const typeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const removeTodoState = () => {
    setTodo("");
  };

  // MAIN LOGICS
  const addNewTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uuid(),
      content: todo,
      isEditing: false,
      status: "BACKLOG",
    };

    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    setTodo("");
  };

  const changeTodoStatus = (id) => {
    const updatedTodoList = todoList?.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          status: todo.status === "BACKLOG" ? "DONE" : "BACKLOG",
        };
      }
      return todo;
    });

    setTodoList(updatedTodoList);
  };

  const handleCheckbox = (id) => {
    const isFound = selectedIdList.find((item) => item === id);
    if (isFound) {
      const remainedIdList = selectedIdList?.filter((item) => item !== id);
      setSelectedIdList(remainedIdList);
    } else {
      const updatedIdList = [...selectedIdList, id];
      setSelectedIdList(updatedIdList);
    }
  };

  const deleteTodo = () => {
    const updatedTodoList = todoList?.filter((todo) => {
      return !selectedIdList.includes(todo.id);
    });
    setTodoList(updatedTodoList);
    setSearchTerm("");
  };

  const updateModifiedTodo = (e, selectedId) => {
    e.preventDefault();
    const updatedList = todoList?.map((todo) => {
      if (todo.id === selectedId) {
        return {
          ...todo,
          content: modifiedTodo,
          isEditing: false,
        };
      }
      return todo;
    });

    setModifiedTodo("");
    setTodoList(updatedList);
  };

  const toggleTodoEditingState = (selectedId) => {
    const updatedTodoList = todoList?.map((todo) => {
      if (todo.id === selectedId) {
        return {
          ...todo,
          isEditing: !todo.isEditing,
        };
      }
      return {
        ...todo,
        isEditing: false,
      };
    });
    setTodoList(updatedTodoList);
  };

  const handleEditingMode = (id, content) => {
    setModifiedTodo(content);
    toggleTodoEditingState(id);
  };

  const switchMenu = (name) => {
    setSelectedMenu(name);
  };

  return (
    <HomeContainer>
      <Logo>Todo</Logo>

      {/* Todo Input */}
      <InputContainer>
        <TodoForm onSubmit={addNewTodo}>
          <h3>Todo</h3>
          <input
            onChange={typeTodo}
            value={todo}
            placeholder="write your todos.."
          />
          <button type="submit">Save</button>
          <button onClick={removeTodoState}>Cancel</button>
        </TodoForm>
      </InputContainer>

      {/* Todo Display */}
      <DashBoardContainer>
        <FilterContainer>
          {filterMenuList?.map((menu, idx) => {
            return (
              <MenuBtn
                onClick={() => switchMenu(menu)}
                key={idx}
                $selectedMenu={menu === selectedMenu}
              >
                {menu}
              </MenuBtn>
            );
          })}
        </FilterContainer>
        <InnerDashBoardContainer>
          <DashBoardSearchContainer>
            <h3>{selectedMenu}</h3>
            <input
              onChange={typeSearchTerm}
              value={searchTerm}
              placeholder="search your todo.."
            />
            <button onClick={deleteTodo}>Delete</button>
          </DashBoardSearchContainer>
          {filteredTodoList.length > 0 ? (
            <DashBoardDisplayContainer>
              {filteredTodoList?.map((todo) => {
                return (
                  <li key={todo.id}>
                    {/* Editing Mode */}
                    {todo.isEditing ? (
                      <form onSubmit={(e) => updateModifiedTodo(e, todo.id)}>
                        <input
                          onChange={typeModifiedTodo}
                          value={modifiedTodo}
                          placeholder={todo.content}
                        />
                        <p>{todo.status}</p>
                        <button
                          onClick={() =>
                            handleEditingMode(todo.id, todo.content)
                          }
                        >
                          Back
                        </button>{" "}
                        <button type="submit">Save</button>
                      </form>
                    ) : (
                      <>
                        {/* Backlog OR Done */}
                        {todo.status === "DONE" ? (
                          <DoneItem onClick={() => changeTodoStatus(todo.id)}>
                            {todo.content}
                          </DoneItem>
                        ) : (
                          <BacklogItem
                            onClick={() => changeTodoStatus(todo.id)}
                          >
                            {todo.content}
                          </BacklogItem>
                        )}
                        <p>{todo.status}</p>
                        <button
                          onClick={() =>
                            handleEditingMode(todo.id, todo.content)
                          }
                        >
                          Edit
                        </button>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckbox(todo.id)}
                          checked={selectedIdList?.includes(todo.id)}
                        />
                      </>
                    )}
                  </li>
                );
              })}
            </DashBoardDisplayContainer>
          ) : (
            <p>Add your todos ...</p>
          )}
        </InnerDashBoardContainer>
      </DashBoardContainer>
    </HomeContainer>
  );
}

export default Home;
