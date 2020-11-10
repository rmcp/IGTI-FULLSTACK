import accountsRepository from "../Repository/accountsRepository.js";

const depositar = (agencyNumber, accountNumber, value) => {
  return accountsRepository.update(agencyNumber, accountNumber, value);
};

const sacar = (agencyNumber, accountNumber, value) => {
  value *= -1;
  return accountsRepository.update(agencyNumber, accountNumber, value);
};

const remove = async (account) => {
  await accountsRepository.remove(account);

  return await accountsRepository.getByAgencyNumber();
};

const get = async (accountNumber) => {
  return await accountsRepository.get(accountNumber);
};

const getBalance = async (agencyNumber, accountNumber) => {
  return await accountsRepository.get(accountNumber);
};

const getAll = async () => {
  return await accountsRepository.getAll();
};

// Crie um endpoint para realizar transferências entre contas. Este endpoint deverá receber como parâmetro o
// número da “conta” origem, o número da “conta” destino e o valor de transferência. Este endpoint deve validar se as
// contas são da mesma agência para realizar a transferência, caso seja de agências distintas o valor de tarifa de transferência (8)
// deve ser debitado na conta origem. O endpoint deverá retornar o saldo da conta origem.
const transferir = async ({
  originAccountNumber,
  destinyAccountNumber,
  value,
}) => {
  const originAccountDB = await get(originAccountNumber);
  const destinyAccountDB = await get(destinyAccountNumber);
  let tax = 0;

  if (originAccountDB.agencia !== destinyAccountDB.agencia) tax = 8;

  await sacar(originAccountDB.agencia, originAccountDB.conta, value + tax);
  await depositar(destinyAccountDB.agencia, destinyAccountDB.conta, value);

  return await get(originAccountNumber);
};

const mediaSaldos = async (agencyNumber) => {
  return await accountsRepository.averageBalance(agencyNumber);
};

const menoresSaldos = async (limit) => {
  return await accountsRepository.menoresSaldos(limit);
};

const maioresSaldos = async (limit) => {
  return await accountsRepository.maioresSaldos(limit);
};

const maiorPorAgencia = async (agencyNumber) => {
  return await accountsRepository.maiorPorAgencia(agencyNumber);
};

const maxByAgency = async () => {
  return await accountsRepository.maxByAgency();
};

const moveToPrivateAgency = async () => {
  (await accountsRepository.maxByAgency()).forEach((max) => {
    maiorPorAgencia(max._id).then((account) => {
      accountsRepository.moveToAgency(account, 99);
    });
  });

  return await accountsRepository.getByAgencyNumber(99);
};

export default {
  depositar,
  sacar,
  remove,
  get,
  getBalance,
  getAll,
  transferir,
  mediaSaldos,
  menoresSaldos,
  maioresSaldos,
  maxByAgency,
  moveToPrivateAgency,
};
