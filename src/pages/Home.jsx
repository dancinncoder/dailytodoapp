import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

// double check typos
// distinguish onClick and onSubmit

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
const TopContainer = styled.div``;
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

const DoneItem = styled.p`
  background-color: #a9a99b;
  width: 100px;
  text-decoration: line-through;
  cursor: pointer;
`;

const BacklogItem = styled.p`
  background-color: lightgreen;
  width: 100px;
  cursor: pointer;
`;

const ModifiedForm = styled.form`
  display: flex;
`;

const Menu = styled.button`
  background-color: ${({ $selectedMenu }) =>
    $selectedMenu ? "yellow" : "lightgrey"};
`;

function Home() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [filteredTodoList, setFilteredTodoList] = useState(todoList);
  const [selectedId, setSelectedId] = useState("");
  const [selectedIdList, setSelectedIdList] = useState([]);
  const [modifiedTodo, setModifiedTodo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filterMenuList = ["ALL", "BACKLOG", "DONE"];
  const [selectedMenu, setSelectedMenu] = useState("ALL");

  useEffect(() => {
    const storedtodoList = localStorage.getItem("todoList");
    setTodoList(storedtodoList ? JSON.parse(storedtodoList) : []);
  }, []);

  useEffect(() => {
    // Filter
    let result = todoList;
    if (selectedMenu !== "ALL") {
      result = result?.filter((todo) => todo.status === selectedMenu);
    }

    // Search
    result = result?.filter((todo) => {
      return todo.content
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(searchTerm.replace(/\s/g, "").toLowerCase());
    });

    setFilteredTodoList(result);
  }, [todoList, selectedMenu, searchTerm]);

  // Type Logics
  const typeTodo = (e) => {
    setTodo(e.target.value);
  };

  const typeModifiedTodo = (e) => {
    setModifiedTodo(e.target.value);
  };

  const typeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const removeTodo = () => {
    setTodo("");
  };

  // Main Logics
  const addNewTodo = (e) => {
    e.preventDefault();

    const newTodo = {
      id: uuid(),
      content: todo,
      status: "BACKLOG",
      isEditing: false,
    };
    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    setTodo("");
    console.log("todoList:", todoList);
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
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  const deleteTodo = () => {
    const filteredTodoList = todoList?.filter((todo) => {
      return !selectedIdList.includes(todo.id);
    });
    console.log("filteredTodoList", filteredTodoList);
    setTodoList(filteredTodoList);
    localStorage.setItem("TodoList", JSON.stringify(filteredTodoList));
    setSearchTerm("");
  };

  const toggleEditingStatus = (selectedId) => {
    const updatedTodoList = todoList?.map((todo) => {
      if (selectedId === todo.id) {
        return {
          ...todo,
          isEditing: !todo.isEditing,
        };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
    localStorage.setItem("TodoList", JSON.stringify(updatedTodoList));
  };

  const handleEditingMode = (selectedId, previousTodoContent) => {
    toggleEditingStatus(selectedId);
    setModifiedTodo(previousTodoContent);
  };

  const saveModifiedTodo = (e, selectedId) => {
    e.preventDefault();
    const updatedTodoList = todoList?.map((todo) => {
      if (todo.id === selectedId) {
        return {
          ...todo,
          content: modifiedTodo,
          isEditing: false,
        };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
    localStorage.setItem("TodoList", JSON.stringify(updatedTodoList));
  };

  const changeSelectedMenu = (menuName) => {
    setSelectedMenu(menuName);
  };

  console.log("selectedIdList", selectedIdList);

  return (
    <HomeContainer>
      <Logo href="/">
        <p>Todo</p>
      </Logo>
      <InputContainer>
        <InputForm onSubmit={addNewTodo}>
          <h2>Todo</h2>
          <input
            onChange={typeTodo}
            value={todo}
            placeholder="write your todos.."
          />
          <ButtonContainer>
            <button type="submit">Save</button>
            <button type="button" onClick={removeTodo}>
              Cancel
            </button>
          </ButtonContainer>
        </InputForm>
      </InputContainer>
      <DashboardContainer>
        <FilterMenuContainer>
          <div>
            {filterMenuList?.map((menu, index) => {
              return (
                <Menu
                  onClick={() => changeSelectedMenu(menu)}
                  key={index}
                  $selectedMenu={menu === selectedMenu}
                >
                  {menu}
                </Menu>
              );
            })}
          </div>
        </FilterMenuContainer>
        <DisplayContainer>
          <TopContainer>
            <h3>{selectedMenu}</h3>
            <input
              onChange={typeSearchTerm}
              value={searchTerm}
              placeholder="search your todos.."
            />
            <button onClick={deleteTodo}>Delete</button>
          </TopContainer>
          <BottomContainer>
            {filteredTodoList?.length > 0 ? (
              <ul>
                {filteredTodoList?.map((todo) => {
                  return (
                    <li key={todo.id}>
                      {todo.isEditing === true ? (
                        <ModifiedForm
                          onSubmit={(e) => saveModifiedTodo(e, todo.id)}
                        >
                          <input
                            onChange={typeModifiedTodo}
                            value={modifiedTodo}
                            placeholder={todo.content}
                          />
                          <p>{todo.status}</p>
                          <button
                            type="button"
                            onClick={() =>
                              handleEditingMode(todo.id, todo.content)
                            }
                          >
                            Back
                          </button>
                          <button type="submit">Save</button>
                        </ModifiedForm>
                      ) : (
                        <>
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
                          <input
                            value={selectedId}
                            onChange={() => handleCheckbox(todo.id)}
                            type="checkbox"
                            checked={selectedIdList?.includes(todo.id)}
                          />
                          {/* onChange and then checked */}
                          <button
                            onClick={() =>
                              handleEditingMode(todo.id, todo.content)
                            }
                          >
                            Edit
                          </button>
                        </>
                      )}
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
