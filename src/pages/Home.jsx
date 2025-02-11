import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

// double check typos
// distinguish onClick and onSubmit

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 46px;
  padding: 33px 80px;
  background-color: #f9fafb;

  @media (max-width: 770px) {
    flex-direction: column;
    align-items: start;
    padding: 20px 30px;
  }
`;

const InputContainer = styled.div`
  background-color: white;
  min-width: 350px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 1px 1px 6px #e5e7eb;

  @media (max-width: 770px) {
    min-width: 100%;
    padding: 16px;
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 770px) {
    gap: 16px;
    width: 100%;
  }
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;

  input {
    width: 100%;
    border: 1.3px solid #e5e7eb;
    border-radius: 8px;
    min-height: 68px;
    padding: 16px;

    &:focus {
      outline: none;
    }
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: black;
    margin: 0;
  }

  @media (max-width: 770px) {
    align-items: center;
    input {
      width: 100%;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;

  @media (max-width: 770px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const SaveButton = styled.button`
  background-color: #4f46e5;
  color: white;
  height: 42px;
  width: 86.47px;
  border: none;
  border-radius: 4px;
  padding: 11px 17px;
  cursor: pointer;

  @media (max-width: 770px) {
    width: 100%;
    height: 50px;
  }
`;

const CancelButton = styled.button`
  background-color: white;
  color: black;
  height: 42px;
  width: 86.47px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 11px 17px;
  cursor: pointer;

  @media (max-width: 770px) {
    width: 100%;
    height: 50px;
  }
`;

const EditButton = styled.button`
  width: 32px;
  height: 28px;
  font-size: 9px;
  padding: 1px;
  background-color: transparent;
  color: #6b7280;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  cursor: pointer;
`;
const WhiteButton = styled.button`
  color: #6b7280;
  height: 31px;
  width: 65px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 6px 4px 7px;
  background-color: white;
`;
const FilterMenuContainer = styled.div``;
const DisplayContainer = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  box-shadow: 1px 1px 6px #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  max-width: 612px;

  @media (max-width: 770px) {
    width: 100%;
    max-width: 100%;
    padding: 16px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    h3 {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }
  }

  input {
    min-width: 240px;
    height: 30px;
    padding: 3px 16px 4px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;

    @media (max-width: 770px) {
      width: 100%;
      min-width: 150px;
    }
  }

  @media (max-width: 770px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const BottomContainer = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    gap: 13px;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      @media (min-width: 770px) {
        gap: 8px;
      }
    }
  }

  @media (max-width: 770px) {
    padding: 0;
    gap: 10px;
  }
`;

const DoneItem = styled.div`
  border: none;
  border-radius: 15px;
  color: white;
  background-color: #c1bfe0;
  font-size: 14px;
  padding: 15px 31px 5px;
  height: 49px;
  width: 100%;
  cursor: pointer;
  margin: 0;
  text-decoration: line-through;

  @media (max-width: 770px) {
    padding: 10px 20px;
    font-size: 14px;
    height: auto;
  }
`;

const BacklogItem = styled.div`
  position: relative;
  border: none;
  border: 1px solid #e5e7eb;
  border-radius: 15px;
  color: #6b7280;
  background-color: white;
  padding: 15px 31px 5px;
  font-size: 14px;
  height: 49px;
  width: 100%;
  cursor: pointer;
  margin: 0;
  z-index: 998;

  @media (max-width: 770px) {
    padding: 10px 20px;
    font-size: 14px;
    height: auto;
  }
`;

const ModifiedForm = styled.form`
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 770px) {
    flex-direction: column;
    width: 100%;
    gap: 1px;
  }
`;

const Menu = styled.button`
  height: 42px;
  width: 110px;
  border-radius: 4px;
  border: ${({ $selectedMenu }) =>
    $selectedMenu ? "none" : "1px solid #d1d5db"};
  background-color: ${({ $selectedMenu }) =>
    $selectedMenu ? "#4F46E5" : "white"};
  color: ${({ $selectedMenu }) => ($selectedMenu ? "white" : "black")};
  cursor: pointer;

  @media (max-width: 770px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const CheckBox = styled.input`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  border: none;
  background-color: #4f46e5;
  margin: 0;

  @media (max-width: 770px) {
    width: 25px;
    height: 25px;
  }
`;

const SearchInput = styled.input`
  &:focus {
    outline: none;
  }
  width: 100%;

  @media (max-width: 770px) {
    width: 100%;
  }
`;

const TopInputContainer = styled.div`
  /* min-width: 490px; */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
  gap: 10px;

  h3 {
    font-size: 18px;
    padding-left: 5px;
  }

  @media (min-width: 770px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const ModifiedInput = styled.input`
  border: 1px solid #e5e7eb;
  border-radius: 15px;
  color: #4f46e5;
  background-color: white;
  width: 100%;
  font-size: 14px;
  padding: 15px 31px;
  height: 49px;
  margin: 0;

  &:focus {
    outline: none;
  }

  @media (max-width: 770px) {
    width: 100%;
    padding: 10px 16px;
    margin-bottom: 10px;
  }
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
      <InputContainer>
        <InputForm onSubmit={addNewTodo}>
          <h2>Todo</h2>
          <input
            onChange={typeTodo}
            value={todo}
            placeholder="Write your todos.."
          />
          <ButtonContainer>
            <SaveButton type="submit">Save</SaveButton>
            <CancelButton type="button" onClick={removeTodo}>
              Cancel
            </CancelButton>
          </ButtonContainer>
        </InputForm>
      </InputContainer>
      <DashboardContainer>
        <FilterMenuContainer>
          <MenuContainer>
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
          </MenuContainer>
        </FilterMenuContainer>
        <DisplayContainer>
          <TopContainer>
            <TopInputContainer>
              <h3>{selectedMenu}</h3>
              <SearchInput
                onChange={typeSearchTerm}
                value={searchTerm}
                placeholder="search your todos.."
              />
            </TopInputContainer>
            <WhiteButton onClick={deleteTodo}>Delete</WhiteButton>
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
                          <ModifiedInput
                            onChange={typeModifiedTodo}
                            value={modifiedTodo}
                            placeholder={todo.content}
                          />
                          <EditButton
                            type="button"
                            onClick={() =>
                              handleEditingMode(todo.id, todo.content)
                            }
                          >
                            Back
                          </EditButton>
                          <EditButton type="submit">Save</EditButton>
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
                          {/* onChange and then checked */}
                          <EditButton
                            onClick={() =>
                              handleEditingMode(todo.id, todo.content)
                            }
                          >
                            Edit
                          </EditButton>
                          <CheckBox
                            value={selectedId}
                            onChange={() => handleCheckbox(todo.id)}
                            type="checkbox"
                            checked={selectedIdList?.includes(todo.id)}
                          />
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p style={{ paddingLeft: "5px" }}>add your todos..</p>
            )}
          </BottomContainer>
        </DisplayContainer>
      </DashboardContainer>
    </HomeContainer>
  );
}

export default Home;
