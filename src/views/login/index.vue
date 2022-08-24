<script setup lang="ts">
import { reactive } from "vue";
import { useUser } from '@/store'
// 已自动引入vue pinia vue-router
// import { useRouter } from 'vue-router'
import { login } from '@/api/user'
import { message } from 'ant-design-vue'
const userStore = useUser()
const router = useRouter()

interface FormState {
    username: string
    password: string
}

const formState = reactive<FormState>({
    username: '',
    password: ''
});

const onFinish = async (values: any) => {
    const res = await login({
        username: values.username,
        password: values.password
    })
    if(res && res.code === 200) {
        userStore.saveToken(res.token)
        router.replace({
            name: 'index'
        })
    } else {
        message.warning('登录失败!')
        return
    }
}

const onFinishFailed = (values: any) => {
    console.log('fail:', values)
}

onMounted(() => {
    document.body.style.background = '#fafafa'
})

onBeforeUnmount(() => {
    document.body.style.background = ''
})
</script>

<template>
    <div class="login-wrap">
        <div class="title">vite+vue3+ts</div>
        <a-form
            :model="formState"
            name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                name="username"
                :rules="[
                    { required: true, message: '请输入用户名!' },
                ]"
            >
                <a-input v-model:value="formState.username" placeholder="请输入用户名" />
            </a-form-item>

            <a-form-item
                name="password"
                :rules="[
                    { required: true, message: '请输入密码!' },
                ]"
            >
                <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit" style="width: 100%; height: 40px">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<style lang="scss" scoped>
.login-wrap {
    width: 520px;
    margin: 100px auto;
    padding: 40px 20px;
    border: 1px solid skyblue;
    border-radius: 5px;
    background: #fff;
    .title {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 15px;
    }
}
</style>
