import * as React from "react";
import { Box, Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FAQ() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          minWidth: 1000,
          minHeight: 200,
        },
      }}
    >
      <Paper
        sx={{
          padding: 5,
        }}
      >
        <Typography variant="h4" gutterBottom component="div">
          Руководство по использованию:
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          Возможные ошибки:
        </Typography>
        <Typography variant="body1" gutterBottom>
          При вводе данных в поля, нужно соблюсти одно очень важное правило:{" "}
          <b>Убедитесь что все поля заполнены</b>. Если же получилось так что вы не
          заполнили какое-либо поле, то у вас появится{" "}
          <b style={{ color: "red" }}>Ошибка</b>, в таком случае нажмите сочитание клавишь{" "}
          <b style={{ color: "#0072E5" }}>Ctrl + R</b> чтобы перезагрузить приложение.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Если в поле необходимо ввести число со знакоми после запятой, то в поле
          указывется не запятая <b style={{ color: "red" }}>","</b> а точка{" "}
          <b style={{ color: "#0072E5" }}>"."</b>
          <br />
          <br />
          <TextField
            disabled
            id="outlined-disabled"
            label="Пример"
            defaultValue="12345.678"
          />
          <br />
          <br />
          В случае, если ошибки не было и вы все сделали правильно, но по какой-то причине
          не видете новых данных в таблице, попробуйте перезагрузить таблицу нажав
          соответственную кнопку:
          <br />
          <br />
          <Button variant="contained">
            <ReplayIcon />
          </Button>
          <br />
          <br />
          Для удаления строки из таблицы есть соответствующая кнопка:
          <br />
          <br />
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Typography>
      </Paper>
    </Box>
  );
}
