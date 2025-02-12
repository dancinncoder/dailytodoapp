import React, { useState } from "react";
import { styled } from "styled-components";
import { v4 as uuid } from "uuid";

const HomeContainer = styled.div``;
const Logo = styled.a`
  text-decoration: none;
  color: black;
`;
const TodoInputContainer = styled.form``;
const DisplayContainer = styled.div``;
const FilterContainer = styled.div``;
const BoardContainer = styled.div``;
const BoardTopContainer = styled.div``;
const BoardBottomContainer = styled.ul`
  list-style: none;
`;
const SearchInput = styled.input``;
const BacklogItem = styled.div`
  p {
    border: 1px solid lightgray;
    margin: 0;
    padding: 10px;
    cursor: pointer;
    width: 500px;
  }
`;
const DoneItem = styled.div`
  p {
    border: 1px solid lightgray;
    background-color: lightgray;
    margin: 0;
    padding: 10px;
    cursor: pointer;
    width: 500px;
  }
`;
const Checkbox = styled.input``;
const MasterCheckbox = styled.input``;
const ModifiedInput = styled.input``;
const TodoInput = styled.input``;

function Home() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTodoIdList, setSelectedTodoIdList] = useState([]);
  const [isAllTodosChecked, setIsAllTodosChecked] = useState(false);

  // Typing Logics
  const typeTodo = (e) => {
    setTodo(e.target.value);
  };

  // Etc
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

    const updatedList = [...todoList, newTodo];
    setTodoList(updatedList);

    // Empty the input
    setTodo("");
  };

  const changeStatus = (selectedId) => {
    const updatedList = todoList?.map((todo) => {
      if (selectedId === todo.id) {
        return {
          ...todo,
          status: todo.status === "BACKLOG" ? "DONE" : "BACKLOG",
        };
      }
      return todo;
    });
    setTodoList(updatedList);
  };

  const handleCheckbox = (selectedId) => {
    // Check if it exists
    const isFound = selectedTodoIdList.find((item) => item === selectedId);

    if (isFound) {
      const updatedSelectedIdList = selectedTodoIdList?.filter(
        (item) => selectedId !== item
      );
      setSelectedTodoIdList(updatedSelectedIdList);
    } else {
      const updatedSelectedIdList = [...selectedTodoIdList, selectedId];
      setSelectedTodoIdList(updatedSelectedIdList);
    }
    console.log("selectedTodoIdList", selectedTodoIdList);
  };

  const handleCheckAll = () => {
    // Check if todoList exist
    if (!todoList) return;

    // Get all todoList's id
    const allTodoIds = todoList?.map((todo) => todo.id);

    // Check selectedId includes alltodoIds
    const isAllChecked = allTodoIds.every((id) =>
      selectedTodoIdList.includes(id)
    );
    // 1st try
    // const isAllChecked = allTodoIds.map((item) => {
    //   if (selectedTodoIdList.includes(item)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    if (isAllChecked) {
      // Empty all
      setIsAllTodosChecked(false);
      setSelectedTodoIdList([]);
    } else {
      // Add all
      setIsAllTodosChecked(true);
      setSelectedTodoIdList(allTodoIds);

      // ** In React, minimizing setState() calls is important, but if comparison operations are inefficient, it's better to replace the state in one go.
      // ** If filter() operations increase, performance may degrade instead. Therefore, simply using setSelectedTodoIdList(allTodoIds) is more efficient in terms of performance.
      // ** If performance optimization is really necessary, consider using React's useMemo() or useCallback()

      // 2nd try
      // const thingsToAdd = setAllTodoIds.intersection(setSelectedIds);
      // setIsAllTodosChecked(true);
      // setSelectedTodoIdList([...selectedTodoIdList, thingsToAdd]);

      // 3rd try
      // const thingsToAdd = allTodoIds.filter((id) => !selectedId.includes(id));
      // const setAllTodoIds = new Set(allTodoIds);
      // const setSelectedIds = new Set(selectedTodoIdList);
    }
  };

  return (
    <HomeContainer>
      <Logo href="/">DailyTodo</Logo>
      <TodoInputContainer onSubmit={addNewTodo}>
        <TodoInput
          value={todo}
          onChange={typeTodo}
          placeholder="Write your todos.."
        />
        <button type="submit">Save</button>
        <button onClick={removeTodo}>Cancel</button>
      </TodoInputContainer>
      <DisplayContainer>
        <FilterContainer></FilterContainer>
        <BoardContainer>
          <BoardTopContainer>
            <h3>All</h3>
            <SearchInput placeholder="Search your todos.." />
            <MasterCheckbox
              onChange={handleCheckAll}
              checked={isAllTodosChecked === true}
              type="checkbox"
            />
            <button>Delete</button>
          </BoardTopContainer>
          <BoardBottomContainer>
            SelectedTodoId List : {selectedTodoIdList}
            <br />
            Current SelectedId : {selectedId}
            {todoList.length > 0 ? (
              <>
                {todoList?.map((todo) => {
                  // Why not destructuring assignment here?
                  return (
                    <li key={todo.id}>
                      {/* By status */}
                      {todo.status === "BACKLOG" ? (
                        <BacklogItem>
                          {/* By status */}
                          {todo.isEditing ? (
                            <>
                              <ModifiedInput placeholder="existing todo content"></ModifiedInput>
                              <button>Back</button>
                              <button>Save</button>
                            </>
                          ) : (
                            <>
                              <p onClick={() => changeStatus(todo.id)}>
                                {todo.content}
                              </p>
                              <span>{todo.status}</span>
                              <button>Edit</button>
                            </>
                          )}
                          {/* Checked condition:  */}
                          <Checkbox
                            onChange={() => handleCheckbox(todo.id)}
                            type="checkbox"
                            checked={selectedTodoIdList.includes(todo.id)}
                          />
                        </BacklogItem>
                      ) : (
                        <DoneItem>
                          <p onClick={() => changeStatus(todo.id)}>
                            {todo.content}
                          </p>
                          <span>{todo.status}</span>
                          <button>Edit</button>
                          <Checkbox
                            onChange={() => handleCheckbox(todo.id)}
                            type="checkbox"
                            checked={selectedTodoIdList.includes(todo.id)}
                          />
                        </DoneItem>
                      )}
                    </li>
                  );
                })}
              </>
            ) : (
              <p>Add your todos..</p>
            )}
          </BoardBottomContainer>
        </BoardContainer>
      </DisplayContainer>
    </HomeContainer>
  );
}

export default Home;
