<template>
  <div class="account-form">
    <div class="form-field" :class="{ invalid: errors.label }">
      <label>Метки</label>
      <input
        type="text"
        v-model="localAccount.label"
        @blur="validateAndSave"
        placeholder="Введите метки через ;"
      />
    </div>
    <div class="form-field" :class="{ invalid: errors.type }">
      <label>Тип записи</label>
      <select v-model="localAccount.type" @change="handleTypeChange">
        <option value="LDAP">LDAP</option>
        <option value="Local">Локальная</option>
      </select>
    </div>
    <div class="form-field" :class="{ invalid: errors.login }">
      <label>Логин</label>
      <input
        type="text"
        v-model="localAccount.login"
        @blur="validateAndSave"
        placeholder="Введите логин"
      />
    </div>
    <div
      class="form-field"
      :class="{ invalid: errors.password }"
      v-if="localAccount.type === 'Local'"
    >
      <label>Пароль</label>
      <input
        type="password"
        v-model="localAccount.password"
        @blur="validateAndSave"
        placeholder="Введите пароль"
      />
    </div>
    <button @click="$emit('delete', localAccount.id)">Удалить</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import type { PropType } from 'vue';
import { useAccountsStore } from '../stores/accounts';

export default defineComponent({
  props: {
    account: {
      type: Object as PropType<Account>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const accountsStore = useAccountsStore();
    const localAccount = ref({ ...props.account });
    const errors = ref({
      label: false,
      type: false,
      login: false,
      password: false,
    });

    // Синхронизация с пропсами
    watchEffect(() => {
      localAccount.value = { ...props.account };
    });

    // Преобразование меток в массив объектов
    const parseLabels = (labels: string) => {
      return labels
        .split(';')
        .filter(label => label.trim() !== '')
        .map(label => ({ text: label.trim() }));
    };

    // Валидация полей
    const validateFields = () => {
      errors.value = {
        label: !localAccount.value.label,
        type: !localAccount.value.type,
        login: !localAccount.value.login,
        password:
          localAccount.value.type === 'Local' && !localAccount.value.password,
      };

      return !Object.values(errors.value).some(error => error);
    };

    // Сохранение учетной записи
    const validateAndSave = () => {
      if (validateFields()) {
        const updatedAccount = {
          ...localAccount.value,
          label: parseLabels(localAccount.value.label),
        };
        accountsStore.saveAccount(updatedAccount);
        emit('update:account', updatedAccount);
      }
    };

    // Обработка изменения типа записи
    const handleTypeChange = () => {
      validateAndSave();
    };

    return {
      localAccount,
      errors,
      validateAndSave,
      handleTypeChange,
    };
  },
});
</script>

<style scoped>
.invalid input,
.invalid select {
  border: 1px solid red;
}

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
