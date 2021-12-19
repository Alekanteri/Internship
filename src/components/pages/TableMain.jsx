import React from "react";
import { useMutation, useQuery, gql } from "@apollo/react-hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";
import PositionedMenu from "../UI/Sum";
import PopOver from "../UI/Popover";

export default function BasicTable() {
  function createData(_id, name, dateOfBirth, PassportNum, PassportSer, Sum) {
    return { _id, name, dateOfBirth, PassportNum, PassportSer, Sum };
  }

  const rows = [];

  const ClientList = gql`
    query {
      getAllClient {
        data {
          _id
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
  const CLientDelete = gql`
    mutation DeleteClient($id: ID!) {
      deleteClient(id: $id) {
        _id
      }
    }
  `;

  const { data, loading } = useQuery(ClientList);
  const [deleteClient, { loading: deleteLoading }] = useMutation(CLientDelete, {
    refetchQueries: [{ query: ClientList }],
  });
  if (loading) {
    console.log("...loading");
  } else {
    data.getAllClient.data.map((elem) => {
      return rows.push(
        createData(
          `${elem._id}`,
          `${elem.FullName}`,
          `${elem.DOB}`,
          `${elem.PassNum}`,
          `${elem.PassSer}`,
          {
            gas: elem.Gas,
            water: elem.Water,
            light: elem.Light,
          }
        )
      );
    });
  }

  return (
    <>
      <PopOver
        text="Перезагрузить таблицу"
        styling={{ position: "relative", width: "100px", left: "calc(50% - 64px)" }}
      >
        <Button
          variant="contained"
          sx={{
            position: "relative",
            left: "calc(50% - 64px)",
          }}
          onClick={(e) => {
            e.preventDefault();
            document.location.reload();
          }}
        >
          <ReplayIcon />
        </Button>
      </PopOver>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>ФИО</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Дата рождения
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Серия Паспорта
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Номер паспорта
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Сумма за месяц
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    disabled={deleteLoading}
                    onClick={(e) => {
                      e.preventDefault();
                      deleteClient({ variables: { id: row._id } });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.dateOfBirth}</TableCell>
                <TableCell align="right">{row.PassportSer}</TableCell>
                <TableCell align="right">{row.PassportNum}</TableCell>
                <TableCell align="right">
                  <PositionedMenu
                    gas={row.Sum.gas}
                    water={row.Sum.water}
                    light={row.Sum.light}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
