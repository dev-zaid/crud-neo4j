import database from '../../loaders/database';

interface Student {
  name: string;
}

const createStudent = async (student: any) => {
  const session = (await database()).session();
  const result = await session.writeTransaction(txc =>
    txc.run(
      `CREATE (s:Student {student_id: $student_id, name: $name, created_at:TIMESTAMP(), updated_at:TIMESTAMP()}) RETURN s`,
      student,
    ),
  );
  session.close();
  return { success: true, message: 'Student ctreated successfully' };
};

const getStudent = async (student_id: number) => {
  const session = (await database()).session();
  const result = await session.readTransaction(txc =>
    txc.run(
      `MATCH (n)
  WHERE n.student_id = $id
  OPTIONAL MATCH (n)-[r]-()
  RETURN n, collect(r) as relationships`,
      { id: student_id },
    ),
  );

  return { success: true, data: result.records, message: 'Student fetched successfully' };
};

const deleteStudent = async (student_id: number) => {
  const session = (await database()).session();
  const result = await session.readTransaction(txc =>
    txc.run(
      `MATCH (n)
  WHERE n.student_id = $id
  DELETE n`,
      { id: student_id },
    ),
  );

  return { success: true, data: result.records, message: 'Student fetched successfully' };
};

export { createStudent, getStudent, deleteStudent };
