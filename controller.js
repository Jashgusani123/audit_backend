import fs from "fs";
import { v4 as uuid } from "uuid";

function getWordDifferance(oldText, newText) {
  const oldWords = oldText.trim().split(/\s+/).filter(Boolean);
  const newWords = newText.trim().split(/\s+/).filter(Boolean);

  return {
    addedWords: newWords.filter((w) => !oldWords.includes(w)), //here not include in the oldText
    removedWords: oldWords.filter((w) => !newWords.includes(w)), //here not include in the newText
    oldLength: oldWords.length,
    newLength: newWords.length,
  };
}

export const saveVersion = (request, response) => {
  const { oldText, newText } = request.body;

  if (oldText === undefined || newText === undefined) {
    return response.status(404).json({
      success: false,
      message: "Invaild Request",
    });
  }

  let versions = [];
  if (fs.existsSync("versions.json")) {
    versions = JSON.parse(fs.readFileSync("versions.json")); //here we got last data which available
  }

  //   get differance
  const differance = getWordDifferance(oldText, newText);

  const newEntry = {
    id: uuid(),
    timestamp: new Date().toISOString(),
    ...differance,
  };
  versions.push(newEntry);

  // save in the file versions.json
  fs.writeFileSync("versions.json", JSON.stringify(versions, null, 2));

  response.json({ success: true, newEntry });
};

export const getVersions = (request, response) => {
  let versions = [];
  if (fs.existsSync("versions.json")) {
    versions = JSON.parse(fs.readFileSync("versions.json"));
  }

  response.json({
    success: true,
    versions,
  });
};

export const deleteHistory = (req, res) => {
  fs.writeFileSync("versions.json", JSON.stringify([], null, 2));
  res.json({ success: true, message: "Version history cleared." });
};