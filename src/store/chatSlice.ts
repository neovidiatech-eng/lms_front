import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
    id: string;
    text: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
}

interface ChatState {
    messages: Message[];
    currentRoom: string | null;
}
const initialState: ChatState = {
    messages: [],
    currentRoom: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setRoom: (state, action: PayloadAction<string>) => {
            state.currentRoom = action.payload;
            state.messages = [];
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },

    }
})


export const { setRoom, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;