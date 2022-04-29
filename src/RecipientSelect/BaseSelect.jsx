import { Modal, Select } from 'antd'
import React, { useState } from 'react'
import RecipientList from './RecipientList'
import './styles.scss'
const maxTagCount = 500

function BaseSelect({ recipients = [], setRecipients, placeholder }) {
  const [recipientModal, showRecipientModal] = useState(false)
  return (
    <React.Fragment>
      <Select
        className={'recipientsSelect'}
        id="recipientsSelect"
        tokenSeparators={[',', ' ']}
        mode="tags"
        value={recipients}
        onChange={(items) => setRecipients(items)}
        maxTagCount={maxTagCount}
        placeholder={placeholder}
        filterOption={false}
        maxTagPlaceholder={(omittedValues) => (
          <span
            className="group-tag"
            key="groupTab"
            color="#108ee9"
            onClick={() => {
              showRecipientModal(true)
            }}
          >
            +{omittedValues.length}... View all
          </span>
        )}
        dropdownStyle={{ display: 'none', border: 'none' }}
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
          onDelete={(item) =>
            setRecipients(recipients.filter((el) => el !== item))
          }
          recipients={recipients}
          addRecipients={(item) => setRecipients([...recipients, item])}
        />
      </Modal>
    </React.Fragment>
  )
}

export default BaseSelect
