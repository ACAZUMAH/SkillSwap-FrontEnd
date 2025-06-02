import { render } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

test("renders the app landing page", () => {
  window.history.pushState({}, "Test Page", "/");
  const { asFragment } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
