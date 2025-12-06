import { useState } from "react";

export function useRemoveLesson() {
  function handleRemoveLesson() {
    console.log("Attempting to remove lesson");
  }
  return { handleRemoveLesson };
}
