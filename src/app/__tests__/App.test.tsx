import { render } from "@testing-library/react";
import App from "../App";

test("renders the app landing page", () => {
  window.history.pushState({}, "Test Page", "/");
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
