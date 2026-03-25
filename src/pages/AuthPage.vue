<template>
  <MobileViewport>
    <main class="auth-page">
      <header class="auth-page__header">
        <p class="auth-page__brand">SoulEcho</p>
        <h1 class="page-title">欢迎回来</h1>
        <p class="page-copy">在宁静中寻找共鸣，开启你的心灵旅程。</p>
      </header>

      <GlassCard class="auth-page__panel">
        <form data-testid="auth-form" class="auth-page__form" @submit.prevent="handleSubmit">
          <AppInput
            v-model="loginForm.email"
            name="email"
            type="email"
            label="邮箱"
            placeholder="hello@ai-buddy.com"
            autocomplete="email"
            :error="loginErrors.email"
          />

          <AppInput
            v-model="loginForm.password"
            name="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            autocomplete="current-password"
            :error="loginErrors.password"
          />

          <button type="button" class="auth-page__link auth-page__link--muted" @click="showMockToast('忘记密码功能将在下一版本开放')">
            忘记密码？
          </button>

          <AppButton block data-testid="auth-submit" type="submit">
            登录
          </AppButton>
        </form>

        <ToastBanner :message="toastMessage" />

        <div class="auth-page__divider">
          <span></span>
          <b>或者通过</b>
          <span></span>
        </div>

        <div class="auth-page__socials">
          <button type="button" class="auth-page__social" @click="showMockToast('微信登录将在下一版本接入')">微信</button>
          <button type="button" class="auth-page__social" @click="showMockToast('QQ 登录将在下一版本接入')">QQ</button>
        </div>

        <button type="button" class="auth-page__link" data-testid="go-register" @click="router.push('/register')">
          还没有账号？立即注册
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
import { validateLoginForm } from '@/lib/validation';

const router = useRouter();
const session = useSession();
const toastMessage = ref('');

const loginForm = reactive({
  email: '',
  password: '',
});

const loginErrors = reactive<{ email?: string; password?: string }>({});

function clearErrors() {
  Object.keys(loginErrors).forEach((key) => delete loginErrors[key as keyof typeof loginErrors]);
}

function showMockToast(message: string) {
  toastMessage.value = message;
}

async function handleSubmit() {
  clearErrors();
  Object.assign(loginErrors, validateLoginForm(loginForm));

  if (Object.keys(loginErrors).length > 0) {
    return;
  }

  session.login(loginForm);
  await router.push('/app/home');
}
</script>

<style scoped>
.auth-page {
  min-height: 100%;
  padding: 1.4rem;
  display: grid;
  gap: 1rem;
  align-content: start;
}

.auth-page__header {
  display: grid;
  gap: 0.55rem;
  margin-top: 0.35rem;
}

.auth-page__brand {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--color-primary);
}

.auth-page__panel {
  display: grid;
  gap: 1rem;
}

.auth-page__form {
  display: grid;
  gap: 0.95rem;
}

.auth-page__divider {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.8rem;
  align-items: center;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

.auth-page__divider span {
  height: 1px;
  background: rgba(97, 80, 176, 0.12);
}

.auth-page__socials {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

.auth-page__social {
  border: none;
  border-radius: var(--radius-pill);
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.8);
  color: var(--color-text);
  font-weight: 700;
  cursor: pointer;
}

.auth-page__link {
  border: none;
  background: transparent;
  padding: 0;
  color: var(--color-primary);
  font-weight: 700;
  cursor: pointer;
  text-align: left;
}

.auth-page__link--muted {
  color: var(--color-text-muted);
  font-weight: 600;
  justify-self: end;
}
</style>