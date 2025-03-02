import { defineStore } from 'pinia';

interface Account {
  id: string;
  label: string;
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
        id: crypto.randomUUID(),  // ✅ Уникальный ID
        label: '',
        type: 'Local',
        login: '',
        password: null,
      });
    },
    deleteAccount(id: string) {
      console.log('Deleting account with id:', id);
      this.accounts = this.accounts.filter(acc => acc.id !== id);
    },
    saveAccount(account: Account) {
      const index = this.accounts.findIndex(acc => acc.id === account.id);
      if (index !== -1) {
        this.accounts[index] = { ...account };
      }
    },
  },
});
