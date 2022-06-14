import fs from 'fs';
import path from 'path';

const buildDataPath = () => path.join(process.cwd(), 'data', 'hotels.json');
const extractData = filePath => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
};

const handler = (req, res) => {
  if (req.method === 'POST') {
    const filePath = buildDataPath();
    const data = extractData(filePath);
    data.push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({ message: 'Add completed!' });
  }
};

export default handler;
