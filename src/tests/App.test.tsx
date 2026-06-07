import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect } from "vitest";
import App from "../App";
import { store } from "../store/store";

const renderApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

describe("App", () => {
  it("renders without crashing", () => {
    renderApp();
  });

  it("renders Header", () => {
    renderApp();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders Main section", () => {
    renderApp();
    expect(document.querySelector(".main-wrapper")).toBeInTheDocument();
  });
});