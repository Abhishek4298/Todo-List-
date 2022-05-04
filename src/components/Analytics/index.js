import React from 'react'
import { Modal, Button, Alert, Card, Table } from "react-bootstrap";

export default function Analytics(props) {
  return (
    <>
      <hr style={{ marginTop: "5rem", backgroundColor: "red", width: "100%" }} />
      <h2>Basic Analytics</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Total Item in List</th>
            <th>Checked Item count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.totalLength}</td>
            <td>{props.checkedList}</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}
