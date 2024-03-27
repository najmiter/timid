fetch("./slots.json")
    .then((jwb) => jwb.json())
    .then((timid) => console.log(timid))
    .catch((e) => console.error(e));
