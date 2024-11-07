// src/socket.js
"use client";

import { io } from "socket.io-client";

export const socket = io("http://localhost:3000"); // Adjust URL if needed
