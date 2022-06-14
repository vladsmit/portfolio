import fs from 'fs';
import path from 'path';

import { getAllUsers } from '../../../helpers/api-util';
import { hashPassword } from '../../../helpers/auth';

const buildDataPath = () => path.join(process.cwd(), 'data', 'users.json');
const extractData = filePath => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const { id, email, password } = data;

    const allUsers = await getAllUsers();
    const duplicatedEmail = allUsers.find(user => user.email === email);

    if (!email || !email.includes('@')) {
      res.status(422).json({
        message: 'Email should contain @ symbol',
      });
      return;
    } else if (!password || password.trim().length < 4) {
      res.status(422).json({
        message: 'Password should be at least 4 characters long',
      });
      return;
    } else if (duplicatedEmail) {
      res.status(422).json({
        message: 'This email already exists',
      });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const filePath = buildDataPath();
    const users = extractData(filePath);
    users.push({
      id,
      email,
      password: hashedPassword,
    });
    fs.writeFileSync(filePath, JSON.stringify(users));
    res.status(201).json({ message: 'User added!' });
  }
};

export default handler;
