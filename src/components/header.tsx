"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from 'lucide-react'
import { useRouter } from "next/navigation"
import { signIn,useSession } from "next-auth/react"
import { PlusIcon } from '@heroicons/react/outline'; // Import de PlusIcon depuis HeroIcons v1

export const Header = () => {

    const [data, setData] = useState({
        Pseudo: '',
        Email: '',
        Password: ''
    })
    const router = useRouter()
    const takeLogin = async (e: any) => {
        e.preventDefault()
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then(authenticated => {
            router.push("/dashboard")
        }).catch((error) => {
            throw new Error(error)
        })

    }

    const takeInfo = async (e: any) => {
        e.preventDefault()
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        })
    }

    return (
        <header className='bg-blanc'>
            <div className='flex justify-between items-center p-5'>
                {/* Login */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Image className='transition duration-500 ease-in-out hover:scale-110'
                            src='/iconProfile.webp'
                            alt="Picture of the author"
                            width={100}
                            height={100}
                        />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-blanc">
                        <DialogHeader>
                            <div className='border-b-2 border-gray-800'><img className='w-[30%]  mx-auto' src='/logo.png' />
                                <DialogTitle className='text-center p-2'>Connexion</DialogTitle></div>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="mail" className="text-right">
                                    E-Mail :
                                </Label>
                                <Input
                                    id="email" name="Email" type="email" required value={data.Email} onChange={(e) => { setData({ ...data, Email: e.target.value }) }}
                                    className="col-span-3 shadow-2xl rounded-lg"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Password" className="text-right">
                                    Password :
                                </Label>
                                <Input
                                    id="password" name="Password" type="password" required value={data.Password} onChange={(e) => { setData({ ...data, Password: e.target.value }) }}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={takeLogin} className='transition duration-500 ease-in-out hover:bg-[#2a2519] bg-marron rounded-lg hover:shadow-2xl hover:scale-105'>Connexion</Button>
                            {/* Inscription */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className='transition duration-500 ease-in-out hover:bg-[#2a2519] bg-marron rounded-lg hover:shadow-2xl hover:scale-105'>Créer un compte</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-blanc">
                                    <DialogHeader>
                                        <div className='border-b-2 border-gray-800'><img className='w-[30%]  mx-auto' src='/logo.png' />
                                            <DialogTitle className='text-center p-2'>Créer un Compte</DialogTitle></div>
                                    </DialogHeader>
                                    <div className='flex flex-col'>
                                        <p className='mx-auto m-2'>Votre Pseudo :</p>
                                        <input name="Pseudo" value={data.Pseudo} onChange={(e) => { setData({ ...data, Pseudo: e.target.value }) }} type='text' placeholder='Pseudo' className='mx-auto bg-white rounded-lg p-2 px-10 shadow-2xl' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='mx-auto m-2'>Votre e-mail :</p>
                                        <input name="Email" value={data.Email} onChange={(e) => { setData({ ...data, Email: e.target.value }) }} type='text' placeholder='Ex:exemple@gmail.com' className='mx-auto bg-white rounded-lg p-2 px-10 shadow-2xl' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='mx-auto m-2'>Votre mot de passe :</p>
                                        <input name="Paswword" value={data.Password} onChange={(e) => { setData({ ...data, Password: e.target.value }) }} type='password' placeholder='Ex:Nfdo156¨^$ùDvV' className='mx-auto bg-white rounded-lg p-2 px-10 shadow-2xl' />
                                    </div>
                                    {/* Ajouter une photo de profil */}
                                    {/* <div className="grid w-full max-w-sm items-center gap-1.5 justify-center">
                                        <label htmlFor="picture" className="text-center">Ajoutez une photo de profil</label>
                                        <input id="picture" type="file"/>
                                    </div>   */}
                                    <div className='flex justify-center'>
                                        <DialogClose><Button type="submit" className='mx-auto px-10 hover:bg-[#2a2519] bg-marron transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105' onClick={takeInfo}>Créer</Button></DialogClose>
                                    </div>
                                </DialogContent>
                            </Dialog>

                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <div id='TopNav' className='flex w-3/4 justify-between items-center text-xl'>
                    <a className='transition duration-500 ease-in-out hover:text-gray-600 hover:scale-110' href="/accueil/villa">Villa</a>
                    <a className='transition duration-500 ease-in-out hover:text-gray-600 hover:scale-110' href="https://twitter.com/?lang=fr">Maison de campagne</a>
                    <a className='transition duration-500 ease-in-out hover:text-gray-600 hover:scale-110' href="https://twitter.com/?lang=fr">Cabane</a>
                    <a className='transition duration-500 ease-in-out hover:text-gray-600 hover:scale-110' href="https://twitter.com/?lang=fr">Appartement</a>
                    <a className='transition duration-500 ease-in-out hover:text-gray-600 hover:scale-110' href="/profil/661d2bc915fc42b2d526a40d/modifier">Profil</a>

                </div>
                <Dialog>
                    <DialogTrigger>
                        <Image className='transition duration-500 ease-in-out transform hover:scale-110'
                            src='/Loupe.svg'
                            alt=""
                            width={50}
                            height={50} />
                    </DialogTrigger>
                    <DialogContent className='bg-blanc p-10'>
                        <DialogHeader>
                            <DialogTitle className='text-gray-900 pb-3'>Que cherchez vous ?</DialogTitle>
                            <DialogDescription>
                                <form>
                                    <label className=''></label>
                                    <input
                                        type='text'
                                        name='recherche'
                                        className='rounded-md text-black pr-20 mr-2'
                                    />
                                    <DialogClose className='transition duration-500 ease-in-out transform hover:scale-105'> <button className='text-gray-900 ml-2 mb-2 duration-300 hover:border-b-2 border-black'>Recherche</button></DialogClose>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
            <div className='flex justify-center border-y-2 border-black p-8'>
                <a href="/accueil">
                    <Image className='transition duration-500 ease-in-out hover:brightness-90 transform hover:scale-105'
                        src='/Logo.svg'
                        alt="Picture of the author"
                        width={250}
                        height={250}
                    /></a>
            </div>
        </header>
    );
};
export default Header;
