import fs from 'fs';
import Promise from 'bluebird';

const readDir = Promise.promisify(fs.readdir);

const selectUnusedFiles = (
  dbFiles,
  storageFiles,
  strForReplaceInDbField,
  strForCheckFormat
) => {
  const cache = {};
  const newArray = [];

  dbFiles.forEach(obj => {
    const path = obj.file.replace(strForReplaceInDbField, '');
    cache[path] = true;
  });

  storageFiles.forEach(file => {
    const format = file.substr(file.length - 4);
    // const format = file.split(".").pop();
    if (cache[file] === undefined && format === strForCheckFormat) {
      newArray.push(file);
    }
  });

  return newArray;
};

export default async ({
  model,
  fields,
  dirPath,
  strForReplaceInDbField,
  strForCheckFormat
}) => {
  const allFilesInStorage = await readDir(dirPath);
  const allFilesInDB = await model.find({}, fields);
  const unusedFiles = selectUnusedFiles(
    allFilesInDB,
    allFilesInStorage,
    strForReplaceInDbField,
    strForCheckFormat
  );
  unusedFiles.forEach(file => {
    fs.unlink(`${dirPath}${file}`);
  });
};
