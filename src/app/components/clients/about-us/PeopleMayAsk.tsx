import React from 'react'
import Image from 'next/image'

export const PeopleMayAsk = () => {
    return (
        <div className='flex flex-col bg-black'>
            <div className='flex flex-col items-center'>
                <p className='text-2xl font-bold text-[#EFE554]'>PEOPLE ASK WHY TIGERNUTS?</p>
                <p className='text-xl text-white mt-2 mb-2'>Here's What Makes It Special</p>
            </div>
            <div className='relative  flex p-16'>
                <div className='flex flex-row justify-between items-center gap-6'>
                    <div className='w-1/2 h-[400px]'>
                        <Image
                            src="/images/clients/hero/slider1.JPG"
                            alt="Cyperus Enterprise"
                            width={500}
                            height={500}
                            className="object-cover rounded-lg"
                            priority
                            quality={100}
                        />
                    </div>
                    <div className='flex flex-col w-1/2 justify-center items-center -mt-23'>
                        <p className='text-l text-gray-300 my-2 text-left'>Tigernut is a tuber and not a nut which has numerous nutritional benefits earning it a ranking amongst the listed top 10 super foods in the world. Tigernuts are rich in protein, fiber, iron, healthy fat, potassium, magnesium, Vitamins C and E. </p>
                        <p className='text-l text-gray-300 my-2 text-left'>Tigernut helps fight malnutrition, control blood pressure, aids fertility and regulates blood sugar levels.</p   >
                        <p className='text-l text-gray-300 my-4 text-left'>Tigernuts has a sweet taste, with a hint of coconut, and have a chewy texture.</p>
                        <p className='text-l text-gray-300 my-4 text-left'>Tigernuts is Gluten Free, Nut Free, perfect for people who are lactose intolerant</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
