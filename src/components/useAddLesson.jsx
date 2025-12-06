import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

//rules of hooks
// can only be used in rct component
// has to be used before return statement
// cannot be called conditionally
// diff hooks diff purposes
// common is useState and useEffect (or useRef)
export function useAddLesson() {
  // may need to abstract away but for now...
  const [lessonEntries, setLesson] = useState([]);

  function addLesson(inputValue) {
    const nextState = [
      ...lessonEntries,
      {
        id: uuidv4(),
        title: inputValue.lessonTitle,
        description: inputValue.lessonDescription,
      },
    ];
    setLesson(nextState);
  }

  const handleNewLesson = (inputValue) => {
    addLesson(inputValue);
  };

  return { lessonEntries, handleNewLesson };
}
