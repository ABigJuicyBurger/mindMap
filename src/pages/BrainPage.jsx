import styled from "styled-components";

export function BrainPage() {
  return (
    <PageContainer>
      <Title>Brain Mode</Title>
      <BrainContainer>
        <PlaceholderText>Brain Animation Coming Soon...</PlaceholderText>
      </BrainContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
`;

const BrainContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const PlaceholderText = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  text-align: center;
`;
