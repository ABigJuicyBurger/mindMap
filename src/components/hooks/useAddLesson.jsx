import { v4 as uuidv4 } from "uuid";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";
import { atomWithStorage } from "jotai/utils";
import { selectedCategoryAtom } from "../../store";

const lessonsAtom = atomWithStorage("lessons", []);

// lesson type:
// type Lesson = {id: string, title: string , ...}

//rules of hooks
// can only be used in rct component
// has to be used before return statement
// cannot be called conditionally
// diff hooks diff purposes
// common is useState and useEffect (or useRef)
export function useLessons() {
  // may need to abstract away but for now...
  const [lessonEntries, setLessonEntries] = useAtom(lessonsAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  // put in useCallback
  const addLesson = useCallback(
    (inputValue) => {
      const nextState = [
        ...lessonEntries,
        {
          id: uuidv4(),
          title: inputValue.lessonTitle,
          description: inputValue.lessonDescription,
          category: selectedCategory,
        },
      ];
      setLessonEntries(nextState);
    },
    [lessonEntries]
  );

  const handleNewLesson = useCallback(
    (inputValue) => {
      addLesson(inputValue);
    },
    [addLesson]
  );

  const handleRemoveLesson = useCallback(
    (id) => {
      const nextState = lessonEntries.filter((lesson) => lesson.id !== id);
      setLessonEntries(nextState);
    },
    [lessonEntries]
  );

  // add new category later

  const handleRemoveCategory = useCallback(
    (category) => {
      const nextState = lessonEntries.filter(
        (lesson) => lesson.category !== category
      );
      setLessonEntries(nextState);
    },
    [lessonEntries]
  );

  return {
    lessonEntries,
    handleNewLesson,
    handleRemoveLesson,
    handleRemoveCategory,
  };
}
