'use client'

import { Input, Modal } from 'antd'
import { useState } from 'react'

export const MyModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal
      title='Введите адрес'
      open={isModalOpen}
      footer={null}
      width={350}
      onCancel={handleCancel}
    >
      <Input placeholder='Адрес' />
    </Modal>
  )
}
