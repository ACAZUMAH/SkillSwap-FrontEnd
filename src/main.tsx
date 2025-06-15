import { createRoot } from "react-dom/client";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import "./assets/css/index.css";
import App from "./app/App.tsx";

const root = createRoot(document.getElementById("root") as HTMLLIElement);

root.render(<App />);
