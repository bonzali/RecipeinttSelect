import React, { useState, useMemo } from 'react'
import { Select, Tag, Modal } from 'antd'
import RecipientList from './RecipientList'
import './styles.scss'
const maxTagCount = 500

function CustomSelect({ recipients = [], setRecipients, placeholder }) {
  const [input, setInput] = useState('')
  const [recipientModal, showRecipientModal] = useState(false)

  const addRecipient = (recipient) => {
    setRecipients([...recipients, recipient])
  }

  const removeRecipient = (value) => {
    setRecipients(recipients.filter((el) => el !== value))
  }

  const onPaste = (e) => {
    const pastedData = e.clipboardData.getData('Text')
    if (pastedData) {
      const newRecipients = pastedData
        .split(/[\s,;'"\t\n]+/)
        .filter((item) => item && !isNaN(item))
      setRecipients([...new Set([...recipients, ...newRecipients])])
    }
    e.preventDefault()
    return false
  }

  const displayedRecipients = useMemo(
    () => recipients.slice(0, maxTagCount + 1),
    [recipients]
  )
  return (
    <React.Fragment>
      <Select
        className={'recipientsSelect'}
        onPaste={onPaste}
        id="recipientsSelect"
        tokenSeparators={[',', ' ']}
        mode="tags"
        value={displayedRecipients}
        maxTagCount={maxTagCount}
        placeholder={placeholder}
        filterOption={false}
        searchValue={input}
        onSearch={(value) => setInput(value)}
        onBlur={() => {
          setInput('')
          if (input && !isNaN(input)) {
            //only accept numbers
            addRecipient(input)
          }
        }}
        onInputKeyDown={(e) => {
          if (
            (e.code === 'Enter' ||
              e.code === 'NumpadEnter' ||
              e.code === 'Space' ||
              e.code === 'Comma') &&
            input
          ) {
            e.preventDefault()
            if (isNaN(input)) {
              setInput('')
            } else {
              const index = recipients.indexOf(input)
              if (index >= 0) {
                //handle duplicate values
                removeRecipient(recipients[index])
                setInput(recipients[index])
              } else {
                setInput('')
                addRecipient(input)
              }
            }
          } else if (
            e.code === 'Backspace' &&
            !input &&
            recipients.length <= maxTagCount
          ) {
            removeRecipient(recipients.at(-1))
          }
        }}
        maxTagPlaceholder={(omittedValues) => (
          <span
            className="group-tag"
            key="groupTab"
            color="#108ee9"
            onClick={() => {
              showRecipientModal(true)
            }}
          >
            +{recipients.length - displayedRecipients.length + 1}... View all
          </span>
        )}
        dropdownStyle={{ display: 'none', border: 'none' }}
        tagRender={({ value }) => {
          return (
            <Tag
              className={'recipient-tag'}
              closable
              onClose={() => removeRecipient(value)}
            >
              <span>{value}</span>
            </Tag>
          )
        }}
      />
      <Modal
        title={
          <span>
            {recipients.length}
            Recipients
          </span>
        }
        className="recipients-modal"
        destroyOnClose
        visible={recipientModal}
        onCancel={() => showRecipientModal(false)}
        footer={null}
      >
        <RecipientList
          onDelete={removeRecipient}
          recipients={recipients}
          addRecipients={removeRecipient}
        />
      </Modal>
    </React.Fragment>
  )
}

export default CustomSelect
