import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Task Manager title in the document", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 }).innerHTML).toEqual(
    "Task Manager"
  );
});
