export async function getHorasProfessores(client) {
  const result = await client.query(`
    SELECT 
        p.id AS professor_id,
        p.name AS professor_name,
        d.name AS departamento,
        t.name AS titulo,
        COALESCE(SUM(EXTRACT(EPOCH FROM (cs.end_time - cs.start_time)) / 3600), 0) AS total_hours
    FROM professor p
    LEFT JOIN department d ON p.department_id = d.id
    LEFT JOIN title t ON p.title_id = t.id
    LEFT JOIN class c ON c.taught_by = p.id
    LEFT JOIN class_schedule cs ON cs.class_id = c.id
    GROUP BY p.id, p.name, d.name, t.name
    ORDER BY total_hours DESC;
  `);

  console.log("\nHoras comprometidas por professor:");
  console.table(result.rows);

  return result.rows;
}
