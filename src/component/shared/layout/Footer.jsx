import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: white;
  padding: 0 80px;
`;

const InnerFooterContianer = styled.div`
  p {
    font-size: 16px;
    color: #4b5563;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <InnerFooterContianer>
        <p>© 2025 DailyTodo. All rights reserved.</p>
      </InnerFooterContianer>
    </FooterContainer>
  );
}

export default Footer;
