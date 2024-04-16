"use client"

import Image from "next/image";
import { ArrowSmUpIcon } from '@heroicons/react/outline';
import useSWR from "swr";
import Link from "next/link";

const fetcher = (...args:any) => fetch(...args).then(res => res.json());

export default function Accueil() {
    const { data, error, isLoading } = useSWR('/api/poste/take', fetcher);

    console.log(data);

    const obj = data && data.data && data.data.length > 0 ? data.data[1] : null;

    return (
            <main className="container ml-4 py-11">
                <section className="flex justify-between">
                    <article className="w-[880px] h-auto bg-beige py-11 rounded-lg shadow-2xl">
                        <div className="relative">
                        <Link href={obj ? `/accueil/contenu-article/${obj.id}` : '#'}>
                            <Image
                                className="mx-auto transition duration-700 ease-in-out hover:brightness-75 rounded-lg transform hover:scale-95 shadow-2xl"
                                src={obj?.image}
                                width={798}
                                height={499}
                                alt="Lac de Côme"
                            />
                        </Link>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-80 h-16 bg-marron flex items-center justify-center ml-10 mt-3.5 transition duration-500 ease-in-out rounded-lg">
                                {obj && (
                                    <h2 className="text-4xl text-zinc-50 font-bold">{obj.titre}</h2>
                                )}
                            </div>
                        </div>
                        <div>
                            {obj && (
                                <h1 className="text-white text-5xl ml-10 mt-14">{obj.contenu}</h1>
                            )}
                        </div>
                    </article>

                    <div className="bg-marron w-1/3 relative left-20 rounded-lg shadow-2xl">
                        <div className="border-b-2 border-[#292518]">
                            <h3 className="text-white text-center text-2xl py-5">Commentaires</h3>
                        </div>
                        <div className="flex items-center space-x-2 ml-5 py-5">
                            <Image 
                                className="rounded-full border border-white transition duration-500 ease-in-out hover:brightness-50"
                                src='/mathis.jpg'
                                width={60}
                                height={60}
                                alt="Mathis.Guerin"
                            />
                            <div className="text-left">
                                <p className="text-white font-bold transition duration-500 ease-in-out hover:brightness-50">Mathis.Guerin</p>
                                <p className="text-slate-300 font-thin">Superbe villa, la photo est juste sublime.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-5 py-5">
                            <Image 
                                className="rounded-full border border-white transition duration-500 ease-in-out hover:brightness-50"
                                src='/bruno.jpg'
                                width={60}
                                height={60}
                                alt="Bruno.Dernier"
                            />
                            <div className="text-left">
                                <p className="text-white font-bold transition duration-500 ease-in-out hover:brightness-50">Bruno.Dernier</p>
                                <p className="text-slate-300 font-thin">Ma maison est plus belle ;)</p>
                            </div>
                        </div>
                            {/* Formulaire pour ajouter un commentaire */}
                    </div>
                </section>
            </main>
    );
  }
  