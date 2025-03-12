'use client';
import { useState } from 'react';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';
import { FaBars, FaTimes } from 'react-icons/fa';


export function TitleBlock({ title, subtitle }: { title: string, subtitle: string }) {

    return (
        <div className="mt-16 mb-12"> {/* Added margin-top (mt-16) and bottom spacing (mb-12) */}
            {/* Title */}
            <div className="flex justify-center text-center px-3">
                <h1 className="pb-3 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    {title}
                </h1>
            </div>

            {/* Subtitle */}
            <div className="flex justify-center px-3 mt-4">
                <h3 className="text-md sm:text-lg leading-7 text-gray-400 dark:text-gray-600 text-center">
                    {subtitle}
                </h3>
            </div>
        </div>
    );


}