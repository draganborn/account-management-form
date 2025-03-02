<template>
  <div class="account-form">
    <div class="form-field">
      <label>Метки</label>
      <input type="text" v-model="account.label" @blur="validateAndSave" />
    </div>
    <div class="form-field">
      <label>Тип записи</label>
      <select v-model="account.type" @change="handleTypeChange">
        <option value="LDAP">LDAP</option>
        <option value="Local">Локальная</option>
      </select>
    </div>
    <div class="form-field">
      <label>Логин</label>
      <input type="text" v-model="account.login" @blur="validateAndSave" />
    </div>
    <div class="form-field" v-if="account.type === 'Local'">
      <label>Пароль</label>
      <input
        type="password"
        v-model="account.password"
        @blur="validateAndSave"
      />
    </div>
<button @click="$emit('delete', account)">Удалить</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useAccountsStore } from '../stores/accounts';

export default defineComponent({
  props: {
    account: Object,
  },
  setup(props, { emit }) {
    const accountsStore = useAccountsStore();
    const localAccount = ref({ ...props.account });

    const validateAndSave = () => {
      if (localAccount.value.login && (localAccount.value.type === 'Local' ? localAccount.value.password !== null : true)) {
        accountsStore.saveAccount(localAccount.value);
        emit('update:account', localAccount.value);
      }
    };

    const handleTypeChange = () => {
      if (localAccount.value.type === 'LDAP') {
        localAccount.value.password = null;
      }
    };

    watch(localAccount, (newVal) => {
      emit('update:account', newVal);
    }, { deep: true });

    return {
      localAccount,
      validateAndSave,  // ✅ Добавляем в return
      handleTypeChange,
    };
  },
});
</script>

<style scoped>
.account-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field label {
  margin-bottom: 5px;
}

.form-field input,
.form-field select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.form-field input:focus,
.form-field select:focus {
  outline: none;
  border-color: #007bff;
}
</style>
