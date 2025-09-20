export async function getOccupiedRooms(client) {
  const result = await client.query(`
    SELECT 
        r.id AS room_id,
        r.name AS room_name,
        b.name AS building_name,
        cs.day_of_week,
        cs.start_time,
        cs.end_time,
        c.code AS class_code,
        s.name AS subject_name,
        p.name AS professor_name
    FROM room r
    JOIN building b ON r.building_id = b.id
    LEFT JOIN class_schedule cs ON cs.room_id = r.id
    LEFT JOIN class c ON cs.class_id = c.id
    LEFT JOIN subject s ON c.subject_id = s.subject_id
    LEFT JOIN professor p ON c.taught_by = p.id
    ORDER BY r.id, 
             CASE cs.day_of_week 
               WHEN 'Segunda' THEN 1
               WHEN 'Terça' THEN 2  
               WHEN 'Quarta' THEN 3
               WHEN 'Quinta' THEN 4
               WHEN 'Sexta' THEN 5
               ELSE 6
             END,
             cs.start_time;
  `);

  console.log("\nSalas ocupadas:");

  console.table(result.rows);

  return result.rows;
}

export async function getFreeRooms(client, day = 'Segunda', hour = '08:00') {
  const result = await client.query(`
    SELECT 
        r.name AS sala,
        b.name AS predio
    FROM room r
    JOIN building b ON r.building_id = b.id
    WHERE r.id NOT IN (
      SELECT DISTINCT cs.room_id
      FROM class_schedule cs
      WHERE cs.day_of_week = $1
      AND cs.start_time <= $2::time
      AND cs.end_time >= $2::time
    )
    ORDER BY r.name;
  `, [day, hour]);

  console.log(`\nSalas livres em ${day} às ${hour}:`);

  console.table(result.rows);

  return result.rows;
}
