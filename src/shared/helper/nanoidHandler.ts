import { customAlphabet } from 'nanoid/async';

const generateNumID = async () => {
  const nanoid = customAlphabet('1234567890', 10);
  return await nanoid();
};

export default generateNumID;
