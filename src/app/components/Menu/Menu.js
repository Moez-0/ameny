"use client"

import React , {useState,useRef,useEffect} from 'react'
import './menu.css'
import Link from 'next/link'

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { Moon , Sun   } from 'lucide-react';
import { Menu as MenuIcon } from 'lucide-react'



const MenuLinks = [
    {path:"/",label:"Home"},
    {path:"/work",label:"Work"},
    {path:"/about",label:"About"},
    {path:"/contact",label:"Contact"}
]

const Menu = () => {
    const container = useRef();
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const [isDarkMode,setIsDarkMode] = useState(false);


    const tl = useRef();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        console.log("test");
    }

    useGSAP( ( ) => {

        gsap.set(".menu-link-item-holder", {y:75});
        tl.current = gsap.timeline({paused:true}).to(
            ".menu-overlay",{
                duration:1.25,
                clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                ease : "power4.inOut",
            }
        ).to(
            ".menu-link-item-holder",
            {
                y:0,
                duration :1,
                stagger : 0.1,
                ease : "power4.inOut",
                delay :-0.75,

            }
        )

    }, { scope : container } );



    useEffect(
        () => {
            if(isMenuOpen){
                tl.current.play();
            }else{
                tl.current.reverse();
            }
        },[isMenuOpen]
    )

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        
        const pageContent = document.querySelector('.page-content');
        if(isDarkMode){
   
            pageContent.style.background = `url('/back.jpg') no-repeat 50% 50% / cover`;

        }else{

            pageContent.style.background = `url('/gal.jpg') no-repeat 50% 50% / cover`;
        }

    }

    useEffect(
        () => {
            if(isDarkMode){
                document.body.classList.add('dark');
            }else{
                document.body.classList.remove('dark');
            }
        },[isDarkMode]
    )
  return (
    <div className='menu-container' ref={container}>
        <div className='menu-bar'>
            <div className='menu-logo '>
                <Link href='/' className='logo'> ameny.online </Link>
            </div>
            <p onClick={toggleDarkMode}>
                    {isDarkMode ? <Moon size={30} className='toggle'/> : <Sun size={30} className='toggle' />}
            </p>
            <div className='menu-open' onClick={toggleMenu}>

                <p >
                    <MenuIcon size={30} />
                </p>
            </div>
        </div>
        <div className='menu-overlay'>
            <div className='menu-overlay-bar'>
                <div className='menu-logo'>
                <Link href='/'> ameny.online </Link>
                </div>
                <div className='menu-close' onClick={toggleMenu}>
                    <p>Close</p>
                </div>
            </div>
            <div className='menu-close-icon' onClick={toggleMenu}>
                <p>&#x2715;</p>
            </div>
            <div className='menu-copy'>
                
                <div className='menu-links'>
                    {MenuLinks.map((link,index) => (
                        <div className='menu-link-item' key={index}>
                            <div className='menu-link-item-holder' onClick={toggleMenu}>
                                <Link href={link.path} className='menu-link'>
                                    {link.label}
                                </Link>
                            </div>
                        </div>

                    ))}

                    </div>
                    <div className='menu-info'>
                        
                        <div className='menu-info-col'>
                            <a href="#" >X &#8599;</a>
                            <a href="#" >Instagram &#8599;</a>
                            <a href="#" >LinkedIn &#8599;</a>
                            <a href="#" >Facebook &#8599;</a>
                        </div>
                        <div className='menu-info-col'>
                            <a>business@ameny.online</a>
                            <a>+216 96 154 061</a>
                        </div>
                        
                    </div>
            </div>
            <div className='menu-preview'>
                <p>Ameny Dhouib</p>
            </div>
        </div>

    </div>
  )
}

export default Menu