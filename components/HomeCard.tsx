import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
    bgColor: string,
    imgSrc: string,
    title: string,
    desc: string,
    handleClick: () => void
}

const HomeCard = ({ bgColor, imgSrc, title, desc, handleClick }: HomeCardProps) => {
    return (
        <div className={`${bgColor} px-4 py-6 mb-4 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`} onClick={handleClick}>
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image
                    src={imgSrc}
                    alt="meeting"
                    width={27}
                    height={27}
                />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-lg font-normal">{desc}</p>
            </div>
        </div>
    )
}

export default HomeCard