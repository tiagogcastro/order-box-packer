export async function checkAndCreateTables(client) {
  try {
    const result = await client.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'professor'
    `);

    if (result.rows[0].count == 0) {
      console.log("Tabelas não encontradas, criando");

      await client.query(`
        CREATE TABLE IF NOT EXISTS department (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE);
        CREATE TABLE IF NOT EXISTS title (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE);  
        CREATE TABLE IF NOT EXISTS building (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE);
        CREATE TABLE IF NOT EXISTS professor (id SERIAL PRIMARY KEY, name VARCHAR(150) NOT NULL, department_id INTEGER REFERENCES department(id), title_id INTEGER REFERENCES title(id));
        CREATE TABLE IF NOT EXISTS subject (id SERIAL PRIMARY KEY, subject_id VARCHAR(20) UNIQUE NOT NULL, code VARCHAR(20) NOT NULL, name VARCHAR(150) NOT NULL);
        CREATE TABLE IF NOT EXISTS subject_prerequisite (id SERIAL PRIMARY KEY, subject_id VARCHAR(20) REFERENCES subject(subject_id), prerequisiteid VARCHAR(20) REFERENCES subject(subject_id));
        CREATE TABLE IF NOT EXISTS room (id SERIAL PRIMARY KEY, name VARCHAR(50), building_id INTEGER REFERENCES building(id));
        CREATE TABLE IF NOT EXISTS class (id SERIAL PRIMARY KEY, code VARCHAR(20) NOT NULL, subject_id VARCHAR(20) REFERENCES subject(subject_id), taught_by INTEGER REFERENCES professor(id), semester VARCHAR(20));
        CREATE TABLE IF NOT EXISTS class_schedule (id SERIAL PRIMARY KEY, class_id INTEGER REFERENCES class(id), room_id INTEGER REFERENCES room(id), day_of_week VARCHAR(20), start_time TIME, end_time TIME);
      `);

      console.log("Tabelas criadas!");
    }

    const profCount = await client.query("SELECT COUNT(*) FROM professor");

    if (profCount.rows[0].count == 0) {
      console.log("Inserindo dados iniciais");

      await client.query(`
        INSERT INTO department (name) VALUES ('Matemática e Ciências'),('Línguas e Literatura'),('História e Geografia'),('Educação Física'),('Artes e Música') ON CONFLICT (name) DO NOTHING;
        INSERT INTO title (name) VALUES ('Professor'),('Diretor'),('Vice-Diretor'),('Coordenador'),('Professor Auxiliar') ON CONFLICT (name) DO NOTHING;
        INSERT INTO building (name) VALUES ('Prédio Principal'),('Laboratório de Ciências'),('Ginásio de Esportes'),('Biblioteca'),('Prédio Administrativo') ON CONFLICT (name) DO NOTHING;
        INSERT INTO professor (name, department_id, title_id) VALUES ('Professor Girafales', 1, 2),('Dona Florinda', 2, 1),('Seu Madruga', 3, 1),('Dona Clotilde', 1, 1),('Jaiminho Carteiro', 4, 1),('Professor Linguiça', 5, 1),('Dona Neves', 2, 4),('Nhonho Pai', 1, 3) ON CONFLICT DO NOTHING;
        INSERT INTO subject (subject_id, code, name) VALUES ('MAT001', 'MAT-101', 'Matemática Básica'),('MAT002', 'MAT-201', 'Álgebra Linear'),('POR001', 'POR-101', 'Língua Portuguesa'),('POR002', 'POR-201', 'Literatura Brasileira'),('HIS001', 'HIS-101', 'História do Brasil'),('GEO001', 'GEO-101', 'Geografia Geral'),('EDF001', 'EDF-101', 'Educação Física'),('ART001', 'ART-101', 'Artes Visuais'),('CIE001', 'CIE-101', 'Ciências Naturais'),('ING001', 'ING-101', 'Inglês Básico') ON CONFLICT (subject_id) DO NOTHING;
      `);

      await client.query(`
        INSERT INTO subject_prerequisite (subject_id, prerequisiteid) VALUES 
        ('MAT002', 'MAT001'),
        ('POR002', 'POR001') 
        ON CONFLICT DO NOTHING;
      `);

      await client.query(`
        INSERT INTO room (name, building_id) VALUES ('Sala 101', 1),('Sala 102', 1),('Sala 103', 1),('Laboratório A', 2),('Laboratório B', 2),('Quadra Principal', 3),('Sala de Leitura', 4),('Auditório', 1),('Sala de Artes', 1),('Sala 201', 1) ON CONFLICT DO NOTHING;
        INSERT INTO class (code, subject_id, taught_by, semester) VALUES ('T-MAT001-2025-1', 'MAT001', 4, '2025-1'),('T-MAT002-2025-1', 'MAT002', 4, '2025-1'),('T-POR001-2025-1', 'POR001', 2, '2025-1'),('T-POR002-2025-1', 'POR002', 2, '2025-1'),('T-HIS001-2025-1', 'HIS001', 3, '2025-1'),('T-GEO001-2025-1', 'GEO001', 3, '2025-1'),('T-EDF001-2025-1', 'EDF001', 5, '2025-1'),('T-ART001-2025-1', 'ART001', 6, '2025-1'),('T-CIE001-2025-1', 'CIE001', 1, '2025-1'),('T-ING001-2025-1', 'ING001', 7, '2025-1') ON CONFLICT DO NOTHING;
      `);

      await client.query("DELETE FROM class_schedule");
      await client.query(`
        INSERT INTO class_schedule (class_id, room_id, day_of_week, start_time, end_time) VALUES 
        (1, 1, 'Segunda', '08:00', '09:30'),(3, 2, 'Segunda', '08:00', '09:30'),(5, 3, 'Segunda', '10:00', '11:30'),(7, 6, 'Segunda', '10:00', '11:30'),(9, 4, 'Segunda', '14:00', '15:30'),
        (2, 1, 'Terça', '08:00', '09:30'),(4, 2, 'Terça', '08:00', '09:30'),(6, 3, 'Terça', '10:00', '11:30'),(8, 9, 'Terça', '10:00', '11:30'),(10, 10, 'Terça', '14:00', '15:30'),
        (1, 1, 'Quarta', '08:00', '09:30'),(3, 2, 'Quarta', '10:00', '11:30'),(5, 3, 'Quarta', '14:00', '15:30'),(7, 6, 'Quarta', '14:00', '15:30'),
        (2, 1, 'Quinta', '08:00', '09:30'),(4, 7, 'Quinta', '08:00', '09:30'),(6, 3, 'Quinta', '10:00', '11:30'),(9, 5, 'Quinta', '10:00', '11:30'),(8, 9, 'Quinta', '14:00', '15:30'),
        (1, 1, 'Sexta', '08:00', '09:30'),(10, 10, 'Sexta', '08:00', '09:30'),(7, 6, 'Sexta', '10:00', '11:30'),(9, 4, 'Sexta', '14:00', '15:30');
      `);

      console.log("Dados inseridos!");
    } else {
      console.log("Dados já existem, pulando inserção");
    }

  } catch (error) {
    console.log("Erro na inicialização:", error.message);
  }
}
