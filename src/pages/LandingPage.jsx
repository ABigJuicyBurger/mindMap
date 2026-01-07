import styled from "styled-components";
import { CategoriesSection } from "../components/sections/AsideSection/Categories/CategoriesSection";
import { useLessons } from "../components/hooks/useAddLesson";

export function LandingPage() {
  const { handleRemoveCategory } = useLessons();

  return (
    <PageContainer>
      <ContentWrapper>
        <CategoriesSection handleRemoveCategory={handleRemoveCategory} />
      </ContentWrapper>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

const ContentWrapper = styled.div`
  padding: 1rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
