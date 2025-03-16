<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

import ContentCopy from 'vue-material-design-icons/ContentCopy.vue';
import ArrowRight from 'vue-material-design-icons/ArrowRight.vue';
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue';

components: {
    ContentCopy; ArrowRight; ArrowLeft;
}

const fontFamily = ref('MiSans');

// 定义一个响应式变量来存储请求结
const quote = ref({
    "hitokoto": "你连一句话都等不了，怎么等得到她？",
    "from_who": "加载中"
});

let quotes = []

let current_quote = ref(quotes.length);

const url = 'https://international.v1.hitokoto.cn/';

async function getQuote() {
    try {
        const response = await axios({
            method: 'get',
            url: url
        });
        // 将请求结果赋值给响应式变量
        quote.value = response.data;
        if (quote.value["from_who"] == "" || quote.value["from_who"] == null) {
            quote.value["from_who"] = "";
        }
        else {
            quote.value["from_who"] = "——" + quote.value["from_who"];
        }
        current_quote = quotes.length;
        quotes.push({ "hitokoto": quote.value["hitokoto"], "from_who": quote.value["from_who"] });
    } catch (error) {
        console.error('请求失败:', error);
        quote.value = {
            "hitokoto": "有的时候，错过也是一种相遇",
            "from_who": "连接失败"
        };
    }
}

function copyText() {
    navigator.clipboard.writeText(quote.value["hitokoto"] + "\n" + quote.value["from_who"]);
}

function changeSong(arrow) {
    if (arrow == 'l') {
        if (current_quote > 0) {
            current_quote -= 1;
        }
    }
    else if (arrow == 'r') {
        if (current_quote < quotes.length - 1) { // 修改这里以防止数组越界
            current_quote += 1;
        }
        else {
            getQuote();
        }
    }
    quote.value = quotes[current_quote];
}

// 在组件挂载时发起请求
onMounted(async () => getQuote());
</script>

<template>
    <div class="a-song" :style="{ fontFamily: fontFamily }" @click="getQuote()">
        <p>{{ quote["hitokoto"] }}</p>
        <div class="ml-10">{{ quote["from_who"] }}</div>
    </div>
    <div class="menu">
        <div class="buttons">
            <button class="btn btn-circle copy-btn btn-ghost z-50" @click="changeSong('l')">
                <arrow-left />
            </button>
            <button class="btn btn-circle copy-btn btn-ghost z-50" @click="copyText()">
                <content-copy />
            </button>
            <button class="btn btn-circle copy-btn btn-ghost z-50" @click="changeSong('r')">
                <arrow-right />
            </button>
        </div>
        <div class="content">
            {{ current_quote + 1 }} / {{ quotes.length }}
        </div>
    </div>
</template>

<style>
.a-song {
    max-width: 500px;
    min-height: 300px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.a-song p {
    line-height: normal;
}

.a-song div {
    width: 100%;
    text-align: right;
    font-size: 12px;
}

.menu {
    position: fixed;
    display: flex;
    bottom: 80px;
    left: calc(50% - 150px);
    justify-content: center;
    align-items: center;
    width: 300px;
}

.menu .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
</style>