import { openDB, deleteDB } from "idb";

const initdb = async () => {
  openDB("jate", 1, {
    upgrade(db) {
      console.log("upgrade");
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ jate: content });
  await request;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("getDb");
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  await request;
};

export const deletemyDB = async () => {
  await deleteDB("jate", {
    blocked() {
      console.log("blocked");
    },
  });
};
console.log("preinit");
initdb();
//deletemyDB();
