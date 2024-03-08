import pkg from 'pg';
const { Client } = pkg;

async function connectToPostgres() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'cleaning',
    password: 'password',
    port: 5433,
  });

  try {
    await client.connect();
    console.log('Conexão com o PostgreSQL estabelecida com sucesso');
    return client;
  } catch (err) {
    console.error('Erro ao conectar:', err);
    throw err;
  }
}

async function disconnectFromPostgres(client) {
  try {
    await client.end();
    console.log('Conexão com o PostgreSQL encerrada');
  } catch (err) {
    console.error('Erro ao desconectar:', err);
    throw err;
  }
}

async function getTableData() {
  const client = await connectToPostgres();
  
  try {
    const res = await client.query('SELECT * FROM customers');
    return res.rows;
  } catch (err) {
    console.error('Erro ao obter dados da tabela:', err);
    throw err;
  } finally {
    await disconnectFromPostgres(client);
  }
}

async function saveTableData({name, email, phone, x, y}) {
  const client = await connectToPostgres();
  
  try {
    const res = await client.query(`INSERT INTO customers(id,name,email,phone,x,y) VALUES(DEFAULT,'${name}','${email}','${phone}',${x},${y});`);
    return res;
  } catch (err) {
    console.error('Erro ao salvar dados da tabela:', err);
    throw err;
  } finally {
    await disconnectFromPostgres(client);
  }
}

async function getData() {
  try {
    const data = await getTableData();
    return data;
  } catch (err) {
    throw err;
  }
}

async function saveData(data) {
  try {
    await saveTableData(data);
  } catch (err) {
    throw err;
  }
}

export { getData, saveData };