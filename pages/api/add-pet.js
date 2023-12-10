import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    const { petName, ownerName } = JSON.parse(request.body);
    //const petName = request.query.petName;
    //const ownerName = request.query.ownerName;
    if (!petName || !ownerName) throw new Error('Pet and owner names required');
    await sql`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${ownerName});`;
    const pets = await sql`SELECT * FROM Pets;`;
    return response.status(200).json({ pets: pets.rows });
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  //const pets = await sql`SELECT * FROM Pets;`;
  //return response.status(200).json({ pets });
}