import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import tableData1 from './DoxelAssessmentData.json';

function SortFindTable() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(tableData1);
  const [order, setOrder] = useState('ASC');

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder('DSC');
    } else if (order === 'DSC') {
      const sorted = [...data].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder('ASC');
    }
  };

  const columns = [
    { label: 'Telemetry Id', accessor: 'id' },
    { label: 'Validated?', accessor: 'validated' },
    { label: 'Content', accessor: 'content' },
    { label: 'Quantity', accessor: 'quantity' },
    { label: 'Instances', accessor: 'instances' },
    { label: 'Inspected?', accessor: 'metadata.inspected' },
    { label: 'Inspected Time Stamp', accessor: 'metadata.inspectTimestamp' },
  ];

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  return (
    <div>
      <Container>
        <h1 className='text-center mt-4'>Telemetry Records</h1>
        <Form>
          <InputGroup className='my-3'>
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Id'
            />
          </InputGroup>
        </Form>
        <Table striped bordered hover columns={columns}>
          <thead>
            <tr>
              {columns.map(({ label, accessor }) => {
                return (
                  <th
                    role='button'
                    key={accessor}
                    onClick={() => sorting(accessor)}>
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData1
              .filter((accessor) => {
                return search === ''
                  ? accessor.id
                  : accessor.id.includes(search);
              })
              .map((accessor) => (
                <tr key={accessor.id}>
                  <td>{accessor.id}</td>
                  <td>{accessor.validated.toString()}</td>
                  <td>
                    <img className='img' src={accessor.content} alt=''></img>
                    <br />
                    {accessor.content}
                  </td>
                  <td>{accessor.quantity}</td>
                  <td>{accessor.instances.toString()}</td>
                  <td>{accessor.metadata.inspected.toString()}</td>
                  <td>{timeConverter(accessor.metadata.inspectTimestamp)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default SortFindTable;
