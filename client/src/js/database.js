import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: false });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('Post to the JATE database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content })

  const result = await request;
  console.log('Data saved to the database', result);
};

export const getDb = async () => {
  console.log('Get from the JATE database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate','readonly');

  const store = tx.objectStore('jate');

  const request = store.get(1);

  const result = await request;
  console.log('result.value', result?.value);
  return result?.value;
  // the ? means can be undefined until it isnt
};

initdb();
