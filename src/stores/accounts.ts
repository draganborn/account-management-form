// stores/accounts.ts
import { defineStore } from 'pinia';

interface Account {
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
        label: '',
        type: 'Local',
        login: '',
        password: null,
      });
    },
    deleteAccount(index: number) {
      console.log('Deleting account at index:', index);
      if (index >= 0 && index < this.accounts.length) {
        this.accounts.splice(index, 1);
        console.log('Account deleted:', this.accounts);
      } else {
        console.error('Invalid index for deletion:', index);
      }
    },
saveAccount(account: Account) {
  const index = this.accounts.findIndex(acc => acc.login === account.login);
  if (index !== -1) {
    this.accounts[index] = { ...account };
  }
}
  },
});
