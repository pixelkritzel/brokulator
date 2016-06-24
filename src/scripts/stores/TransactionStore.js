import { observable, action, autorun } from 'mobx';

const AccountStore = {
  accounts: [{ id: 0, name: "Sparkasse"}, { id:1, name:"Geldspeicher"}]
}

function validateTransaction(transaction) {
  const errorMessages = [];
  if (!transaction.name) errorMessages.push('Transaction misses name');
  if (!transaction.amount) errorMessages.push('Transaction misses amount');
  if (!transaction.transactionType) errorMessages.push('Transaction misses transaction type');
  if (!transaction.schedule) errorMessages.push('Transaction misses schedule');
  if (!transaction.repetition) errorMessages.push('Transaction misses repetition type');
  if (!transaction.account) errorMessages.push('Transaction misses account');
  if (errorMessages.length > 0) {
    errorMessages.unshift('Errors in transaction');
    return errorMessages;
  }
}

let transactionsFromLocalStorage;
try {
  transactionsFromLocalStorage = JSON.parse(localStorage.getItem('Brokulator.Transactions'))
} catch (e) {

}

class TransactionStore {
  @observable transactions = transactionsFromLocalStorage || [];

  @action addTransaction(newTransaction) {
    const errors = validateTransaction(newTransaction);
    if (!errors) {
      newTransaction.account = AccountStore.accounts.find(account => account.id == newTransaction.account);
      this.transactions.push(newTransaction);
    } else {
      alert(errors.join('\n'));
    }
  }
}

const TransactionStoreSingleton = new TransactionStore();

autorun(function() {
  localStorage.setItem('Brokulator.Transactions', JSON.stringify(TransactionStoreSingleton.transactions));
})

export default TransactionStoreSingleton;