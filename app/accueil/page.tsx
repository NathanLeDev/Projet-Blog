"use client"

import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (...args:any) => fetch(...args).then(res => res.json());

export default function Accueil() {
    const { data, error, isLoading } = useSWR('/api/poste/take', fetcher);

    console.log(data);

    const articles = data && data.data ? data.data : [];

    
    return (
            <main className="container ml-4 pt-11">
                <section className="">
                    {articles.map((article, index) => (
                        <div key={index} className="flex mb-20 justify-between w-auto">
                            <article className="w-[880px] h-auto bg-beige py-11 px-11 rounded-lg shadow-2xl mx-10">
                                <div className="relative">
                                    <Link legacyBehavior href={`/accueil/contenu-article/${article.slug}`} key={article.slug}>
                                            <Image
                                                className="mx-auto transition duration-700 ease-in-out hover:brightness-75 rounded-lg transform hover:scale-95 shadow-2xl"
                                                src={article.image}
                                                width={798}
                                                height={499}
                                                alt={article.titre}
                                                style={{ maxHeight: '400px', objectFit: 'cover' }}
                                            />

                                    </Link>
                                </div>
                                <div className="flex justify-between">
                                    <div className="w-80 h-16 bg-marron flex items-center justify-center ml-10 mt-3.5 transition duration-500 ease-in-out rounded-lg">
                                        {article && (
                                            <h1 className="text-2xl text-zinc-50 font-bold">{article.titre}</h1>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {article && (
                                        <h2 className="text-white text-3xl ml-10 mt-14">
                                            {article.contenu.split(' ').slice(0, 10).join(' ')}{article.contenu.split(' ').length > 10 ? '...' : ''}
                                        </h2>
                                    )}
                                </div>
                            </article>
                            
                            <div className="bg-marron w-1/3 relative rounded-lg shadow-2xl ml-10">
                                <div className="border-b-2 border-[#292518]">
                                    <h3 className="text-white text-center text-2xl py-5">Commentaires</h3>
                                </div>
                                <div className="flex items-center space-x-2 ml-5 py-5">
                                <a href="/profil/1"><Image 
                                        className="rounded-full border border-white transition duration-500 ease-in-out hover:brightness-50"
                                        src='/mathis.jpg'
                                        width={60}
                                        height={60}
                                        alt="Mathis.Guerin"
                                    /></a>
                                    <div className="text-left">
                                        <a href="/profil/1"><p className="text-white font-bold transition duration-500 ease-in-out hover:brightness-50">Krusty_LeClown</p></a>
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
                                        <p className="text-white font-bold transition duration-500 ease-in-out hover:brightness-50">Formateur.Expert</p>
                                        <p className="text-slate-300 font-thin">Ma maison est plus belle ;)</p>
                                    </div>
                                </div>
                                {/* Formulaire pour ajouter un commentaire */}
                            </div>
                        </div>
                    ))}
                </section>
            </main>


    );
  }
  