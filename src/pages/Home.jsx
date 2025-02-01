import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const HomeContainer = styled.div``;

const InputContainer = styled.div`
  padding: 20px 0;
`;

const DashboardContainer = styled.div`
  padding: 20px 0;
`;

const FilterMenuContainer = styled.div``;

const InnerDashboardContainer = styled.div``;

const DashboardTopContainer = styled.div``;

const DashboardBottomContainer = styled.div`
  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;

const Logo = styled.a`
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  color: black;
  background-color: #8fb9de;
`;

const EditBtn = styled.button`
  width: 40px;
  height: 25px;
`;

const BackBtn = styled.button`
  width: 40px;
  height: 25px;
`;

const SaveBtn = styled.button`
  width: 40px;
  height: 25px;
`;

const BacklogItem = styled.p`
  width: 200px;
  height: 30px;
  margin: 0;
  padding: 0;
  cursor: pointer;

  &:hover {
    background-color: #cce7ff;
    transition: 0.1s ease-in;
  }
`;

const DoneItem = styled.p`
  width: 200px;
  height: 30px;
  background-color: #909090;
  text-decoration: line-through;
  color: black;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const EditingForm = styled.form`
  display: flex;
  gap: 10px;

  input {
    height: 30px;
  }

  p {
    margin: 0;
    padding: 0;
  }
`;

const FilterMenu = styled.button`
  background-color: ${({ $selectedFilter }) =>
    $selectedFilter ? "darkgrey" : "white"};
  border: 1px solid darkgrey;
  cursor: pointer;
`;

function Home() {
  const [todo, setTodo] = useState("");
  const [modifiedTodo, setModifiedTodo] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const [todoList, setTodoList] = useState([]);
  const [filtertedTodoList, setFilteredTodoList] = useState(todoList);
  const [checkedIdList, setCheckedIdList] = useState([]);
  const filterList = ["ALL", "BACKLOG", "DONE"];

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");
    setTodoList(storedTodoList ? JSON.parse(storedTodoList) : []);
  }, []);

  useEffect(() => {
    let result = todoList;
    // Filter TodoList
    if (selectedFilter !== "ALL") {
      result = result.filter((todo) => todo.status === selectedFilter);
    }

    // Searched TodoList
    if (searchedTerm) {
      result = result?.filter((todo) => {
        return todo.content
          .replace(/(\s*)/g, "")
          .toLowerCase()
          .includes(searchedTerm.replace(/(\s*)/g, "").toLowerCase());
      });
    }

    setFilteredTodoList(result);
  }, [todoList, selectedFilter, searchedTerm]);

  const typeTodo = (e) => {
    setTodo(e.target.value);
  };

  const typeModifiedTodo = (e) => {
    setModifiedTodo(e.target.value);
  };

  const typeSearchedTerm = (e) => {
    setSearchedTerm(e.target.value);
  };

  const eraseTodo = () => {
    setTodo("");
  };

  // MAIN LOGIC
  const addNewTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uuidv4(),
      content: todo,
      status: "BACKLOG",
      isEditing: false,
    };

    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

    setTodo("");
  };

  const deleteTodo = (checkedIdList) => {
    const remainedTodoList = todoList?.filter(
      (todo) => !checkedIdList.includes(todo.id)
    );
    setTodoList(remainedTodoList);
    localStorage.setItem("todoList", JSON.stringify(remainedTodoList));
    setCheckedIdList([]);
  };

  const saveModifiedTodoContent = (e, id) => {
    e.preventDefault();
    const updatedTodoList = todoList?.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          content: modifiedTodo,
          isEditing: false,
        };
      }
      return todo;
    });

    setIsEditing(false);
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    setModifiedTodo("");
  };

  const handleCheckbox = (checkedId) => {
    const isFound = checkedIdList.find((item) => item === checkedId);
    // if it exist in the checkedIdList, remove it from the list
    if (isFound) {
      const remainedList = checkedIdList.filter((item) => item !== checkedId);
      setCheckedIdList(remainedList);
    } else {
      // if it doesn't exist in the checkedIdList, add it in the list
      const updatedList = [...checkedIdList, checkedId];
      setCheckedIdList(updatedList);
      console.log("checkedIdList:", checkedIdList);
    }
  };

  const handleItemStatus = (id) => {
    const updatedTodoList = todoList?.map((todo) => {
      if (todo.id === id) {
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

  const toggleEditingStatus = (id) => {
    const updatedTodoList = todoList?.map((todo) => {
      if (todo.id === id) {
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
    setIsEditing((isEditing) => !isEditing);
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  const startEditing = (id, content) => {
    console.log("here");
    setModifiedTodo(content);
    toggleEditingStatus(id);
  };

  const switchFilter = (filterName) => {
    setSelectedFilter(filterName);
  };

  return (
    <HomeContainer>
      <InputContainer>
        <Logo href="/">🏠 Todo</Logo>
        <form onSubmit={addNewTodo}>
          <input
            onChange={typeTodo}
            value={todo}
            name="todo"
            placeholder="write your todo.."
          />
          <button type="submit">Save</button>
          <button onClick={eraseTodo}>Cancel</button>
        </form>
      </InputContainer>
      <DashboardContainer>
        <FilterMenuContainer>
          {filterList?.map((item, idx) => {
            return (
              <FilterMenu
                onClick={() => switchFilter(item)}
                $selectedFilter={item === selectedFilter}
                key={idx}
              >
                {item}
              </FilterMenu>
            );
          })}
        </FilterMenuContainer>
        <InnerDashboardContainer>
          <DashboardTopContainer>
            <h3>{selectedFilter}</h3>
            <input
              onChange={typeSearchedTerm}
              value={searchedTerm}
              placeholder="search your todo.."
            />
            {isEditing ? (
              <></>
            ) : (
              <button onClick={() => deleteTodo(checkedIdList)}>Delete</button>
            )}
          </DashboardTopContainer>
          {filtertedTodoList.length > 0 ? (
            <DashboardBottomContainer>
              <ul>
                {filtertedTodoList?.map((todo) => {
                  return (
                    <li key={todo.id}>
                      {todo.isEditing ? (
                        <EditingForm
                          onSubmit={(e) => saveModifiedTodoContent(e, todo.id)}
                        >
                          <input
                            onChange={typeModifiedTodo}
                            value={modifiedTodo}
                            placeholder={todo.content}
                          />
                          <p>{todo.status}</p>
                          <BackBtn onClick={() => toggleEditingStatus(todo.id)}>
                            Back
                          </BackBtn>
                          <SaveBtn type="submit">Save</SaveBtn>
                        </EditingForm>
                      ) : (
                        <>
                          {todo.status === "BACKLOG" ? (
                            <BacklogItem
                              onClick={() => handleItemStatus(todo.id)}
                            >
                              {todo.content}
                            </BacklogItem>
                          ) : (
                            <DoneItem onClick={() => handleItemStatus(todo.id)}>
                              {todo.content}
                            </DoneItem>
                          )}
                          <p>{todo.status}</p>
                          <EditBtn
                            onClick={() => startEditing(todo.id, todo.content)}
                          >
                            Edit
                          </EditBtn>
                          {isEditing ? (
                            <></>
                          ) : (
                            <input
                              onChange={() => handleCheckbox(todo.id)}
                              type="checkbox"
                              checked={checkedIdList.includes(todo.id)}
                            />
                          )}
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </DashboardBottomContainer>
          ) : (
            <p>Add your todo...</p>
          )}
        </InnerDashboardContainer>
      </DashboardContainer>
    </HomeContainer>
  );
}

export default Home;
