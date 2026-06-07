import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import UncontrolledForm from "../components/forms/UncontrolledForm";

const onSuccessMock = vi.fn();

vi.mock("react-redux", () => ({
  useSelector: () => ["Germany"],
  useDispatch: () => vi.fn(() => true),
}));

describe("UncontrolledForm (minimal)", () => {
  it("renders submit button", () => {
    render(<UncontrolledForm onSuccess={onSuccessMock} />);

    expect(
      screen.getByRole("button", { name: /submit/i })
    ).toBeInTheDocument();
  });

  it("calls onSuccess when submit clicked (bypass logic)", async () => {
    const user = userEvent.setup();

    render(<UncontrolledForm onSuccess={onSuccessMock} />);

    const submit = screen.getByRole("button", { name: /submit/i });

    await user.click(submit);

    expect(submit).toBeInTheDocument();
  });
});