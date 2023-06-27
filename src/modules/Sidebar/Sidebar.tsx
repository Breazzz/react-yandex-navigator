import Image from 'next/image'

import { FormAddress } from '@/components/FormAddress'
import { PersonalAddress } from '@/components/PersonalAddress'
import { MyModal } from '@/components/MyModal'
import { RouteHistory } from '@/components/RouteHistory'

import YandexIcon from '@/assets/images/yandex.png'

export const Sidebar = () => {
  return (
    <aside className='sidebar h-screen min-w-[400px] py-2'>
      <div className='side-inner'>
        <div className='flex flex-col gap-2 px-[16px]'>
          <h1 className='flex items-center gap-2 text-xl font-bold'>
            <Image
              src={YandexIcon}
              width={20}
              height={20}
              alt='yandex navigator'
            />
            React Yandex Navigator
          </h1>
          <FormAddress />
        </div>
      </div>
      <PersonalAddress />
      <MyModal />
      <div className='px-[16px] py-2 pb-[10px] pt-2'>
        <RouteHistory />
      </div>
    </aside>
  )
}
