import { defineStore } from 'pinia';

interface Account {
  id: string;
  label: Array<{ text: string }> | string; // Метки могут быть как строкой, так и массивом
  type: string;
  login: string;
  password: string | null;
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: crypto.randomUUID(),
        label: '',
        type: 'Local',
        login: '',
        password: null,
      });
      this.saveToLocalStorage();
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter((acc) => acc.id !== id);
      this.saveToLocalStorage();
    },
    saveAccount(account: Account) {
      const index = this.accounts.findIndex((acc) => acc.id === account.id);
      if (index !== -1) {
        this.accounts[index] = { ...account };
      }
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
    },
  },
});
