import { STORAGE_KEY } from "src/utils/constants";

export class WebSocketClient {
  private socket: WebSocket | null = null;
  private uri: string;
  private token: string | null;
  private eventHandlers: Record<string, (data: any) => void> = {};
  private refreshCount = 5;

  constructor({ uri }: { uri: string }) {
    this.uri = uri;
    this.token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  }

  connect(chat_box_id: string) {
    if (this.socket) {
      console.warn("WebSocket is already connected.");
      return;
    }
    // const url = `${this.uri}?token=${this.token}`;
    const url = `${this.uri}ws/joinConversation/${chat_box_id}`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("WebSocket connected.");
      this.refreshCount = 5;
    };

    this.socket.onmessage = (event) => {
      try {
        const { event: eventName, data } = JSON.parse(event.data);
        if (this.eventHandlers[eventName]) {
          this.eventHandlers[eventName](data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected.");
      this.socket = null;
    };
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }

  async reconnect(chat_box_id: string) {
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    const id = localStorage.getItem("ID");

    if (id && refreshToken) {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ id, refresh_token: refreshToken }),
      });

      const result = await response.json();
      if (result?.data?.access_token) {
        this.token = result.data.access_token;
        localStorage.setItem("ACCESS_TOKEN", this.token);
        this.connect(chat_box_id);
      }
    }
  }

  on(event: string, callback: (data: any) => void) {
    this.eventHandlers[event] = callback;
  }

  off(event: string) {
    delete this.eventHandlers[event];
  }

  send(data: any) {
    if (typeof data === "string") {
      this.socket?.send(data);
    } else {
      this.socket?.send(JSON.stringify(data));
    }
  }
}
