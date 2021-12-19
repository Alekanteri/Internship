import React, { useState } from "react";
import { useMutation, gql } from "@apollo/react-hooks";
import { TextField, Stack, Button } from "@mui/material";
import Input from "../UI/Input";

const CreatePage = () => {
  const CreateClient = gql`
    mutation CreateClient($data: ClientInput!) {
      createClient(data: $data) {
        _id
      }
    }
  `;

  const ClientList = gql`
    query {
      getAllClient {
        data {
          id
          FullName
          DOB
          PassNum
          PassSer
          Gas
          Water
          Light
        }
      }
    }
  `;

  const [newID, setnewID] = useState("");
  const [newClientName, setnewClientName] = useState("");
  const [newDate, setnewDate] = useState("");
  const [newPassNum, setnewPassNum] = useState("");
  const [newPassSer, setnewPassSer] = useState("");
  const [newGas, setnewGas] = useState("");
  const [newWater, setnewWater] = useState("");
  const [newLight, setnewLight] = useState("");
  const [createClient, { loading }] = useMutation(CreateClient, {
    refetchQueries: [{ query: ClientList }],
    onCompleted: () => {
      setnewID("");
      setnewClientName("");
      setnewDate("");
      setnewPassNum("");
      setnewPassSer("");
      setnewGas("");
      setnewWater("");
      setnewLight("");
    },
  });

  return (
    <Stack
      component="form"
      noValidate
      spacing={2}
      style={{
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        width: 650,
        alignItems: "space-between",
        border: "1px solid rgba(0, 0, 0, 0.27)",
        borderRadius: "4px",
        padding: "5px 5px 30px 5px",
        position: "relative",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        createClient({
          variables: {
            data: {
              id: newID,
              FullName: newClientName,
              DOB: newDate,
              PassNum: newPassNum,
              PassSer: newPassSer,
              Gas: newGas,
              Water: newWater,
              Light: newLight,
            },
          },
        });
      }}
    >
      <Input
        label="ФИО"
        func={(e) => {
          setnewClientName(e.target.value);
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gridGap: "5px",
        }}
      >
        <TextField
          id="date"
          label="Дата рождения"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setnewDate(e.target.value);
          }}
        />
        <Input
          label="Серия Паспорта"
          func={(e) => {
            setnewPassSer(parseInt(e.target.value));
          }}
        />
        <Input
          label="Номер Паспорта"
          func={(e) => {
            setnewPassNum(parseInt(e.target.value));
            setnewID(parseInt(e.target.value));
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: "5px",
        }}
      >
        <Input
          label="Вода"
          func={(e) => {
            setnewWater(parseFloat(e.target.value));
          }}
        />
        <Input
          label="Газ"
          func={(e) => {
            setnewGas(parseFloat(e.target.value));
          }}
        />
        <Input
          label="Эллектричество"
          func={(e) => {
            setnewLight(parseFloat(e.target.value));
          }}
        />
      </div>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          left: "calc(50% - 64px)",
          bottom: "-18px",
        }}
        disabled={loading}
        type="submit"
      >
        Добавить
      </Button>
    </Stack>
  );
};

export default CreatePage;
