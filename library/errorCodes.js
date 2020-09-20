const CODES = {
  NOT_FOUND: 1,
  INSERT_OK: 2,
  NOT_INSERTED: 3,
  ALREADY_IN_USE: 4,
  DELETE_OK: 5,
  NOT_DELETED: 6,
  UPDATE_OK: 7,
  NOT_UPDATED: 8,
  PROGRAM_ERROR: 0,
};

const MESSAGES = {
  NOT_FOUND: (id) => ({
    message: `No superhero found with id ${id}`,
    code: CODES.NOT_FOUND,
    type: "error",
  }),
  INSERT_OK: (id) => ({
    message: `Superhero with id ${id} was inserted`,
    codes: CODES.INSERT_OK,
    type: "info",
  }),
  NOT_INSERTED: () => ({
    message: "Superhero was not inserted",
    code: CODES.NOT_INSERTED,
    type: "error",
  }),
  ALREADY_IN_USE: (id) => ({
    message: `Superhero id ${id} was already in use`,
    code: CODES.ALREADY_IN_USE,
    type: "error",
  }),
  DELETE_OK: (id) => ({
    message: `Superhero with id ${id} removed`,
    code: CODES.DELETE_OK,
    type: "info",
  }),
  NOT_DELETED: () => ({
    message: "No superhero found with the given superhero id. Nothing removed.",
    code: CODES.NOT_DELETED,
    type: "error",
  }),
  UPDATE_OK: (id) => ({
    message: `Superhero with id ${id} was updated`,
    code: CODES.UPDATE_OK,
    type: "info",
  }),
  NOT_UPDATED: () => ({
    message: "Data was not updated",
    code: CODES.NOT_UPDATED,
    type: "error",
  }),
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in the program.",
    code: CODES.PROGRAM_ERROR,
    type: "error",
  }),
};

module.exports = { CODES, MESSAGES };
