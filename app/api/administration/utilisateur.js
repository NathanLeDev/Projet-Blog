import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const utilisateurs = await prisma.utilisateur.findMany();
      res.status(200).json(utilisateurs);
    } catch (error) {
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée.' });
  }
}
