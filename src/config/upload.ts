import path from 'path';
import multer from 'multer';

import AppError from '../errors/AppError';

const tmpFolderLocking = path.resolve(
  __dirname,
  '..',
  '..',
  'tmp',
  'trancamentos',
);
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolderLocking,
    filename(request, file, callback) {
      const filePrefix = request.headers.type;
      const fileId = request.headers.id;

      const validFormats = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
      ];

      if (validFormats.indexOf(file.mimetype) === -1) {
        throw new AppError('Formato de arquivo inválido');
      }

      const [, extension] = file.mimetype.split('/');

      const fileName = `${filePrefix}-${fileId}.${extension}`;
      return callback(null, fileName);
    },
  }),
};
