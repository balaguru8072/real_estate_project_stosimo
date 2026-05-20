"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCheck, Clock, Send } from "lucide-react";

export default function ChatPage({ params }) {
  const { id } = use(params);

  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const formatMessages = (apiMessages, contactData) => {
    if (Array.isArray(apiMessages) && apiMessages.length > 0) {
      return apiMessages.map((msg) => ({
        id: msg._id || msg.id,
        type: msg.sender === "admin" ? "admin" : "user",
        text: msg.text || msg.message || "No message",
        time: msg.createdAt
          ? new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        status: msg.status || "sent",
      }));
    }

    return [
      {
        id: contactData._id,
        type: "user",
        text: contactData.message || "No message",
        time: contactData.createdAt
          ? new Date(contactData.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        status: "received",
      },
    ];
  };

  useEffect(() => {
    const loadChat = async () => {
      try {
        await fetch(`http://localhost:5000/api/contacts/${id}/read`, {
          method: "PUT",
        });

        const contactRes = await fetch(
          `http://localhost:5000/api/contacts/${id}`
        );
        const contactData = await contactRes.json();

        if (!contactData.success) {
          setContact(null);
          return;
        }

        setContact(contactData.contact);

        const chatRes = await fetch(`http://localhost:5000/api/chats/${id}`);
        const chatData = await chatRes.json();

        const finalMessages = formatMessages(
          chatData.success ? chatData.messages : [],
          contactData.contact
        );

        setMessages(finalMessages);
      } catch (error) {
        // console.log("Chat load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChat();
  }, [id]);

  const sendReply = async () => {
    if (!reply.trim()) return alert("Please type message");

    const tempId = Date.now();
    const messageText = reply;

    const tempMessage = {
      id: tempId,
      type: "admin",
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sending",
    };

    setMessages((prev) => [...prev, tempMessage]);
    setReply("");
    setSending(true);

    try {
      const res = await fetch("http://localhost:5000/api/chats/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId: id,
          text: messageText,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId
              ? {
                  ...msg,
                  id: data.message?._id || tempId,
                  status: "sent",
                }
              : msg
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, status: "failed" } : msg
          )
        );
        alert(data.message || "Message failed");
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, status: "failed" } : msg
        )
      );
      alert("Server error");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="p-6">Loading chat...</div>;
  if (!contact) return <div className="p-6">Message not found</div>;

  return (
    <div className="min-h-screen bg-[#e5ddd5] p-4">
      <Link
        href="/mail-inbox"
        className="mb-4 inline-flex items-center gap-2 text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Inbox
      </Link>

      <div className="mx-auto flex h-[82vh] max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow">
        <div className="flex items-center gap-3 bg-[#075e54] p-4 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold text-[#075e54]">
            {contact.username?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="font-semibold">{contact.username}</h1>
            <p className="text-xs text-green-100">{contact.email}</p>
            <p className="text-xs text-green-100">{contact.phone}</p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto bg-[#efe7dd] p-5">
          {messages.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              No messages loaded
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === "admin" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.type === "admin"
                      ? "rounded-br-none bg-[#dcf8c6]"
                      : "rounded-bl-none bg-white"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm text-gray-800">
                    {msg.text || "Empty message"}
                  </p>

                  <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-gray-500">
                    <span>{msg.time}</span>

                    {msg.type === "admin" && msg.status === "sending" && (
                      <Clock size={13} className="animate-spin" />
                    )}

                    {msg.type === "admin" && msg.status === "sent" && (
                      <CheckCheck size={15} className="text-blue-500" />
                    )}

                    {msg.type === "admin" && msg.status === "failed" && (
                      <span className="font-medium text-red-500">Failed</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-3 border-t bg-[#f0f0f0] p-4">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type a message..."
            disabled={sending}
            className="h-[50px] flex-1 resize-none rounded-full border bg-white px-5 py-3 text-sm outline-none focus:border-[#075e54]"
          />

          <button
            onClick={sendReply}
            disabled={sending}
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#075e54] text-white hover:bg-[#064c44] disabled:opacity-60"
          >
            {sending ? (
              <Clock size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}