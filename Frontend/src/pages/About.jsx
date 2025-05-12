import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'> 
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>  
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p> velit obcaecati tenetur quo. Inventore voluptatibus, eum dolor labore quibusdam rem, consectetur qui culpa aspernatur fugit consequatur, deserunt dicta quae non. Magnam suscipit eaque quia tempore consectetur minus facere ipsam mollitia nihil, laboriosam cupiditate voluptatum perferendis harum reprehenderit officiis sit totam modi culpa est temporibus quisquam perspiciatis adipisci reiciendis? Deleniti, eius, ducimus, odit facilis rem fuga et quam! Aspernatur asperiores impedit inventore!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elitm, ipsum dolor sit amet consectetur adipisicing elm, ipsum dolor sit amet consectetur adipisicing el. Minimic!</p>
        </div>
      </div>

      <div className='texl-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum dolorem  aliquam culpa, possimus quae ab odio doloribus quam?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum dolorem  aliquam culpa, possimus quae ab odio doloribus quam?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum dolorem  aliquam culpa, possimus quae ab odio doloribus quam?</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About