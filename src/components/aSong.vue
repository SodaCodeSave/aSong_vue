<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

// 定义一个响应式变量来存储请求结果
const quote = ref({
    "hitokoto": "你连一句话都等不了，怎么等得到她？",
    "from_who": "加载中"
});

// 在组件挂载时发起请求
onMounted(async () => {
    try {
        const response = await axios({
            method: 'get',
            url: 'https://international.v1.hitokoto.cn/'
        });
        // 将请求结果赋值给响应式变量
        quote.value = response.data;
        if (quote.value["from_who"] == "" || quote.value["from_who"] == null) {
            quote.value["from_who"] = "";
        }
        else {
            quote.value["from_who"] = "——" + quote.value["from_who"];
        }
    } catch (error) {
        console.error('请求失败:', error);
        quote.value = {
            "hitokoto": "有的时候，错过也是一种相遇",
            "from_who": "连接失败"
        };
    }
});
</script>

<template>
    <div class="a-song">
        <p>{{ quote["hitokoto"] }}</p>
        <div>{{ quote["from_who"] }}</div>
    </div>
</template>

<style>
    .a-song p {
        line-height: normal;
    }
    .a-song div {
        text-align: right;
        font-size: 12px;
    }
</style>