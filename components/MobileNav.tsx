'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src='/icons/hamburger.svg'
                        alt='Hamburger icon'
                        width={36}
                        height={36}
                        className='cursor-pointer sm:hidden'
                    />
                </SheetTrigger>
                <SheetContent side='left' className="border-none bg-dark-1 text-white" >
                    <SheetClose asChild>
                        <Link href='/' className='flex items-center gap-1'>
                            <Image
                                src='/icons/logo.svg'
                                alt='Yoom Logo'
                                width={32}
                                height={32}
                                className='max-sm:size-10'
                            />
                            <p className='text-[26px] font-extrabold text-white'>Yoom</p>
                        </Link>
                    </SheetClose>

                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex h-full flex-col gap-6 pt-16 text-white">
                                {sidebarLinks.map(link => {
                                    const isActive = pathname === link.route;
                                    return (
                                        <SheetClose key={link.label} asChild>
                                            <Link
                                                href={link.route}

                                                className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', { 'bg-blue-1': isActive })}
                                            >
                                                <Image
                                                    src={link.imgURL}
                                                    alt={link.label}
                                                    width={24}
                                                    height={24}
                                                />
                                                <p className='text-lg font-semibold'>{link.label}</p>

                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav