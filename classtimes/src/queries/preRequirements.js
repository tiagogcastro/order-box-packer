export async function getPreRequirements(client) {
  const count = await client.query("SELECT COUNT(*) FROM subject_prerequisite");
  console.log(`\nPré-requisitos cadastrados: ${count.rows[0].count}`);

  if (count.rows[0].count > 0) {
    const result = await client.query(`
      SELECT 
        s1.name as disciplina,
        s2.name as prerequisito
      FROM subject_prerequisite sp
      JOIN subject s1 ON sp.subject_id = s1.subject_id
      JOIN subject s2 ON sp.prerequisiteid = s2.subject_id
    `);

    console.log("\nPré-requisitos:");

    console.table(result.rows);

    return result.rows;
  }

  return [];
}
