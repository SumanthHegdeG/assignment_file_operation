import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import { Button, Container, Dropdown, Form, Table } from 'react-bootstrap'

function App() {
  const [file, setFile] = useState()
  const [array, setArray] = useState([])
  const [headers, setHeaders] = useState([])
  const [filter, setFilter] = useState('')

  const fileReader = new FileReader()

  const handleOnChange = (e) => {
    setFile(e.target.files[0])
  }

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf('\n')).trim().split(',')
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n')

    const array = csvRows.map((i) => {
      const values = i.trim().split(',')

      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index]
        return object
      }, {})
      return obj
    })

    setArray(array)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result

        csvFileToArray(text)
      }

      fileReader.readAsText(file)
    }
  }

  const headerKeys = Object.keys(Object.assign({}, ...array))

  const selectHeadder = (name) => {
    console.log()
    if (!headers.includes(name)) setHeaders([...headers, name])
    else setHeaders(headers.filter((ele) => ele !== name))
  }

  return (
    <Container className='mt-5'>
      <div>
        <Form>
          <Form.Control
            type={'file'}
            id={'csvFileInput'}
            accept={'.csv'}
            onChange={handleOnChange}
          />

          <Button
            className='mt-3'
            variant='light'
            onClick={(e) => {
              handleOnSubmit(e)
            }}
          >
            IMPORT CSV
          </Button>
        </Form>
      </div>

      <div className='mt-4'>
        <h6>Select Headers</h6>
        <Dropdown>
          <Dropdown.Toggle variant='light' id='dropdown-basic'>
            {headers.length
              ? headers.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue + ' , ',
                  ''
                )
              : 'select headers'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {headerKeys.map((header, index) => {
              return (
                <Dropdown.Item onClick={() => selectHeadder(header)}>
                  {' '}
                  <input
                    type='checkbox'
                    id={header}
                    checked={headers.includes(header)}
                    readOnly
                  />
                  <label>{header}</label>
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <br />

      <Table>
        <thead>
          <tr key={'header'}>
            {headerKeys
              .filter((ele) => headers.includes(ele))
              .map((key) => (
                <th
                  className={filter === key && 'border border-dark'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const newArrray = array.sort((a, b) => {
                      if (a[key] > b[key]) return 1
                      else return -1
                    })
                    setFilter(key)
                    setArray([...newArrray])
                  }}
                >
                  {key}
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => {
            return (
              <tr key={item.id}>
                {Object.keys(item)
                  .filter((value) => headers.includes(value))
                  .map((val) => (
                    <td>{item[val]}</td>
                  ))}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export default App
