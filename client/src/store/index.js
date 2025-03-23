import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice.js";
import { createChatSlice } from "./slices/chat-slice.js";
import { createThemeSlice } from "./slices/theme-slice.js";

export const useAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
    ...createThemeSlice(...a)
}))