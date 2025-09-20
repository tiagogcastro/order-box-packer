import { createClient } from './config/database.js';
import { getPreRequirements } from './queries/preRequirements.js';
import { getHorasProfessores } from './queries/professores.js';
import { getFreeRooms, getOccupiedRooms } from './queries/rooms.js';
import { checkAndCreateTables } from './setup/initDatabase.js';

async function main() {
  const client = createClient();

  try {
    await client.connect();
    console.log("Conectado ao PostgreSQL - Sistema do Professor Girafales");

    await checkAndCreateTables(client);

    await getPreRequirements(client);
    await getHorasProfessores(client);
    await getOccupiedRooms(client);
    await getFreeRooms(client, 'Segunda', '08:00');

    await client.end();

    console.log("\nRelatório completo concluído!");

  } catch (err) {
    console.error("Erro:", err.message);
  }
}

main();
