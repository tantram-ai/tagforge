import { Button, Typography, Container } from "@mui/material";
import { NavigationBar } from "./shared/components";

type AppProps = {
  toggleTheme: () => void;
  mode: "light" | "dark";
};

function App({ toggleTheme, mode }: AppProps) {
  return (
    <>
      <NavigationBar toggleTheme={toggleTheme} mode={mode}>
        <Container sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Material UI Theming Example
          </Typography>
          <Typography variant="body1" gutterBottom>
            Current Mode: <strong>{mode}</strong>
          </Typography>
          <Button variant="contained" color="primary" onClick={toggleTheme}>
            Toggle Theme
          </Button>
        </Container>
      </NavigationBar>

    </>
  )
}

export default App
