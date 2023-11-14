function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

const user = {
  name: "Serif",
  age: 26,
};

const keys = Object.keys(user);

keys.forEach((key) => {
  if (isKey(user, key)) {
    window.console.log(user[key]);
  }
});
