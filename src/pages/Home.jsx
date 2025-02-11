import React from "react";
import { styled } from "styled-components";

const HomeContainer = styled.div``;
const Logo = styled.a`
  text-decoration: none;
  color: black;
`;
const TodoInputContainer = styled.div``;
const DisplayContainer = styled.div``;
const FilterContainer = styled.div``;
const BoardContainer = styled.div``;
const BoardTopContainer = styled.div``;
const BoardBottomContainer = styled.div``;
const SearchInput = styled.input``;
const BacklogItem = styled.div``;
const DoneItem = styled.div``;
const Checkbox = styled.input``;
const ModifiedInput = styled.input``;
const TodoInput = styled.input``;

function Home() {
  return (
    <HomeContainer>
      <Logo href="/">DailyTodo</Logo>
      <TodoInputContainer>
        <TodoInput placeholder="Write your todos.." />
        <button>Save</button>
        <button>Cancel</button>
      </TodoInputContainer>
      <DisplayContainer>
        <FilterContainer></FilterContainer>
        <BoardContainer>
          <BoardTopContainer>
            <h3>All</h3>
            <SearchInput placeholder="Search your todos.." />
            <button>Delete</button>
          </BoardTopContainer>
          <BoardBottomContainer>
            <BacklogItem>
              {/* !isEditingMode */}
              <p>content</p>
              <button>Edit</button>
              {/* isEditingMode */}
              <ModifiedInput placeholder="existing todo content"></ModifiedInput>
              <button>Back</button>
              <button>Save</button>
              <Checkbox type="checkbox" />
            </BacklogItem>
            <DoneItem>
              <p>content</p>
              <button>Edit</button>
              <Checkbox type="checkbox" />
            </DoneItem>
          </BoardBottomContainer>
        </BoardContainer>
      </DisplayContainer>
    </HomeContainer>
  );
}

export default Home;
