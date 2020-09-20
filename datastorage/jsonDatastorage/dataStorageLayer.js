"use strict";

const path = require("path");

const storageConfig = require("./storageConfig");
const storageFile = path.join(__dirname, storageConfig.storageFile);

function createDataStorage(baseDir, config) {
  const { CODES, MESSAGES } = require(path.join(
    baseDir,
    config.errorCodeFolder,
    config.errorCodes
  ));

  const { read, write } = require(path.join(
    baseDir,
    config.libraryFolder,
    config.fileHandler
  ));

  async function readStorage() {
    try {
      const data = await read(storageFile);
      return Promise.resolve(JSON.parse(data.fileData));
    } catch (err) {
      writeLog(err.message);
    }
  }

  async function writeStorage(data) {
    try {
      await write(storageFile, JSON.stringify(data, null, 4), {
        encoding: "utf8",
        flag: "w",
      });
    } catch (err) {
      writeLog(err.message);
    }
  }

  class Datastorage {
    static get CODES() {
      return CODES;
    }

    getAll() {
      return new Promise(async (resolve) => {
        let storage = await readStorage();
        resolve(storage);
      });
    }

    getOne(id) {
      async function getFromStorage(id) {
        let storage = await readStorage();
        for (let superhero of storage) {
          if ((superhero.heroID = +id)) {
            return superhero;
          }
        }
        return null;
      }
      return new Promise(async (resolve) => {
        if (!id) {
          resolve(MESSAGES.NOT_FOUND("<empty Id>"));
        } else {
          const result = await getFromStorage(id);
          if (result) {
            resolve(result);
          } else {
            resolve(MESSAGES.NOT_FOUND(id));
          }
        }
      });
    }

    insert(superhero) {
      async function addToStorage(newSuperhero) {
        let storage = await readStorage();
        for (let superhero of storage) {
          if (superhero.heroID == newSuperhero.heroID) {
            return false;
          }
        }
        storage.push({
          heroID: +superhero.heroID,
          name: superhero.name,
          superproperty: superhero.superproperty,
          yearOfBirth: +superhero.yearOfBirth,
          strength: superhero.strength,
        });
        await writeStorage(storage);
        return true;
      }
      return new Promise(async (resolve) => {
        if (
          !(
            superhero &&
            superhero.heroID &&
            superhero.name &&
            superhero.superproperty &&
            superhero.yearOfBirth &&
            superhero.strength
          )
        ) {
          resolve(MESSAGES.NOT_INSERTED());
        } else {
          if (await addToStorage(superhero)) {
            resolve(MESSAGES.INSERT_OK(superhero.heroID));
          } else {
            resolve(MESSAGES.ALREADY_IN_USE(superhero.heroID));
          }
        }
      });
    }

    update(superhero) {
      async function updateStorage(superhero) {
        let storage = await readStorage();
        for (let i = 0; i < storage.length; i++) {
          if (storage[i].heroID == superhero.heroID) {
            Object.assign(storage[i], {
              heroID: +superhero.heroID,
              name: superhero.name,
              superproperty: superhero.superproperty,
              yearOfBirth: +superhero.yearOfBirth,
              strength: superhero.strength,
            });
            await writeStorage(storage);
            return true;
          }
        }
        return false;
      }
      return new Promise(async (resolve) => {
        if (
          !(
            superhero &&
            superhero.heroID &&
            superhero.name &&
            superhero.superproperty &&
            superhero.yearOfBirth &&
            superhero.strength
          )
        ) {
          resolve(MESSAGES.NOT_UPDATED());
        } else {
          if (await updateStorage(superhero)) {
            resolve(MESSAGES.UPDATE_OK(superhero.heroID));
          } else {
            resolve(MESSAGES.NOT_UPDATED());
          }
        }
      });
    }

    remove(id) {
      async function deleteFromStorage(id) {
        let storage = await readStorage();
        for (let i = 0; i < storage.length; i++) {
          if (storage[i].heroID == +id) {
            storage.splice(i, 1);
            await writeStorage(storage);
            return true;
          }
        }
        return false;
      }

      return new Promise(async (resolve) => {
        if (!heroID) {
          resolve(MESSAGES.NOT_FOUND("<empty>"));
        } else {
          if (await deleteFromStorage(id)) {
            resolve(MESSAGES.DELETE_OK(heroID));
          } else {
            resolve(MESSAGES.NOT_DELETED());
          }
        }
      });
    }
  }

  return new Datastorage();
}

module.exports = {
  createDataStorage,
};
