import fs from 'fs';
import path from 'path';

const buildDataPath = () => path.join(process.cwd(), 'data', 'hotels.json');
const extractData = filePath => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
};

const handler = (req, res) => {
  if (req.method === 'GET') {
    const filePath = buildDataPath();
    const data = extractData(filePath);
    res.status(200).json({ hotels: data });
  }
};

export default handler;
