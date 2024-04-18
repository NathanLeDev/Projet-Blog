'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useSWR, { mutate } from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Utilisateurs() {
  const { data, error, isLoading } = useSWR('/api/user/take', fetcher);

  const handleDelete = async (email) => {
    try {
      const response = await fetch(`/api/user/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Pass the email in the request body
      });
      if (response.ok) {
        // Refresh data after deletion
        mutate('/api/user/take');
      } else {
        console.error('Erreur lors de la suppression de l\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  };
  

  return (
    <div className="bg-white">
      <main className="bg-white">
        {/* Header */}
        <div className='flex items-center justify-between border-b-2 border-black'>
          <div className="ml-10">
            <a href="/">
              <Image
                className="transition duration-500 ease-in-out hover:scale-105 hover:brightness-50"
                src='/icone-maison.png'
                alt="Logo"
                width={60}
                height={60}
              />
            </a>
          </div>
          {/* Compte administrateur */}
          <div className="flex items-center border border-black px-5 mr-10">
            <h3 className="font-semibold text-brown text-2xl">Compte administrateur</h3>
          </div>
        </div>
        <div className="w-auto h-28 border-black border-b-2">
          <div className="flex">
            <div className="flex items-center">
              <a href="/administration/utilisateurs" className="bg-beige hover:bg-beige text-white font-bold py-2 px-4 rounded flex items-center justify-center ml-64 hover:brightness-50">Utilisateurs</a>
            </div>
            <div className="h-28 w-1 bg-black mx-auto"></div>
            <div className="flex items-center">
              <a href="/administration/articles" className="bg-beige hover:bg-beige text-white font-bold py-2 px-4 rounded flex items-center justify-center mr-72 hover:brightness-50">Articles</a>
            </div>
          </div>
        </div>
        <div>
          {data && data.data && data.data.map((obj, index) => (
            <div key={index} className="my-4">
              <div className="flex items-center mb-2">
                <button onClick={() => handleDelete(obj.email)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">Supprimer</button>
                <div className="mr-4">
                  <span className="font-semibold">Pseudo:</span>
                  <span>{obj && obj.pseudo}</span>
                </div>
                <div className="mr-4">
                  <span className="font-semibold">Email:</span>
                  <span>{obj && obj.email}</span>
                </div>
                <div>
                  <span className="font-semibold">Rôle:</span>
                  <span>{obj && obj.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}