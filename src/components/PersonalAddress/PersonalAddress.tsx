'use client'

import { HomeOutlined, LaptopOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export const PersonalAddress = () => {
  return (
    <div className='side-inner !pb-0'>
      <div className='flex flex-col gap-3 px-[16px] py-2'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <HomeOutlined /> Дом
          </div>
          <Button>Добавить адрес</Button>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <LaptopOutlined /> Работа
          </div>
          <Button>Добавить адрес</Button>
        </div>
      </div>
    </div>
  )
}
