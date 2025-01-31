import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const HomeContainer = styled.div`
  border: 1px solid red;
  padding: 10px;
`;
const TodoContainer = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
const TodoInputContainer = styled.div``;
const TodoBoardContainer = styled.div``;
const TodoFilterContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const TodoResultContainer = styled.div``;
const TodoInputButtonContainer = styled.div`
  display: flex;
`;
const TodoResultTop = styled.div``;
const TodoResultBottom = styled.div``;
const TodoResultButtonContainer = styled.div``;
const TodoListContainer = styled.ul`
  list-style: none;

  li {
    display: flex;
    gap: 20px;
    :hover {
      background-color: lightblue;
      transition: ease-out 0.2s;
    }

    p {
      cursor: pointer;
      min-width: 200px;
      margin: 0;
    }
  }
`;
const CheckButton = styled.input`
  width: 20px;
  height: 20px;
`;

const DoneItem = styled.p`
  text-decoration-color: black;
  text-decoration-line: line-through !important;
  border: 1px solid lightgray;
  background-color: #b9dfdf;
`;

const BacklogItem = styled.p`
  /* background-color: white; */
  border: 1px solid lightgray;
`;

const EditingInput = styled.input`
  min-width: 200px;
  margin: 0;
`;

const FilterButton = styled.button`
  background-color: ${(props) => (props.isSelected ? "lightblue" : "white")};
  border: 1px solid lightgray;
  padding: 5px 10px;
  cursor: pointer;
`;

function Home() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [modifiedTodo, setModifiedTodo] = useState("");
  const [checkedIdList, setCheckedIdList] = useState([]);
  const [filteredTodoList, setFilteredTodoList] = useState([]);
  const filterList = ["ALL", "BACKLOG", "DONE"];
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [isEditing, setIsEditing] = useState(false);

  // Update filteredTodoList when todoList or selectedFilter changes
  useEffect(() => {
    if (selectedFilter === "ALL") {
      setFilteredTodoList(todoList);
    } else {
      const result = todoList.filter((todo) => todo.status === selectedFilter);
      setFilteredTodoList(result);
    }
  }, [todoList, selectedFilter]);

  const typeTodo = (e) => {
    setTodo(e.target.value);
  };

  const typeModifiedTodo = (e) => {
    setModifiedTodo(e.target.value);
  };

  const addNewTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      id: uuidv4(),
      content: todo,
      status: "BACKLOG",
      isEditing: false,
    };

    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    setTodo("");
  };

  const cancelTodoAdds = () => {
    setTodo("");
  };

  const handleCheck = (checkedId) => {
    const isFound = checkedIdList.includes(checkedId);

    if (isFound) {
      const remainedList = checkedIdList.filter((id) => id !== checkedId);
      setCheckedIdList(remainedList);
    } else {
      setCheckedIdList([...checkedIdList, checkedId]);
    }
  };

  const changeStatus = (id) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === "BACKLOG" ? "DONE" : "BACKLOG",
        };
      }
      return todo;
    });

    setTodoList(updatedTodoList);
  };

  const deleteTodos = (idList) => {
    const remainedTodoList = todoList.filter(
      (todo) => !idList.includes(todo.id)
    );
    setTodoList(remainedTodoList);
    setCheckedIdList([]);
  };

  const saveModifiedTodo = (event, id) => {
    event.preventDefault();
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          content: modifiedTodo,
          isEditing: false,
        };
      }
      return todo;
    });

    setTodoList(updatedTodoList);
  };

  const toggleEditingStatus = (id) => {
    const updatedTodoList = todoList.map((todo) => {
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
    setIsEditing((isEdiitng) => !isEdiitng);
    setTodoList(updatedTodoList);
  };

  const startEditing = (id, content) => {
    setModifiedTodo(content);
    toggleEditingStatus(id);
  };

  const changeFilterOption = (filterName) => {
    setSelectedFilter(filterName);
  };

  return (
    <HomeContainer>
      <TodoContainer>
        <TodoInputContainer>
          <h1>Todo</h1>
          <form onSubmit={addNewTodo}>
            <input
              onChange={typeTodo}
              value={todo}
              name={todo}
              type="text"
              placeholder="Write your todo..."
            />
            <TodoInputButtonContainer>
              <button type="submit">Save</button>
              <button onClick={cancelTodoAdds}>Cancel</button>
            </TodoInputButtonContainer>
          </form>
        </TodoInputContainer>
        <TodoBoardContainer>
          <TodoFilterContainer>
            {filterList?.map((item) => (
              <FilterButton
                key={item}
                onClick={() => changeFilterOption(item)}
                isSelected={selectedFilter === item}
              >
                {item}
              </FilterButton>
            ))}
          </TodoFilterContainer>
          <TodoResultContainer>
            <TodoResultTop>
              <h2>{selectedFilter}</h2>
              <input placeholder="Search todo..." />
              <TodoResultButtonContainer>
                {isEditing ? (
                  <></>
                ) : (
                  <button onClick={() => deleteTodos(checkedIdList)}>
                    Delete
                  </button>
                )}
              </TodoResultButtonContainer>
            </TodoResultTop>
            <TodoResultBottom>
              {filteredTodoList?.length > 0 ? (
                <TodoListContainer>
                  {filteredTodoList?.map((todo) => {
                    return (
                      <li key={todo.id}>
                        {todo.isEditing ? (
                          <form onSubmit={(e) => saveModifiedTodo(e, todo.id)}>
                            <EditingInput
                              value={modifiedTodo}
                              onChange={typeModifiedTodo}
                              placeholder={todo.content}
                            />
                            <span>{todo.status}</span>
                            <button type="submit">Save</button>
                            <button
                              type="button"
                              onClick={() => toggleEditingStatus(todo.id)}
                            >
                              Cancel
                            </button>
                          </form>
                        ) : (
                          <>
                            {todo.status === "DONE" ? (
                              <DoneItem onClick={() => changeStatus(todo.id)}>
                                {todo.content}
                              </DoneItem>
                            ) : (
                              <BacklogItem
                                onClick={() => changeStatus(todo.id)}
                              >
                                {todo.content}
                              </BacklogItem>
                            )}
                            <span>{todo.status}</span>
                            <button
                              onClick={() =>
                                startEditing(todo.id, todo.content)
                              }
                            >
                              Edit
                            </button>
                            {isEditing ? (
                              <></>
                            ) : (
                              <CheckButton
                                onClick={() => handleCheck(todo.id)}
                                type="checkbox"
                                checked={checkedIdList.includes(todo.id)}
                              />
                            )}
                          </>
                        )}
                      </li>
                    );
                  })}
                </TodoListContainer>
              ) : (
                <div>Please add todos ...</div>
              )}
            </TodoResultBottom>
          </TodoResultContainer>
        </TodoBoardContainer>
      </TodoContainer>
    </HomeContainer>
  );
}

export default Home;
