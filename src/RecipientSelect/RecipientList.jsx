import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import debounce from 'lodash/debounce'
import List from 'rc-virtual-list'
import React, { useMemo, useState } from 'react'
import { Col, Grid, Row } from 'rsuite'

function RecipientList({ recipients, onDelete, addRecipients }) {
  const [query, setQuery] = useState('')
  const [value, setValue] = useState('')
  const changeHandler = (event) => {
    setQuery(event.target.value)
  }
  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

  let filteredRecipients = recipients
  if (query !== '') {
    filteredRecipients = recipients.filter(
      (el) => el.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }

  return (
    <div>
      <div className="Body">
        <Input
          placeholder={'Search Here'}
          suffix={<SearchOutlined />}
          onChange={debouncedChangeHandler}
        />

        <div className="content">
          {filteredRecipients.length > 0 ? (
            <List
              data={filteredRecipients}
              height={300}
              itemHeight={40}
              itemKey="id"
              style={{ overflow: 'visible' }}
            >
              {(item) => (
                <div className="recipient-item">
                  {item}
                  <span
                    role={'button'}
                    onClick={() => onDelete(item)}
                    className={'close-icon'}
                  >
                    x
                  </span>
                </div>
              )}
            </List>
          ) : (
            <p style={{ textAlign: 'center' }}>No Contacts found</p>
          )}
        </div>
      </div>

      <Grid className={'Bodyfooter'} fluid>
        <Row gutter={18}>
          <Col xs={20}>
            <Input
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  addRecipients(value)
                  setValue('')
                }
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={'Enter Phone numbers'}
            />
          </Col>
          <Col>
            {' '}
            <Button
              onClick={() => {
                addRecipients(value)
                setValue('')
              }}
              type={'primary'}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default RecipientList
