import database from '../../loaders/database';

interface Student {
  name: string;
}

const createStudent = async (student: Student): Promise<any> => {
  const session = (await database()).session();
  const result = await session.writeTransaction(txc =>
    txc.run(`CREATE (s:Student {name: $name}) RETURN s`, {
      name: student.name,
    }),
  );
  console.log('result', result);
  return { success: true, data: result, status: 200 };
};

export { createStudent };
