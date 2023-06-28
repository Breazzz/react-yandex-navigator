import { FC } from 'react'
import Image from 'next/image'
import YandexIcon from '@/assets/images/yandex.png'

export const SplashScreen: FC = () => {
  return (
    <div className='fixed grid h-screen w-full place-content-center'>
      <Image className='max-w-[150px]' src={YandexIcon} alt='Yandex Icon' />
    </div>
  )
}
