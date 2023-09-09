const LOG_LEVEL = {
  DEBUG: "DEBUG",
  INFO: "INFO",
  WARN: "WARN",
} as const;

type ObjectKeys<T> = keyof T;

type ObjectValues<T> = T[ObjectKeys<T>];

type LogLevelValues = ObjectValues<typeof LOG_LEVEL>;

type LogLevelValue = {
  [key in LogLevelValues]: number;
};

const LOG_LEVEL_VALUE: LogLevelValue = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
};

function log(message: string, level: LogLevelValues) {
  // INFO (serif) : YOUR_LOGIC_HERE
}

log("hello", LOG_LEVEL.DEBUG); // ? should be printed
log("hello", LOG_LEVEL.INFO); // ? should be printed
log("hello", LOG_LEVEL.WARN); // ? should be printed
// log("hello", "ERROR"); // ? should not be printed (error) Argument of type '"ERROR"' is not assignable to parameter of type 'LogLevel'.