<template>
  <div class="account-management">
    <h1>Учетные записи</h1>
    <button @click="addAccount">+</button>
    <p>
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </p>
    <div class="accounts-grid">
      <div
        v-for="(account, index) in accounts"
        :key="account.id"
        class="account-item"
      >
        <AccountForm :account="account" @delete="deleteAccount(account.id)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAccountsStore } from '../stores/accounts';
import AccountForm from './AccountForm.vue';
import { computed, onMounted } from 'vue';

export default defineComponent({
  components: {
    AccountForm,
  },
  setup() {
    const accountsStore = useAccountsStore();
    const accounts = computed(() => accountsStore.accounts);

    // Загрузка данных из localStorage
    onMounted(() => {
      const savedAccounts = localStorage.getItem('accounts');
      if (savedAccounts) {
        accountsStore.$state.accounts = JSON.parse(savedAccounts);
      }
    });

    const addAccount = () => {
      accountsStore.addAccount();
    };

    const deleteAccount = (id: string) => {
      accountsStore.deleteAccount(id);
    };

    return {
      accounts,
      addAccount,
      deleteAccount,
    };
  },
});
</script>

<style scoped>
.account-management {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.accounts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.account-item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}
</style>
