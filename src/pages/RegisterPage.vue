<template>
  <MobileViewport>
    <main class="register-page">
      <header class="register-page__header">
        <button type="button" class="register-page__back" data-testid="go-login" @click="router.push('/auth')">
          返回登录
        </button>
        <p class="register-page__brand">SoulEcho</p>
        <h1 class="page-title">立即注册</h1>
        <p class="page-copy">开启您的心灵旅程，让每一份情绪都有归宿。</p>
      </header>

      <GlassCard class="register-page__panel">
        <form data-testid="register-form" class="register-page__form" @submit.prevent="handleSubmit">
          <AppInput
            v-model="registerForm.displayName"
            name="displayName"
            label="昵称"
            placeholder="例如：小满"
            :error="registerErrors.displayName"
          />

          <AppInput
            v-model="registerForm.email"
            name="email"
            type="email"
            label="邮箱"
            placeholder="hello@ai-buddy.com"
            autocomplete="email"
            :error="registerErrors.email"
          />

          <AppInput
            v-model="registerForm.password"
            name="password"
            type="password"
            label="设置密码"
            placeholder="至少 8 位密码"
            autocomplete="new-password"
            :error="registerErrors.password"
          />

          <AppInput
            v-model="registerForm.confirmPassword"
            name="confirmPassword"
            type="password"
            label="确认密码"
            placeholder="再次输入密码"
            autocomplete="new-password"
            :error="registerErrors.confirmPassword"
          />

          <AppButton block type="submit">
            立即注册
          </AppButton>
        </form>

        <ToastBanner :message="toastMessage" />

        <div class="register-page__agreement">
          点击注册即表示您同意《用户协议》与《隐私政策》
        </div>

        <div class="register-page__divider">
          <span></span>
          <b>第三方注册</b>
          <span></span>
        </div>

        <div class="register-page__socials">
          <button type="button" class="register-page__social" @click="showMockToast('Google 注册将在下一版本接入')">Google</button>
          <button type="button" class="register-page__social" @click="showMockToast('Apple 注册将在下一版本接入')">Apple</button>
        </div>

        <button type="button" class="register-page__link" @click="router.push('/auth')">
          已有账号？立即登录
        </button>
      </GlassCard>
    </main>
  </MobileViewport>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppButton from '@/components/ui/AppButton.vue';
import AppInput from '@/components/ui/AppInput.vue';
import GlassCard from '@/components/ui/GlassCard.vue';
import ToastBanner from '@/components/ui/ToastBanner.vue';
import { useSession } from '@/composables/useSession';
import MobileViewport from '@/layouts/MobileViewport.vue';
import { validateRegisterForm } from '@/lib/validation';

const router = useRouter();
const session = useSession();
const toastMessage = ref('');

const registerForm = reactive({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const registerErrors = reactive<{ displayName?: string; email?: string; password?: string; confirmPassword?: string }>({});

function clearErrors() {
  Object.keys(registerErrors).forEach((key) => delete registerErrors[key as keyof typeof registerErrors]);
}

function showMockToast(message: string) {
  toastMessage.value = message;
}

async function handleSubmit() {
  clearErrors();
  Object.assign(registerErrors, validateRegisterForm(registerForm));

  if (Object.keys(registerErrors).length > 0) {
    return;
  }

  session.register(registerForm);
  await router.push('/app/home');
}
</script>

<style scoped>
.register-page {
  min-height: 100%;
  padding: 1.25rem 1.4rem 1.5rem;
  display: grid;
  gap: 1rem;
  align-content: start;
}

.register-page__header {
  display: grid;
  gap: 0.55rem;
}

.register-page__back,
.register-page__link {
  border: none;
  background: transparent;
  padding: 0;
  color: var(--color-primary);
  font-weight: 700;
  cursor: pointer;
  text-align: left;
}

.register-page__brand {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--color-primary);
}

.register-page__panel {
  display: grid;
  gap: 1rem;
}

.register-page__form {
  display: grid;
  gap: 0.95rem;
}

.register-page__agreement {
  color: var(--color-text-muted);
  font-size: 0.82rem;
  line-height: 1.55;
}

.register-page__divider {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.8rem;
  align-items: center;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

.register-page__divider span {
  height: 1px;
  background: rgba(97, 80, 176, 0.12);
}

.register-page__socials {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

.register-page__social {
  border: none;
  border-radius: var(--radius-pill);
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.8);
  color: var(--color-text);
  font-weight: 700;
  cursor: pointer;
}
</style>