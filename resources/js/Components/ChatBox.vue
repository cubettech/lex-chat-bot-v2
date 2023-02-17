<script setup>
import { onMounted, ref, toRefs} from "vue";
import API from "../utils/API";
import { useRouter } from "vue-router";

const props = defineProps({
    drawerView: Boolean,
});

const emit = defineEmits(['close'])

const { drawerView } = toRefs(props);

const closeDrawer = () => {
    emit('close')
}

const router = useRouter


const messages = ref([]);
const newMessage = ref("");
const messageEnded = ref(false);

onMounted(() => {
    console.log("chat started");
    initMessage();
});

const initMessage = async () => {
    try {
        const response = await API.post("/chat/init");

        console.group("init message");
        console.log(response.data);
        console.groupEnd();

        fetchMessage(response.data.messages);
        newMessage.value = "";
    } catch (e) {
        console.error(e);
    }
};

const addMessage = async (newMessageFromSendMessage) => {
    try {
        const response = await API.post("/chat/send", {
            message: newMessageFromSendMessage,
        });

        console.log(response.data);

        if (response.data.dialogState == "ReadyForFulfillment") {
            messageEnded.value = true;
            setTimeout(() => {
                router.push({ name: 'dashboard' })
            }, 1000)
        }

        fetchMessage(response.data.messages);
        newMessage.value = ""

    } catch (e) {
        console.error(e);
    }
};
const sendMessage = () => {
    // console.log(newMessage.value)
    if (newMessage.value.trim()) {
        console.log("new message ref trim");
        addMessage(newMessage.value.trim());
    }
};

const fetchMessage = (incomingMessages) => {
    if (incomingMessages) {
        console.group("fetch messages");
        console.log(incomingMessages);
        console.groupEnd();

        incomingMessages.forEach((element) => {
            // console.log(element)
            messages.value.push(element);
        });
    }
};
</script>

<template>
    <div>

        <!-- <div class="container">
                                    <div class="row justify-content-center">
                                        <div class="col-md-8">
                                            <div class="card">
                                                <div class="card-header">Chat Component</div>

                                                <div class="card-body" v-if="!isEnded">
                                                    <div class="row mb-2">
                                                        <div class="mb-12" v-for="message in messages" v-bind:key="message.id">
                                                            <label for="email" :class="
                                                                message.sender_name == message.sender_id
                                                                    ? 'col-md-12 text-md-start'
                                                                    : 'col-md-12 text-md-end'
                                                            ">{{ message.sender_name ? message.sender_name : "You" }} :
                                                                {{ message.message }}
                                                            </label>
                                                        </div>
                                                        <br />
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-md-12">
                                                            <input id="new-message" type="text" class="form-control" v-model="newMessage"
                                                                name="new-message" required @keyup.enter="sendMessage" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-body" v-else>
                                                    <div class="row mb-2">
                                                        <div class="mb-12" v-for="message in messages" v-bind:key="message.id">
                                                            <label for="email" :class="
                                                                message.sender_name == message.sender_id
                                                                    ? 'col-md-12 text-md-start'
                                                                    : 'col-md-12 text-md-end'
                                                            ">{{ message.sender_name ? message.sender_name : "You" }} :
                                                                {{ message.message }}
                                                            </label>
                                                        </div>
                                                        <br />
                                                        <label for="notice" class="col-md-12 text-md-start">
                                                            chating session is done, this page will redirected in seconds!!
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->


        <el-drawer v-model="drawerView"  :before-close="closeDrawer" class="chat-drawer">
            <template #header>
                <el-row class="demo-avatar demo-basic">
                    <el-avatar class="el-icon--left"
                        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                      <h2 class="chatbox-header">Chat Bot</h2>
                </el-row>
            </template>
            <template #default>
                <div>

                    <div class="container container-chatbox">
                        <!-- show messages -->
                        <ul class="space-y-2">
                            <li v-bind:key="message.id" v-for="message in messages" :class="message.sender_name == message.sender_id
                                ? 'flex justify-start'
                                : 'flex justify-end'
                            ">
                                <div class="relative w-100 px-4 py-2 text-gray-700 rounded shadow"
                                    :class="message.sender_name != message.sender_id ? 'bg-gray-100' : ''">
                                    <span class="block">{{ message.sender_name ? message.sender_name : "You" }} :
                                        <span v-html="message.message"></span>
                                        </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>

            <template #footer>
                <div style="flex: auto">
                    <form @submit.prevent="sendMessage">
                        <label for="chat" class="sr-only">Your message</label>
                        <div class="
                                        flex
                                        items-center
                                        py-2
                                        px-3
                                        bg-gray-50
                                        rounded-lg
                                        dark:bg-gray-700
                                      ">
                            <textarea id="chat" rows="1" class="
                                          block
                                          mx-4
                                          p-2.5
                                          w-full
                                          text-sm text-gray-900
                                          bg-white
                                          rounded-lg
                                          border border-gray-300
                                          focus:ring-blue-500 focus:border-blue-500
                                          dark:bg-gray-800
                                          dark:border-gray-600
                                          dark:placeholder-gray-400
                                          dark:text-white
                                          dark:focus:ring-blue-500
                                          dark:focus:border-blue-500
                                        " placeholder="Your message..." required v-model="newMessage"
                                @keyup.enter="sendMessage"></textarea>
                            <button type="submit" class="
                                          inline-flex
                                          justify-center
                                          p-2
                                          text-blue-600
                                          rounded-full
                                          cursor-pointer
                                          hover:bg-blue-100
                                          dark:text-blue-500 dark:hover:bg-gray-600
                                        ">
                                <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                                    </path>
                                </svg>
                                <span class="sr-only">Send message</span>
                            </button>
                        </div>
                    </form>
                </div>
            </template>
        </el-drawer>

</div>
</template>
<style>
.chatbox-header{
    padding-left:.75rem !important;
}
.demo-basic{
    align-items: center !important;
}
.container-chatbox {
    overflow-y: auto !important;
        height: calc(100vh - 202px) !important;
    padding-bottom: 1rem;
    word-break: break-word;
}
.chat-drawer .el-drawer__body {
    overflow: hidden !important;
}
.chat-drawer {
    max-width: 500px !important;
    width: 100%  !important;
}
</style>
