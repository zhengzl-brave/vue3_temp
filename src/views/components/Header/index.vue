<script lang="ts">
// name属性单独提出来
export default {
    name: "Header",
};
</script>
    <script setup lang="ts">
import { useSetting, useUser } from "@/store";
const router = useRouter();
const userStore = useUser();
const settingStore = useSetting();
const logout = () => {
    userStore.saveToken("");
    router.replace({
        name: "login",
    });
};
const changeTheme = (theme: string) => {
    settingStore.setUpdateSystemSetting(theme);
};
</script>
    
    <template>
    <div class="header">
        <div class="nav">
            <router-link to="/manageModel" class="nav">管理主页</router-link>
            <router-link to="/todolist" class="nav">计划与待办</router-link>
            <router-link to="/designPatterns" class="nav">设计模式</router-link>
            <router-link to="/statistical" class="nav">统计</router-link>
        </div>
        <div class="btn">
            <div class="color-change">
                <div class="default inner-btn" @click="changeTheme('default')">主题色调</div>
                <div class="white inner-btn" @click="changeTheme('white')">常规色调</div>
                <div class="out inner-btn" @click="logout">退出</div>
            </div>
        </div>
    </div>
</template>
    
    <style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: space-between;
        height: 65px;
        width: calc(100% - 120px);
        border-radius: 10px;
        margin: 0 auto;
    
        @include themeify {
            background-color: rgba(themed("main-color"), 0.8);
        }
    
        .nav {
            margin: 0 20px;
            line-height: 65px;
    
            @include themeify {
                color: themed("font-color");
            }
        }
    
        .btn {
            margin: 10px 40px;
            display: flex;
    
            .color-change {
                display: flex;
                align-items: center;
    
                .default {
                    @include themeify {
                        background-color: themed("btn3-color");
                    }
    
                    color: #010a17;
                }
    
                .white {
                    @include themeify {
                        background-color: themed("btn3-color");
                    }
    
                    color: #ffffff;
                }
    
                .out {
                    @include themeify {
                        background-color: themed("font-color");
                    }
    
                    @include themeify {
                        color: themed("main-color");
                    }
                }
    
                .inner-btn {
                    width: 70px;
                    height: 30px;
                    border-radius: 5px;
                    cursor: pointer;
                    line-height: 30px;
                    text-align: center;
                    margin-right: 20px;
                }
            }
        }
    }
    </style>
    